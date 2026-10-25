"""Web 请求的本机访问判断；配置与本地播放器共用。"""
from __future__ import annotations

import ipaddress
import os

from fastapi import Request

from . import distribution, tunnel


def managed_configuration() -> bool:
    """托盘或无桌面入口负责消费配置保存后的重载标记。"""
    return (distribution.standalone() or os.environ.get("PEACH_TRAY_MANAGED") == "1"
            or os.environ.get("PEACH_HEADLESS_MANAGED") == "1")


def tunnel_forwarded(request: Request) -> bool:
    """隧道转发请求按公网来源处理。"""
    return tunnel.from_edge(getattr(request.app.state, "tunnel", None), request.headers)


def _ip(value: str) -> ipaddress.IPv4Address | ipaddress.IPv6Address | None:
    try:
        return ipaddress.ip_address(value)
    except ValueError:
        return None


def _private_ip(value: str) -> bool:
    """回环或私有单播；链路本地、保留、未指定和组播都不算。"""
    peer = _ip(value)
    if peer is None:
        return False
    if peer.is_loopback:
        return True
    return bool(peer.is_private and not any((
        peer.is_link_local, peer.is_reserved, peer.is_unspecified, peer.is_multicast,
    )))


def _forwarded_ip(value: str) -> str | None:
    text = value.strip().strip('"')
    if text.startswith("["):
        end = text.find("]")
        text = text[1:end] if end > 1 else ""
    elif text.count(":") == 1:
        text = text.split(":", 1)[0]
    parsed = _ip(text)
    return str(parsed) if parsed is not None else None


def _has_forwarded_headers(headers) -> bool:
    return any(name.startswith("x-forwarded-") or name in {"forwarded", "cf-connecting-ip"}
               for name in headers)


def apply_trusted_proxy(request: Request) -> None:
    """无桌面部署只信任直接连进来的那一跳，不记录代理地址。

    这一跳是回环或私有地址时，采用它给出的协议、主机和客户端，并去掉转发头。
    客户端必须是另一个地址；看不出来就不改，配置检查仍会拒绝这些头。
    公网直连的转发头原样留下。
    """
    if os.environ.get("PEACH_HEADLESS_MANAGED") != "1" or tunnel_forwarded(request):
        return
    if request.client is None or not _private_ip(request.client.host):
        return
    if not _has_forwarded_headers(request.headers):
        return
    forwarded_for = request.headers.get("x-forwarded-for")
    proto = (request.headers.get("x-forwarded-proto") or "").split(",")[0].strip().lower()
    host = (request.headers.get("x-forwarded-host") or "").split(",")[0].strip()
    if not forwarded_for or proto not in {"http", "https"} or not host or any(char in host for char in " /\\@?#"):
        return
    client = None
    for part in reversed(forwarded_for.split(",")):
        parsed = _forwarded_ip(part)
        if parsed is None:
            return
        if _ip(parsed) != _ip(request.client.host):
            client = parsed
            break
    if client is None:
        return
    try:
        host.encode("ascii")
    except UnicodeError:
        return
    scope = request.scope
    scope["scheme"] = proto
    scope["client"] = (client, 0)
    headers = []
    replaced = False
    for name, value in scope["headers"]:
        lowered = name.lower()
        if lowered.startswith(b"x-forwarded-") or lowered == b"forwarded":
            continue
        if lowered == b"host":
            headers.append((b"host", host.encode("ascii")))
            replaced = True
            continue
        headers.append((name, value))
    if not replaced:
        headers.append((b"host", host.encode("ascii")))
    scope["headers"] = headers
    request.__dict__.pop("_headers", None)
    request.__dict__.pop("_url", None)


def local_client(request: Request) -> bool:
    """桌面限本机，Docker 允许本机与私有网络，拒绝未采纳的代理转发。"""
    if not request.client or tunnel_forwarded(request):
        return False
    server = request.scope.get("server")
    try:
        peer = ipaddress.ip_address(request.client.host)
        bound = ipaddress.ip_address(server[0]) if server else None
    except ValueError:
        bound = None
        try:
            peer = ipaddress.ip_address(request.client.host)
        except ValueError:
            return False
    if os.environ.get("PEACH_HEADLESS_MANAGED") == "1":
        if _has_forwarded_headers(request.headers):
            return False
        return _private_ip(request.client.host)
    if not peer.is_loopback and (peer != bound or peer.is_unspecified):
        return False
    if managed_configuration():
        name = request.app.state.settings.mdns_name.lower().removesuffix(".local")
        hosts = {"127.0.0.1", "localhost", "::1", f"{name}.local"}
        if bound and not bound.is_unspecified:
            hosts.add(str(bound))
        if (request.url.hostname or "").lower().rstrip(".") not in hosts:
            return False
    return True
