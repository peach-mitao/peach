"""高置信广告批量入回收站的隔离回归。"""
import importlib.util
import os
import sqlite3
import sys
import tempfile
import unittest
from contextlib import closing
from unittest import mock
from pathlib import Path

from support.ledger import fresh_ledger

ROOT = Path(__file__).resolve().parents[1]


def load_script(name: str):
    path = ROOT / "scripts" / f"{name}.py"
    spec = importlib.util.spec_from_file_location(f"peach_script_{name}", path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    try:
        spec.loader.exec_module(module)
    except BaseException:
        sys.modules.pop(spec.name, None)
        raise
    return module


class TrashJunkTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.trash_junk = load_script("trash_junk")

    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name).resolve()
        self.db_path = fresh_ledger(self.root)
        self.out = self.root / "junk.csv"
        self.backup = self.root / "ledger.backup.db"

    def add(self, asset_id, location, path, medium, size=1000, duration=None):
        connection = sqlite3.connect(self.db_path)
        try:
            connection.execute(
                "INSERT INTO asset(id,location,path,name,medium,size,duration) "
                "VALUES(?,?,?,?,?,?,?)",
                (asset_id, location, path, path.rsplit("\\", 1)[-1], medium,
                 size, duration),
            )
            connection.commit()
        finally:
            connection.close()

    def disposal(self, asset_id):
        connection = sqlite3.connect(self.db_path)
        try:
            return connection.execute(
                "SELECT disposal FROM asset WHERE id=?", (asset_id,)).fetchone()[0]
        finally:
            connection.close()

    def test_dry_run_lists_without_writing(self):
        self.add(1, "115", r"B:\广告\tuu26.com.mp4", "video", 10 * 1024**2, 60)

        code = self.trash_junk.main(["--db", str(self.db_path), "--out", str(self.out)])

        self.assertEqual(code, 0)
        self.assertIsNone(self.disposal(1))
        self.assertTrue(self.out.is_file())

    def test_apply_trashes_only_candidates_at_or_above_the_bar(self):
        self.add(1, "115", r"B:\广告\tuu26.com.mp4", "video", 10 * 1024**2, 60)
        self.add(2, "115", r"B:\番号\正片.mp4", "video", 400 * 1024**2, 900)

        code = self.trash_junk.main([
            "--db", str(self.db_path), "--out", str(self.out),
            "--apply", "--backup", str(self.backup),
        ])

        self.assertEqual(code, 0)
        self.assertEqual(self.disposal(1), "trash")
        self.assertIsNone(self.disposal(2))
        self.assertTrue(self.backup.is_file())

    def test_apply_without_backup_is_rejected(self):
        self.add(1, "115", r"B:\广告\tuu26.com.mp4", "video", 10 * 1024**2, 60)

        with self.assertRaises(SystemExit):
            self.trash_junk.main([
                "--db", str(self.db_path), "--out", str(self.out), "--apply",
            ])

        self.assertIsNone(self.disposal(1))

    def test_story_titles_are_not_promotion_evidence(self):
        self.add(1, "115", r"B:\作品\花式暴操包养的学妹.mp4", "video", 4000000, 20)
        self.add(2, "115", r"B:\作品\约炮应届毕业女大，太骚了.mp4", "video", 14000000, 207)
        self.add(3, "115", r"B:\作品\線上影片每天火熱更新中.avi", "video", 6000000, 40)
        candidates = self.trash_junk.select_candidates(self.db_path, min_score=40)
        self.assertEqual([row["id"] for row in candidates], [3])

    def reviewed_file(self, asset_id=1, suffix=".txt"):
        path = self.root / f"广告{asset_id}{suffix}"
        path.write_bytes(b"promotion")
        self.add(asset_id, "local", str(path), "other", path.stat().st_size)
        return path, {"id": str(asset_id), "path": str(path), "size": str(path.stat().st_size),
                      "decision": "delete", "confidence": "1", "why": "文件内容为地址发布广告"}

    def test_installer_web_components_and_unprobed_promos_enter_review(self):
        self.add(1, "115", r"B:\作品\1024_1.apk", "other")
        self.add(2, "115", r"B:\作品\资源站_files\style.css", "other")
        self.add(3, "115", r"B:\作品\下载APP.mp4", "video", 4000000)
        self.add(4, "115", r"B:\作品\下载APP.srt", "other")
        self.add(5, "115", r"B:\作品\作品.torrent", "other")
        self.add(6, "115", r"B:\作品\正片.mp4", "video", 4000000, 3)
        self.add(7, "115", r"B:\作品\下载APP失败探测.mp4", "video", 4000000, -1)
        candidates = self.trash_junk.select_candidates(self.db_path, min_score=40)
        self.assertEqual({row["id"] for row in candidates}, {1, 2, 3, 7})

    def test_review_manifest_requires_unique_ids_and_confirmed_evidence(self):
        _, review = self.reviewed_file()
        fields = list(review)
        for reviews in ([review, review], [{**review, "why": ""}],
                        [{**review, "confidence": ".8"}], [{**review, "confidence": "nan"}],
                        [{**review, "size": "-1"}]):
            self.trash_junk.write_rows(self.out, fields, reviews)
            with self.assertRaises(ValueError):
                self.trash_junk.load_review(self.out)
        self.trash_junk.write_rows(self.out, fields, [review, {**review, "decision": "retain"}])
        self.assertEqual(len(self.trash_junk.load_review(self.out)), 1)

    def purge(self, rows):
        connection = sqlite3.connect(self.db_path)
        connection.row_factory = sqlite3.Row
        self.addCleanup(connection.close)
        with mock.patch.object(self.trash_junk, "LOCATION_ROOT_DECLARATIONS", {"local": (str(self.root),)}):
            return self.trash_junk.purge_reviewed(connection, rows)

    def test_reviewed_purge_deletes_only_confirmed_file_and_ledger_row(self):
        path, review = self.reviewed_file()
        retained, _ = self.reviewed_file(2)
        result = self.purge([review])
        self.assertEqual(result["purged"], 1)
        self.assertFalse(path.exists())
        self.assertTrue(retained.exists())
        self.assertIsNone(self.disposal(2))

    def test_stale_review_rejects_whole_batch_before_any_file_is_removed(self):
        path, review = self.reviewed_file()
        changed, stale = self.reviewed_file(2)
        changed.write_bytes(b"changed content")
        with self.assertRaisesRegex(ValueError, "失效"):
            self.purge([review, stale])
        self.assertTrue(path.exists())
        self.assertTrue(changed.exists())
        self.assertIsNone(self.disposal(1))

    def test_purge_protects_sidecars_and_unmounted_roots(self):
        path, review = self.reviewed_file(suffix=".nfo")
        with self.assertRaisesRegex(ValueError, "资料与字幕"):
            self.purge([review])
        self.assertTrue(path.exists())
        with mock.patch.object(self.trash_junk, "root_online", return_value=False):
            with self.assertRaisesRegex(ValueError, "已挂载"):
                self.purge([review])

    def test_database_error_restores_quarantined_file(self):
        path, review = self.reviewed_file()
        with mock.patch.object(self.trash_junk, "verify_after_write", return_value=("broken", 0)):
            with self.assertRaisesRegex(RuntimeError, "校验失败"):
                self.purge([review])
        self.assertTrue(path.exists())
        self.assertIsNone(self.disposal(1))

    def test_purge_and_rollback_support_mounts_without_replace(self):
        path, review = self.reviewed_file()
        with mock.patch.object(os, "replace", side_effect=OSError("replacement unsupported")):
            with mock.patch.object(self.trash_junk, "verify_after_write", return_value=("broken", 0)):
                with self.assertRaisesRegex(RuntimeError, "校验失败"):
                    self.purge([review])
            self.assertTrue(path.exists())
            self.assertIsNone(self.disposal(1))
            self.assertEqual(self.purge([review])["purged"], 1)
            self.assertFalse(path.exists())

    def test_small_file_delete_with_local_backup_restores_on_database_error(self):
        from peach import web_batch
        path, review = self.reviewed_file()
        unsupported = OSError('rename unsupported')
        unsupported.winerror = 50
        with mock.patch.object(web_batch, 'GENERATED_DIR', self.root / 'generated'), mock.patch.object(os, 'rename', side_effect=unsupported):
            with mock.patch.object(self.trash_junk, 'verify_after_write', return_value=('broken', 0)):
                with self.assertRaisesRegex(RuntimeError, '校验失败'):
                    self.purge([review])
            self.assertEqual(path.read_bytes(), b'promotion')
            self.assertIsNone(self.disposal(1))
            self.assertEqual(self.purge([review])['purged'], 1)
            self.assertFalse(path.exists())
            self.assertEqual(list((self.root / 'generated' / 'purge-staging').iterdir()), [])

    def test_large_file_without_rename_is_preserved(self):
        from peach import web_batch
        path, review = self.reviewed_file()
        path.write_bytes(b'x' * (1024 * 1024 + 1))
        with closing(sqlite3.connect(self.db_path)) as connection:
            connection.execute('UPDATE asset SET size=? WHERE id=1', (path.stat().st_size,))
            connection.commit()
        review.update(size=str(path.stat().st_size))
        unsupported = OSError('rename unsupported')
        unsupported.winerror = 50
        with mock.patch.object(web_batch, 'GENERATED_DIR', self.root / 'generated'), mock.patch.object(os, 'rename', side_effect=unsupported):
            result = self.purge([review])
        self.assertEqual(result['purged'], 0)
        self.assertEqual(result['blocked'][0]['id'], 1)
        self.assertTrue(path.is_file())
        self.assertIsNone(self.disposal(1))

    def test_download_site_navigation_images_keep_content_attachments(self):
        from peach.web_batch import _attachment_junk_reason
        self.assertTrue(_attachment_junk_reason('.mp4', 'A:\\作品\\社 區 最 新 情 報.mp4', 15089802))
        self.assertEqual(_attachment_junk_reason('.mp4', 'A:\\作品\\社区最新情报合集.mp4', 15089802), '')
        for name in ('如何使用谷歌DNS让您更快进入下载网页步骤01.jpg',
                     '~Free Adult Movie, Fastest & Newest Porn Movie Site.jpg',
                     'hav.so_最新成人高清店長推薦強片天天更新.gif',
                     '__ HiHSP.pw 國產精品 高速下載 在線點播.png'):
            self.assertTrue(_attachment_junk_reason(Path(name).suffix, 'B:\\作品\\' + name, 50000))
        for name in ('images.rar', '作品封面.jpg', '作品字幕.srt', 'HiHSP.com-作品截图.jpg'):
            self.assertEqual(_attachment_junk_reason(Path(name).suffix, 'B:\\作品\\' + name, 50000), '')


if __name__ == "__main__":
    unittest.main()
