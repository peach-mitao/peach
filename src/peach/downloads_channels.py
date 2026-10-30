"""从媒体库路径与网盘能力生成可提交云下载的渠道。"""
from __future__ import annotations

import hashlib
import threading
import time
from pathlib import PureWindowsPath

from google.protobuf.empty_pb2 import Empty

from .downloads import (
    CLOUDDRIVE_CREDENTIAL, PIKPAK_CREDENTIAL, QBITTORRENT_CREDENTIAL, DownloadError,
)
from .downloads_clouddrive import CloudDriveClient, PROBE_TIMEOUT
from .media_sources import SOURCES
from .clouddrive_proxy import media_remote_path
from .push_discovery import normalise_prefix
from .follow_secrets import CredentialError
from .error_reporting import local_event


def root_key(value):
    return str(PureWindowsPath(value)).rstrip("\\").casefold()


class LibraryChannels:
    """能力只读探测，缓存随媒体路径、下载设置和凭据变化失效。"""

    def __init__(self, service, names, *, client=CloudDriveClient, clock=time.monotonic):
        self.service, self.names, self.client, self.clock = service, names, client, clock
        self._lock = threading.Lock()
        self._cached = None

    def __call__(self):
        service = self.service
        config = service.config
        roots = {root_key(root): (location, root)
                 for location, values in service.landing.declared_roots.items() for root in values
                 if location in SOURCES and SOURCES[location].cloud}
        prefixes = tuple(getattr(getattr(service.landing.push_discovery, "config", None), "prefixes", ()))
        names = {root_key(root): name for root, name in self.names().items()}
        problems = []
        try:
            cloud = service.credentials.load(CLOUDDRIVE_CREDENTIAL)
        except CredentialError:
            cloud = None
            problems.append("CloudDrive2 令牌无法读取，请重新填写。")
        token = str(cloud.values.get("token", "")) if cloud else ""
        try:
            pikpak = service.credentials.describe(PIKPAK_CREDENTIAL)
        except CredentialError:
            pikpak = {"fields": []}
            problems.append("PikPak 登录信息无法读取，请重新登录。")
        logged_in = "refresh_token" in pikpak["fields"]
        try:
            qb = service.credentials.load(QBITTORRENT_CREDENTIAL)
        except CredentialError:
            qb = None
        qb_values = dict(qb.values) if qb else {}
        qb_secret = (str(qb_values.get("username", "")) + "\0" + str(qb_values.get("password", ""))).encode()
        fingerprint = (repr(config.payload()), repr(roots), repr(prefixes), repr(names),
                       repr(getattr(service.landing, "mounts", {})), logged_in,
                       hashlib.sha256(token.encode()).digest(),
                       hashlib.sha256(qb_secret).digest(), tuple(problems))
        with self._lock:
            now = self.clock()
            if self._cached and self._cached[0] == fingerprint and now - self._cached[1] < 30:
                return self._cached[2]
            result = self._discover(roots, prefixes, names, token, logged_in)
            result["problems"] = list(dict.fromkeys((*problems, *result["problems"])))
            self._cached = fingerprint, now, result
            return result

    def _discover(self, roots, prefixes, names, token, logged_in):
        config = self.service.config
        rows, problems = [], []
        direct_root = roots.get(root_key(config.pikpak_root)) if config.pikpak_root else None
        if logged_in and direct_root and direct_root[0] == "pikpak" and config.targets.get("pikpak"):
            rows.append(self._row("pikpak", "pikpak", direct_root[1], config.targets["pikpak"], names))
        if roots and config.clouddrive_address and token:
            phase = 'connect'
            try:
                with self.client(config.clouddrive_address, token, timeout=PROBE_TIMEOUT) as client:
                    phase = 'token_permissions'
                    permissions = client.token_info().permissions
                    if not (permissions.allow_add_offline_download and permissions.allow_list_offline_downloads):
                        problems.append("CloudDrive2 令牌需要提交和查看离线任务权限。")
                    else:
                        mounts = []
                        if getattr(permissions, "allow_get_mounts", False):
                            try:
                                mounts = client.call("GetMountPoints", Empty(), "读取媒体库挂载点").mountPoints
                            except DownloadError as error:
                                local_event('download-channel-probe', error, operation='mount_points',
                                            source='clouddrive', failure=error.failure)
                        phase = 'library_mapping'
                        candidates = self._candidates(roots, prefixes, mounts, rows, names, problems)
                        seen = set()
                        for key, source, root, target, prefix in candidates:
                            if key in seen:
                                continue
                            seen.add(key)
                            try:
                                folder = client.folder(target)
                                if folder.can_offline:
                                    rows.append(self._row(key, source, root, target, names, cloud_root=prefix,
                                                          can_cancel=folder.can_manage and bool(
                                                              permissions.allow_modify_offline_downloads)))
                            except DownloadError as error:
                                local_event('download-channel-probe', error, operation='folder_capabilities',
                                            source=source, failure=error.failure)
                                problems.append(f"{names.get(root_key(root)) or SOURCES[source].name}的云下载能力未取得。")
            except DownloadError as error:
                local_event('download-channel-probe', error, operation=phase,
                            source='clouddrive', failure=error.failure)
                problems.append("CloudDrive2 云下载能力未取得，请检查连接与令牌。")
        qb = self._qbittorrent(config, problems)
        if qb is not None:
            rows.append(self._row(
                "qbittorrent", "local", config.qbittorrent_media_root,
                config.qbittorrent_save_path, names, kind="local",
                local_root=config.qbittorrent_save_path))
        return {"providers": rows, "problems": list(dict.fromkeys(problems))}

    def _qbittorrent(self, config, problems):
        """配置和凭据齐全就给出渠道；不在每次列表轮询里登录。

        qB 对连续失败登录会封禁来源，活动页每几秒取一次任务列表，渠道探测不能拿
        用户填错的密码反复试。实际连通性由设置页的「检查」按用户动作验证一次。
        """
        if not (config.qbittorrent_address and config.qbittorrent_save_path
                and config.qbittorrent_media_root):
            return None
        try:
            values = self.service.credentials.load(QBITTORRENT_CREDENTIAL)
        except CredentialError:
            problems.append("qBittorrent 登录信息无法读取，请重新填写。")
            return None
        values = dict(values.values) if values else {}
        if not str(values.get("username", "")) or not str(values.get("password", "")):
            problems.append("qBittorrent 还没有填写用户名和密码。")
            return None
        return True

    def _candidates(self, roots, prefixes, mounts, direct, names, problems):
        candidates = []
        landing = self.service.landing
        for source, root in roots.values():
            if any(root_key(row["root"]) == root_key(root) for row in direct):
                continue
            index = list(landing.declared_roots[source]).index(root)
            mapped = getattr(landing, "mounts", {}).get(source, ())
            mount = mapped[index] if index < len(mapped) else root
            remote = media_remote_path(root, mount, prefixes, mounts)
            if not remote:
                problems.append(f"{names.get(root_key(root)) or SOURCES[source].name}尚未关联云端目录，请检查挂载或推送发现配置。")
                continue
            prefix = normalise_prefix(remote)
            target = self.service.config.targets.get(source, "")
            use_saved = target and (target == prefix or target.startswith(prefix + "/"))
            target = target if use_saved else prefix
            key = "115" if source == "115" and use_saved else (
                f"clouddrive:{source}:" + hashlib.sha256((prefix + "\0" + root_key(root)).encode()).hexdigest()[:16])
            candidates.append((key, source, root, target, prefix))
        return candidates

    @staticmethod
    def _row(key, source, root, target, names, *, cloud_root="", can_cancel=True,
             kind="cloud", local_root=""):
        from . import media_identity, settings_file
        name = names.get(root_key(root)) or PureWindowsPath(root).name or root
        if key == "qbittorrent":
            label = f"{name} · qBittorrent"
        else:
            label = name if name == SOURCES[source].name else f"{name} · {SOURCES[source].name}"
        return {"key": key, "source": source, "label": label, "configured": True,
                "target": target, "root": root, "cloud_root": cloud_root,
                "kind": kind, "local_root": local_root, "can_cancel": can_cancel,
                **media_identity.ownership(settings_file.active(), root)}
