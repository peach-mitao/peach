from __future__ import annotations

import json
import logging
import os
import shutil
import subprocess
import sys
import time
import uuid
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path
from typing import Callable

from .fsutil import atomic_write_text, replace_with_retry


log = logging.getLogger(__name__)

BACKUP_GLOB = "Peach.pre-source-sync-*"
STAGING_DIRNAME = "source-sync-build"
KEEP_BACKUPS = 2
INTERNAL_DIRNAME = "_internal"
NEXT_BUNDLE_PREFIX = ".Peach.source-sync-next-"

WINDOWS_TRAY_INPUTS = (
    "src/peach/",
    "scripts/build_app_entry.py",
    "scripts/build_windows.ps1",
    "scripts/standalone.txt",
    "scripts/replace_windows_tray.py",
    "web/",
    "migrations/",
    "resources/",
    "pyproject.toml",
)


def windows_tray_rebuild_required(changed_paths: tuple[str, ...]) -> bool:
    """The frozen Windows entry must carry every packaged runtime input."""
    return any(
        path == prefix or path.startswith(prefix)
        for path in changed_paths
        for prefix in WINDOWS_TRAY_INPUTS
    )


@dataclass(frozen=True)
class PendingWindowsUpdate:
    commit: str
    changed_paths: tuple[str, ...]


@dataclass(frozen=True)
class WindowsUpdatePreparation:
    state: str
    message: str


#: PyInstaller 单文件包解压目录的固定前缀，位于 `%TEMP%`。
ONEFILE_GLOB = "_MEI*"
#: 比这更新的解压目录可能属于正在启动的另一份进程，不碰。
ONEFILE_MIN_AGE = timedelta(days=1)


def sweep_onefile_extractions(
    bundle_root: str | None = getattr(sys, "_MEIPASS", None), *,
    now: datetime | None = None, min_age: timedelta = ONEFILE_MIN_AGE,
) -> tuple[Path, ...]:
    """删掉单文件包解压后没能自清的 `%TEMP%/_MEIxxxx` 目录，托盘每次启动调一次。

    PyInstaller 的单文件包每次启动都把自己解到临时目录，只在正常退出时删掉它；托盘被
    结束进程、断电或在替换过程中被接管时那份就一直留着，每份 40–80 MB，几周就以 GB 计。
    只认 `_MEIPASS` 所在目录里的同前缀兄弟目录：跳过自己，跳过修改时间不满 `min_age`
    的（可能是正在启动的另一份进程），删不掉的只记日志。源码运行没有 `_MEIPASS`，
    什么都不做。
    """
    if not bundle_root:
        return ()
    own = Path(bundle_root).resolve()
    moment = now or datetime.now()
    removed: list[Path] = []
    for entry in sorted(own.parent.glob(ONEFILE_GLOB)):
        if not entry.is_dir() or entry.resolve() == own:
            continue
        try:
            modified = datetime.fromtimestamp(entry.stat().st_mtime)
            if moment - modified < min_age:
                continue
            shutil.rmtree(entry)
        except OSError as exc:
            log.warning("单文件包解压残留未能删除 %s: %s", entry, exc)
            continue
        removed.append(entry)
    return tuple(removed)


def _bundle_backup_path(target: Path, moment: datetime) -> Path:
    base = target.with_name(f"Peach.pre-source-sync-{moment.strftime('%Y%m%d-%H%M%S')}")
    candidate = base
    index = 1
    while candidate.exists():
        candidate = base.with_name(f"{base.name}-{index}")
        index += 1
    return candidate


def _remove_path(path: Path) -> None:
    if path.is_dir():
        shutil.rmtree(path)
    else:
        path.unlink(missing_ok=True)


def _copy_bundle(executable: Path, destination: Path) -> None:
    """把一个目录版托盘的核心文件复制到尚不存在的目标目录。"""
    destination.mkdir(parents=True)
    shutil.copy2(executable, destination / "Peach.exe")
    internal = executable.parent / INTERNAL_DIRNAME
    if internal.is_dir():
        shutil.copytree(internal, destination / INTERNAL_DIRNAME)


def swap_tray_binary(
    staged: Path,
    target: Path,
    *,
    backup: Path | None = None,
    timeout: float = 45.0,
    now: Callable[[], datetime] = datetime.now,
    sleep: Callable[[float], None] = time.sleep,
) -> Path:
    """换掉目录版生产托盘的核心文件，并返回一份可完整回滚的备份目录。

    调用方必须先让旧托盘正常退出：这个函数不发停止消息，也不判断谁还活着。
    暂存入口旁边必须有 `_internal/`；生产入口可以来自旧的单文件版，所以它旁边没有
    `_internal/` 也允许替换。备份把旧 EXE 与旧的 `_internal/` 一起移走，避免新入口
    已经换好、运行库却仍是半套。生产目录里的 `tools/`、`cloudflared.exe` 等公共文件
    不归这条更新链管理，原样留在原处。
    """
    if not staged.is_file():
        raise FileNotFoundError(f"暂存包不存在：{staged}")
    if not (staged.parent / INTERNAL_DIRNAME).is_dir():
        raise FileNotFoundError(f"暂存包缺少 {INTERNAL_DIRNAME} 目录：{staged.parent}")
    if target.name.lower() != "peach.exe" or not target.is_file():
        raise ValueError(f"生产入口不存在或不是 Peach.exe：{target}")
    if os.path.normcase(os.path.abspath(staged)) == os.path.normcase(os.path.abspath(target)):
        raise ValueError("暂存包与生产入口是同一个文件")

    moment = now()
    backup = backup or _bundle_backup_path(target, moment)
    if backup.exists():
        raise FileExistsError(f"托盘备份目录已经存在：{backup}")
    if backup.parent.resolve() != target.parent.resolve():
        raise ValueError("托盘备份必须与生产入口位于同一目录")

    next_bundle = target.parent / (
        f"{NEXT_BUNDLE_PREFIX}{moment.strftime('%Y%m%d-%H%M%S')}-{uuid.uuid4().hex[:8]}"
    )
    backup.mkdir(parents=True)
    try:
        _copy_bundle(staged, next_bundle)
    except BaseException:
        _remove_path(next_bundle)
        _remove_path(backup)
        raise

    target_internal = target.parent / INTERNAL_DIRNAME
    backup_internal = backup / INTERNAL_DIRNAME
    moved_old: list[tuple[Path, Path]] = []
    new_executable_landed = False
    new_internal_landed = False
    try:
        backup_executable = backup / "Peach.exe"
        replace_with_retry(target, backup_executable, timeout=timeout, sleep=sleep)
        moved_old.append((backup_executable, target))
        if target_internal.is_dir():
            replace_with_retry(target_internal, backup_internal, timeout=timeout, sleep=sleep)
            moved_old.append((backup_internal, target_internal))

        replace_with_retry(
            next_bundle / "Peach.exe", target, timeout=timeout, sleep=sleep)
        new_executable_landed = True
        replace_with_retry(
            next_bundle / INTERNAL_DIRNAME, target_internal, timeout=timeout, sleep=sleep)
        new_internal_landed = True
    except BaseException:
        # 只清掉确实已经落地的半套新文件；旧 `_internal/` 若尚未搬走，必须原样保留。
        for path, landed in (
            (target, new_executable_landed),
            (target_internal, new_internal_landed),
        ):
            if not landed:
                continue
            try:
                _remove_path(path)
            except OSError:
                pass
        for source, destination in reversed(moved_old):
            try:
                replace_with_retry(
                    source, destination, timeout=timeout, sleep=sleep)
            except OSError as restore_error:
                log.error("托盘更新失败后未能恢复 %s: %s", destination, restore_error)
        _remove_path(next_bundle)
        try:
            _remove_path(backup)
        except OSError:
            pass
        raise
    finally:
        if next_bundle.exists():
            try:
                _remove_path(next_bundle)
            except OSError:
                pass
    return backup


def restore_tray_bundle(
    backup: Path,
    target: Path,
    *,
    timeout: float = 45.0,
    sleep: Callable[[float], None] = time.sleep,
) -> None:
    """把备份核心包放回生产目录，同时保留备份本身供下一次再试。

    旧版更新留下的是单个 `.exe`，新版留下的是目录。两种都认，回滚后再启动的仍是
    更新前那一份入口；当前失败的新版 `_internal/` 会先移走，避免单文件旧版旁边残留
    一套误导运行库。
    """
    if target.name.lower() != "peach.exe" or not target.parent.is_dir():
        raise ValueError(f"生产入口目录无效：{target}")
    if backup.is_dir():
        backup_executable = backup / "Peach.exe"
        backup_internal = backup / INTERNAL_DIRNAME
    elif backup.is_file():
        backup_executable = backup
        backup_internal = None
    else:
        raise FileNotFoundError(f"托盘备份不存在：{backup}")
    if not backup_executable.is_file():
        raise FileNotFoundError(f"托盘备份缺少 Peach.exe：{backup}")

    restore = target.parent / f".Peach.rollback-{uuid.uuid4().hex[:12]}"
    restore.mkdir()
    try:
        shutil.copy2(backup_executable, restore / "Peach.exe")
        if backup_internal is not None and backup_internal.is_dir():
            shutil.copytree(backup_internal, restore / INTERNAL_DIRNAME)
        _remove_path(target)
        _remove_path(target.parent / INTERNAL_DIRNAME)
        replace_with_retry(
            restore / "Peach.exe", target, timeout=timeout, sleep=sleep)
        if (restore / INTERNAL_DIRNAME).is_dir():
            replace_with_retry(
                restore / INTERNAL_DIRNAME, target.parent / INTERNAL_DIRNAME,
                timeout=timeout, sleep=sleep)
    finally:
        if restore.exists():
            try:
                _remove_path(restore)
            except OSError:
                pass


class WindowsUpdateInstaller:
    """Test an updated checkout and stage a recoverable Windows tray replacement."""

    def __init__(
        self,
        root: Path,
        *,
        state_dir: Path,
        log_dir: Path,
        current_executable: Path | None = None,
        run: Callable[..., subprocess.CompletedProcess] = subprocess.run,
        popen: Callable[..., subprocess.Popen] = subprocess.Popen,
        powershell: str | None = None,
        frozen: bool | None = None,
        process_id: int | None = None,
    ) -> None:
        self.root = root.resolve()
        self.state_dir = state_dir.resolve()
        self.log_dir = log_dir.resolve()
        self.current_executable = Path(current_executable or sys.executable).resolve()
        self._run = run
        self._popen = popen
        self._powershell = powershell
        self._frozen = (
            bool(getattr(sys, "frozen", False)) and os.name == "nt"
            if frozen is None else frozen
        )
        self._process_id = os.getpid() if process_id is None else process_id
        self.pending_path = self.state_dir / "windows-source-sync.json"
        self.log_path = self.log_dir / "windows-source-sync.log"

    def mark_pending(self, commit: str, changed_paths: tuple[str, ...]) -> None:
        atomic_write_text(self.pending_path, json.dumps(
            {"commit": commit, "changed_paths": list(changed_paths)},
            ensure_ascii=False, indent=2,
        ))

    def pending(self) -> PendingWindowsUpdate | None:
        try:
            payload = json.loads(self.pending_path.read_text(encoding="utf-8"))
            commit = str(payload["commit"])
            changed = tuple(str(path) for path in payload["changed_paths"])
        except (OSError, ValueError, KeyError, TypeError):
            return None
        return PendingWindowsUpdate(commit, changed)

    def clear_pending(self) -> None:
        self.pending_path.unlink(missing_ok=True)

    def sweep_artifacts(self, *, keep_backups: int = KEEP_BACKUPS) -> tuple[Path, ...]:
        """删掉更新流程留下、已经没人会读的产物，托盘每次启动调一次。

        每次更新都会在应用目录里留一份 `Peach.pre-source-sync-<时间>/` 核心包备份，
        在 `state/source-sync-build/<commit>/` 留一份暂存构建。旧版留下的同名 `.exe`
        备份也一并清退。备份只留最新 `keep_backups` 份；暂存目录只留待应用记录指着的
        那个提交——替换助手要等新托盘活过 3 秒才清掉待应用记录，所以刚换上来的那份到
        下一次启动才会被清。只认更新器自己的命名，`Peach.exe` 本体和手工放进目录的
        任何文件一律不碰；删不掉的只记日志，不影响启动。
        """
        removed: list[Path] = []
        backups = sorted(self.current_executable.parent.glob(BACKUP_GLOB))
        stale_count = max(len(backups) - max(keep_backups, 0), 0)
        for stale in backups[:stale_count]:
            try:
                _remove_path(stale)
            except OSError as exc:
                log.warning("旧托盘备份未能删除 %s: %s", stale, exc)
                continue
            removed.append(stale)

        pending = self.pending()
        staging_root = self.state_dir / STAGING_DIRNAME
        if staging_root.is_dir():
            for entry in sorted(staging_root.iterdir()):
                if not entry.is_dir():
                    continue
                if pending is not None and entry.name == pending.commit:
                    continue
                try:
                    shutil.rmtree(entry)
                except OSError as exc:
                    log.warning("暂存构建未能删除 %s: %s", entry, exc)
                    continue
                removed.append(entry)
        return tuple(removed)

    def _powershell_executable(self) -> str | None:
        if self._powershell:
            return self._powershell
        for name in ("pwsh.exe", "pwsh", "powershell.exe", "powershell"):
            found = shutil.which(name)
            if found:
                return found
        known = Path(r"C:\Program Files\PowerShell\7\pwsh.exe")
        return str(known) if known.is_file() else None

    def _run_logged(self, command: list[str], *, append: bool = True) -> int:
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        mode = "a" if append else "w"
        with self.log_path.open(mode, encoding="utf-8", errors="replace") as log:
            log.write(f"\n[{datetime.now().isoformat(timespec='seconds')}] {' '.join(command)}\n")
            log.flush()
            result = self._run(
                command,
                cwd=str(self.root),
                stdin=subprocess.DEVNULL,
                stdout=log,
                stderr=subprocess.STDOUT,
                check=False,
                creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0,
            )
        return result.returncode

    def build_staged_tray(self, commit: str, *, shell: str | None = None) -> Path | None:
        """把当前检出打成目录版托盘，暂存到 `state/source-sync-build/<commit>/Peach/`。

        不能就地构建 `dist/Peach/`：那份 `Peach.exe` 正被运行中的托盘持有，PyInstaller
        清理输出目录时会撞上 `WinError 5`。目录版包与 `_internal/` 必须一起替换，
        因此这里返回包内入口，调用方按入口所在目录整体处理。暂存目录的命名是
        `sweep_artifacts` 认得的那一种，换名字它就清不掉。构建失败返回 None，
        原因在 `log_path` 里。
        """
        shell = shell or self._powershell_executable()
        if shell is None:
            return None
        staging_dir = self.state_dir / STAGING_DIRNAME / commit
        package_dir = staging_dir / "Peach"
        if package_dir.exists():
            _remove_path(package_dir)
        package_dir.mkdir(parents=True, exist_ok=True)
        staged = package_dir / "Peach.exe"
        build_script = self.root / "scripts" / "build_windows.ps1"
        build_exit = self._run_logged([
            shell, "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(build_script),
            "-OutputDirectory", str(package_dir),
            "-PackagedTray",
        ])
        if (build_exit != 0 or not staged.is_file()
                or not (package_dir / INTERNAL_DIRNAME).is_dir()):
            return None
        return staged

    def packaged_migrations_pass(self, staged: Path) -> bool:
        """在换上生产入口之前，先验证暂存包的资源和运行形态。

        PyInstaller 漏掉 `migrations/` 的话包能构建、能启动，直到第一次开库才炸；
        那时旧二进制已经被换走了。漏掉独立版标记则会让托盘改找源码 TLS 材料。
        这两项都必须在真实包上验证，不能只看构建脚本。
        """
        reset_environment = os.environ.copy()
        reset_environment["PYINSTALLER_RESET_ENVIRONMENT"] = "1"
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        with self.log_path.open("a", encoding="utf-8", errors="replace") as log:
            for label, command in (
                ("migrations", [str(staged), "migrate", "status"]),
                ("distribution", [str(staged), "--verify-standalone"]),
            ):
                validation = self._run(
                    command, cwd=str(self.root), stdin=subprocess.DEVNULL,
                    stdout=subprocess.PIPE, stderr=subprocess.STDOUT, check=False,
                    env=reset_environment, text=True, encoding="utf-8", errors="replace",
                    creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0,
                )
                output = str(validation.stdout or "").rstrip()
                log.write(f"\n[{label}]\n{output}\n")
                log.flush()
                if validation.returncode != 0:
                    return False
        return True

    def prepare(
        self, commit: str, changed_paths: tuple[str, ...],
    ) -> WindowsUpdatePreparation:
        shell = self._powershell_executable()
        if shell is None:
            return WindowsUpdatePreparation(
                "failed", "代码已快进，但找不到 PowerShell，未运行测试或重启服务。",
            )

        test_script = self.root / "scripts" / "test.ps1"
        for attempt in range(3):
            test_exit = self._run_logged(
                [shell, "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(test_script),
                 "-Scope", "full", "-Fresh"],
                append=attempt > 0,
            )
            # test_runner 的 4 表示验证期间输入变化；最多三次，每次取得完整有效记录。
            if test_exit != 4:
                break
        if test_exit == 4:
            return WindowsUpdatePreparation(
                "failed", "测试期间代码或依赖持续变化，三次验证均未取得有效记录；请稍后重试。",
            )
        if test_exit != 0:
            return WindowsUpdatePreparation(
                "failed", "代码已快进，但完整测试失败；服务与托盘均未重启，请查看日志。",
            )

        if not windows_tray_rebuild_required(changed_paths):
            return WindowsUpdatePreparation("services", "代码与完整测试已通过。")

        if not self._frozen:
            return WindowsUpdatePreparation(
                "services-manual-tray",
                "代码与完整测试已通过；当前不是打包托盘，托盘进程需手动重开。",
            )

        if not self.current_executable.is_file():
            return WindowsUpdatePreparation(
                "failed", "代码与测试已通过，但找不到当前托盘 EXE，未执行替换。",
            )

        staged = self.build_staged_tray(commit, shell=shell)
        if staged is None:
            return WindowsUpdatePreparation(
                "failed", "代码与测试已通过，但新托盘构建失败；旧托盘和服务保持运行。",
            )
        if not self.packaged_migrations_pass(staged):
            return WindowsUpdatePreparation(
                "failed", "新托盘未通过打包迁移资源检查；旧托盘和服务保持运行。",
            )

        backup = _bundle_backup_path(self.current_executable, datetime.now())
        helper_python = self.root / ".venv" / "Scripts" / "pythonw.exe"
        helper_script = self.root / "scripts" / "replace_windows_tray.py"
        if not helper_python.is_file() or not helper_script.is_file():
            return WindowsUpdatePreparation(
                "failed", "新托盘已构建，但替换助手不完整；旧托盘和服务保持运行。",
            )

        creationflags = 0
        if os.name == "nt":
            creationflags = subprocess.CREATE_NO_WINDOW | subprocess.DETACHED_PROCESS
        try:
            self._popen(
                [
                    str(helper_python), str(helper_script),
                    "--wait-pid", str(self._process_id),
                    "--staged", str(staged),
                    "--target", str(self.current_executable),
                    "--backup", str(backup),
                    "--pending", str(self.pending_path),
                    "--log", str(self.log_path),
                ],
                cwd=str(self.root), stdin=subprocess.DEVNULL,
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                shell=False, creationflags=creationflags,
            )
        except OSError:
            return WindowsUpdatePreparation(
                "failed", "新托盘已构建，但替换助手启动失败；旧托盘和服务保持运行。",
            )
        return WindowsUpdatePreparation(
            "replace", "代码、完整测试和新托盘检查均已通过；正在安全替换并重启。",
        )
