from __future__ import annotations

import sqlite3
import threading
from contextlib import contextmanager, nullcontext
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Mapping, Sequence

from .catalog_rules import is_jav_code, normalise_code_key, sql_is_local_extra
from .entities import normalize_entity_name
from .regions import infer_region

#: 当前线程是不是后台写入者，见 `in_background`。
_WRITER = threading.local()


def in_background(target):
    """把线程入口包成后台写入者：它提交的写入只让页面缓存「过期」，读者可以先拿旧值（ADR-0146）。

    没包的线程照旧按前台算：测试、请求处理与显式失效写完就要读到新值。
    """
    def run(*args, **kwargs):
        _WRITER.background = True
        return target(*args, **kwargs)
    return run


def writing_in_background() -> bool:
    return getattr(_WRITER, "background", False)


MEDIA_SCOPE_FUNCTION = "asset_in_configured_media_scope"


def media_scope_predicate(connection: sqlite3.Connection, alias: str = "a") -> str:
    """SQL predicate for the serving process's current media-root boundary.

    Ledger-only callers and isolated tests can hand us a plain connection without
    the UDF.  Those callers intentionally keep their historical unrestricted
    behaviour; serving connections always register the UDF in
    :meth:`LedgerDatabase.connect`.
    """
    try:
        connection.execute(
            f"SELECT {MEDIA_SCOPE_FUNCTION}(NULL,NULL)"
        ).fetchone()
    except sqlite3.OperationalError as error:
        if "no such function" not in str(error).lower():
            raise
        return "1"
    return f"{MEDIA_SCOPE_FUNCTION}({alias}.location,{alias}.path)"


def _normalise_media_scope_path(value: object) -> str:
    text = str(value).replace("/", "\\").casefold()
    prefix = "\\\\" if text.startswith("\\\\") else ""
    body = text[2:] if prefix else text
    while "\\\\" in body:
        body = body.replace("\\\\", "\\")
    return prefix + body


class LedgerDatabase:
    """Shared SQLite connection and transaction boundary for one Peach app."""

    def __init__(
        self,
        db_path: Path,
        *,
        media_roots: Mapping[str, Sequence[str]] | Sequence[str] | None = None,
    ):
        self.db_path = Path(db_path)
        self.write_lock = threading.Lock()
        self.after_commit = lambda: None
        self._sql_rules = (
            ('is_jav_code', 1, lru_cache(maxsize=32768)(is_jav_code)),
            ('normalise_code_key', 1, lru_cache(maxsize=32768)(normalise_code_key)),
            ('infer_region', 2, lru_cache(maxsize=32768)(infer_region)),
            ('peach_normalize', 1, lru_cache(maxsize=32768)(normalize_entity_name)),
        )
        # `None` keeps ledger-only callers and tests unrestricted. The serving
        # process passes the current settings; SQL surfaces then expose only
        # assets under those declared roots while leaving every old row intact.
        if media_roots is None:
            self.media_roots = None
        elif isinstance(media_roots, Mapping):
            self.media_roots = tuple(
                (str(location), _normalise_media_scope_path(root).rstrip("\\"))
                for location, roots in media_roots.items()
                for root in roots
                if str(root).strip()
            )
        else:
            # Ledger-only callers historically passed a flat list of local paths.
            self.media_roots = tuple(
                ("local", _normalise_media_scope_path(root).rstrip("\\"))
                for root in media_roots if str(root).strip()
            )

    def _location_path_in_configured_media_scope(self, location, path) -> int:
        roots = self._configured_media_root_pairs()
        if roots is None or not roots:
            return 1
        if path is None:
            return 0
        location = str(location or "")
        candidate = _normalise_media_scope_path(path)
        return int(any(
            location == root_location
            and (candidate == root or candidate.startswith(root + "\\"))
            for root_location, root in roots
        ))

    def _configured_media_root_pairs(self) -> tuple[tuple[str, str], ...] | None:
        """Normalise the current scope after construction or a test override."""
        if self.media_roots is None:
            return None
        roots: list[tuple[str, str]] = []
        for item in self.media_roots:
            if isinstance(item, str):
                location, root = "local", item
            else:
                location, root = str(item[0]), item[1]
            if str(root).strip():
                roots.append((str(location), _normalise_media_scope_path(root).rstrip("\\")))
        return tuple(roots)

    def connect(self, *, write: bool = False, timeout: float = 30) -> sqlite3.Connection:
        target = (
            str(self.db_path)
            if write
            else self.db_path.resolve().as_uri() + "?mode=ro"
        )
        connection = sqlite3.connect(
            target, timeout=timeout, check_same_thread=False, uri=not write,
        )
        connection.row_factory = sqlite3.Row
        scope = self._configured_media_root_pairs()
        roots = () if scope is None else tuple(root for _location, root in scope)
        connection.create_function("peach_is_local_extra", 2,
            lambda name, path: sql_is_local_extra(name, path, roots), deterministic=True)
        # 产地推断要和 Python 侧同一份实现。SQL 里重写一遍前缀名单的话，账本筛出来的
        # 那批片和页面上标着的产地会从某一次改名单开始悄悄分家。
        # 标签归一化必须两边同一份。SQLite 自带的 lower() 只认 ASCII：西里尔、
        # 罗马数字 Ⅱ 这类字符它原样放过，而写入时用的是 Python 的 casefold，
        # 于是「隐藏这个标签」写进去的值和查询时算出的值对不上，隐藏静默失效。
        for name, arity, function in self._sql_rules:
            connection.create_function(name, arity, function, deterministic=True)
        connection.create_function(
            MEDIA_SCOPE_FUNCTION,
            2,
            self._location_path_in_configured_media_scope,
            deterministic=True,
        )
        return connection

    def media_roots_for(self, location: str) -> tuple[str, ...] | None:
        """Configured roots for one location, or ``None`` when unrestricted."""
        roots = self._configured_media_root_pairs()
        if roots is None:
            return None
        return tuple(root for item_location, root in roots
                     if item_location == str(location))

    @contextmanager
    def read_connection(self):
        connection = self.connect()
        try:
            yield connection
        finally:
            connection.close()

    @contextmanager
    def write_transaction(self, *, notify: bool = True, timeout: float | None = None):
        """写事务。`notify=False` 的写入不触发 `after_commit`。

        `after_commit` 在服务里是清聚合缓存。任务中心的心跳与进度每两秒写一行
        `task_run`，它和馆藏数据没有任何关系；跟着清一次缓存，等于让首页、统计和
        复核页在每个长任务运行期间全程失去缓存。

        `timeout` 给可以放弃的写入用：进程内的写锁与 SQLite 的写锁各最多等这么久，
        等不到抛 `sqlite3.OperationalError`，与 SQLite 自己等超时是同一种异常。不传则
        进程内一直排队、SQLite 等 30 秒。
        """
        from .task_control import operation
        with operation() if notify else nullcontext():
            with self._write_transaction(notify=notify, timeout=timeout) as connection:
                yield connection

    @contextmanager
    def _write_transaction(self, *, notify: bool, timeout: float | None):
        if not self.write_lock.acquire(timeout=-1 if timeout is None else timeout):
            raise sqlite3.OperationalError("database is locked")
        try:
            connection = (self.connect(write=True) if timeout is None
                          else self.connect(write=True, timeout=timeout))
            try:
                yield connection
            except BaseException:
                connection.rollback()
                raise
            else:
                connection.commit()
                if notify:
                    self.after_commit()
            finally:
                connection.close()
        finally:
            self.write_lock.release()


@dataclass(frozen=True)
class MediaAsset:
    id: int
    path: str | None
    snapshot_path: str | None
    location: str | None = None
    name: str | None = None
    duration: float | None = None
    size: int | None = None


class LedgerRepository:
    def __init__(self, database: Path | LedgerDatabase):
        self.database = (
            database if isinstance(database, LedgerDatabase) else LedgerDatabase(database)
        )
        self.db_path = self.database.db_path

    def media_asset(self, asset_id: int) -> MediaAsset | None:
        with self.database.read_connection() as connection:
            row = connection.execute(
                "SELECT id,path,snapshot_path,location,name,duration,size "
                "FROM asset WHERE id=? AND " + media_scope_predicate(connection, "asset"),
                (asset_id,),
            ).fetchone()
        if row is None:
            return None
        return MediaAsset(
            row["id"],
            row["path"],
            row["snapshot_path"],
            row["location"],
            row["name"],
            row["duration"],
            row["size"],
        )
