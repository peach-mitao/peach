"""qBittorrent 本地下载：通过 Web API v2 提交并跟踪磁力任务。

Peach 与 qBittorrent 可以在不同机器。这里只负责提交与查询，文件落在下载器那台
机器上；下载完成后由下载对账的落地流程按「下载器保存目录 → 媒体库目录」的映射
登记进账本。凭据只存本机 `CredentialStore`，不进 URL、日志与 ledger。

状态口径与云端 provider 一致：在跑、完成、失败、列表里找不到。qB 的完成态包括
`uploading`、`stalledUP` 等做种状态；`moving` 仍算在跑，等文件真正落到保存目录。
"""
from __future__ import annotations

import httpx

from .downloads import (
    DONE, ERROR, MISSING, RUNNING, DownloadError, DownloadTask, Magnet, RemoteStatus,
    clean_address, normalise_local_target,
)

#: 单次 HTTP 调用的上限。qB 在局域网内通常几十毫秒返回。
CALL_TIMEOUT = 15.0
#: 完成态：文件已经下完，之后只是做种或校验。
COMPLETED_STATES = frozenset({
    "uploading", "stalledUP", "queuedUP", "pausedUP", "forcedUP", "checkingUP",
})
#: 失败态：qB 自己报告的错误。
FAILED_STATES = frozenset({"error", "missingFiles"})


def _status(item: dict | None) -> RemoteStatus:
    """把 `torrents/info` 的一行翻成统一状态。"""
    if not item:
        return RemoteStatus(MISSING)
    info_hash = str(item.get("hash") or "").lower()
    name = str(item.get("name") or "")
    try:
        progress = max(0.0, min(float(item.get("progress") or 0.0), 1.0))
    except (TypeError, ValueError):
        progress = 0.0
    state = str(item.get("state") or "")
    if state in FAILED_STATES:
        return RemoteStatus(ERROR, info_hash, name, progress, f"qBittorrent 报告任务失败（{state}）")
    if progress >= 1.0 or state in COMPLETED_STATES:
        return RemoteStatus(DONE, info_hash, name, 1.0)
    return RemoteStatus(RUNNING, info_hash, name, progress)


class QbittorrentClient:
    """带登录 Cookie 的 qB Web API v2 客户端。每次操作新建连接，用完就关。"""

    def __init__(self, address: str, username: str, password: str, *,
                 transport: httpx.BaseTransport | None = None,
                 timeout: float = CALL_TIMEOUT):
        try:
            self.address = clean_address(address, "qBittorrent")
        except ValueError as error:
            raise DownloadError("config", str(error)) from None
        if not self.address:
            raise DownloadError("config", "还没有填写 qBittorrent 地址")
        if not username or not password:
            raise DownloadError("config", "还没有填写 qBittorrent 用户名和密码")
        self.username, self.password = username, password
        self.transport, self.timeout = transport, timeout
        self._http: httpx.Client | None = None

    def __enter__(self) -> "QbittorrentClient":
        self._http = httpx.Client(
            base_url=self.address, transport=self.transport, timeout=self.timeout,
            follow_redirects=False,
            headers={"Referer": self.address, "Origin": self.address})
        try:
            self._login()
        except BaseException:
            self._http.close()
            self._http = None
            raise
        return self

    def __exit__(self, *_exc) -> None:
        if self._http is not None:
            self._http.close()
            self._http = None

    @property
    def http(self) -> httpx.Client:
        if self._http is None:
            raise RuntimeError("qBittorrent 客户端尚未打开")
        return self._http

    def _request(self, method: str, path: str, *, action: str, **kwargs) -> httpx.Response:
        try:
            response = self.http.request(method, path, **kwargs)
        except httpx.HTTPError as error:
            raise DownloadError("network", f"{action}时连接 qBittorrent 失败：{error}") from None
        if response.status_code == 403:
            raise DownloadError("config", f"{action}失败：qBittorrent 拒绝请求，请检查登录状态")
        if response.status_code == 404:
            raise DownloadError("config", f"{action}失败：qBittorrent Web API 不存在，请确认地址和端口")
        if response.status_code >= 500:
            raise DownloadError("network", f"{action}失败：qBittorrent 返回 HTTP {response.status_code}")
        if response.status_code >= 400:
            detail = response.text.strip()[:200]
            raise DownloadError("rejected", f"{action}失败：HTTP {response.status_code} {detail}".strip())
        return response

    def _json(self, response: httpx.Response, action: str):
        try:
            return response.json()
        except ValueError:
            raise DownloadError("config", f"{action}失败：qBittorrent 返回了无法解析的数据") from None

    def _login(self) -> None:
        response = self._request(
            "POST", "/api/v2/auth/login", action="登录",
            data={"username": self.username, "password": self.password})
        if response.text.strip().casefold().rstrip(".") != "ok":
            raise DownloadError("config", "qBittorrent 登录失败，请检查用户名和密码")

    def version(self) -> str:
        response = self._request("GET", "/api/v2/app/version", action="读取版本")
        return response.text.strip()

    def webapi_version(self) -> str:
        response = self._request(
            "GET", "/api/v2/app/webapiVersion", action="读取 WebAPI 版本")
        return response.text.strip()

    def preferences(self) -> dict:
        response = self._request("GET", "/api/v2/app/preferences", action="读取设置")
        data = self._json(response, "读取 qBittorrent 设置")
        return data if isinstance(data, dict) else {}

    def torrent(self, info_hash: str) -> dict | None:
        response = self._request(
            "GET", "/api/v2/torrents/info", action="读取任务",
            params={"hashes": info_hash})
        rows = self._json(response, "读取 qBittorrent 任务")
        return rows[0] if isinstance(rows, list) and rows else None

    def add(self, magnet: Magnet, target: str) -> None:
        response = self._request(
            "POST", "/api/v2/torrents/add", action="提交任务",
            data={
                "urls": magnet.uri, "savepath": target, "autoTMM": "false",
                "tags": "peach", "paused": "false", "stopped": "false",
                "contentLayout": "Original",
            })
        body = response.text.strip()
        if body.casefold().startswith("fails"):
            raise DownloadError("rejected", "qBittorrent 没有接受这个磁力，请检查资源或下载目录权限")

    def delete(self, info_hash: str) -> None:
        self._request(
            "POST", "/api/v2/torrents/delete", action="取消任务",
            data={"hashes": info_hash, "deleteFiles": "false"})


class QbittorrentProvider:
    """`downloads.OfflineProvider` 的 qBittorrent 实现。"""

    key = "qbittorrent"
    #: qB 完成并清理种子后列表里就没有了，落地判定以目标目录里的文件为准。
    completion_by_file = True

    def __init__(self, address: str, username: str, password: str, *,
                 transport: httpx.BaseTransport | None = None):
        self.address, self.username, self.password = address, username, password
        self.transport = transport

    def client(self) -> QbittorrentClient:
        return QbittorrentClient(self.address, self.username, self.password,
                                 transport=self.transport)

    def submit(self, magnet: Magnet, target: str) -> RemoteStatus:
        try:
            target = normalise_local_target(target)
        except ValueError as error:
            raise DownloadError("config", str(error)) from None
        with self.client() as client:
            existing = client.torrent(magnet.info_hash)
            if existing is not None:
                status = _status(existing)
                if status.state != ERROR:
                    return RemoteStatus(status.state, status.remote_id, status.name,
                                        status.progress, adopted=True)
                # qB 会保留失败任务；同一个 infohash 再提交前先清掉旧行。
                client.delete(magnet.info_hash)
            client.add(magnet, target)
        return RemoteStatus(RUNNING, name=magnet.name)

    def status(self, task: DownloadTask) -> RemoteStatus:
        info_hash = task.info_hash or task.remote_id or ""
        if not info_hash:
            return RemoteStatus(MISSING)
        with self.client() as client:
            return _status(client.torrent(info_hash))

    def landed(self, task: DownloadTask) -> bool:
        return self.status(task).state == DONE

    def cancel(self, task: DownloadTask) -> None:
        info_hash = task.info_hash or task.remote_id or ""
        if not info_hash:
            raise DownloadError("config", "这个任务没有 infohash，无法取消")
        with self.client() as client:
            client.delete(info_hash)


def check(address: str, username: str, password: str, *,
          transport: httpx.BaseTransport | None = None) -> dict:
    """设置页「检查」：登录、读版本和默认保存目录，不提交任务。"""
    report = {"ok": False, "address": str(address or "").strip(), "version": "",
              "webapi_version": "", "save_path": "", "problems": []}
    if not report["address"]:
        report["problems"].append("还没有填写 qBittorrent 地址")
        return report
    if not username or not password:
        report["problems"].append("还没有填写 qBittorrent 用户名和密码")
        return report
    try:
        with QbittorrentClient(address, username, password, transport=transport) as client:
            report["address"] = client.address
            report["version"] = client.version()
            report["webapi_version"] = client.webapi_version()
            try:
                report["save_path"] = str(client.preferences().get("save_path") or "")
            except DownloadError as error:
                report["problems"].append(f"默认保存目录未取得：{error.detail}")
            report["ok"] = True
    except DownloadError as error:
        report["problems"].append(error.detail)
    return report
