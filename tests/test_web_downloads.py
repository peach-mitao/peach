"""云下载的 Web 一侧：任务列表与提交取消的路由、设置块的形状与凭据去向。

应用用临时账本与临时凭据目录建，远端换成假 provider，不起 `lifespan`。
"""
from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import httpx
from fastapi.testclient import TestClient

from peach import downloads as dl
from peach import downloads_clouddrive, web_downloads
from peach.api import create_app
from peach.config import PeachSettings
from peach.push_discovery import CloudPrefix, PushDiscoveryConfig
from support.ledger import fresh_ledger

HASH = "c9e15763f722f23e98a29decdfae341b98d53056"


class FakeProvider:
    key = "115"

    def __init__(self):
        self.submitted = []
        self.cancelled = []

    def submit(self, magnet, target):
        self.submitted.append((magnet.info_hash, target))
        return dl.RemoteStatus(dl.RUNNING, "r1", magnet.name)

    def status(self, task):
        return dl.RemoteStatus(dl.RUNNING, "r1")

    def landed(self, task):
        return False

    def cancel(self, task):
        self.cancelled.append(task.id)


class _App(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name).resolve()
        self.app = create_app(PeachSettings(
            db_path=fresh_ledger(self.root), configured=True, token="",
            follow_state_root=self.root / "state", secrets_root=self.root / "secrets"))
        self.addCleanup(self.app.state.http_transport.close)
        self.service = self.app.state.downloads
        self.provider = FakeProvider()
        self.service.providers = lambda key: self.provider
        self.client = TestClient(self.app)

    def secrets(self) -> dict:
        folder = self.root / "secrets" / "follow"
        return {path.name: path.read_text(encoding="utf-8") for path in folder.glob("*.json")}


class RouteTests(_App):
    def test_the_contract_and_the_app_share_one_service(self):
        self.assertIs(self.app.state.web_contract.downloads, self.service)

    def test_a_pasted_magnet_is_submitted_listed_and_cancelled(self):
        response = self.client.post("/api/downloads", json={
            "magnet": f"magnet:?xt=urn:btih:{HASH}&dn=ABC-123", "provider": "115",
            "target": "/115/云下载", "code": "ABC-123"})
        self.assertEqual(response.status_code, 200, response.text)
        body = response.json()
        self.assertEqual((body["outcome"], body["task"]["origin"]), ("submitted", "paste"))
        listed = self.client.get("/api/downloads").json()
        self.assertEqual([task["info_hash"] for task in listed["tasks"]], [HASH])
        self.assertEqual([row["key"] for row in listed["providers"]], ["115", "pikpak"])
        cancelled = self.client.post("/api/downloads/cancel", json={"id": body["task"]["id"]})
        self.assertEqual(cancelled.json()["task"]["state"], dl.CANCELLED)
        self.assertEqual(self.provider.cancelled, [body["task"]["id"]])

    def test_bad_input_is_a_400_with_the_reason(self):
        response = self.client.post("/api/downloads", json={"magnet": "nope", "provider": "115",
                                                            "target": "/115/a"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("infohash", response.text)
        self.assertEqual(self.client.post("/api/downloads/cancel", json={}).status_code, 400)


class SettingsBlockTests(_App):
    def roots(self):
        return {"pikpak": ("P:\\",)}

    def test_the_token_goes_to_the_local_credential_file_only(self):
        payload = web_downloads.save_settings(self.service, {
            "clouddrive_address": "127.0.0.1:19798", "token": "cd2-secret",
            "targets": {"115": "/115/云下载", "pikpak": "/云下载"}, "pikpak_root": "p:\\"},
            self.roots())
        self.assertTrue(payload["token_set"])
        self.assertNotIn("cd2-secret", json.dumps(payload, ensure_ascii=False))
        self.assertEqual(payload["config"]["pikpak_root"], "P:\\")
        self.assertEqual(payload["pikpak_roots"], ["P:\\"])
        self.assertEqual(json.loads(self.secrets()["download-clouddrive2.json"]), {"token": "cd2-secret"})
        state = (self.root / "state" / dl.SETTINGS_FILENAME).read_text(encoding="utf-8")
        self.assertNotIn("cd2-secret", state)

    def test_a_blank_token_keeps_the_saved_one_and_clear_removes_it(self):
        web_downloads.save_settings(self.service, {"token": "cd2-secret"}, self.roots())
        self.assertTrue(web_downloads.save_settings(self.service, {"token": ""}, self.roots())["token_set"])
        cleared = web_downloads.save_settings(self.service, {"clear_token": True}, self.roots())
        self.assertFalse(cleared["token_set"])

    def test_checking_without_a_token_reports_the_problem_without_calling_out(self):
        report = web_downloads.check_clouddrive(self.service, {"clouddrive_address": "127.0.0.1:1"})
        self.assertFalse(report["ok"])
        self.assertIn("API 令牌", report["problems"][0])
        self.assertEqual((report["suggested_target"], report["suggested_pikpak_root"]), (None, ""))

    def test_the_check_takes_the_push_prefixes_and_the_blanks_on_the_form(self):
        web_downloads.save_settings(self.service, {"targets": {"115": "/115open/已保存"}}, self.roots())
        prefixes = (CloudPrefix("/115open", "B:\\"),)
        self.service.landing.push_discovery.config = PushDiscoveryConfig(prefixes=prefixes)
        seen = {}

        def check(address, token, target, *, hints):
            seen.update(target=target, hints=hints)
            return downloads_clouddrive.empty_report(address)

        with mock.patch.object(downloads_clouddrive, "check", check):
            web_downloads.check_clouddrive(self.service, {
                "clouddrive_address": "127.0.0.1:19798", "token": "t", "target": "", "pikpak_root": ""})
            self.assertEqual((seen["target"], seen["hints"].prefixes, seen["hints"].pikpak_root),
                             ("", prefixes, ""))
            web_downloads.check_clouddrive(self.service, {"clouddrive_address": "127.0.0.1:19798"})
            self.assertEqual(seen["target"], "/115open/已保存")

    def test_creating_a_folder_needs_a_token_and_a_real_folder(self):
        with self.assertRaises(ValueError) as caught:
            web_downloads.create_clouddrive_folder(self.service, {
                "clouddrive_address": "127.0.0.1:1", "path": "/115open/云下载"})
        self.assertIn("API 令牌", str(caught.exception))
        with self.assertRaises(ValueError) as caught:
            web_downloads.create_clouddrive_folder(self.service, {
                "clouddrive_address": "127.0.0.1:1", "token": "t", "path": "/"})
        self.assertIn("根目录", str(caught.exception))

    def test_a_pikpak_captcha_comes_back_as_a_page_to_open(self):
        def handler(request: httpx.Request) -> httpx.Response:
            return httpx.Response(200, json={"url": "https://user.mypikpak.com/captcha"})
        result = web_downloads.pikpak_login(
            self.service, {"username": "me@example.com", "password": "pw"}, self.roots(),
            transport=httpx.MockTransport(handler))
        self.assertEqual((result["ok"], result["captcha_url"]),
                         (False, "https://user.mypikpak.com/captcha"))
        self.assertFalse(result["settings"]["pikpak"]["logged_in"])
        self.assertNotIn("pw", self.secrets().get("download-pikpak.json", ""))

    def test_logging_out_removes_the_pikpak_credentials(self):
        self.service.credentials.save(dl.PIKPAK_CREDENTIAL, {"refresh_token": "rt", "username": "u"})
        self.assertTrue(web_downloads.settings_payload(self.service, {})["pikpak"]["logged_in"])
        self.assertFalse(web_downloads.pikpak_logout(self.service, {})["pikpak"]["logged_in"])
        self.assertNotIn("download-pikpak.json", self.secrets())


if __name__ == "__main__":
    unittest.main()
