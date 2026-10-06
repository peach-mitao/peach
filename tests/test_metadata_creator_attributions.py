"""创作者审计保留独立身份、保护人工判断，并可整批回滚。"""
import sqlite3
import tempfile
import unittest
import json
from pathlib import Path
from types import SimpleNamespace

from peach.entities import upsert_asset_entity
from peach.field_owners import write_owned_fields
from peach.metadata_creator_attributions import apply_plan, collect, restore
from tests.support.ledger import fresh_ledger
from scripts import audit_creator_attributions as audit


class CreatorAttributionTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.db = fresh_ledger(Path(self.directory.name).resolve())
        self.connection = sqlite3.connect(self.db)
        self.addCleanup(self.connection.close)

    def asset(self, name, *, path=None, studio=None, code=None, source='legacy:asset', metadata=None):
        cursor = self.connection.execute(
            "INSERT INTO asset(location,path,name,medium,creator,studio,code) VALUES('local',?,?,'video',?,?,?)",
            (path or f'B:\\创作者\\{name}\\clip.mp4', (path or 'clip.mp4').rsplit('\\', 1)[-1], name, studio, code))
        asset_id = cursor.lastrowid
        # 历史错误直接造在夹具里，摄取入口本身须拒绝发行平台。
        held = self.connection.execute("SELECT id FROM entity WHERE kind='creator' AND canonical_name=?", (name,)).fetchone()
        if held:
            entity_id = held[0]
        else:
            entity_id = self.connection.execute(
                "INSERT INTO entity(kind,canonical_name,normalized_name,created_at,updated_at) VALUES('creator',?,?,'t','t')",
                (name, name.casefold())).lastrowid
        self.connection.execute("INSERT INTO asset_entity(asset_id,entity_id,role,source,metadata_json) VALUES(?,?,'creator',?,?)",
                                (asset_id, entity_id, source, metadata or '{}'))
        return asset_id, entity_id

    def plan(self):
        return [row for row in collect(self.connection) if row['action'] == 'remove']

    def test_platform_is_not_ingested_as_creator(self):
        asset_id, _ = self.asset('RealSeller')
        entity_id = upsert_asset_entity(self.connection, kind='creator', name='Myfans',
                                        asset_id=asset_id, role='creator', source='user:manual')
        self.assertIsNone(entity_id)
        self.assertEqual(self.connection.execute("SELECT count(*) FROM entity WHERE canonical_name='Myfans'").fetchone()[0], 0)

    def test_audit_covers_all_sources_and_preserves_accounts_and_manual_identity(self):
        self.asset('Myfans')
        self.asset('Alice', path='https://example.test/users/alice')
        self.asset('ConfirmedSeller', source='user:watermark')
        self.asset('banbi_555', path=r'B:\创作者\banbi_555\a title.mp4')
        self.asset('FC2-PPV', source='user:manual')
        rows = collect(self.connection)
        self.assertEqual(len(rows), 5)
        self.assertEqual([row['current_creator'] for row in rows if row['action']=='remove'], ['Myfans'])
        self.assertEqual({row['verdict'] for row in rows}, {'platform','online_account','source_identity','identifier_candidate'})

    def test_studio_aliases_and_dated_scene_titles_have_file_evidence(self):
        asset_id, _ = self.asset('Das', studio='ダスッ！')
        studio_id = upsert_asset_entity(self.connection, kind='studio', name='ダスッ！',
                                        asset_id=asset_id, role='studio', source='release:studio')
        self.connection.execute("INSERT INTO entity_alias(entity_id,alias,normalized_alias,source) VALUES(?,'Das','das','release')", (studio_id,))
        self.asset('Freya Mayer Ready to Serve You', path=r'B:\西方\DarkRoomVR.21.04.02.Freya.Mayer.Ready.to.Serve.You.XXX\movie.mp4', studio='DarkRoomVR')
        self.asset('Jane Doe', path=r'B:\西方\Studio.21.04.02.Jane.Doe.XXX\movie.mp4')
        self.asset('DPMI-058_000', path=r'B:\云下载\DPMI-058_000\dpmi00058hhb_000.mp4')
        self.asset('ABW-123', path=r'B:\云下载\ABW-123\ABW-123.mp4', code='ABW-123')
        self.assertEqual({row['current_creator']: row['verdict'] for row in self.plan()}, {
            'Das':'studio', 'Freya Mayer Ready to Serve You':'release_title',
            'DPMI-058_000':'release_identifier', 'ABW-123':'release_identifier'})

    def test_repair_and_restore_preserve_identity_metadata_and_personal_records(self):
        asset_id, entity_id = self.asset('Myfans', metadata='{"evidence":"folder"}')
        self.connection.execute('UPDATE asset SET play_count=9,rating=4 WHERE id=?', (asset_id,))
        self.connection.commit()
        plan = self.plan()
        with self.connection:
            manifest = apply_plan(self.connection, plan)
        self.assertEqual(len(manifest['relations']), 1)
        self.assertEqual(self.connection.execute('SELECT creator,play_count,rating FROM asset WHERE id=?', (asset_id,)).fetchone(), (None,9,4))
        self.assertEqual(self.connection.execute('SELECT canonical_name FROM entity WHERE id=?', (entity_id,)).fetchone(), ('Myfans',))
        with self.connection:
            restore(self.connection, manifest)
        self.assertEqual(self.connection.execute('SELECT creator,play_count,rating FROM asset WHERE id=?', (asset_id,)).fetchone(), ('Myfans',9,4))
        self.assertEqual(self.connection.execute('SELECT metadata_json FROM asset_entity WHERE asset_id=?', (asset_id,)).fetchone(), ('{"evidence":"folder"}',))
        self.assertEqual(self.connection.execute('PRAGMA foreign_key_check').fetchall(), [])

    def test_stale_plan_and_later_edits_reject_whole_batch(self):
        asset_id, _ = self.asset('Myfans')
        other_id, _ = self.asset('FC2-PPV')
        self.connection.commit()
        plan = self.plan()
        write_owned_fields(self.connection, [asset_id], {'creator':'Seller'}, 'user:manual')
        self.connection.commit()
        with self.assertRaisesRegex(ValueError, '计划'):
            with self.connection:
                apply_plan(self.connection, plan)
        self.assertEqual(self.connection.execute('SELECT count(*) FROM asset_entity').fetchone()[0], 2)
        with self.connection:
            manifest = apply_plan(self.connection, self.plan())
        write_owned_fields(self.connection, [other_id], {'creator':'VerifiedSeller'}, 'user:manual')
        self.connection.commit()
        with self.assertRaisesRegex(ValueError, '后续改动'):
            with self.connection:
                restore(self.connection, manifest)
        self.assertEqual(self.connection.execute('SELECT creator FROM asset WHERE id=?', (other_id,)).fetchone()[0], 'VerifiedSeller')

    def test_protected_and_independent_identity_are_reviewed(self):
        asset_id, entity_id = self.asset('Myfans')
        write_owned_fields(self.connection, [asset_id], {'creator':'Myfans'}, 'review:identity')
        self.asset('FC2-PPV')
        self.connection.execute("INSERT INTO entity_external_ref(entity_id,provider,external_kind,external_id) VALUES(?, 'site','creator','seller-12')", (entity_id,))
        self.assertEqual([row['current_creator'] for row in self.plan()], ['FC2-PPV'])

    def test_publisher_moves_to_existing_studio_and_restores_as_a_batch(self):
        studio_asset, _ = self.asset('Alice')
        studio_id = upsert_asset_entity(self.connection, kind='studio', name='Vixen',
                                        asset_id=studio_asset, role='studio', source='release:studio', metadata={'official':'preserved'})
        studio_before = self.connection.execute('SELECT metadata_json,updated_at FROM entity WHERE id=?', (studio_id,)).fetchone()
        asset_id, creator_id = self.asset('Vixen', path=r'B:\云下载\A Scene [Vixen.com]\scene.mp4')
        self.connection.commit()
        with self.connection:
            manifest = apply_plan(self.connection, self.plan())
        self.assertEqual(self.connection.execute('SELECT creator,studio FROM asset WHERE id=?', (asset_id,)).fetchone(), (None,'Vixen'))
        self.assertEqual(self.connection.execute('SELECT entity_id,role FROM asset_entity WHERE asset_id=?', (asset_id,)).fetchall(), [(studio_id,'studio')])
        self.assertEqual(self.connection.execute('SELECT metadata_json,updated_at FROM entity WHERE id=?', (studio_id,)).fetchone(), studio_before)
        with self.connection:
            restore(self.connection, manifest)
        self.assertEqual(self.connection.execute('SELECT creator,studio FROM asset WHERE id=?', (asset_id,)).fetchone(), ('Vixen',None))
        self.assertEqual(self.connection.execute('SELECT entity_id,role FROM asset_entity WHERE asset_id=?', (asset_id,)).fetchall(), [(creator_id,'creator')])

    def test_site_post_identity_requires_matching_file_and_preserves_accounts(self):
        self.asset('[7sht.me]legsjapan-955', path=r'B:\云下载\[7sht.me]legsjapan-955\legsjapan-955.mp4')
        self.asset('fellatiojapan-312', path=r'B:\云下载\fellatiojapan-312\fellatiojapan-312.mp4')
        self.asset('legsjapan-999', path=r'B:\创作者\legsjapan-999\a title.mp4')
        self.assertEqual({row['current_creator'] for row in self.plan()}, {'[7sht.me]legsjapan-955','fellatiojapan-312'})

    def test_restore_refuses_a_creator_relation_added_without_flat_field_changes(self):
        asset_id, _ = self.asset('Myfans')
        self.connection.commit()
        with self.connection:
            manifest = apply_plan(self.connection, self.plan())
        upsert_asset_entity(self.connection, kind='creator', name='NewSeller', asset_id=asset_id,
                            role='creator', source='user:manual')
        self.connection.commit()
        with self.assertRaisesRegex(ValueError, '关系已发生后续改动'):
            with self.connection:
                restore(self.connection, manifest)

    def test_cli_preserves_existing_foreign_key_violations_and_keeps_a_restore_manifest(self):
        _, entity_id = self.asset('Myfans')
        self.connection.execute("INSERT INTO asset_entity(asset_id,entity_id,role,source) VALUES(99999,?,'tag','legacy')", (entity_id,))
        self.connection.commit()
        baseline = self.connection.execute('PRAGMA foreign_key_check').fetchall()
        manifest = self.db.parent / 'manifest.json'
        args = SimpleNamespace(db=self.db, apply=True, backup=self.db.parent/'before.db', restore=None, manifest=manifest)
        audit._write_ledger(args, {'rows':self.plan()})
        payload = json.loads(manifest.read_text(encoding='utf-8'))
        self.assertEqual(payload['status'], 'committed')
        self.assertEqual(self.connection.execute('PRAGMA foreign_key_check').fetchall(), baseline)
        args.backup = self.db.parent / 'repaired.db'
        args.restore = manifest
        args.manifest = None
        audit._write_ledger(args, payload)
        self.assertEqual(self.connection.execute('SELECT creator FROM asset').fetchone()[0], 'Myfans')
        self.assertEqual(self.connection.execute('PRAGMA foreign_key_check').fetchall(), baseline)


if __name__ == '__main__':
    unittest.main()
