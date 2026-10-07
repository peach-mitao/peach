from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path
from unittest import mock

from peach import tray_detached, windows_restart
from peach.process_job import assign_to_job, close_job, create_kill_on_close_job

ROOT = Path(__file__).resolve().parents[1]


class DetachedLaunchTests(unittest.TestCase):
    def test_source_sync_restarts_for_detachment_and_lifecycle_changes(self):
        from peach.tray import tray_restart_required
        for path in ("src/peach/tray_detached.py", "src/peach/tray_lifecycle.py"):
            with self.subTest(path=path):
                self.assertTrue(tray_restart_required((path,)))

    def test_tray_handoff_precedes_the_single_instance_lock(self):
        from peach.tray import main
        with mock.patch("peach.tray.handoff_tray", return_value=True) as handoff, \
                mock.patch("peach.tray.SingleInstance") as instance:
            self.assertEqual(main(["--silent"]), 0)
        self.assertEqual(handoff.call_args.args[0], ["--silent"])
        instance.assert_not_called()

    def test_failed_handoff_stops_before_services_or_state_are_created(self):
        from peach.tray import main
        with mock.patch("peach.tray.handoff_tray", side_effect=OSError("desktop unavailable")), \
                mock.patch("peach.tray.show_message") as message, \
                mock.patch("peach.tray.SingleInstance") as instance:
            self.assertEqual(main(["--silent"]), 1)
        self.assertIn("desktop unavailable", message.call_args.args[1])
        instance.assert_not_called()

    def test_source_handoff_preserves_arguments_and_environment(self):
        child = mock.Mock()
        with mock.patch.object(tray_detached, "in_job", return_value=True), \
                mock.patch.object(tray_detached, "launch_detached", return_value=child) as launch, \
                mock.patch.dict(os.environ, {"PEACH_DATA_ROOT": "C:/测试/peach-data"}), \
                mock.patch.object(sys, "frozen", False, create=True):
            self.assertTrue(tray_detached.handoff_tray(["--silent"], ROOT))
        self.assertEqual(launch.call_args.args[0], [sys.executable, "-m", "peach.tray", "--silent"])
        self.assertEqual(launch.call_args.kwargs["env"]["PEACH_DATA_ROOT"], "C:/测试/peach-data")
        self.assertEqual(launch.call_args.kwargs["env"]["PYTHONPATH"], str(ROOT / "src"))
        child.close.assert_called_once()

    def test_desktop_launch_needs_no_handoff(self):
        with mock.patch.object(tray_detached, "in_job", return_value=False), \
                mock.patch.object(tray_detached, "launch_detached") as launch:
            self.assertFalse(tray_detached.handoff_tray([], ROOT))
        launch.assert_not_called()

    def test_packaged_handoff_keeps_the_executable_and_flags(self):
        with mock.patch.object(tray_detached, "in_job", return_value=True), \
                mock.patch.object(tray_detached, "launch_detached") as launch, \
                mock.patch.object(sys, "frozen", True, create=True):
            self.assertTrue(tray_detached.handoff_tray(["--show"], ROOT))
        self.assertEqual(launch.call_args.args[0], [sys.executable, "--show"])
        self.assertEqual(launch.call_args.kwargs["env"]["PYINSTALLER_RESET_ENVIRONMENT"], "1")

    def test_packaged_restart_uses_the_desktop_launcher(self):
        with mock.patch.object(windows_restart, "launch_detached") as launch:
            windows_restart.start_tray(ROOT / "Peach.exe")
        self.assertEqual(launch.call_args.args[0], [str(ROOT / "Peach.exe")])
        self.assertEqual(launch.call_args.kwargs["env"]["PYINSTALLER_RESET_ENVIRONMENT"], "1")

    @unittest.skipUnless(os.name == "nt", "Windows Job 与桌面进程")
    def test_desktop_child_survives_launcher_job_shutdown(self):
        # gate 确保 worker 纳入 Job 后才创建两种子进程；同一关闭动作给出存活与退出证据。
        worker_code = """
import json, os, subprocess, sys, time
from pathlib import Path
from peach.tray_detached import in_job, launch_detached
root = Path(sys.argv[1])
deadline = time.monotonic() + 15
while not (root / 'go').exists():
    if time.monotonic() > deadline:
        raise TimeoutError('gate')
    time.sleep(.05)
assert in_job()
control = subprocess.Popen([sys.executable, '-c', 'import time; time.sleep(60)'],
                           creationflags=subprocess.DETACHED_PROCESS)
env = {**os.environ, 'PEACH_DETACHED_TEST': '测试 env'}
code = 'import json, os, sys, time; from pathlib import Path; from peach.tray_detached import in_job; Path("child.json").write_text(json.dumps([os.getcwd(), os.environ["PEACH_DETACHED_TEST"], sys.argv[1], sys.executable, sys.prefix, in_job()]), encoding="utf-8"); time.sleep(60)'
child = launch_detached([sys.argv[3], '-c', code, sys.argv[2]], cwd=root, env=env)
(root / 'pids.json').write_text(json.dumps([control.pid, child.pid]))
time.sleep(60)
"""
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            job = create_kill_on_close_job()
            self.assertIsNotNone(job)
            worker = None
            handles = []
            try:
                worker = subprocess.Popen([sys._base_executable, "-c", worker_code, str(root),
                                           '引号 " 和 \\ 路径', sys.executable],
                    env={**os.environ, "PYTHONPATH": str(ROOT / "src"), "PEACH_DATA_ROOT": str(root)},
                    creationflags=subprocess.CREATE_NO_WINDOW)
                assign_to_job(job, worker)
                (root / "go").touch()
                deadline = time.monotonic() + 15
                while not (root / "child.json").exists() or not (root / "pids.json").exists():
                    self.assertIsNone(worker.poll(), "worker 启动失败")
                    self.assertLess(time.monotonic(), deadline, "独立启动未就绪")
                    time.sleep(.05)
                kernel = tray_detached._kernel()
                for pid in json.loads((root / "pids.json").read_text()):
                    handle = kernel.OpenProcess(0x00100000 | 0x1000 | 0x0001, False, pid)
                    self.assertTrue(handle)
                    handles.append(tray_detached.DetachedProcess(handle, pid))
                control, child = handles
                with self.assertRaises(subprocess.TimeoutExpired):
                    child.wait(timeout=.01)
                close_job(job)
                job = None
                worker.wait(timeout=10)
                control.wait(timeout=10)
                self.assertIsNone(child.poll(), "独立托盘子进程必须存活")
                self.assertFalse(tray_detached._in_job(kernel, child._handle))
                payload = json.loads((root / "child.json").read_text(encoding="utf-8"))
                self.assertEqual(payload[:2], [str(root), "测试 env"])
                self.assertEqual(payload[2], '引号 " 和 \\ 路径')
                self.assertEqual(payload[3:5], [sys.executable, sys.prefix])
                self.assertFalse(payload[5], "实际解释器必须独立于 venv 启动器的 Job")
                child.terminate()
                self.assertEqual(child.wait(timeout=10), 1)
            finally:
                close_job(job)
                if worker is not None and worker.poll() is None:
                    worker.terminate()
                    worker.wait(timeout=10)
                for process in handles:
                    if process.poll() is None:
                        process.terminate()
                        process.wait(timeout=10)
                    process.close()



if __name__ == "__main__":
    unittest.main()
