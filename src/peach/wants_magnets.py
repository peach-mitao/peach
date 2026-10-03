"""JAV 入库的只读磁链查询：串行请求、有限缓存、来源限速与失败冷却。"""
from __future__ import annotations

from collections import OrderedDict
from functools import lru_cache
from pathlib import Path
from threading import Lock
import time

from .sources import FailureReason, JavDBSource, Session, SourceFailure


def fetch(root: Path, code: str) -> dict:
    from .jav_cover_fetch import HostLimitedTransport
    from .scraping_access import SourceTransport

    transport = HostLimitedTransport(
        SourceTransport(root, max_requests=6, max_bytes=12 * 1024 * 1024, max_seconds=45), 3)
    try:
        return JavDBSource().resources(code, session=Session(transport, time.monotonic() + 45))
    finally:
        transport.close()


class MagnetSearch:
    """一台服务同时只查一部；缓存最多 128 部，失败一分钟后可重试。"""

    def __init__(self, root: Path, *, fetcher=fetch, clock=time.monotonic, sleeper=time.sleep):
        self.root, self.fetcher, self.clock, self.sleeper = root, fetcher, clock, sleeper
        self.lock = Lock()
        self.cache: OrderedDict[str, tuple[float, dict]] = OrderedDict()
        self.next_request = 0.0

    def query(self, code: str) -> dict:
        # 等锁的请求不积压为无限队列；前端把忙态留在卡片上，稍后再取。
        if not self.lock.acquire(timeout=0.05):
            return {"ok": True, "state": "busy", "items": [], "error": "", "checked_at": None}
        try:
            cached = self.cache.get(code)
            if cached and cached[0] > self.clock():
                self.cache.move_to_end(code)
                return cached[1]
            delay = self.next_request - self.clock()
            if delay > 0:
                self.sleeper(delay)
            result = {"ok": True, "state": "ready", "items": [], "warnings": [], "error": "",
                      "checked_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}
            try:
                result.update(self.fetcher(self.root, code))
            except SourceFailure as error:
                if error.reason != FailureReason.NOT_FOUND:
                    result.update(state="error", error=str(error))
            except Exception:  # 来源异常只报告查询失败，不泄露请求或凭据
                result.update(state="error", error="JavDB 磁链未取得，请稍后重试或检查来源连接。")
            self.next_request = self.clock() + 3
            self.cache[code] = (self.clock() + 60, result)
            self.cache.move_to_end(code)
            while len(self.cache) > 128:
                self.cache.popitem(last=False)
            return result
        finally:
            self.lock.release()


_FACTORY_LOCK = Lock()


@lru_cache(maxsize=4)
def _search_for(root: Path) -> MagnetSearch:
    return MagnetSearch(root)


def search_for(root: Path) -> MagnetSearch:
    # lru_cache 允许首次并发调用重复构造；工厂锁让所有卡片共用同一把查询锁。
    with _FACTORY_LOCK:
        return _search_for(Path(root).resolve())
