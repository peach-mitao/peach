"""可选的单资产直链映射，不修改账本里的媒体路径。"""
from __future__ import annotations

import ipaddress
import json
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

import httpx

from .http import public_https_url, resolves_publicly
from .strm import validate_url

FILENAME = 'direct-playback.json'
MAX_BYTES = 1024 * 1024


def mapped_url(root: Path, asset) -> str | None:
    """读取用户复核的资产 ID、原路径和 QMediaSync 地址。"""
    try:
        with (root / FILENAME).open('rb') as handle:
            raw = handle.read(MAX_BYTES + 1)
        if len(raw) > MAX_BYTES:
            return None
        entries = json.loads(raw).get('assets', {})
        row = entries.get(str(asset.id), {})
        if row.get('path') != str(asset.path) or row.get('location') != asset.location:
            return None
        url = row.get('url', '')
        parsed = urlsplit(url)
        ip = ipaddress.ip_address(parsed.hostname or '')
        query = parse_qs(parsed.query)
        if (parsed.scheme not in {'http', 'https'} or not ip.is_private
                or parsed.username or parsed.password or parsed.fragment
                or parsed.port in (None, 0)
                or not (parsed.path == '/115/newurl' or parsed.path.startswith('/115/url/'))
                or len(query.get('pickcode', [])) != 1 or len(query.get('userid', [])) != 1):
            return None
        return url
    except (OSError, ValueError, TypeError, AttributeError):
        return None


def resolve(url: str, user_agent: str) -> str | None:
    """只接受 QMediaSync 的公网 HTTPS 跳转，不读取视频内容。"""
    try:
        with httpx.Client(trust_env=False, follow_redirects=False, timeout=8) as client:
            with client.stream('GET', url, headers={'User-Agent': user_agent}) as response:
                if response.status_code != 302:
                    return None
                target = response.headers.get('location', '')
        validate_url(target)
        if not public_https_url(target) or not resolves_publicly(urlsplit(target).hostname or ''):
            return None
        return target
    except (httpx.HTTPError, ValueError):
        return None
