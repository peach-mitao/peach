"""撞号的韩国 MIB 前缀只在韩国 MIB 目录里算韩国 MIB。

YUJ 同时是韩国 MIB 的字母段和 r18.dev 上 Attackers 厂牌「誘女」的番号。
文件在目录名 `韩国`、`MIB` 或 `K-MIB` 里时算韩国 MIB；在这些目录外按普通日本番号
问来源，产地不推断成韩国。没有带目录的路径时算韩国 MIB。
"""
from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from peach.catalog_rules import is_korean_mib_code
from peach.jav_cover_fetch import MIB_NOT_JAV, Unavailable, best_cover
from peach.metadata_routes import classify, route_for_code
from peach.regions import infer_region
from peach.repository import LedgerDatabase
from peach.web_catalog import effective_region_sql

OUTSIDE = "/media/jav/YUJ-101.mp4"
INSIDE_MIB = r"D:\library\MIB\YUJ-101.mp4"
INSIDE_KR = r"D:\library\韩国\YUJ-001.mp4"
INSIDE_KMIB = r"D:\library\K-MIB\YUJ-101.mp4"
INSIDE_NESTED = "/media/library/kmib/sub/YUJ-001.mp4"
FILENAME_ONLY = "/media/jav/YUJ-101 MIB.mp4"


class AmbiguousPrefixTests(unittest.TestCase):
    def test_only_the_confirmed_collision_is_ambiguous(self):
        from peach.catalog_rules import AMBIGUOUS_MIB_PREFIXES
        self.assertEqual(AMBIGUOUS_MIB_PREFIXES, frozenset({"YUJ"}))

    def test_a_code_without_a_path_stays_korean_mib(self):
        self.assertTrue(is_korean_mib_code("YUJ-101"))
        self.assertTrue(is_korean_mib_code("YUJ-001", None, "", "MIB"))
        self.assertEqual(classify("YUJ-101"), "kmib")
        self.assertEqual(route_for_code("YUJ-101"), ())
        self.assertEqual(infer_region("YUJ-101", "YUJ-101.mp4"), "kr")

    def test_yuj_outside_the_korean_folder_is_a_japanese_code(self):
        hints = (OUTSIDE, "YUJ-101.mp4", "MIB")
        self.assertFalse(is_korean_mib_code("YUJ-101", *hints))
        self.assertEqual(classify("YUJ-101", *hints), "censored")
        route = route_for_code("YUJ-101", *hints)
        self.assertIn("r18dev", route)
        self.assertEqual(infer_region("YUJ-101", "YUJ-101.mp4", OUTSIDE), "")

    def test_the_same_code_inside_the_korean_folder_stays_kmib(self):
        for path in (INSIDE_MIB, INSIDE_KR, INSIDE_KMIB, INSIDE_NESTED,
                     r"D:\library\kmib\YUJ-001.mp4"):
            with self.subTest(path=path):
                self.assertTrue(is_korean_mib_code("YUJ-101", path))
                self.assertEqual(classify("YUJ-101", path, "YUJ-101.mp4", "MIB"), "kmib")
                self.assertEqual(route_for_code("YUJ-101", path), ())
                self.assertEqual(infer_region("YUJ-101", "YUJ-101.mp4", path), "kr")

    def test_a_lookalike_directory_or_filename_is_not_the_folder(self):
        self.assertFalse(is_korean_mib_code("YUJ-101", FILENAME_ONLY, "MIB"))
        self.assertFalse(is_korean_mib_code("YUJ-101", "/media/jav/MIBX/YUJ-101.mp4"))
        self.assertFalse(is_korean_mib_code("YUJ-101", "/media/jav/premium/YUJ-101.mp4"))
        self.assertFalse(is_korean_mib_code("YUJ-001", r"D:\韩国片\YUJ-001.mp4"))

    def test_other_mib_prefixes_stay_korean_outside_the_folder(self):
        for code in ("HA-101", "NOAH-101", "SUY-101"):
            with self.subTest(code=code):
                self.assertTrue(is_korean_mib_code(code, OUTSIDE))
                self.assertEqual(classify(code, OUTSIDE), "kmib")
                self.assertEqual(infer_region(code, code + ".mp4", OUTSIDE), "kr")

    def test_cover_fetch_follows_the_folder(self):
        def explode(*_args, **_kwargs):
            raise RuntimeError("queried")

        with self.assertRaises(Unavailable) as caught:
            best_cover(explode, "YUJ-101", 0, path_hints=(INSIDE_MIB,))
        self.assertEqual(str(caught.exception), MIB_NOT_JAV)
        with self.assertRaises(Exception) as caught:
            best_cover(explode, "YUJ-101", 0, path_hints=(OUTSIDE,))
        self.assertNotEqual(str(caught.exception), MIB_NOT_JAV)

    def test_sql_infer_region_uses_the_file_path(self):
        self.assertIn("infer_region(a.code,a.name,a.path)", effective_region_sql("a"))
        with tempfile.TemporaryDirectory() as directory:
            connection = LedgerDatabase(Path(directory) / "ledger.db").connect(write=True)
            try:
                two = connection.execute(
                    "SELECT infer_region(?, ?)", ("YUJ-101", "YUJ-101.mp4")).fetchone()[0]
                outside = connection.execute(
                    "SELECT infer_region(?, ?, ?)",
                    ("YUJ-101", "YUJ-101.mp4", OUTSIDE)).fetchone()[0]
                inside = connection.execute(
                    "SELECT infer_region(?, ?, ?)",
                    ("YUJ-101", "YUJ-101.mp4", INSIDE_MIB)).fetchone()[0]
                other = connection.execute(
                    "SELECT infer_region(?, ?, ?)",
                    ("HA-101", "HA-101.mp4", OUTSIDE)).fetchone()[0]
            finally:
                connection.close()
        self.assertEqual(two, "kr")
        self.assertEqual(outside, "")
        self.assertEqual(inside, "kr")
        self.assertEqual(other, "kr")
