"""Windows 桌面进程启动常驻托盘，不继承终端或智能体的 Job。"""
from __future__ import annotations

import ctypes
import os
import subprocess
import sys
from ctypes import wintypes
from pathlib import Path


class _StartupInfo(ctypes.Structure):
    _fields_ = [
        ("cb", wintypes.DWORD), ("lpReserved", wintypes.LPWSTR),
        ("lpDesktop", wintypes.LPWSTR), ("lpTitle", wintypes.LPWSTR),
        *[(name, wintypes.DWORD) for name in (
            "dwX", "dwY", "dwXSize", "dwYSize", "dwXCountChars", "dwYCountChars",
            "dwFillAttribute", "dwFlags")],
        ("wShowWindow", wintypes.WORD), ("cbReserved2", wintypes.WORD),
        ("lpReserved2", ctypes.POINTER(ctypes.c_byte)),
        ("hStdInput", wintypes.HANDLE), ("hStdOutput", wintypes.HANDLE),
        ("hStdError", wintypes.HANDLE),
    ]


class _StartupInfoEx(ctypes.Structure):
    _fields_ = [("StartupInfo", _StartupInfo), ("lpAttributeList", wintypes.LPVOID)]


class _ProcessInfo(ctypes.Structure):
    _fields_ = [("hProcess", wintypes.HANDLE), ("hThread", wintypes.HANDLE),
                ("dwProcessId", wintypes.DWORD), ("dwThreadId", wintypes.DWORD)]


def _kernel():
    kernel = ctypes.WinDLL("kernel32", use_last_error=True)
    signatures = {
        "OpenProcess": (wintypes.HANDLE, [wintypes.DWORD, wintypes.BOOL, wintypes.DWORD]),
        "CloseHandle": (wintypes.BOOL, [wintypes.HANDLE]),
        "IsProcessInJob": (wintypes.BOOL, [wintypes.HANDLE, wintypes.HANDLE,
                                         ctypes.POINTER(wintypes.BOOL)]),
        "InitializeProcThreadAttributeList": (wintypes.BOOL, [wintypes.LPVOID,
            wintypes.DWORD, wintypes.DWORD, ctypes.POINTER(ctypes.c_size_t)]),
        "UpdateProcThreadAttribute": (wintypes.BOOL, [wintypes.LPVOID, wintypes.DWORD,
            ctypes.c_size_t, wintypes.LPVOID, ctypes.c_size_t, wintypes.LPVOID, wintypes.LPVOID]),
        "DeleteProcThreadAttributeList": (None, [wintypes.LPVOID]),
        "CreateProcessW": (wintypes.BOOL, [wintypes.LPCWSTR, wintypes.LPWSTR,
            wintypes.LPVOID, wintypes.LPVOID, wintypes.BOOL, wintypes.DWORD,
            wintypes.LPVOID, wintypes.LPCWSTR, ctypes.POINTER(_StartupInfoEx),
            ctypes.POINTER(_ProcessInfo)]),
    }
    for name, (result, arguments) in signatures.items():
        function = getattr(kernel, name)
        function.restype, function.argtypes = result, arguments
    return kernel


def _in_job(kernel, handle) -> bool:
    result = wintypes.BOOL()
    if not kernel.IsProcessInJob(handle, None, ctypes.byref(result)):
        raise ctypes.WinError(ctypes.get_last_error())
    return bool(result.value)


def in_job() -> bool:
    if os.name != "nt":
        return False
    return _in_job(_kernel(), wintypes.HANDLE(-1))


def handoff_tray(arguments, root) -> bool:
    """托盘取得单实例锁前完成独立启动；保留参数、数据根与源码路径。"""
    if not in_job():
        return False
    environment = os.environ.copy()
    environment["PYINSTALLER_RESET_ENVIRONMENT"] = "1"
    if getattr(sys, "frozen", False):
        command = [sys.executable, *arguments]
    else:
        environment["PYTHONPATH"] = os.fspath(root / "src")
        command = [sys.executable, "-m", "peach.tray", *arguments]
    child = launch_detached(command, cwd=root, env=environment)
    child.close()
    return True


class DetachedProcess:
    """持有真实进程句柄，提供启动验收所需的 poll/wait。"""

    def __init__(self, handle, pid):
        import _winapi
        self._api = _winapi
        self._handle, self.pid, self.returncode = handle, pid, None

    def poll(self):
        if self.returncode is None and self._handle is not None:
            if self._api.WaitForSingleObject(self._handle, 0) == self._api.WAIT_OBJECT_0:
                self.returncode = self._api.GetExitCodeProcess(self._handle)
        return self.returncode

    def wait(self, timeout=None):
        if self.returncode is None:
            milliseconds = self._api.INFINITE if timeout is None else max(0, int(timeout * 1000))
            if self._api.WaitForSingleObject(self._handle, milliseconds) == self._api.WAIT_TIMEOUT:
                raise subprocess.TimeoutExpired(str(self.pid), timeout)
            self.returncode = self._api.GetExitCodeProcess(self._handle)
        return self.returncode

    def terminate(self):
        self._api.TerminateProcess(self._handle, 1)

    def close(self):
        if self._handle is not None:
            self._api.CloseHandle(self._handle)
            self._handle = None

    def __del__(self):
        self.close()


def launch_detached(argv, *, cwd, env=None) -> DetachedProcess:
    """由当前会话桌面进程承接父身份；失败明确报错，不回退到启动器 Job。"""
    if os.name != "nt":
        raise OSError("独立托盘启动仅适用于 Windows")
    environment = os.environ.copy() if env is None else dict(env)
    executable = Path(argv[0])
    config = executable.parent.parent / "pyvenv.cfg"
    if executable.name.lower() in ("python.exe", "pythonw.exe") and config.is_file():
        # CPython venv 启动器会把实际解释器放进自己的 kill-on-close Job。
        # 复用它的 __PYVENV_LAUNCHER__ 协议直接启动基础解释器，保留 venv 身份。
        values = dict(line.partition("=")[::2] for line in config.read_text(encoding="utf-8").splitlines()
                      if "=" in line)
        home = next((value.strip() for key, value in values.items() if key.strip() == "home"), None)
        if home is None:
            raise OSError(f"虚拟环境缺少基础解释器目录：{config}")
        environment["__PYVENV_LAUNCHER__"] = str(executable.resolve())
        executable = Path(home) / executable.name
    kernel = _kernel()
    user = ctypes.WinDLL("user32", use_last_error=True)
    user.GetShellWindow.restype = wintypes.HWND
    user.GetWindowThreadProcessId.argtypes = [wintypes.HWND, ctypes.POINTER(wintypes.DWORD)]
    shell = user.GetShellWindow()
    pid = wintypes.DWORD()
    if not shell or not user.GetWindowThreadProcessId(shell, ctypes.byref(pid)):
        raise OSError("未取得当前会话的 Windows 桌面进程")
    parent = kernel.OpenProcess(0x0080 | 0x1000, False, pid.value)
    if not parent:
        raise ctypes.WinError(ctypes.get_last_error())
    initialized = False
    child = _ProcessInfo()
    try:
        if _in_job(kernel, parent):
            raise OSError("Windows 桌面进程属于 Job，无法保证托盘独立运行")
        size = ctypes.c_size_t()
        kernel.InitializeProcThreadAttributeList(None, 1, 0, ctypes.byref(size))
        attributes = ctypes.create_string_buffer(size.value)
        if not kernel.InitializeProcThreadAttributeList(attributes, 1, 0, ctypes.byref(size)):
            raise ctypes.WinError(ctypes.get_last_error())
        initialized = True
        parent_value = wintypes.HANDLE(parent)
        if not kernel.UpdateProcThreadAttribute(attributes, 0, 0x00020000,
                ctypes.byref(parent_value), ctypes.sizeof(parent_value), None, None):
            raise ctypes.WinError(ctypes.get_last_error())
        startup = _StartupInfoEx()
        startup.StartupInfo.cb = ctypes.sizeof(startup)
        startup.StartupInfo.lpDesktop = "winsta0\\default"
        startup.lpAttributeList = ctypes.cast(attributes, wintypes.LPVOID)
        block = ctypes.create_unicode_buffer("\0".join(
            f"{key}={value}" for key, value in sorted(environment.items(), key=lambda row: row[0].upper())
        ) + "\0\0")
        command = ctypes.create_unicode_buffer(subprocess.list2cmdline([os.fspath(a) for a in argv]))
        flags = 0x00080000 | 0x00000400 | subprocess.DETACHED_PROCESS
        if not kernel.CreateProcessW(str(executable), command, None, None, False,
                flags, block, os.fspath(cwd), ctypes.byref(startup), ctypes.byref(child)):
            raise ctypes.WinError(ctypes.get_last_error())
        kernel.CloseHandle(child.hThread)
        process = DetachedProcess(child.hProcess, child.dwProcessId)
        try:
            if _in_job(kernel, child.hProcess):
                raise OSError("托盘进程仍属于 Job，独立启动未成立")
        except OSError:
            process.terminate()
            process.wait(timeout=5)
            process.close()
            raise
        return process
    finally:
        if initialized:
            kernel.DeleteProcThreadAttributeList(attributes)
        kernel.CloseHandle(parent)
