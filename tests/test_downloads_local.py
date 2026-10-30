"""本地下载：qB 保存目录到账本目录的映射、配置校验与提交目标。"""
from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace

from peach import downloads as dl
from peach.follow_secrets import CredentialStore
from peach.repository import LedgerDatabase
from support.ledger import fresh_ledger

HASH = "c9e15763f722f23e98a29decdfae341b98d53056"
MAGNET = f"magnet:?xt=urn:btih:{HASH}&dn=ABC-123"
QB_ROOT = "R:\\media\\Peach"
QB_SAVE = "/vol1/media/Peach"


class FakeProvider:
    key = "qbittorrent"
    completion_by_file = True

    def __init__(self):
        self.submitted: list[tuple[str, str]] = []
        self.status_result = dl.RemoteStatus(dl.RUNNING, name="ABC-123", progress=0.1)

    def submit(self, magnet, target):
        self.submitted.append((magnet.info_hash, target))
        return dl.RemoteStatus(dl.RUNNING, name=magnet.name)

    def status(self, task):
        return self.status_result

    def landed(self, task):
        return False

    def cancel(self, task):
        pass


class Clock:
    def __init__(self, now=1_800_000_000.0):
        self.now = now

    def __call__(self):
        return self.now

    def advance(self, seconds):
        self.now += seconds


class ConfigTests(unittest.TestCase):
    def test_qbittorrent_paths_are_saved_and_loaded(self):
        with tempfile.TemporaryDirectory() as directory:
            settings = dl.DownloadSettings(Path(directory))
            config = settings.save({
                "qbittorrent_address": "http://192.0.2.10:8085",
                "qbittorrent_save_path": QB_SAVE,
                "qbittorrent_media_root": QB_ROOT,
            }, {"local": (QB_ROOT,)})
            self.assertEqual((config.qbittorrent_address, config.qbittorrent_save_path,
                              config.qbittorrent_media_root),
                             ("http://192.0.2.10:8085", QB_SAVE, QB_ROOT))
            loaded = settings.load()
            self.assertEqual(loaded.payload()["qbittorrent_save_path"], QB_SAVE)

    def test_an_undeclared_media_root_is_refused(self):
        with tempfile.TemporaryDirectory() as directory:
            settings = dl.DownloadSettings(Path(directory))
            with self.assertRaises(ValueError):
                settings.save({
                    "qbittorrent_save_path": QB_SAVE,
                    "qbittorrent_media_root": "S:\\other",
                }, {"local": (QB_ROOT,)})

    def test_local_target_rejects_root_and_parent_segments(self):
        for value in ("", "/", "/vol1/../media"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                dl.normalise_local_target(value)
        self.assertEqual(dl.normalise_local_target("vol1//media/Peach/"),
                         "/vol1/media/Peach")


class IterFilesTests(unittest.TestCase):
    def test_iter_files_walks_local_directories_with_relative_paths(self):
        from peach.scan import iter_files
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "ABC-123").mkdir()
            (root / "ABC-123" / "ABC-123.mp4").write_bytes(b"x")
            (root / "poster.jpg").write_bytes(b"x")
            self.assertEqual(set(iter_files(root)),
                             {("ABC-123", "ABC-123.mp4"), ("poster.jpg",)})


class LandingTests(unittest.TestCase):
    def setUp(self):
        self.push = SimpleNamespace(config=SimpleNamespace(prefixes=()), mounts={},
                                    declared_roots={"local": (QB_ROOT,)})
        self.landing = dl.Landing(self.push, declared_roots={"local": (QB_ROOT,)}, mounts={})
        self.landing.channel_catalog = lambda: {"providers": [{
            "key": "qbittorrent", "kind": "local", "root": QB_ROOT,
            "local_root": QB_SAVE, "target": QB_SAVE, "configured": True,
        }], "problems": []}

    def test_a_qbittorrent_path_maps_into_the_declared_media_root(self):
        task = dl.DownloadTask(1, HASH, "qbittorrent", MAGNET, "ABC-123", QB_SAVE,
                               dl.REMOTE_DONE, remote_name="ABC-123/ABC-123.mp4")
        self.assertEqual(self.landing.ledger_path(task, dl.DownloadConfig()),
                         ("local", "R:\\media\\Peach\\ABC-123\\ABC-123.mp4"))

    def test_a_path_outside_the_qbittorrent_root_is_not_mapped(self):
        task = dl.DownloadTask(1, HASH, "qbittorrent", MAGNET, "ABC-123", "/other",
                               dl.REMOTE_DONE, remote_name="ABC-123.mp4")
        self.assertIsNone(self.landing.ledger_path(task, dl.DownloadConfig()))

    def test_task_location_is_local(self):
        task = dl.DownloadTask(1, HASH, "qbittorrent", MAGNET, "ABC-123", QB_SAVE, dl.SUBMITTED)
        self.assertEqual(task.location, "local")
        self.assertEqual(task.payload()["provider_label"], "qBittorrent")


class SubmitTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name).resolve()
        self.provider = FakeProvider()
        self.clock = Clock()
        self.push = SimpleNamespace(config=SimpleNamespace(prefixes=()), mounts={},
                                    declared_roots={"local": (QB_ROOT,)})
        self.service = dl.DownloadService(
            database=LedgerDatabase(fresh_ledger(self.root)),
            state_root=self.root / "state", credentials=CredentialStore(self.root / "secrets"),
            providers=lambda key: self.provider, clock=self.clock,
            landing=dl.Landing(self.push, declared_roots={"local": (QB_ROOT,)}, mounts={}))
        self.service.channel_catalog = lambda: {"providers": [{
            "key": "qbittorrent", "label": "Peach · qBittorrent", "configured": True,
            "target": QB_SAVE, "kind": "local", "local_root": QB_SAVE, "root": QB_ROOT,
        }], "problems": []}
        self.service.save_settings({
            "qbittorrent_address": "http://192.0.2.10:8085",
            "qbittorrent_save_path": QB_SAVE,
            "qbittorrent_media_root": QB_ROOT,
        }, {"local": (QB_ROOT,)})

    def test_a_local_submission_uses_the_qbittorrent_channel(self):
        result = dl.submit_offline_download(self.service, magnet=MAGNET, provider="qbittorrent")
        self.assertEqual(result["outcome"], "submitted")
        self.assertEqual(result["task"]["target"], QB_SAVE)
        self.assertEqual(self.provider.submitted, [(HASH, QB_SAVE)])

    def test_a_target_outside_the_channel_is_refused(self):
        with self.assertRaises(ValueError):
            dl.submit_offline_download(self.service, magnet=MAGNET, provider="qbittorrent",
                                       target="/other/Peach")
        self.assertEqual(self.provider.submitted, [])

    def test_a_seen_local_task_that_disappears_waits_for_the_file_instead_of_failing(self):
        result = dl.submit_offline_download(self.service, magnet=MAGNET, provider="qbittorrent")
        task = self.service.store.get(result["task"]["id"])
        task.state, task.remote_id, task.progress = dl.REMOTE_RUNNING, HASH, 0.4
        task.next_check_at = dl.iso(self.clock.now)
        self.service.store.save(task)
        self.provider.status_result = dl.RemoteStatus(dl.MISSING)
        self.clock.advance(1)
        self.service.poll_once()
        task = self.service.store.get(result["task"]["id"])
        self.assertEqual(task.state, dl.REMOTE_DONE)
        self.assertIsNone(task.failure)


if __name__ == "__main__":
    unittest.main()
