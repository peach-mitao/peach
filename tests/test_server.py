"""无桌面入口的进程退出与现有数据保护。"""
import subprocess
import sys
import tempfile
import threading
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

from peach import server, settings_file
from starlette.requests import Request


class ServerTests(unittest.TestCase):
    def test_headless_configuration_accepts_private_peers_and_rejects_forwarding(self):
        from peach.routes_configuration import local_client, managed_configuration
        with patch.dict("os.environ", {"PEACH_HEADLESS_MANAGED": "1"}):
            self.assertTrue(managed_configuration())
            for peer, headers, allowed in (
                ("192.0.2.1", [], True), ("198.51.100.10", [], True),
                ("8.8.8.8", [], False), ("169.254.1.1", [], False),
                ("0.0.0.0", [], False), ("240.0.0.1", [], False),
                ("127.0.0.1", [], True), ("fd00::1", [], True),
                ("192.0.2.1", [(b"x-forwarded-for", b"8.8.8.8")], False),
                ("192.0.2.1", [(b"x-forwarded-host", b"example.com")], False),
            ):
                request = Request({"type": "http", "client": (peer, 1234),
                                   "server": ("0.0.0.0", 8900), "headers": headers,
                                   "app": SimpleNamespace(state=SimpleNamespace(tunnel=None))})
                with self.subTest(peer=peer, headers=headers):
                    self.assertEqual(local_client(request), allowed)

    def test_a_private_proxy_hop_is_trusted_without_an_allow_list(self):
        from fastapi import HTTPException
        from peach.routes_auth import same_origin
        from peach.routes_configuration import apply_trusted_proxy, local_client
        app = SimpleNamespace(state=SimpleNamespace(
            tunnel=None, settings=SimpleNamespace(mdns_name="peach", tunnel_mode=""),
        ))

        def request(peer, forwarded_for):
            return Request({
                "type": "http", "http_version": "1.1", "method": "POST", "scheme": "http",
                "path": "/api/configuration", "raw_path": b"/api/configuration", "query_string": b"",
                "client": (peer, 443), "server": ("0.0.0.0", 8900), "app": app,
                "headers": [
                    (b"host", b"172.17.0.2:8900"),
                    (b"origin", b"https://media.example.com"),
                    (b"x-forwarded-for", forwarded_for),
                    (b"x-forwarded-proto", b"https"),
                    (b"x-forwarded-host", b"media.example.com"),
                ],
            })

        with patch.dict("os.environ", {"PEACH_HEADLESS_MANAGED": "1"}):
            for proxy in ("10.4.0.8", "172.18.0.3", "127.0.0.1"):
                private = request(proxy, f"10.1.1.8, {proxy}".encode())
                apply_trusted_proxy(private)
                self.assertEqual(private.client.host, "10.1.1.8", proxy)
                self.assertEqual((private.url.scheme, private.url.hostname), ("https", "media.example.com"))
                self.assertNotIn("x-forwarded-for", private.headers)
                self.assertTrue(local_client(private))
                same_origin(private)

            public = request("172.18.0.3", b"8.8.8.8")
            apply_trusted_proxy(public)
            self.assertEqual(public.client.host, "8.8.8.8")
            self.assertFalse(local_client(public))
            same_origin(public)

            direct = request("8.8.8.8", b"192.168.1.20")
            apply_trusted_proxy(direct)
            self.assertEqual(direct.client.host, "8.8.8.8")
            self.assertFalse(local_client(direct))

            unchanged = request("10.4.0.8", b"10.4.0.8")
            apply_trusted_proxy(unchanged)
            self.assertEqual(unchanged.client.host, "10.4.0.8")
            self.assertFalse(local_client(unchanged))
            with self.assertRaises(HTTPException):
                same_origin(unchanged)

    def test_cli_without_mdns_or_tunnel_needs_no_network_route(self):
        from peach import cli
        with patch.object(cli, "_require_readable_settings"), \
                patch.object(cli, "_serve_token", return_value="test"), \
                patch.object(cli, "_build_sync", return_value=None), \
                patch.object(cli, "create_app"), patch.object(cli, "TUNNEL_ENABLED", False), \
                patch("peach.mdns.lan_ipv4", side_effect=OSError("no route")) as route, \
                patch("uvicorn.run"):
            self.assertEqual(cli.main(["serve", "--host", "0.0.0.0", "--no-mdns"]), 0)
        route.assert_not_called()

    def test_initialization_preserves_existing_configuration(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            config = settings_file.load_config(environ={"PEACH_DATA_ROOT": str(root)})
            settings_file.write(config)
            existing = config.path.read_bytes()
            with patch.object(server.settings_file, "load_config", return_value=settings_file.load_config(
                    environ={"PEACH_DATA_ROOT": str(root)})), patch.object(server, "launch") as launch:
                server.initialize()
            launch.assert_not_called()
            self.assertEqual(config.path.read_bytes(), existing)

    def test_initialization_rejects_database_without_configuration(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            config = settings_file.load_config(environ={"PEACH_DATA_ROOT": str(root)})
            config.directory("database").mkdir()
            config.directory("database").joinpath("ledger.db").write_bytes(b"existing")
            with patch.object(server.settings_file, "load_config", return_value=config), \
                    patch.object(server, "launch") as launch:
                with self.assertRaisesRegex(RuntimeError, "已有数据库"):
                    server.initialize()
            launch.assert_not_called()

    def test_stop_waits_for_child_exit(self):
        process = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(60)"],
                                   stdin=subprocess.DEVNULL)
        try:
            server.stop_process(process)
            self.assertIsNotNone(process.poll())
        finally:
            server.stop_process(process)

    def test_service_failure_exits_supervisor(self):
        with tempfile.TemporaryDirectory() as directory:
            config = settings_file.load_config(environ={"PEACH_DATA_ROOT": str(Path(directory).resolve())})
            process = subprocess.Popen([sys.executable, "-c", "raise SystemExit(17)"],
                                       stdin=subprocess.DEVNULL)
            process.wait(timeout=15)
            with patch.object(server.settings_file, "load_config", return_value=config), \
                    patch.object(server, "launch", return_value=process):
                self.assertEqual(server.supervise("127.0.0.1", 8900, threading.Event()), 17)
