"""在桌面文件管理器里定位一个文件。

从 `platform` 拆出：路径翻译是纯计算，这里却要调 Shell COM、起子进程，
是唯一会把窗口弹到用户面前的模块。混在一起会让「翻译层」看起来带副作用。
"""
from __future__ import annotations

import ctypes
import os
import subprocess
import sys
from pathlib import Path


def _windows_reveal(path: Path) -> None:
    """用 Shell 原生接口打开父目录并选中文件。

    `explorer /select` 只负责发起导航；现代 Explorer 已有多个窗口/标签时，新打开的
    正确目录可能留在旧「文档」窗口后面。`SHOpenFolderAndSelectItems` 是 Windows 为
    「在资源管理器中显示」提供的原生接口，直接接收完整 PIDL，不再依赖命令行解析。
    """
    from ctypes import wintypes

    ole32 = ctypes.WinDLL("ole32")
    shell32 = ctypes.WinDLL("shell32")
    ole32.CoInitializeEx.argtypes = [ctypes.c_void_p, wintypes.DWORD]
    ole32.CoInitializeEx.restype = ctypes.c_long
    ole32.CoUninitialize.argtypes = []
    ole32.CoTaskMemFree.argtypes = [ctypes.c_void_p]
    shell32.SHParseDisplayName.argtypes = [
        wintypes.LPCWSTR, ctypes.c_void_p, ctypes.POINTER(ctypes.c_void_p),
        wintypes.DWORD, ctypes.c_void_p,
    ]
    shell32.SHParseDisplayName.restype = ctypes.c_long
    shell32.SHOpenFolderAndSelectItems.argtypes = [
        ctypes.c_void_p, wintypes.UINT, ctypes.c_void_p, wintypes.DWORD,
    ]
    shell32.SHOpenFolderAndSelectItems.restype = ctypes.c_long

    initialized = ole32.CoInitializeEx(None, 0x2) in (0, 1)
    pidl = ctypes.c_void_p()
    try:
        parsed = shell32.SHParseDisplayName(
            os.fspath(path), None, ctypes.byref(pidl), 0, None,
        )
        if parsed < 0 or not pidl.value:
            raise OSError(f"SHParseDisplayName failed: 0x{parsed & 0xffffffff:08x}")
        opened = shell32.SHOpenFolderAndSelectItems(pidl, 0, None, 0)
        if opened < 0:
            raise OSError(
                f"SHOpenFolderAndSelectItems failed: 0x{opened & 0xffffffff:08x}"
            )
    finally:
        if pidl.value:
            ole32.CoTaskMemFree(pidl)
        if initialized:
            ole32.CoUninitialize()


def mpv_executable() -> str | None:
    """本机 mpv。先看 PATH，Windows 再看安装器常用目录。"""
    import shutil
    found = shutil.which("mpv")
    if found:
        return found
    if os.name != "nt":
        return None
    local = os.environ.get("LOCALAPPDATA", "")
    program = os.environ.get("ProgramFiles", "")
    for candidate in (Path(local) / "Programs" / "mpv" / "mpv.exe", Path(program) / "mpv" / "mpv.exe"):
        if candidate.is_file():
            return str(candidate)
    return None


def launch_mpv(target: str, *, executable: str | None = None) -> None:
    """在运行 Peach 的电脑上用 mpv 打开一个文件或播放地址。

    参数只有可执行文件和这一个目标，不经过 shell。窗口留在服务端那台机器上。
    """
    program = mpv_executable() if executable is None else executable
    if not program:
        raise FileNotFoundError("这台电脑上没有找到 mpv")
    kwargs: dict = {"stdin": subprocess.DEVNULL, "stdout": subprocess.DEVNULL,
                    "stderr": subprocess.DEVNULL, "close_fds": True}
    if os.name == "nt":
        kwargs["creationflags"] = subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP
    else:
        kwargs["start_new_session"] = True
    subprocess.Popen([program, target], **kwargs)


def reveal_path(path: Path) -> bool:
    """在本机文件管理器中定位文件；不支持的平台返回 False。"""
    if os.name == "nt":
        _windows_reveal(path)
        return True
    if sys.platform == "darwin":
        subprocess.Popen(["open", "-R", os.fspath(path)], close_fds=True)
        return True
    return False
