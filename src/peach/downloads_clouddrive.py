"""115 云下载：经 CloudDrive2 的 gRPC 接口提交与跟踪 115 离线任务。

Peach 不另申请 115 应用，复用 CloudDrive2 已有的 115open 授权：一个应用最多授权两次，第三次
会顶掉第一次。CloudDrive2 的 API 令牌由用户在设置页填一次，存本机 `CredentialStore`，
只放进 gRPC 的 `authorization` 元数据，不进 URL、日志与 ledger。

用到的七个方法见 `downloads_clouddrive.proto`。流程参照 JavBoss
`internal/clouddrive/client.go` 与 `internal/service/download.go`：提交前确认目标目录
`canOfflineDownload` 并查配额，提交时让 CloudDrive2 10 秒后自己看一眼目录，之后按 infohash
在目录的离线列表里对账；列表里找不到时看目录里有没有那个文件。

每个任务扣一条 115 离线配额（年费会员每月 1500 条、月费 200 条，月底清零）。提交前先查
目录里是否已有同一 infohash 的离线任务，有就接管，不再扣。
"""
from __future__ import annotations

import posixpath
from dataclasses import dataclass
from urllib.parse import urlsplit

import grpc
from google.protobuf import empty_pb2

from . import downloads_clouddrive_pb2 as pb
from .downloads import (
    DONE, ERROR, MISSING, RUNNING, DownloadError, DownloadTask, Magnet, RemoteStatus,
    classify_remote_message, magnet_info_hash,
)

SERVICE = "/clouddrive.CloudDriveFileSrv/"
#: 单次调用的上限。离线列表要强制刷新，115 那一侧偶尔要几秒。
CALL_TIMEOUT = 30.0
#: 提交后让 CloudDrive2 自己隔多久去目标目录看一眼。
CHECK_FOLDER_AFTER_SECS = 10
#: 地址留空时「检查」依次试的本机地址：独立版默认 19798，Windows 桌面版有用 29798 的。
LOCAL_ADDRESSES = ("http://127.0.0.1:19798", "http://127.0.0.1:29798")
#: 探测一个地址的上限。本机端口没人听时立刻被拒，这个上限只兜住听着却不应答的情况。
PROBE_TIMEOUT = 3.0

#: 「检查」要报的三项离线权限。取消要用到第三项，缺它只是不能取消。
OFFLINE_PERMISSIONS = {
    "allow_add_offline_download": "提交离线任务",
    "allow_list_offline_downloads": "查看离线任务与配额",
    "allow_modify_offline_downloads": "取消离线任务",
}

_METHODS = {
    "GetSystemInfo": (empty_pb2.Empty, pb.CloudDriveSystemInfo),
    "GetApiTokenInfo": (pb.StringValue, pb.TokenInfo),
    "FindFileByPath": (pb.FindFileByPathRequest, pb.CloudDriveFile),
    "AddOfflineFiles": (pb.AddOfflineFileRequest, pb.FileOperationResult),
    "RemoveOfflineFiles": (pb.RemoveOfflineFilesRequest, pb.FileOperationResult),
    "ListOfflineFilesByPath": (pb.FileRequest, pb.OfflineFileListResult),
    "GetOfflineQuotaInfo": (pb.OfflineQuotaRequest, pb.OfflineQuotaInfo),
}

_NETWORK_CODES = {grpc.StatusCode.UNAVAILABLE, grpc.StatusCode.DEADLINE_EXCEEDED,
                  grpc.StatusCode.RESOURCE_EXHAUSTED, grpc.StatusCode.ABORTED,
                  grpc.StatusCode.CANCELLED}
_AUTH_CODES = {grpc.StatusCode.UNAUTHENTICATED, grpc.StatusCode.PERMISSION_DENIED}


def channel_target(address: str) -> tuple[str, bool]:
    """`http://host:port` → (`host:port`, 不加密)。设置层已经校验过形态。"""
    parts = urlsplit(address if "://" in address else "http://" + address)
    if not parts.hostname:
        raise DownloadError("config", "CloudDrive2 地址没填")
    port = parts.port or (443 if parts.scheme == "https" else 19798)
    host = parts.hostname if ":" not in parts.hostname else f"[{parts.hostname}]"
    return f"{host}:{port}", parts.scheme == "https"


def open_channel(address: str) -> grpc.Channel:
    target, secure = channel_target(address)
    return (grpc.secure_channel(target, grpc.ssl_channel_credentials())
            if secure else grpc.insecure_channel(target))


def answers(address: str, *, timeout: float = PROBE_TIMEOUT) -> bool:
    """不带令牌调 `GetSystemInfo`，正常应答才算这个地址上有 CloudDrive2。"""
    request_type, response_type = _METHODS["GetSystemInfo"]
    with open_channel(address) as channel:
        stub = channel.unary_unary(
            SERVICE + "GetSystemInfo", request_serializer=request_type.SerializeToString,
            response_deserializer=response_type.FromString)
        try:
            stub(request_type(), timeout=timeout)
        except grpc.RpcError:
            return False
    return True


def discover(addresses: tuple[str, ...] = LOCAL_ADDRESSES) -> str:
    """按顺序试，返回第一个应答的地址；都不应答时报错并原样列出试过的地址。"""
    for address in addresses:
        if answers(address):
            return address
    tried = "、".join(addresses)
    raise DownloadError("network", f"没有填 CloudDrive2 地址，本机 {tried} 都没有应答。"
                                   "确认 CloudDrive2 已启动，或在地址栏填上它的实际地址")


def _translate(error: grpc.RpcError, action: str) -> DownloadError:
    code = error.code() if hasattr(error, "code") else None
    details = (error.details() if hasattr(error, "details") else "") or ""
    if code in _NETWORK_CODES:
        return DownloadError("network", f"{action}时连不上 CloudDrive2：{details or code}")
    if code in _AUTH_CODES:
        return DownloadError("config", f"CloudDrive2 拒绝了这个 API 令牌（{action}）：{details or code}")
    if code == grpc.StatusCode.NOT_FOUND:
        return DownloadError("config", f"{action}：CloudDrive2 里没有这个路径")
    return DownloadError("rejected", f"{action}失败：{details or code}")


def split_remote(path: str) -> tuple[str, str]:
    """`/115/云下载` → (`/115`, `云下载`)。`FindFileByPath` 要父目录与名字分开给。"""
    clean = posixpath.normpath("/" + str(path or "").strip().replace("\\", "/").lstrip("/"))
    return posixpath.dirname(clean) or "/", posixpath.basename(clean)


@dataclass(frozen=True)
class Folder:
    path: str
    can_offline: bool
    cloud_name: str
    cloud_account: str


class CloudDriveClient:
    """要令牌的那六个方法的薄封装。"""

    def __init__(self, address: str, token: str, *, timeout: float = CALL_TIMEOUT):
        if not token:
            raise DownloadError("config", "还没有填 CloudDrive2 的 API 令牌")
        self.token = token
        self.timeout = timeout
        self.channel = open_channel(address)

    def close(self) -> None:
        self.channel.close()

    def __enter__(self) -> "CloudDriveClient":
        return self

    def __exit__(self, *_exc) -> None:
        self.close()

    def call(self, method: str, request, action: str):
        request_type, response_type = _METHODS[method]
        stub = self.channel.unary_unary(
            SERVICE + method, request_serializer=request_type.SerializeToString,
            response_deserializer=response_type.FromString)
        try:
            return stub(request, timeout=self.timeout,
                        metadata=(("authorization", f"Bearer {self.token}"),))
        except grpc.RpcError as error:
            raise _translate(error, action) from None

    # -- 读

    def token_info(self) -> pb.TokenInfo:
        return self.call("GetApiTokenInfo", pb.StringValue(value=self.token), "核对 API 令牌")

    def find(self, path: str, action: str = "查找目标目录") -> pb.CloudDriveFile | None:
        parent, name = split_remote(path)
        try:
            found = self.call("FindFileByPath", pb.FindFileByPathRequest(parentPath=parent, path=name),
                              action)
        except DownloadError as error:
            if error.failure == "config" and "没有这个路径" in error.detail:
                return None
            raise
        return found if found.fullPathName or found.name else None

    def folder(self, path: str) -> Folder:
        found = self.find(path)
        if found is None or not found.isDirectory:
            raise DownloadError("config", f"CloudDrive2 里没有 {path} 这个文件夹")
        return Folder(path, bool(found.canOfflineDownload), found.CloudAPI.name,
                      found.CloudAPI.userName)

    def quota(self, folder: Folder) -> pb.OfflineQuotaInfo:
        return self.call("GetOfflineQuotaInfo", pb.OfflineQuotaRequest(
            cloudName=folder.cloud_name, cloudAccountId=folder.cloud_account, path=folder.path),
            "查离线配额")

    def offline_files(self, path: str) -> list[pb.OfflineFile]:
        result = self.call("ListOfflineFilesByPath", pb.FileRequest(path=path, forceRefresh=True),
                           "查离线任务")
        return list(result.offlineFiles)

    # -- 写

    def add(self, magnet: str, path: str) -> None:
        result = self.call("AddOfflineFiles", pb.AddOfflineFileRequest(
            urls=magnet, toFolder=path, checkFolderAfterSecs=CHECK_FOLDER_AFTER_SECS),
            "提交离线任务")
        if not result.success:
            raise classify_remote_message(result.errorMessage)

    def remove(self, folder: Folder, info_hash: str) -> None:
        result = self.call("RemoveOfflineFiles", pb.RemoveOfflineFilesRequest(
            cloudName=folder.cloud_name, cloudAccountId=folder.cloud_account, deleteFiles=False,
            infoHashes=[info_hash], path=folder.path), "取消离线任务")
        if not result.success:
            raise DownloadError("rejected", f"CloudDrive2 没有取消这个任务：{result.errorMessage}")


def match_offline(files: list[pb.OfflineFile], info_hash: str) -> pb.OfflineFile | None:
    """按 infohash 对账。`infoHash` 为空时从原始链接里取，JavBoss 也是这样回退的。"""
    for item in files:
        candidate = (item.infoHash or "").strip().lower() or magnet_info_hash(item.url)
        if candidate == info_hash:
            return item
    return None


def offline_status(item: pb.OfflineFile | None) -> RemoteStatus:
    if item is None:
        return RemoteStatus(MISSING)
    progress = max(0.0, min(float(item.percendDone or 0.0) / 100.0, 1.0))
    if item.status == pb.OFFLINE_FINISHED:
        return RemoteStatus(DONE, item.fileId, item.name, 1.0)
    if item.status == pb.OFFLINE_ERROR:
        # 列表里的失败没有原文；拦截码只在提交那一下的 errorMessage 里出现。
        return RemoteStatus(ERROR, item.fileId, item.name, progress,
                            "115 报告离线失败，多半是资源无人做种或被拒")
    return RemoteStatus(RUNNING, item.fileId, item.name, progress)


class CloudDriveProvider:
    """`downloads.OfflineProvider` 的 115 实现。每次调用新开一条通道，用完就关。"""

    key = "115"

    def __init__(self, address: str, token: str):
        self.address = address
        self.token = token

    def client(self) -> CloudDriveClient:
        if not self.address:
            raise DownloadError("config", "还没有填 CloudDrive2 地址，先在设置页「检查」探测本机端口后保存")
        return CloudDriveClient(self.address, self.token)

    def submit(self, magnet: Magnet, target: str) -> RemoteStatus:
        with self.client() as client:
            folder = client.folder(target)
            if not folder.can_offline:
                raise DownloadError("config", f"{target} 所在的网盘不支持离线下载")
            existing = match_offline(client.offline_files(target), magnet.info_hash)
            if existing is not None:
                status = offline_status(existing)
                return RemoteStatus(status.state, status.remote_id, status.name, status.progress,
                                    status.message, adopted=True)
            try:
                quota = client.quota(folder)
            except DownloadError as error:
                if error.failure != "rejected":
                    raise
                quota = None  # 这一侧不支持查配额时照常提交，由提交接口自己拒。
            if quota is not None and quota.total > 0 and quota.left <= 0:
                raise DownloadError("quota", f"115 离线配额已用完（本月 {quota.used}/{quota.total}）")
            client.add(magnet.uri, target)
        return RemoteStatus(RUNNING, name=magnet.name)

    def status(self, task: DownloadTask) -> RemoteStatus:
        with self.client() as client:
            return offline_status(match_offline(client.offline_files(task.target), task.info_hash or ""))

    def landed(self, task: DownloadTask) -> bool:
        names = [name for name in (task.remote_name, task.display_name) if name]
        if not names:
            return False
        with self.client() as client:
            return any(client.find(f"{task.target.rstrip('/')}/{name}", "查目标目录里的文件")
                       is not None for name in names)

    def cancel(self, task: DownloadTask) -> None:
        with self.client() as client:
            client.remove(client.folder(task.target), task.info_hash or "")


def check(address: str, token: str, target: str, *,
          local_addresses: tuple[str, ...] = LOCAL_ADDRESSES) -> dict:
    """设置页的「检查」：令牌有没有离线权限、目标目录能不能离线、115 还剩多少配额。

    地址留空时先按 `local_addresses` 的顺序探测，报告的 `address` 是实际查的那个，页面把它
    填回表单，用户保存后才落盘。只读：不提交、不取消。令牌一关过不去时 `ok` 为假；之后的
    目录与配额各自报进 `problems`。
    """
    report: dict = {"ok": True, "address": address or discover(local_addresses), "permissions": [],
                    "missing": [], "root": "", "folder": None, "quota": None, "problems": []}
    try:
        _inspect(report, CloudDriveClient(report["address"], token), target)
    except DownloadError as error:
        report["ok"] = False
        report["problems"].append(error.detail)
    return report


def _inspect(report: dict, client: CloudDriveClient, target: str) -> None:
    with client:
        info = client.token_info()
        permissions = info.permissions
        report["root"] = info.rootDir
        for name, label in OFFLINE_PERMISSIONS.items():
            granted = bool(getattr(permissions, name))
            report["permissions"].append({"name": name, "label": label, "granted": granted})
            if not granted:
                report["missing"].append(label)
        if not target:
            report["problems"].append("还没有填 115 目标目录")
            return
        try:
            folder = client.folder(target)
        except DownloadError as error:
            report["problems"].append(error.detail)
            return
        report["folder"] = {"path": folder.path, "can_offline": folder.can_offline,
                            "cloud": folder.cloud_name}
        try:
            quota = client.quota(folder)
        except DownloadError as error:
            report["problems"].append(error.detail)
            return
        report["quota"] = {"total": quota.total, "used": quota.used, "left": quota.left}
