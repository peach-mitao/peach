"""Peach 数据目录的占用统计、缓存清理与整体迁移。

数据目录随馆藏增长：数据库与它的备份、封面头像、预览图、播放缓存，几万部片子就是几十 GB。
Windows 安装版默认把它放在 `%LOCALAPPDATA%`，也就是系统盘。设置页的「存储空间」由这里供数：

- **占用统计**：整棵目录走一遍，按类别累计字节，结果存进 `state/storage-usage.json`。
  几十 GB 的小文件要走一两分钟，所以在后台线程里跑，页面轮询。
- **清理**：只清能在本机自动重建、或者有保留规则兜底的几类：播放缓存、缩略图、旧数据库备份、
  已归档日志。预览图要重读媒体、封面头像要重新联网，只统计不清理。
- **迁移**：服务端只校验并写下请求；托盘停下服务、退出，交给助手进程（`apply`）整体搬家。
  同卷直接改名，跨卷复制后逐项核对再删原目录。账本里指向数据目录的绝对路径
  （`PATH_COLUMNS`）一起改写；默认落点与原目录各留一份 `state/data-root.txt` 指向新位置，
  开机自启与桌面图标按新位置重写。任何一步失败都退回原目录，原目录在核对通过前不动。

迁移只给 Windows 安装版：托盘、助手与快捷方式这三样只有那里齐全。源码部署和容器由
`PEACH_DATA_ROOT` 决定位置，手动移动目录后改它即可。
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import timedelta
import json
import os
from pathlib import Path, PureWindowsPath
import re
import shutil
import sqlite3
import subprocess
import sys
import threading
import time
from typing import Callable
import uuid

from filelock import FileLock

from . import distribution, ledger_backups, settings_file
from .fsutil import atomic_write_text

USAGE_NAME = "storage-usage.json"
REQUEST_NAME = "data-relocation-request.json"
RESULT_NAME = "data-relocation.json"
#: 托盘拉起迁移助手用的参数，`scripts/build_app_entry.py` 按它分发。
HELPER_FLAG = "--relocate-data"
#: 请求写下后托盘要在这段时间里接手，过期的请求作废，避免几天后重启时突然搬家。
REQUEST_TTL = 120
#: 跨卷迁移时目标磁盘至少要多出的余量：迁移期间日志、锁文件和数据库日志还会再写一些。
SPACE_MARGIN = 1 << 30
#: 账本里保存数据目录内绝对路径的列。迁移后按新位置改写，其余路径都由目录键现算。
PATH_COLUMNS = (("asset", "snapshot_path"), ("follow_item", "evidence_path"))
#: 整片转码缓存；同目录的 `.mp4hdr` 是重建的文件头，生成要重扫原片，不在清理范围。
_TRANSCODE = re.compile(r"^\d+-.+\.mp4$")
_ROTATED_LOG = re.compile(r"^(?:.+\.until-\d{8}\.log|crash-\d+\.log)$")
#: 账本目录里归「数据库备份」的文件：`ledger.pre-*.db` 和它的 `-wal`／`-shm`。
_BACKUP_FILE = re.compile(r"^ledger\.pre-.+\.db(?:-wal|-shm)?$")


def backup_directories(config) -> tuple[Path, ...]:
    """一份 Peach 数据目录里放账本备份的全部目录：账本目录在前。"""
    return (config.directory("database"), ledger_backups.organize_dir(config.directory("generated")))


@dataclass(frozen=True)
class Category:
    key: str
    label: str
    description: str
    cleanable: bool = False


#: 说明只写清理会带来什么；不能清理的几类只列名字和读数。
CATEGORIES = (
    Category("database", "数据库", ""),
    Category("backups", "数据库备份", "每处保留最近一份", True),
    Category("playback", "播放缓存", "再次播放时重新生成", True),
    Category("thumbnails", "缩略图", "浏览时重新生成", True),
    Category("previews", "预览图", ""),
    Category("downloads", "封面与网络资料", ""),
    Category("sources", "导入资料", ""),
    Category("logs", "日志", "只清理已归档的日志与崩溃记录", True),
    Category("other", "其他", ""),
)
CATEGORY_KEYS = tuple(category.key for category in CATEGORIES)
CLEANABLE = frozenset(category.key for category in CATEGORIES if category.cleanable)


def _key(path: Path) -> str:
    return os.path.normcase(os.path.abspath(path))


def _roots(config) -> dict[str, str]:
    """数据目录下各子目录归哪一类；没有列名的按上一级归类，最外层归「其他」。"""
    from .previews import cover_thumb_root, entity_thumb_root
    generated = config.directory("generated")
    pairs = [
        (config.directory("database"), "database"),
        (generated / ledger_backups.ORGANIZE_DIRNAME, "backups"),
        (generated / "transcodes", "playback"),
        (generated / "stream-segments", "playback"),
        (cover_thumb_root(generated / "covers"), "thumbnails"),
        (entity_thumb_root(generated / "avatars"), "thumbnails"),
        (generated / "snapshots", "previews"),
        (generated / "posters", "previews"),
        (generated / "timeline", "previews"),
        (generated / "photo-thumbs", "previews"),
        (generated / "covers", "downloads"),
        (generated / "avatars", "downloads"),
        (generated / "logos", "downloads"),
        (generated / "follow-assets", "downloads"),
        (generated / "sample-cache", "downloads"),
        (generated / "provider-cache", "downloads"),
        (config.directory("sources"), "sources"),
        (config.directory("logs"), "logs"),
    ]
    return {_key(path): category for path, category in pairs}


def _reclaimable(category: str, path: Path, parent_name: str) -> bool:
    if category == "playback":
        return parent_name != "transcodes" or bool(_TRANSCODE.match(path.name))
    if category == "thumbnails":
        return True
    if category == "logs":
        return bool(_ROTATED_LOG.match(path.name))
    return False


def measure(config, *, should_stop: Callable[[], bool] = lambda: False) -> dict:
    """走一遍数据目录，按类别统计文件数、字节与可清理字节。链接不跟随。"""
    root = config.data_root
    roots = _roots(config)
    database = _key(config.directory("database"))
    totals = {key: {"bytes": 0, "files": 0, "reclaimable": 0} for key in CATEGORY_KEYS}
    stack = [(root, "other")]
    while stack:
        if should_stop():
            raise InterruptedError("统计已停止")
        folder, inherited = stack.pop()
        try:
            entries = list(os.scandir(folder))
        except OSError:
            continue
        in_database = _key(folder) == database
        for entry in entries:
            try:
                if entry.is_dir(follow_symlinks=False):
                    stack.append((Path(entry.path), roots.get(_key(Path(entry.path)), inherited)))
                    continue
                size = entry.stat(follow_symlinks=False).st_size
            except OSError:
                continue
            category = inherited
            if in_database and _BACKUP_FILE.match(entry.name):
                category = "backups"
            bucket = totals[category]
            bucket["bytes"] += size
            bucket["files"] += 1
            if _reclaimable(category, Path(entry.path), Path(folder).name):
                bucket["reclaimable"] += size
    live = config.directory("database") / "ledger.db"
    totals["backups"]["reclaimable"] = sum(
        _backup_plan(live, directory).removable_bytes
        for directory in backup_directories(config))
    return {
        "root": str(root.resolve()), "measured_at": time.time(),
        "total_bytes": sum(item["bytes"] for item in totals.values()),
        "total_files": sum(item["files"] for item in totals.values()),
        "categories": totals,
    }


def _backup_plan(live: Path, directory: Path, *, apply: bool = False) -> ledger_backups.BackupPlan:
    """手动清理每处只留最近一份，不看备份年龄；当前账本校验不过时一份都不删。"""
    return ledger_backups.prune(live, apply=apply, keep_recent=1, min_age=timedelta(0), directory=directory)


def _remove(path: Path) -> tuple[int, int, int]:
    """删一个文件或整个目录，返回 (删掉的文件数, 字节, 删不掉的文件数)。"""
    removed = size = failed = 0
    if path.is_dir() and not path.is_symlink():
        for folder, _dirs, files in os.walk(path, topdown=False):
            for name in files:
                file = Path(folder) / name
                try:
                    length = file.stat().st_size
                    file.unlink()
                except OSError:
                    failed += 1
                    continue
                removed += 1
                size += length
            try:
                Path(folder).rmdir()
            except OSError:
                pass
        return removed, size, failed
    try:
        length = path.stat().st_size
        path.unlink()
    except OSError:
        return 0, 0, 1
    return 1, length, 0


def clean(config, category: str) -> dict:
    """清理一类可重建的产物，返回删掉的文件数、字节和删不掉的数量。"""
    if category not in CLEANABLE:
        raise ValueError("这一类不能在这里清理")
    generated = config.directory("generated")
    targets: list[Path] = []
    if category == "backups":
        live = config.directory("database") / "ledger.db"
        removed = size = 0
        for directory in backup_directories(config):
            decided = _backup_plan(live, directory, apply=True)
            if decided.refused:
                raise ValueError(f"数据库备份未清理：{decided.refused}")
            removed += len(decided.remove) + len(decided.orphans)
            size += decided.removable_bytes
        return {"files": removed, "bytes": size, "failed": 0}
    if category == "playback":
        transcodes, segments = generated / "transcodes", generated / "stream-segments"
        if transcodes.is_dir():
            targets += [path for path in transcodes.iterdir() if path.is_file() and _TRANSCODE.match(path.name)]
        if segments.is_dir():
            targets += list(segments.iterdir())
    elif category == "thumbnails":
        from .previews import cover_thumb_root, entity_thumb_root
        for folder in (cover_thumb_root(generated / "covers"), entity_thumb_root(generated / "avatars")):
            if folder.is_dir():
                targets += list(folder.iterdir())
    elif category == "logs":
        logs = config.directory("logs")
        if logs.is_dir():
            targets += [path for path in logs.iterdir() if path.is_file() and _ROTATED_LOG.match(path.name)]
    totals = [0, 0, 0]
    for target in targets:
        for index, value in enumerate(_remove(target)):
            totals[index] += value
    return {"files": totals[0], "bytes": totals[1], "failed": totals[2]}


def read_usage(config) -> dict | None:
    """上次统计的结果；不是这个数据目录的（迁移前留下的）不算。"""
    try:
        data = json.loads((config.directory("state") / USAGE_NAME).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None
    if not isinstance(data, dict) or data.get("root") != str(config.data_root.resolve()):
        return None
    return data


class StorageJobs:
    """统计与清理共用一条后台线程：同一时间只做一件事，清理完顺手重新统计。"""

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._state: dict = {"state": "idle", "message": ""}
        self._thread: threading.Thread | None = None

    def snapshot(self) -> dict:
        with self._lock:
            return dict(self._state)

    def busy(self) -> bool:
        with self._lock:
            return self._state["state"] != "idle"

    def start(self, config, action: str) -> dict:
        if action != "measure" and action not in CLEANABLE:
            raise ValueError("这一类不能在这里清理")
        with self._lock:
            if self._state["state"] != "idle":
                raise RuntimeError("正在统计或清理，请稍候")
            self._state = {"state": "measuring" if action == "measure" else "cleaning",
                           "category": "" if action == "measure" else action, "message": ""}
            self._thread = threading.Thread(target=self._run, args=(config, action),
                                            name="PeachStorage", daemon=True)
            self._thread.start()
            return dict(self._state)

    def join(self, timeout: float | None = None) -> None:
        thread = self._thread
        if thread is not None:
            thread.join(timeout)

    def _run(self, config, action: str) -> None:
        message = ""
        try:
            if action != "measure":
                result = clean(config, action)
                label = next(item.label for item in CATEGORIES if item.key == action)
                message = f"已清理{label}，释放 {format_size(result['bytes'])}"
                if result["failed"]:
                    message += f"；{result['failed']} 个文件正在使用，未能删除"
                with self._lock:
                    self._state.update(state="measuring", message=message)
            usage = measure(config)
            atomic_write_text(config.directory("state") / USAGE_NAME, json.dumps(usage))
        except Exception as exc:
            message = f"{message}；{exc}" if message else str(exc)
            with self._lock:
                self._state = {"state": "idle", "message": message, "error": True}
            return
        with self._lock:
            self._state = {"state": "idle", "message": message}


JOBS = StorageJobs()


def format_size(size: int) -> str:
    """与前端 `fmtSize` 同一套写法，回执里的数字和页面上对得上。"""
    if size <= 0:
        return "0 B"
    if size < 1 << 20:
        return f"{max(1, round(size / 1024))} KB"
    if size < 1 << 30:
        return f"{size >> 20} MB"
    if size < 1 << 40:
        return f"{size / (1 << 30):.1f} GB"
    return f"{size / (1 << 40):.2f} TB"


# --------------------------------------------------------------------------- 迁移

def availability(config) -> tuple[bool, str]:
    """这份部署能不能在设置页迁移数据目录；不能时给出手动办法。"""
    if sys.platform != "win32" or not distribution.standalone():
        return False, "设置页迁移只支持 Windows 安装版。其他部署请退出 Peach，手动移动数据目录，再将 PEACH_DATA_ROOT 设为新位置"
    root = config.data_root.resolve()
    for key in settings_file.DIRECTORY_KEYS:
        raw = (config.directories.get(key) or "").strip()
        directory = config.directory(key)
        if raw and (PureWindowsPath(raw).is_absolute() or Path(raw).is_absolute()):
            return False, "部分数据设置在数据目录之外，请退出 Peach 后手动迁移"
        if directory.is_symlink() or directory.is_junction() or not directory.resolve().is_relative_to(root):
            return False, "部分数据使用了目录链接，请退出 Peach 后手动迁移"
    return True, ""


def _vacant(folder: Path) -> bool:
    """空目录，或者只剩一份数据目录位置记录（迁走之后留下的那种）。"""
    entries = list(folder.iterdir())
    if not entries:
        return True
    if len(entries) != 1 or entries[0].name != "state" or not entries[0].is_dir():
        return False
    return [path.name for path in entries[0].iterdir()] == [settings_file.DATA_ROOT_LOCATION]


def _existing_ancestor(path: Path) -> Path:
    for candidate in (path, *path.parents):
        if candidate.exists():
            return candidate
    return Path(path.anchor) if path.anchor else path


def _same_volume(source: Path, target: Path) -> bool:
    try:
        return os.stat(source).st_dev == os.stat(_existing_ancestor(target)).st_dev
    except OSError:
        return False


def check_target(config, raw: object, *, program: Path | None = None) -> Path:
    """校验新的数据目录位置，返回规范化后的绝对路径。不合适时抛 ValueError，原因写给人看。"""
    if not isinstance(raw, str) or not raw.strip():
        raise ValueError("请选择新的数据目录")
    text = raw.strip()
    if os.name == "nt":
        pure = PureWindowsPath(text)
        if not pure.drive or not pure.root or pure.drive.startswith("\\\\"):
            raise ValueError("请选择本机磁盘上的文件夹，例如 D:\\Peach\\peach-data")
    target = Path(text)
    if not target.is_absolute():
        raise ValueError("请填写完整路径")
    if target.parent == target:
        raise ValueError("请选择或新建一个专用文件夹，不要直接使用磁盘根目录")
    target = target.resolve()
    source = config.data_root.resolve()
    if target == source or target.is_relative_to(source) or source.is_relative_to(target):
        raise ValueError("新位置不能与当前数据目录相同或互相包含")
    program = (program or Path(sys.executable).parent).resolve()
    if target.is_relative_to(program) or program.is_relative_to(target):
        raise ValueError("新位置不能与程序目录重叠")
    for rows in (*config.locations.values(), *config.mounts.values()):
        for value in rows:
            media = Path(value)
            if not media.is_absolute():
                continue
            media = media.resolve()
            if target.is_relative_to(media) or media.is_relative_to(target):
                raise ValueError("新位置不能与媒体目录重叠")
    if target.exists():
        if not target.is_dir():
            raise ValueError("这个位置已有同名文件")
        if not _vacant(target):
            raise ValueError("请选择空文件夹，或新建一个文件夹")
    ancestor = _existing_ancestor(target)
    probe = ancestor / f".peach-write-test-{uuid.uuid4().hex}"
    try:
        probe.write_bytes(b"")
        probe.unlink()
    except OSError:
        raise ValueError("当前用户无法写入这个位置") from None
    return target


def check_space(source: Path, target: Path, needed: int) -> None:
    if _same_volume(source, target):
        return
    free = shutil.disk_usage(_existing_ancestor(target)).free
    if free < needed + SPACE_MARGIN:
        raise ValueError(f"新位置所在磁盘剩余 {format_size(free)}，迁移需要约 {format_size(needed + SPACE_MARGIN)}")


def read_result(config) -> dict | None:
    try:
        data = json.loads((config.directory("state") / RESULT_NAME).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None
    return data if isinstance(data, dict) else None


def _record(root: Path, **fields) -> None:
    try:
        atomic_write_text(root / "state" / RESULT_NAME, json.dumps({**fields, "finished_at": time.time()},
                                                                  ensure_ascii=False))
    except OSError:
        pass


def request(config, raw: object) -> dict:
    """校验并写下迁移请求，由托盘接手。返回给页面的回执。"""
    available, message = availability(config)
    if not available:
        raise ValueError(message)
    from . import standalone_update
    if standalone_update.public().get("state") in standalone_update.ACTIVE | {"ready"}:
        raise ValueError("更新任务尚未结束，请完成后再迁移")
    if JOBS.busy():
        raise ValueError("正在统计或清理，请完成后再迁移")
    target = check_target(config, raw)
    usage = read_usage(config)
    if usage is None:
        raise ValueError("请先统计占用空间")
    source = config.data_root.resolve()
    check_space(source, target, int(usage.get("total_bytes") or 0))
    path = config.directory("state") / REQUEST_NAME
    with FileLock(str(path) + ".lock", timeout=0):
        atomic_write_text(path, json.dumps({"source": str(source), "target": str(target),
                                            "requested_at": time.time()}, ensure_ascii=False))
    return {"accepted": True, "target": str(target),
            "message": "正在迁移数据目录，Peach 将暂时退出，完成后自动重新打开。"}


def snapshot(config) -> dict:
    """设置页「存储空间」一屏的数据。"""
    root = config.data_root.resolve()
    try:
        disk = shutil.disk_usage(root)
        free, total = disk.free, disk.total
    except OSError:
        free = total = None
    drive = PureWindowsPath(str(root)).drive.casefold()
    system = os.environ.get("SystemDrive", "C:").casefold()
    available, message = availability(config)
    usage = read_usage(config)
    categories = None
    if usage is not None:
        found = usage.get("categories") or {}
        categories = [{"key": item.key, "label": item.label, "description": item.description,
                       "cleanable": item.cleanable, **(found.get(item.key) or {"bytes": 0, "files": 0, "reclaimable": 0})}
                      for item in CATEGORIES]
    return {
        "data_root": str(root),
        "free_bytes": free, "total_bytes": total,
        "system_drive": os.name == "nt" and bool(drive) and drive == system,
        "usage": None if usage is None else {
            "measured_at": usage.get("measured_at"), "total_bytes": usage.get("total_bytes", 0),
            "total_files": usage.get("total_files", 0), "categories": categories},
        "job": JOBS.snapshot(),
        "relocation": {"available": available, "message": message, "last": read_result(config)},
    }


def poll(tray) -> None:
    """托盘监视循环里看一眼有没有迁移请求；有就停服务、交给助手、自己退出。"""
    if not distribution.standalone() or sys.platform != "win32":
        return
    config = settings_file.load_config()
    path = config.directory("state") / REQUEST_NAME
    if not path.is_file() or not tray._action_lock.acquire(blocking=False):
        return
    from . import update_tasks
    database = config.directory("database") / "ledger.db"
    token = None
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        if time.time() - data["requested_at"] > REQUEST_TTL:
            path.unlink()
            return
        if data["source"] != str(config.data_root.resolve()):
            raise ValueError("数据目录已变更，请重新选择")
        check_target(config, data["target"])
        token = update_tasks.reserve(database)
        update_tasks.wait_quiescent(database)
        atomic_write_text(path, json.dumps(dict(data, token=token), ensure_ascii=False))
        program = Path(sys.executable).resolve().parent
        environment = dict(os.environ, PYINSTALLER_RESET_ENVIRONMENT="1")
        process = subprocess.Popen([str(program / "Peach.exe"), HELPER_FLAG, str(path), str(os.getpid())],
                                   cwd=str(program), env=environment, creationflags=subprocess.CREATE_NO_WINDOW)
        update_tasks.transfer(database, token, process.pid)
        tray.icon.notify("正在迁移数据目录，Peach 将暂时退出，完成后自动重新打开。", "Peach")
        tray.exit(reason="data-relocation")
    except Exception as exc:
        if token:
            update_tasks.release(database, token)
        path.unlink(missing_ok=True)
        _record(config.data_root, state="error", message=f"未能开始迁移：{exc}")
        tray.icon.notify(f"数据目录未能迁移：{exc}", "Peach")
    finally:
        tray._action_lock.release()


def count_files(root: Path) -> tuple[int, int]:
    """(文件数, 总字节)，链接不跟随；迁移前后各量一次，两边相等才算复制完整。"""
    files = size = 0
    stack = [root]
    while stack:
        for entry in os.scandir(stack.pop()):
            if entry.is_dir(follow_symlinks=False):
                stack.append(Path(entry.path))
            else:
                files += 1
                size += entry.stat(follow_symlinks=False).st_size
    return files, size


def _shell_copy(source: Path, target: Path) -> None:
    """用资源管理器的复制（`SHFileOperationW`）：自带进度、剩余时间与取消按钮。"""
    import ctypes
    from ctypes import wintypes

    class Operation(ctypes.Structure):
        _fields_ = [("hwnd", wintypes.HWND), ("wFunc", wintypes.UINT), ("pFrom", wintypes.LPCWSTR),
                    ("pTo", wintypes.LPCWSTR), ("fFlags", ctypes.c_ushort), ("fAnyOperationsAborted", wintypes.BOOL),
                    ("hNameMappings", ctypes.c_void_p), ("lpszProgressTitle", wintypes.LPCWSTR)]

    copy, no_confirmation, simple_progress, no_confirm_mkdir, no_error_ui = 2, 0x10, 0x100, 0x200, 0x400
    operation = Operation(None, copy, str(source / "*") + "\0", str(target) + "\0",
                          no_confirmation | simple_progress | no_confirm_mkdir | no_error_ui,
                          False, None, "正在迁移 Peach 数据")
    code = ctypes.windll.shell32.SHFileOperationW(ctypes.byref(operation))
    if operation.fAnyOperationsAborted:
        raise RuntimeError("迁移已取消")
    if code:
        raise OSError(f"复制没有完成（代码 0x{code:X}）")


def _python_copy(source: Path, target: Path) -> None:
    shutil.copytree(source, target, symlinks=True, dirs_exist_ok=True)


def _rebase(value: str, old: Path, new: Path) -> str | None:
    normal = os.path.normpath(value)
    prefix = os.path.normcase(os.path.normpath(str(old)))
    folded = os.path.normcase(normal)
    if folded == prefix:
        return str(new)
    if not folded.startswith(prefix.rstrip(os.sep) + os.sep):
        return None
    return str(new / normal[len(prefix.rstrip(os.sep)) + 1:])


def rewrite_ledger_paths(database: Path, old: Path, new: Path) -> int:
    """把账本里指向旧数据目录的绝对路径改到新位置，返回改写的行数。"""
    if not database.is_file():
        return 0
    changed = 0
    connection = sqlite3.connect(database, timeout=30)
    try:
        with connection:
            for table, column in PATH_COLUMNS:
                columns = {row[1] for row in connection.execute(f"PRAGMA table_info({table})")}
                if column not in columns:
                    continue
                rows = connection.execute(
                    f"SELECT rowid, {column} FROM {table} WHERE {column} IS NOT NULL AND {column} <> ''").fetchall()
                for rowid, value in rows:
                    moved = _rebase(str(value), old, new)
                    if moved is not None and moved != value:
                        connection.execute(f"UPDATE {table} SET {column}=? WHERE rowid=?", (moved, rowid))
                        changed += 1
            if connection.execute("PRAGMA quick_check").fetchone()[0] != "ok":
                raise RuntimeError("数据库检查未通过")
    finally:
        connection.close()
    return changed


def _point(source: Path, target: Path, bootstrap: Path) -> None:
    """默认落点和原目录都记下新位置；新位置自己不能再指向别处，否则会成环。"""
    (target / "state" / settings_file.DATA_ROOT_LOCATION).unlink(missing_ok=True)
    seen = {_key(target)}
    for root in (bootstrap, source):
        if _key(root) in seen:
            continue
        seen.add(_key(root))
        atomic_write_text(root / "state" / settings_file.DATA_ROOT_LOCATION, str(target))


def _rename(source: Path, target: Path, *, timeout: float = 30) -> None:
    deadline = time.monotonic() + timeout
    while True:
        try:
            os.rename(source, target)
            return
        except OSError:
            if time.monotonic() >= deadline:
                raise
            time.sleep(.5)


class MovedWithoutRewrite(RuntimeError):
    """数据已经到了新位置并记下了位置，只是账本里的路径没改写成。迁移算完成，原因要告诉人。"""


def relocate(config, target: Path, *, bootstrap: Path,
             copy: Callable[[Path, Path], None] | None = None) -> bool:
    """把整个数据目录搬到 `target` 并改写账本路径、记下位置。返回原目录是否还要删除（跨卷复制）。

    失败时抛出异常，原目录保持可用：同卷改名会改回去，跨卷复制会删掉新位置已复制的部分。
    """
    source = config.data_root.resolve()
    database = config.directory("database").resolve().relative_to(source) / "ledger.db"
    same_volume = _same_volume(source, target)
    if target.exists():
        # `check_target` 已确认它是空目录或只剩一份位置记录（以前从这里迁走过）。
        if (target / "state").is_dir():
            shutil.rmtree(target / "state")
        if same_volume:
            target.rmdir()
    if same_volume:
        target.parent.mkdir(parents=True, exist_ok=True)
        _rename(source, target)
        try:
            rewrite_ledger_paths(target / database, source, target)
        except Exception as exc:
            try:
                _rename(target, source)
            except OSError:
                # 改不回去时数据已经整个在新位置：照样记下位置，否则下次启动会进首次设置页。
                _point(source, target, bootstrap)
                raise MovedWithoutRewrite(f"预览图路径未能改写（{exc}），下次处理馆藏时会重新登记") from exc
            raise
        copied = False
    else:
        expected = count_files(source)
        # 请求时按上次统计查过一次余量；托盘退出、任务暂停之后这里按实际大小再查一次。
        check_space(source, target, expected[1])
        target.mkdir(parents=True, exist_ok=True)
        try:
            (copy or (_shell_copy if sys.platform == "win32" else _python_copy))(source, target)
            actual = count_files(target)
            if actual != expected:
                raise RuntimeError(f"复制结果不完整：原目录 {expected[0]} 个文件、{format_size(expected[1])}，"
                                   f"新位置 {actual[0]} 个文件、{format_size(actual[1])}")
            rewrite_ledger_paths(target / database, source, target)
        except BaseException:
            shutil.rmtree(target, ignore_errors=True)
            raise
        copied = True
    _point(source, target, bootstrap)
    return copied


def remove_source(source: Path) -> int:
    """删掉已复制走的原目录，只留 `state/data-root.txt`。返回删不掉的文件数。"""
    keep = source / "state" / settings_file.DATA_ROOT_LOCATION
    failed = 0
    for child in list(source.iterdir()):
        if child.name == "state" and child.is_dir():
            failed += sum(_remove(item)[2] for item in list(child.iterdir()) if item != keep)
        else:
            failed += _remove(child)[2]
    return failed


def _startup(config) -> dict | None:
    from . import desktop_startup
    try:
        state = desktop_startup.snapshot(config)
    except Exception:
        return None
    return state if state.get("available") else None


def _restore_startup(config, state: dict | None) -> str:
    """按迁移前的开关在新位置重写开机自启与桌面图标；失败只提示，不影响迁移结果。"""
    if not state or not (state.get("enabled") or state.get("desktop")):
        return ""
    from . import desktop_startup
    try:
        desktop_startup.save(config, enabled=bool(state["enabled"]), silent=bool(state["silent"]),
                             desktop=bool(state.get("desktop")))
    except Exception as exc:
        return f"开机自启与桌面图标未能更新（{exc}），请在设置页重新打开"
    return ""


def apply(request_path: Path, wait_pid: int, *, environ: dict[str, str] | None = None,
          copy: Callable[[Path, Path], None] | None = None,
          start: Callable[[Path, dict[str, str]], object] | None = None,
          wait: float = 90) -> int:
    """迁移助手：等托盘退出，搬家，重新拉起托盘，再删原目录。退出码 0 成功，1 失败，2 请求无效。"""
    from . import update_tasks
    from .windows_restart import process_alive
    environ = dict(os.environ if environ is None else environ)
    try:
        data = json.loads(Path(request_path).read_text(encoding="utf-8"))
        source = Path(data["source"])
        target_raw = data["target"]
    except (OSError, ValueError, KeyError, TypeError):
        return 2
    program = Path(sys.executable).resolve().parent
    final, copied, notes = source, False, []
    old = startup = None
    try:
        deadline = time.monotonic() + wait
        while process_alive(wait_pid):
            if time.monotonic() > deadline:
                raise TimeoutError("托盘尚未退出")
            time.sleep(.25)
        old = settings_file.load_config(environ=dict(environ, PEACH_DATA_ROOT=str(source)))
        if old.data_root.resolve() != source:
            raise ValueError("数据目录已变更，请重新选择")
        target = check_target(old, target_raw, program=program)
        Path(request_path).unlink(missing_ok=True)
        if data.get("token"):
            update_tasks.release(old.directory("database") / "ledger.db", data["token"])
        startup = _startup(old)
        if startup and (startup.get("enabled") or startup.get("desktop")):
            from . import desktop_startup
            desktop_startup.save(old, enabled=False, silent=bool(startup["silent"]), desktop=False)
        bootstrap = distribution.user_data_root({key: value for key, value in environ.items()
                                                 if key != settings_file.DATA_ROOT_ENV})
        try:
            copied = relocate(old, target, bootstrap=bootstrap, copy=copy)
        except MovedWithoutRewrite as exc:
            notes.append(str(exc))
        final = target
    except Exception as exc:
        Path(request_path).unlink(missing_ok=True)
        if old is not None:
            notes.append(_restore_startup(old, startup))
        _record(source, state="error", source=str(source), target=str(target_raw),
                message="；".join(filter(None, [f"数据目录未迁移，仍在原位置：{exc}", *notes])))
        _start_tray(program, dict(environ, PEACH_DATA_ROOT=str(source)), start)
        return 1
    try:
        new = settings_file.load_config(environ=dict(environ, PEACH_DATA_ROOT=str(final)))
        notes.append(_restore_startup(new, startup))
    except Exception as exc:
        notes.append(f"开机自启与桌面图标未能更新（{exc}），请在设置页重新打开")
    message = "数据目录已迁移"
    _record(final, state="done", source=str(source), target=str(final), message=message,
            notes=[note for note in notes if note], leftovers=0)
    _start_tray(program, dict(environ, PEACH_DATA_ROOT=str(final)), start)
    if copied:
        # 新托盘只读新位置，原目录这时才删：删几十 GB 要几分钟，不让人对着没有托盘的桌面等。
        try:
            leftovers = remove_source(source)
        except OSError:
            leftovers = -1
        if leftovers:
            notes.append(f"原位置还有文件未能删除，确认新位置一切正常后可手动删除：{source}")
        _record(final, state="done", source=str(source), target=str(final), message=message,
                notes=[note for note in notes if note], leftovers=leftovers)
    return 0


def _start_tray(program: Path, environment: dict[str, str], start) -> None:
    environment["PYINSTALLER_RESET_ENVIRONMENT"] = "1"
    if start is not None:
        start(program / "Peach.exe", environment)
        return
    from .tray_detached import launch_detached
    try:
        launch_detached([str(program / "Peach.exe")], cwd=program, env=environment)
    except OSError:
        subprocess.Popen([str(program / "Peach.exe")], cwd=str(program), env=environment,
                         creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
