"""实体合并的墓碑（migration 0040）：旧 id 解析到并进去的那一条。

账本之外按实体 id 记下的东西（头像文件名、复核 CSV、页面上的 `/entity-image?id=`）在合并后
还拿着旧 id。墓碑让它们跳到现在的实体；目标没了就和目标一样查不到，不悬空。
"""
from __future__ import annotations

import importlib.util
import io
import shutil
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest import mock
from urllib.parse import parse_qs, urlsplit

from PIL import Image, ImageDraw

from peach.entities import merge_entity, resolve_entity_id
from peach.web_review import _use_canonical_entity_names

from support.ledger import fresh_ledger

HAS_DEPS = all(importlib.util.find_spec(name) for name in ("fastapi", "httpx"))


def add_person(connection, entity_id: int, name: str) -> None:
    connection.execute(
        "INSERT INTO entity(id,kind,canonical_name,normalized_name,created_at,updated_at)"
        " VALUES(?,'performer',?,?,'t','t')", (entity_id, name, name.casefold()))


def merge(connection, source_id: int, target_id: int, name: str) -> dict:
    moved = merge_entity(connection, target_id=target_id, source_id=source_id,
                         source_name=name, alias_source="test:merge")
    connection.commit()
    return moved


def picture(colour: str) -> bytes:
    buffer = io.BytesIO()
    image = Image.new("RGB", (40, 60), colour)
    ImageDraw.Draw(image).rectangle((0, 0, 40, 30), fill="black")
    image.save(buffer, format="JPEG")
    return buffer.getvalue()


class EntityRedirectTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.db = fresh_ledger(self.tmp.name)
        # 和服务、脚本的连接一样不开外键：ON DELETE 声明不会替我们收拾墓碑。
        self.con = sqlite3.connect(self.db)
        self.addCleanup(self.con.close)
        for entity_id, name in ((10, "橋本ありな"), (11, "新ありな"), (12, "桥本有菜")):
            add_person(self.con, entity_id, name)
        self.con.commit()

    def redirects(self) -> list[tuple]:
        return self.con.execute(
            "SELECT old_id,target_id FROM entity_redirect ORDER BY old_id").fetchall()

    def test_the_merged_id_resolves_to_the_target(self):
        merge(self.con, 11, 10, "新ありな")
        self.assertEqual(resolve_entity_id(self.con, 11), 10)
        self.assertEqual(resolve_entity_id(self.con, 10), 10)
        self.assertIsNone(resolve_entity_id(self.con, 999))
        self.assertEqual(self.con.execute(
            "SELECT source FROM entity_redirect WHERE old_id=11").fetchone(), ("test:merge",))

    def test_a_chain_of_merges_points_every_old_id_at_the_last_target(self):
        merge(self.con, 11, 10, "新ありな")
        moved = merge(self.con, 10, 12, "橋本ありな")
        self.assertEqual(self.redirects(), [(10, 12), (11, 12)])
        self.assertEqual(moved["redirects"], 1)
        self.assertEqual(resolve_entity_id(self.con, 11), 12)
        self.assertEqual(self.con.execute("PRAGMA foreign_key_check").fetchall(), [])

    def test_deleting_the_target_removes_its_redirects(self):
        """目标被删（标签改名、清理脚本都直接删 entity）时旧 id 和目标一样查不到。

        悬空的墓碑会让下一次合并后的 `foreign_key_check` 不为 0，ADR-0064 的后继按它回滚。
        """
        merge(self.con, 11, 10, "新ありな")
        self.con.execute("DELETE FROM entity WHERE id=10")
        self.con.commit()
        self.assertEqual(self.redirects(), [])
        self.assertIsNone(resolve_entity_id(self.con, 11))
        self.assertEqual(self.con.execute("PRAGMA foreign_key_check(entity_redirect)").fetchall(), [])

    def test_a_dangling_redirect_resolves_to_nothing(self):
        """绕开触发器留下的悬空行（比如重建 entity 表时丢了触发器）也不解析到死实体。"""
        merge(self.con, 11, 10, "新ありな")
        self.con.execute("DROP TRIGGER entity_redirect_target_delete")
        self.con.execute("DELETE FROM entity WHERE id=10")
        self.assertIsNone(resolve_entity_id(self.con, 11))

    def test_a_new_entity_that_reuses_the_id_wins_over_the_redirect(self):
        """`entity.id` 没有 AUTOINCREMENT，删掉的最大 id 会再发给下一条新实体。"""
        merge(self.con, 12, 10, "桥本有菜")
        add_person(self.con, 12, "別の人")
        self.con.commit()
        self.assertEqual(resolve_entity_id(self.con, 12), 12)
        self.assertEqual(self.redirects(), [])

    def test_merging_into_a_missing_or_the_same_entity_is_refused(self):
        with self.assertRaises(ValueError):
            merge_entity(self.con, target_id=999, source_id=11,
                         source_name="新ありな", alias_source="test:merge")
        with self.assertRaises(ValueError):
            merge_entity(self.con, target_id=11, source_id=11,
                         source_name="新ありな", alias_source="test:merge")
        self.assertIsNotNone(self.con.execute("SELECT 1 FROM entity WHERE id=11").fetchone())

    def test_follows_and_feed_subscriptions_follow_the_merge(self):
        """关注与订阅绑在人身上，合并后跟着走，不悬空在已删的实体上。"""
        self.con.executescript("""
          INSERT INTO follow_source(id,entity_id,provider,ref,label,url,created_at,updated_at)
            VALUES(1,11,'x','arina','arina','https://x.test/arina','t','t');
          INSERT INTO feed_source(id,kind,url,entity_id,created_at)
            VALUES(1,'javdb_actor','https://j.test/1',11,'t');
          INSERT INTO feed_discovery(id,code,discovered_at)
            VALUES(1,'ABC-001','t'),(2,'ABC-002','t');
          INSERT INTO feed_discovery_entity(discovery_id,entity_id) VALUES(1,10),(1,11),(2,11);
        """)
        moved = merge(self.con, 11, 10, "新ありな")
        self.assertEqual((moved["follows"], moved["feeds"], moved["discoveries"]), (1, 1, 1))
        self.assertEqual(self.con.execute("SELECT entity_id FROM follow_source").fetchall(), [(10,)])
        self.assertEqual(self.con.execute("SELECT entity_id FROM feed_source").fetchall(), [(10,)])
        self.assertEqual(self.con.execute(
            "SELECT discovery_id,entity_id FROM feed_discovery_entity ORDER BY 1").fetchall(),
            [(1, 10), (2, 10)])
        self.assertEqual(self.con.execute("PRAGMA foreign_key_check").fetchall(), [])

    def test_a_review_row_carrying_the_old_id_shows_the_target(self):
        """候选 CSV 的 `entity_id` 停在出候选那一刻；实体并入别人之后，这一行认现在那一条。"""
        merge(self.con, 11, 10, "新ありな")
        self.con.row_factory = sqlite3.Row
        rows = [{"entity_id": "11", "current_name": "Arina Arata"},
                {"entity_id": "12", "current_name": "桥本有菜"},
                {"entity_id": "999", "current_name": "nobody"}]
        _use_canonical_entity_names(self.con, rows)
        self.assertEqual([(row["entity_id"], row["current_name"]) for row in rows],
                         [("10", "橋本ありな"), ("12", "桥本有菜"), ("999", "nobody")])
        self.assertEqual(rows[0]["source_name"], "Arina Arata")


@unittest.skipUnless(HAS_DEPS, "FastAPI/httpx 尚未安装")
class EntityRedirectRouteTests(unittest.TestCase):
    """页面与接口拿着旧 id 或旧名来，落到并进去的那一条。"""

    def setUp(self):
        from fastapi.testclient import TestClient
        from peach.api import create_app
        from peach.config import PeachSettings

        self.folder = Path(tempfile.mkdtemp()).resolve()
        self.addCleanup(shutil.rmtree, self.folder, True)
        self.avatars = self.folder / "avatars"
        self.avatars.mkdir()
        database = fresh_ledger(self.folder)
        connection = sqlite3.connect(database)
        add_person(connection, 10, "橋本ありな")
        add_person(connection, 11, "新ありな")
        connection.execute(
            "INSERT INTO asset(id,location,path,name,medium) VALUES(1,'local',?,'1.mp4','video')",
            (r"R:\media\1.mp4",))
        connection.execute(
            "INSERT INTO asset_entity(asset_id,entity_id,role,source,confidence)"
            " VALUES(1,11,'performer','test',1.0)")
        connection.commit()
        merge(connection, 11, 10, "新ありな")
        connection.close()
        self.face = mock.patch("peach.avatar_provider.FaceProbe").start()
        self.face.return_value.return_value = None
        self.addCleanup(mock.patch.stopall)
        self.app = create_app(PeachSettings(
            db_path=database, configured=True, token="secret", avatar_root=self.avatars,
            candidate_root=self.folder / "generated", cover_root=self.folder / "covers"))
        self.client = TestClient(self.app)
        self.addCleanup(self.client.close)

    def test_the_old_name_opens_the_target_page(self):
        response = self.client.get("/api/entity", params={
            "kind": "performer", "name": "新ありな", "t": "secret"})
        self.assertEqual(response.status_code, 200, response.text)
        self.assertEqual(response.json()["id"], 10)
        self.assertEqual(response.json()["canonical_name"], "橋本ありな")

    def test_an_old_image_address_redirects_to_the_target(self):
        body = picture("navy")
        (self.avatars / "performer-10.img").write_bytes(body)
        response = self.client.get(
            "/entity-image", params={"kind": "performer", "id": 11, "thumb": 1, "t": "secret"},
            follow_redirects=False)
        self.assertEqual(response.status_code, 307)
        location = urlsplit(response.headers["location"])
        self.assertEqual((location.scheme, location.netloc, location.path), ("", "", "/entity-image"))
        self.assertEqual(parse_qs(location.query),
                         {"kind": ["performer"], "id": ["10"], "thumb": ["1"], "t": ["secret"]})
        followed = self.client.get(
            "/entity-image", params={"kind": "performer", "id": 11, "t": "secret"})
        self.assertEqual(followed.status_code, 200)
        self.assertEqual(followed.content, body)

    def test_an_unknown_id_still_404s(self):
        response = self.client.get(
            "/entity-image", params={"kind": "performer", "id": 999, "t": "secret"},
            follow_redirects=False)
        self.assertEqual(response.status_code, 404)

    def test_a_picture_picked_under_the_old_id_lands_on_the_target(self):
        body = picture("olive")
        response = self.client.post(
            "/api/avatar-pick?id=11&kind=performer&name=me.jpg&t=secret",
            content=body, headers={"content-type": "image/jpeg"})
        self.assertEqual(response.status_code, 200, response.text)
        self.assertEqual(response.json()["id"], 10)
        self.assertEqual((self.avatars / "performer-10.img").read_bytes(), body)
        self.assertFalse((self.avatars / "performer-11.img").exists())


if __name__ == "__main__":
    unittest.main()
