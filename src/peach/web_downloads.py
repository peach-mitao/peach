"""云下载的 Web 一侧：装配服务、任务列表与提交取消、设置页的保存与检查。

任务列表与提交挂在 `web_router` 的 `/api/downloads*` 下；设置页那几条（含凭据）在
`routes_configuration`，只放行本机连接。凭据值不出现在任何响应里，只报存没存过。
"""
from __future__ import annotations

from pathlib import Path

from .downloads import (
    CLOUDDRIVE_CREDENTIAL, MAX_WAIT_HOURS, PIKPAK_CREDENTIAL, PROVIDER_LABELS, DownloadError,
    DownloadService, Landing, OfflineProvider, clean_address, normalise_target,
    submit_offline_download,
)
from .follow_secrets import CredentialError, CredentialStore
from .repository import LedgerDatabase


def _values(credentials: CredentialStore, provider: str) -> dict:
    try:
        credential = credentials.load(provider)
    except CredentialError as error:
        raise DownloadError("config", f"本机凭据文件读不出来，请在设置页重新填写：{error}") from None
    return dict(credential.values) if credential else {}


def build_download_service(*, database: LedgerDatabase, state_root: Path,
                           credentials: CredentialStore, push_discovery,
                           available: bool) -> DownloadService:
    """按 provider 键现取客户端，地址与凭据在设置页改了立刻生效。"""
    from .downloads_clouddrive import CloudDriveProvider
    from .downloads_pikpak import PikPakProvider

    holder: dict[str, DownloadService] = {}

    def providers(key: str) -> OfflineProvider:
        if key == "115":
            token = _values(credentials, CLOUDDRIVE_CREDENTIAL).get("token", "")
            return CloudDriveProvider(holder["service"].config.clouddrive_address, token)
        if key == "pikpak":
            return PikPakProvider(lambda: _values(credentials, PIKPAK_CREDENTIAL),
                                  persist=lambda values: credentials.save(PIKPAK_CREDENTIAL, values))
        raise DownloadError("config", f"不认识的云下载渠道：{key}")

    service = DownloadService(database=database, state_root=state_root, credentials=credentials,
                              providers=providers, landing=Landing(push_discovery),
                              available=available)
    holder["service"] = service
    return service


def _service(contract) -> DownloadService:
    service = getattr(contract, "downloads", None)
    if service is None:
        raise ValueError("云下载没有启用")
    return service


# ---------------------------------------------------------------- 任务列表与提交


def q_downloads(contract, args) -> dict:
    try:
        limit = int(args.get("limit") or 100)
    except (TypeError, ValueError):
        limit = 100
    return _service(contract).snapshot(limit)


def w_download_submit(contract, body) -> dict:
    if not isinstance(body, dict):
        raise ValueError("请求体必须是一个对象")
    return submit_offline_download(
        _service(contract), magnet=str(body.get("magnet") or ""),
        provider=str(body.get("provider") or ""), target=body.get("target") or None,
        code=body.get("code"), title=body.get("title"), origin=body.get("origin") or "paste")


def w_download_cancel(contract, body) -> dict:
    if not isinstance(body, dict) or not str(body.get("id") or "").isdigit():
        raise ValueError("缺少任务编号")
    task = _service(contract).cancel(int(body["id"]))
    return {"ok": True, "task": task.payload()}


# ---------------------------------------------------------------- 设置页


def settings_payload(service: DownloadService, declared_roots) -> dict:
    """设置页那一块的形状。读接口和每条写接口都回这一份，页面整块替换本地状态。"""
    from .downloads_pikpak import account
    credentials = service.credentials
    try:
        pikpak = account(_values(credentials, PIKPAK_CREDENTIAL))
    except DownloadError:
        pikpak = account(None)
    return {
        "available": service.available,
        "config": service.config.payload(),
        "token_set": "token" in credentials.describe(CLOUDDRIVE_CREDENTIAL)["fields"],
        "pikpak": pikpak,
        "pikpak_roots": list(declared_roots.get("pikpak", ())),
        "providers": [{"key": key, "label": label} for key, label in PROVIDER_LABELS.items()],
        "max_wait_hours": MAX_WAIT_HOURS,
    }


def save_settings(service: DownloadService, body: dict, declared_roots) -> dict:
    """保存地址、目录与等待上限。令牌留空表示不改，`clear_token` 才撤掉。"""
    if not isinstance(body, dict):
        raise ValueError("设置必须是一个对象")
    token = str(body.get("token") or "").strip()
    service.save_settings(body, declared_roots)
    if token:
        service.credentials.save(CLOUDDRIVE_CREDENTIAL, {"token": token})
    elif body.get("clear_token"):
        service.credentials.clear(CLOUDDRIVE_CREDENTIAL)
    return settings_payload(service, declared_roots)


def check_clouddrive(service: DownloadService, body: dict) -> dict:
    """「检查」按页面上此刻填的值查，没填的取已保存的。只读，不提交也不取消。"""
    from .downloads_clouddrive import check
    body = body if isinstance(body, dict) else {}
    address = clean_address(body.get("clouddrive_address") or service.config.clouddrive_address)
    token = str(body.get("token") or "").strip() or _values(
        service.credentials, CLOUDDRIVE_CREDENTIAL).get("token", "")
    raw_target = str(body.get("target") or service.config.targets.get("115", "")).strip()
    target = normalise_target(raw_target) if raw_target else ""
    try:
        return check(address, token, target)
    except DownloadError as error:
        return {"ok": False, "permissions": [], "missing": [], "root": "", "folder": None,
                "quota": None, "problems": [error.detail]}


def pikpak_login(service: DownloadService, body: dict, declared_roots, *, transport=None) -> dict:
    """登录成功回设置块；要人机验证时回验证页地址，`ok` 为假。"""
    from .downloads_pikpak import CaptchaRequired, login
    body = body if isinstance(body, dict) else {}
    credentials = service.credentials
    try:
        login(lambda: _values(credentials, PIKPAK_CREDENTIAL), str(body.get("username") or ""),
              str(body.get("password") or ""), remember=bool(body.get("remember")),
              persist=lambda values: credentials.save(PIKPAK_CREDENTIAL, values),
              transport=transport)
    except CaptchaRequired as error:
        return {"ok": False, "captcha_url": error.url, "message": error.detail,
                "settings": settings_payload(service, declared_roots)}
    except DownloadError as error:
        raise ValueError(error.detail) from None
    service.wake()
    return {"ok": True, "settings": settings_payload(service, declared_roots)}


def pikpak_logout(service: DownloadService, declared_roots) -> dict:
    service.credentials.clear(PIKPAK_CREDENTIAL)
    return settings_payload(service, declared_roots)
