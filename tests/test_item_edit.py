"""单片编辑：版本含义、本地配套资料和手动保存边界。"""
import base64
from contextlib import closing, ExitStack
import io
import json
import os
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from PIL import Image

from peach.catalog_rules import jav_edition_badges, local_cover_code
from peach import web_contract
from peach.library_nfo import read_nfo
from support.ledger import fresh_ledger


class EditionMeaningTests(unittest.TestCase):
    def test_compact_names_keep_their_identity_and_version_flags(self):
        for name, code, badges in (
            ('ixp061 樱空桃.mp4', 'IXP-061', []),
            ('laf21u.mp4', 'LAF-021', ['无码破解']),
            ('laf21r.mp4', 'LAF-021', ['中字']),
            ('laf21uc.mp4', 'LAF-021', ['中字', '无码破解']),
        ):
            with self.subTest(name=name):
                self.assertEqual(local_cover_code(name), code)
                self.assertEqual(jav_edition_badges(name, code), badges)

    def test_filename_versions_keep_the_release_identity(self):
        for suffix, badges in (('C', ['中字']), ('r', ['中字']), ('R', ['中字']),
                               ('U', ['无码破解']), ('UC', ['中字', '无码破解']),
                               (' [无修正]', ['无码破解']), (' uncensored', ['无码破解'])):
            with self.subTest(suffix=suffix):
                name = 'MDS-685' + suffix + '.mp4'
                self.assertEqual(local_cover_code(name), 'MDS-685')
                self.assertEqual(jav_edition_badges(name, 'MDS-685'), badges)

    def test_title_words_and_special_release_identities_are_not_version_flags(self):
        for name, code in (('MDS-685 RED ROOM.mp4', 'MDS-685'),
                           ('FC2-PPV-123456.mp4', 'FC2-PPV-123456')):
            self.assertNotIn('中字', jav_edition_badges(name, code))


class ItemEditTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name).resolve()
        self.roots = mock.patch('peach.web_item_edit.location_roots', return_value={'local': (str(self.root),)})
        self.roots.start()
        self.addCleanup(self.roots.stop)
        self.db = fresh_ledger(self.root)
        self.video = self.root / 'MDS-685r.mp4'
        self.video.write_bytes(b'original video bytes')
        with closing(sqlite3.connect(self.db)) as connection, connection:
            connection.execute("INSERT INTO asset(id,location,path,name,medium,code) VALUES(1,'local',?,?,'video','MDS-685')",
                               (str(self.video), self.video.name))
        self.contract = web_contract.WebContract(self.db, candidate_root=self.root / 'generated',
                                                cover_root=self.root / 'covers')

    def get_form(self):
        try:
            result = web_contract.dispatch_api_get(self.contract, '/api/item-edit', {'id': '1'})
        except KeyError:
            self.fail('单片编辑读取入口尚未登记')
        self.assertIsInstance(result, dict)
        return result

    def save(self, **fields):
        form = self.get_form()
        body = dict(id=1, expected_revision=form['mutation_revision'], expected_name=form['filename'],
                    filename=form['filename'], title=form['title'], performers=form['performers'])
        body.update(fields)
        return web_contract.dispatch_api_post(self.contract, '/api/item-edit', body)

    def metadata_group(self, field, value):
        candidate = dict(source='local_nfo', candidate_key='local-' + field,
                         confidence=1.0, provider_id='MDS-685', value=value,
                         display_value=value if isinstance(value, str) else '')
        return dict(item_key='asset:1:' + field, asset_id=1, asset_path=str(self.video),
                    code='MDS-685', query='MDS-685', field=field, status='candidate',
                    current_value='', candidates_json=json.dumps([candidate])), candidate

    def apply_metadata(self, field, value):
        from peach.metadata_auto_apply import auto_apply_metadata
        group, _candidate = self.metadata_group(field, value)
        result = auto_apply_metadata(self.contract.database, self.root / 'generated',
                                     asset_ids=[1], candidate_rows=[group])
        self.assertEqual(result['applied'], 1)
        return result

    def test_form_opened_before_actor_import_cannot_clear_imported_actors(self):
        from peach.field_owners import RevisionConflict
        form = self.get_form()
        self.apply_metadata('performers', [{'name': '涼森れむ'}])
        with self.assertRaises(RevisionConflict):
            self.save(expected_revision=form['mutation_revision'], title='保留的新片名',
                      performers=form['performers'])
        self.assertEqual(self.get_form()['performers'], ['涼森れむ'])
        self.assertFalse(self.video.with_suffix('.nfo').exists())

    def test_explicit_code_save_preserves_a_numbered_water_pole_title(self):
        filename = 'WPC-009-UC WATER POLE 09 示例演员.mp4'
        result = self.save(code='WPC-009', filename=filename,
                           title='WATER POLE 09 示例演员', performers=['示例演员'])
        target = self.root / filename
        self.assertEqual(result['name'], filename)
        self.assertEqual(target.read_bytes(), b'original video bytes')
        payload, _raw = read_nfo(target.with_suffix('.nfo'))
        self.assertEqual(payload['id'], 'WPC-009')
        self.assertEqual(payload['title'], 'WATER POLE 09 示例演员')
        self.assertEqual(self.get_form()['performers'], ['示例演员'])
        self.assertEqual(jav_edition_badges(filename, 'WPC-009'), ['中字', '无码破解'])

    def test_actor_import_preserves_global_profile_and_agency_rejections(self):
        from peach.entities import upsert_asset_entity
        metadata = {'agency_rejected': [{'name': '错误事务所', 'source': 'user:manual'}],
                    'profile': {'height': 168}}
        with self.contract.write_transaction() as connection:
            entity_id = upsert_asset_entity(connection, kind='performer', name='涼森れむ',
                asset_id=1, role='performer', source='user:manual', metadata=metadata)
            connection.execute('DELETE FROM asset_entity WHERE asset_id=1')
        self.apply_metadata('performers', [{'name': '涼森れむ'}, {'name': '演员甲'}])
        with self.contract.read_connection() as connection:
            held = json.loads(connection.execute('SELECT metadata_json FROM entity WHERE id=?',
                                                 (entity_id,)).fetchone()[0])
            self.assertEqual(held, metadata)
            link = connection.execute('SELECT source,metadata_json FROM asset_entity '
                'WHERE asset_id=1 AND entity_id=?', (entity_id,)).fetchone()
            self.assertEqual(link['source'], 'javinizer:local_nfo:performer')
            self.assertEqual(json.loads(link['metadata_json'])['source'], 'local_nfo')
        self.assertEqual(set(self.get_form()['performers']), {'涼森れむ', '演员甲'})

    def test_relation_value_changes_advance_revision_but_same_values_do_not(self):
        from peach.metadata_auto_apply import _apply_metadata_candidate
        for field, first, second in (
            ('performers', [{'name': '演员甲'}], [{'name': '演员乙'}]),
            ('tags', ['巨乳'], ['巨乳', '制服']),
        ):
            with self.subTest(field=field):
                group, candidate = self.metadata_group(field, first)
                revision = self.get_form()['mutation_revision']
                with self.contract.write_transaction() as connection:
                    _apply_metadata_candidate(connection, group, candidate, '2026-01-01', 'auto:local_nfo')
                self.assertEqual(self.get_form()['mutation_revision'], revision + 1)
                with self.contract.write_transaction() as connection:
                    _apply_metadata_candidate(connection, group, candidate, '2026-01-02', 'auto:local_nfo')
                self.assertEqual(self.get_form()['mutation_revision'], revision + 1)
                candidate['value'] = second
                with self.contract.write_transaction() as connection:
                    _apply_metadata_candidate(connection, group, candidate, '2026-01-03', 'auto:local_nfo')
                self.assertEqual(self.get_form()['mutation_revision'], revision + 2)

    def test_single_item_title_import_ignores_an_unselected_versions_manual_owner(self):
        from peach.field_owners import write_owned_fields
        peer = self.video.with_suffix('.mkv')
        peer.write_bytes(b'unselected version')
        with self.contract.write_transaction() as connection:
            connection.execute("INSERT INTO asset(id,location,path,name,medium,code) "
                "VALUES(2,'local',?,?,'video','MDS-685')", (str(peer), peer.name))
            write_owned_fields(connection, [2], {'catalog_title': '另一版本的人工片名'}, 'user:manual')
        self.apply_metadata('title', '当前版本的本地片名')
        self.assertEqual(self.get_form()['title'], '当前版本的本地片名')
        with self.contract.read_connection() as connection:
            held = connection.execute('SELECT catalog_title,field_owners FROM asset WHERE id=2').fetchone()
            self.assertEqual(held['catalog_title'], '另一版本的人工片名')
            self.assertEqual(json.loads(held['field_owners'])['catalog_title'], 'user:manual')

    def test_shared_sidecars_remain_with_the_unselected_video_version(self):
        from peach.library_nfo import sidecars
        from peach.subtitles import subtitles_for
        peer = self.video.with_suffix('.mkv')
        peer.write_bytes(b'unselected version')
        nfo = self.video.with_suffix('.nfo')
        nfo.write_text('<movie><uniqueid type="num">MDS-685</uniqueid><title>共同片名</title>'
                       '<art><poster>MDS-685r-poster.jpg</poster></art></movie>', encoding='utf-8')
        subtitle = self.video.with_suffix('.srt')
        subtitle.write_bytes(b'shared subtitles')
        poster = self.video.with_name(self.video.stem + '-poster.jpg')
        Image.new('RGB', (640, 900), 'gray').save(poster)
        originals = {path: path.read_bytes() for path in (peer, nfo, subtitle, poster)}
        with self.contract.write_transaction() as connection:
            connection.execute("INSERT INTO asset(id,location,path,name,medium,code) "
                "VALUES(2,'local',?,?,'video','MDS-685')", (str(peer), peer.name))
            connection.execute('INSERT INTO asset_subtitle(asset_id,location,path,name,format,pairing,'
                "first_seen,last_seen) VALUES(2,'local',?,?,'srt','exact','now','now')",
                (str(subtitle), subtitle.name))
        result = self.save(code='ABW-232')
        self.assertEqual(result['code'], 'ABW-232')
        self.assertEqual({path: path.read_bytes() for path in originals}, originals)
        self.assertEqual(sidecars(peer)[0], nfo)
        self.assertEqual(read_nfo(self.root / 'ABW-232r.nfo')[0]['id'], 'ABW-232')
        self.assertEqual((self.root / 'ABW-232r.srt').read_bytes(), b'shared subtitles')
        self.assertEqual((self.root / 'ABW-232r-poster.jpg').read_bytes(), originals[poster])
        with self.contract.read_connection() as connection:
            self.assertEqual(Path(subtitles_for(connection, 2)[0]['path']), subtitle)
            self.assertEqual(Path(subtitles_for(connection, 1)[0]['path']), self.root / 'ABW-232r.srt')

    def test_editing_a_shared_nfo_in_place_requires_an_independent_filename(self):
        peer = self.video.with_suffix('.mkv')
        peer.write_bytes(b'unselected version')
        nfo = self.video.with_suffix('.nfo')
        nfo.write_text('<movie><title>共同片名</title></movie>', encoding='utf-8')
        before = nfo.read_bytes()
        with self.assertRaisesRegex(ValueError, '共享|共用'):
            self.save(title='只属于当前版本的片名')
        self.assertEqual(nfo.read_bytes(), before)
        self.assertEqual(self.get_form()['title'], '')

    def test_failed_shared_sidecar_save_restores_only_the_selected_copies(self):
        peer = self.video.with_suffix('.mkv')
        peer.write_bytes(b'unselected version')
        nfo = self.video.with_suffix('.nfo')
        nfo.write_text('<movie><title>共同片名</title></movie>', encoding='utf-8')
        subtitle = self.video.with_suffix('.srt')
        subtitle.write_bytes(b'shared subtitles')
        originals = {path: path.read_bytes() for path in (self.video, peer, nfo, subtitle)}
        with mock.patch('peach.web_item_edit.write_owned_fields', side_effect=sqlite3.OperationalError('模拟失败')):
            with self.assertRaises(sqlite3.OperationalError):
                self.save(code='ABW-232', title='只属于当前版本')
        self.assertEqual({path: path.read_bytes() for path in originals}, originals)
        self.assertFalse(any(self.root.glob('ABW-232*')))
        self.assertEqual(self.get_form()['code'], 'MDS-685')

    def test_renaming_does_not_claim_a_distinct_stem_peers_subtitle(self):
        from peach.subtitles import subtitles_for
        peer = self.root / 'MDS-685r.zh.mkv'
        peer.write_bytes(b'peer video')
        subtitle = self.root / 'MDS-685r.zh.srt'
        subtitle.write_bytes(b'peer-private subtitles')
        with self.contract.write_transaction() as connection:
            connection.execute("INSERT INTO asset(id,location,path,name,medium,code) "
                "VALUES(2,'local',?,?,'video','MDS-685')", (str(peer), peer.name))
            connection.execute('INSERT INTO asset_subtitle(asset_id,location,path,name,format,pairing,'
                "first_seen,last_seen) VALUES(2,'local',?,?,'srt','exact','now','now')",
                (str(subtitle), subtitle.name))
        self.save(code='ABW-232')
        self.assertEqual(subtitle.read_bytes(), b'peer-private subtitles')
        self.assertFalse((self.root / 'ABW-232r.zh.srt').exists())
        with self.contract.read_connection() as connection:
            self.assertEqual(Path(subtitles_for(connection, 2)[0]['path']), subtitle)
            self.assertEqual(subtitles_for(connection, 1), [])

    def test_renaming_preserves_a_poster_named_for_another_video(self):
        target = self.root / 'movie.mp4'
        self.video.rename(target)
        self.video = target
        with self.contract.write_transaction() as connection:
            connection.execute('UPDATE asset SET path=?,name=?,code=NULL WHERE id=1',
                               (str(target), target.name))
        peer = self.root / 'movie-poster.mkv'
        peer.write_bytes(b'other video')
        poster = self.root / 'movie-poster.jpg'
        Image.new('RGB', (32, 48), 'gray').save(poster)
        original = poster.read_bytes()
        self.save(filename='renamed.mp4')
        self.assertTrue(poster.exists())
        self.assertEqual(poster.read_bytes(), original)
        self.assertEqual((self.root / 'renamed-poster.jpg').read_bytes(), original)
        self.assertEqual(peer.read_bytes(), b'other video')

    def test_shared_file_checks_do_not_rematch_unrelated_videos_in_a_large_folder(self):
        from peach.library_nfo import SidecarIndex
        from peach.web_item_edit import _companions
        peer = self.video.with_suffix('.mkv')
        peer.write_bytes(b'same work')
        self.video.with_suffix('.nfo').write_text('<movie/>', encoding='utf-8')
        for number in range(100, 164):
            unrelated = self.root / f'ABW-{number}.mp4'
            unrelated.write_bytes(b'other work')
            unrelated.with_suffix('.nfo').write_text('<movie/>', encoding='utf-8')
        examined = []
        original = SidecarIndex.for_video
        def track(index, video):
            examined.append(video.name)
            return original(index, video)
        with mock.patch.object(SidecarIndex, 'for_video', track):
            _companions(self.video, self.root / 'ABW-232r.mp4')
        self.assertEqual(examined, [peer.name])

    def test_number_edit_replaces_all_recognised_nfo_identity_elements(self):
        for identifier in ('<uniqueid default="true">MDS-685</uniqueid>',
                           '<uniqueid type="custom">MDS-685</uniqueid>'):
            with self.subTest(identifier=identifier):
                self.video.with_suffix('.nfo').write_text('<movie>' + identifier +
                    '<uniqueid type="imdb">tt1234567</uniqueid><id>98765</id></movie>', encoding='utf-8')
                result = self.save(code='ABW-232')
                target = self.root / result['name']
                payload, raw = read_nfo(target.with_suffix('.nfo'))
                self.assertEqual(payload['id'], 'ABW-232')
                self.assertIn(b'tt1234567', raw)
                self.assertIn(b'98765', raw)
                self.save(title='仍然可以再次保存')
                self.video = target
                self.save(code='MDS-685')
                self.video = self.root / self.get_form()['filename']

    def test_read_and_cancel_do_not_change_media_or_create_sidecars(self):
        before = {path.name: path.read_bytes() for path in self.root.iterdir() if path.is_file()}
        form = self.get_form()
        self.assertEqual(form['filename'], 'MDS-685r.mp4')
        self.assertTrue(form['subtitled'])
        self.assertEqual(before, {path.name: path.read_bytes() for path in self.root.iterdir() if path.is_file()})

    def test_form_reads_the_release_code_separately_from_the_title(self):
        self.assertEqual(self.get_form()['code'], 'MDS-685')

    def test_explicit_code_updates_only_this_filename_and_its_nfo(self):
        other = self.root / 'other.mp4'
        other.write_bytes(b'other video')
        result = self.save(code='abw000000232', title='手动片名')
        target = self.root / 'ABW-232r.mp4'
        self.assertEqual((result['id'], result['code'], result['name']), (1, 'ABW-232', target.name))
        self.assertEqual(target.read_bytes(), b'original video bytes')
        self.assertEqual(other.read_bytes(), b'other video')
        self.assertEqual(jav_edition_badges(target.name, result['code']), ['中字'])
        payload, _ = read_nfo(target.with_suffix('.nfo'))
        self.assertEqual((payload['id'], payload['title']), ('ABW-232', '手动片名'))
        self.assertEqual(result['field_owners']['code'], 'user:manual')

    def test_explicit_code_can_identify_a_file_without_a_number(self):
        target = self.root / '未识别的片名 931.mp4'
        self.video.rename(target)
        with self.contract.write_transaction() as connection:
            connection.execute('UPDATE asset SET path=?,name=?,code=NULL WHERE id=1', (str(target), target.name))
        result = self.save(code='072815-931')
        renamed = self.root / '072815-931 未识别的片名 931.mp4'
        self.assertEqual((result['code'], result['name']), ('072815-931', renamed.name))
        self.assertEqual(renamed.read_bytes(), b'original video bytes')
        self.assertEqual(read_nfo(renamed.with_suffix('.nfo'))[0]['id'], '072815-931')

    def test_explicit_special_codes_keep_their_identity(self):
        for code in ('FC2-PPV-1234567', '072815_931', '072815-931', '300MIUM-123'):
            with self.subTest(code=code):
                form = self.get_form()
                result = self.save(code=code)
                self.assertEqual(result['code'], code)
                self.assertEqual(result['id'], 1)
                self.assertEqual(read_nfo(self.root / Path(result['name']).with_suffix('.nfo'))[0]['id'], code)
                self.assertFalse((self.root / form['filename']).exists())

    def test_invalid_explicit_code_does_not_rename_or_write_sidecars(self):
        for code in ('', '随便写的片名', '../ABW-232', 'ABW-232 另一个标题', 'FC2-PPV-1234567 extra'):
            with self.subTest(code=code), self.assertRaises(ValueError):
                self.save(code=code)
        self.assertEqual(self.video.read_bytes(), b'original video bytes')
        self.assertFalse(self.video.with_suffix('.nfo').exists())

    def test_manual_title_is_projected_for_the_detail_and_home_card(self):
        result = self.save(title='My chosen title')
        self.assertFalse(result['is_jav'])
        self.assertEqual(result['display_title'], 'My chosen title')
        listed = web_contract.dispatch_api_get(self.contract, '/api/items', {'limit': '10'})
        card = next(item for item in listed['items'] if item['id'] == 1)
        self.assertEqual(card['display_title'], 'My chosen title')
        self.assertEqual(card['field_owners']['catalog_title'], 'user:manual')
        with self.contract.write_transaction() as connection:
            connection.execute("UPDATE asset SET region='jp',studio=?,release_date=?,original_title=? WHERE id=1",
                               ('演示厂牌', '2020-01-01', '別の日本語タイトル'))
        result = web_contract.dispatch_api_get(self.contract, '/api/item', {'id': '1'})
        self.assertTrue(result['is_jav'])
        self.assertEqual(result['display_title'], 'My chosen title')

    def test_manual_save_keeps_video_identity_and_writes_actor_nfo(self):
        result = self.save(filename='MDS-685 [中字].mp4', performers=['演员甲', '演员乙'])
        renamed = self.root / 'MDS-685 [中字].mp4'
        self.assertEqual(result['id'], 1)
        self.assertEqual(renamed.read_bytes(), b'original video bytes')
        self.assertFalse(self.video.exists())
        payload, _ = read_nfo(renamed.with_suffix('.nfo'))
        self.assertEqual([actor['japanese_name'] for actor in payload['actresses']], ['演员甲', '演员乙'])
        self.assertEqual(result['performers'], ['演员乙', '演员甲'])
        with self.contract.read_connection() as connection:
            self.assertEqual(connection.execute('PRAGMA foreign_key_check').fetchall(), [])

    def test_omitted_extension_preserves_the_original_video_format(self):
        result = self.save(filename='MDS-685 [中字]', title='人工标题')
        target = self.root / 'MDS-685 [中字].mp4'
        self.assertEqual(result['name'], target.name)
        self.assertEqual(target.read_bytes(), b'original video bytes')
        self.assertTrue(target.with_suffix('.nfo').is_file())

    def test_dotted_title_can_omit_its_video_extension(self):
        result = self.save(filename='MDS-685 Vol.21 演示作品')
        self.assertEqual(result['name'], 'MDS-685 Vol.21 演示作品.mp4')

    def test_omitted_extension_keeps_non_mp4_media_in_its_original_format(self):
        target = self.video.with_suffix('.mkv')
        self.video.rename(target)
        self.video = target
        with self.contract.write_transaction() as connection:
            connection.execute('UPDATE asset SET path=?,name=? WHERE id=1', (str(target), target.name))
        result = self.save(filename='MDS-685 [中字]')
        self.assertEqual(result['name'], 'MDS-685 [中字].mkv')
        self.assertEqual((self.root/result['name']).read_bytes(), b'original video bytes')

    @unittest.skipUnless(os.name == 'nt', '仅 Windows 对实际占用句柄验收')
    def test_occupied_video_reports_a_recoverable_error_and_saves_after_release(self):
        error = None
        with self.video.open('rb'):
            try:
                self.save(filename='MDS-685 [中字].mp4', title='待保存标题', performers=['演员甲'])
            except Exception as cause:
                error = cause
        self.assertIsInstance(error, ValueError)
        self.assertIn('占用', str(error))
        self.assertEqual(self.video.read_bytes(), b'original video bytes')
        self.assertFalse(self.video.with_suffix('.nfo').exists())
        result = self.save(filename='MDS-685 [中字].mp4', title='待保存标题', performers=['演员甲'])
        self.assertEqual(result['name'], 'MDS-685 [中字].mp4')

    def test_collision_is_rejected_before_any_file_or_actor_change(self):
        target = self.root / 'other.mp4'
        target.write_bytes(b'other media')
        with self.assertRaises(ValueError):
            self.save(filename='other.mp4', performers=['演员甲'])
        self.assertEqual(target.read_bytes(), b'other media')
        self.assertEqual(self.video.read_bytes(), b'original video bytes')
        self.assertFalse(self.video.with_suffix('.nfo').exists())

    def test_cover_save_installs_a_static_local_poster_without_renaming_video(self):
        stream = io.BytesIO()
        Image.new('RGB', (640, 900), 'gray').save(stream, 'PNG')
        result = self.save(cover='data:image/png;base64,' + base64.b64encode(stream.getvalue()).decode())
        self.assertTrue(result['has_cover'])
        self.assertTrue(self.video.is_file())
        self.assertTrue(self.video.with_name(self.video.stem + '-poster.jpg').is_file())
        evidence = json.loads((self.root / 'covers/MDS-685.scraping.json').read_text(encoding='utf-8'))
        self.assertEqual(evidence['source'], 'local_cover')

    def test_version_controls_write_readable_tokens_and_preserve_media_bytes(self):
        result = self.save(edition={'subtitled': True, 'uncensored': True})
        target = self.root / 'MDS-685 [中字] [无码破解].mp4'
        self.assertEqual(target.read_bytes(), b'original video bytes')
        self.assertEqual(result['name'], target.name)

    def test_database_failure_restores_renames_and_nfo(self):
        with mock.patch('peach.web_item_edit.write_owned_fields', side_effect=sqlite3.OperationalError('模拟失败')):
            with self.assertRaises(sqlite3.OperationalError):
                self.save(filename='MDS-685 [中字].mp4', title='待保存标题', performers=['演员甲'])
        self.assertEqual(self.video.read_bytes(), b'original video bytes')
        self.assertFalse((self.root / 'MDS-685 [中字].mp4').exists())
        self.assertFalse((self.root / 'MDS-685 [中字].nfo').exists())

    def test_invalid_names_and_extensions_do_not_write(self):
        for name in ('../outside.mp4', 'MDS-685.mkv', 'CON.mp4', 'bad:name.mp4'):
            with self.subTest(name=name), self.assertRaises(ValueError):
                self.save(filename=name)
        self.assertEqual(self.video.read_bytes(), b'original video bytes')
        self.assertFalse(self.video.with_suffix('.nfo').exists())

    def test_nfo_and_language_subtitles_follow_the_selected_file_only(self):
        self.video.with_suffix('.nfo').write_text('<movie><studio>保留厂牌</studio><tag>自定义标签</tag>'
            '<art><poster>MDS-685r-poster.jpg</poster></art></movie>', encoding='utf-8')
        subtitle = self.video.with_name(self.video.stem + '.zh.srt')
        subtitle.write_text('existing subtitles', encoding='utf-8')
        poster = self.video.with_name(self.video.stem + '-poster.jpg')
        poster.write_bytes(b'existing companion bytes')
        other = self.root / 'other.srt'
        other.write_bytes(b'unrelated subtitles')
        self.save(filename='MDS-685 [中字].mp4', performers=['演员甲'])
        payload, _ = read_nfo(self.root / 'MDS-685 [中字].nfo')
        self.assertEqual(payload['maker'], '保留厂牌')
        self.assertEqual(payload['local_tags'], ['自定义标签'])
        self.assertEqual(payload['local_art'], 'MDS-685 [中字]-poster.jpg')
        self.assertEqual((self.root / 'MDS-685 [中字].zh.srt').read_text(), 'existing subtitles')
        self.assertEqual(other.read_bytes(), b'unrelated subtitles')

    def test_manual_actor_and_intentional_empty_list_survive_remote_auto_apply(self):
        from peach.metadata_auto_apply import auto_apply_metadata
        from peach.web_catalog import q_item
        for names in (['演员甲'], []):
            self.save(performers=names)
            candidate = dict(source='r18dev', candidate_key='remote-actors', confidence=1.0,
                             provider_id='MDS-685', value=[{'name': '远端演员'}])
            group = dict(item_key='asset:1:performers', asset_id=1, asset_path=str(self.video),
                         code='MDS-685', query='MDS-685', field='performers', status='candidate',
                         current_value='', candidates_json=json.dumps([candidate]))
            auto_apply_metadata(self.contract.database, self.root / 'generated',
                                asset_ids=[1], candidate_rows=[group])
            self.assertEqual(q_item(self.contract, 1)['performers'], names)

    def test_filename_number_is_portable_in_the_written_nfo(self):
        self.save(performers=['演员甲'])
        payload, _ = read_nfo(self.video.with_suffix('.nfo'))
        self.assertEqual(payload['id'], 'MDS-685')

    def test_stale_form_cannot_overwrite_a_saved_edit(self):
        from peach.field_owners import RevisionConflict
        form = self.get_form()
        self.save(title='人工标题')
        before = self.video.with_suffix('.nfo').read_bytes()
        with self.assertRaises(RevisionConflict):
            self.save(expected_revision=form['mutation_revision'], title='过期标题')
        self.assertEqual(self.video.with_suffix('.nfo').read_bytes(), before)

    def test_corrupt_and_animated_covers_are_rejected_before_rename(self):
        animation = io.BytesIO()
        Image.new('RGB', (30, 40), 'red').save(animation, 'WEBP', save_all=True,
            append_images=[Image.new('RGB', (30, 40), 'blue')], duration=100, loop=0)
        for data in (b'broken image', animation.getvalue()):
            with self.subTest(data=data[:12]), self.assertRaises(ValueError):
                self.save(filename='MDS-685 [中字].mp4',
                    cover='data:image/webp;base64,' + base64.b64encode(data).decode())
        self.assertEqual(self.video.read_bytes(), b'original video bytes')
        self.assertFalse(self.video.with_suffix('.nfo').exists())

    def test_cover_failure_restores_existing_sidecar_and_cache(self):
        from peach.web_item_edit import _cover
        raw = io.BytesIO()
        Image.new('RGB', (640, 900), 'gray').save(raw, 'PNG')
        data = 'data:image/png;base64,' + base64.b64encode(raw.getvalue()).decode()
        self.save(cover=data, title='已有标题')
        paths = [self.video.with_suffix('.nfo'), self.video.with_name(self.video.stem + '-poster.jpg'),
                 *self.contract.cover_root.iterdir()]
        before = {path: path.read_bytes() for path in paths if path.is_file()}
        self.assertIsNotNone(_cover(data))
        with mock.patch('peach.web_item_edit.install_cover', side_effect=OSError('模拟封面写入失败')):
            with self.assertRaises(OSError):
                self.save(filename='MDS-685 [中字].mp4', cover=data, title='不应保留的标题')
        self.assertEqual({path: path.read_bytes() for path in before}, before)
        self.assertEqual(self.video.read_bytes(), b'original video bytes')
        self.assertFalse((self.root / 'MDS-685 [中字].mp4').exists())

    def test_renaming_keeps_user_records_and_exact_stem_picture(self):
        from peach.web_catalog import q_item
        picture = self.video.with_suffix('.jpg')
        picture.write_bytes(b'existing exact stem picture')
        with self.contract.write_transaction() as connection:
            connection.execute('UPDATE asset SET rating=80,play_count=3 WHERE id=1')
        self.save(filename='MDS-685 [中字].mp4')
        item = q_item(self.contract, 1)
        self.assertEqual((item['rating'], item['play_count']), (80, 3))
        self.assertEqual((self.root / 'MDS-685 [中字].jpg').read_bytes(), b'existing exact stem picture')

    def test_corrected_number_is_written_to_the_same_asset_and_nfo(self):
        result = self.save(filename='ABW-232UC.mp4')
        self.assertEqual((result['id'], result['code']), (1, 'ABW-232'))
        payload, _ = read_nfo(self.root / 'ABW-232UC.nfo')
        self.assertEqual(payload['id'], 'ABW-232')
        self.assertEqual((self.root / 'ABW-232UC.mp4').read_bytes(), b'original video bytes')

    def test_undocumented_local_root_cannot_be_edited(self):
        with mock.patch('peach.web_item_edit.location_roots', return_value={'local': ()}):
            with self.assertRaises(ValueError):
                self.save(filename='renamed.mp4')
        self.assertEqual(self.video.read_bytes(), b'original video bytes')

    def test_actor_only_saves_advance_the_revision(self):
        from peach.field_owners import RevisionConflict
        self.save(title='固定标题', performers=['演员甲'])
        form = self.get_form()
        self.save(performers=['演员乙'])
        with self.assertRaises(RevisionConflict):
            self.save(expected_revision=form['mutation_revision'], performers=['过期演员'])

    def test_edition_controls_clear_all_existing_suffix_tokens(self):
        from peach.web_item_edit import _filename
        for stem in ('MDS-685-C-U', 'MDS-685 [中文字幕] 无修正', 'MDS-685 无码破解',
                     'MDS-685 [AI去码]', 'MDS-685r'):
            with self.subTest(stem=stem):
                name = _filename(stem + '.mp4', self.video, {'subtitled': False, 'uncensored': False})
                self.assertEqual(jav_edition_badges(name, 'MDS-685'), [])

    def test_renaming_cannot_claim_an_unrelated_target_sidecar(self):
        nfo = self.root / 'ABW-232.nfo'
        nfo.write_bytes(b'foreign nfo')
        with self.assertRaises(ValueError):
            self.save(filename='ABW-232.mp4')
        self.assertEqual(nfo.read_bytes(), b'foreign nfo')
        self.assertEqual(self.video.read_bytes(), b'original video bytes')

    @unittest.skipUnless(os.name == 'nt', 'Windows 文件名大小写')
    def test_case_only_rename_updates_the_actual_filename(self):
        self.save(filename='mds-685R.mp4')
        names = [path.name for path in self.root.iterdir() if path.suffix == '.mp4']
        self.assertEqual(names, ['mds-685R.mp4'])

    def test_number_correction_keeps_a_manual_local_poster_available(self):
        image = io.BytesIO()
        Image.new('RGB', (640, 900), 'gray').save(image, 'PNG')
        self.save(cover='data:image/png;base64,' + base64.b64encode(image.getvalue()).decode())
        old = (self.contract.cover_root / 'MDS-685.jpg').read_bytes()
        result = self.save(filename='ABW-232.mp4')
        self.assertTrue(result['has_cover'])
        self.assertEqual((self.contract.cover_root / 'MDS-685.jpg').read_bytes(), old)
        self.assertTrue((self.root / 'ABW-232-poster.jpg').is_file())

    def test_video_symlinks_are_rejected_without_renaming_the_target(self):
        link = self.root / 'linked.mp4'
        try:
            link.symlink_to(self.video)
        except OSError as error:
            self.skipTest('系统不允许创建符号链接：' + str(error))
        with self.contract.write_transaction() as connection:
            connection.execute('UPDATE asset SET path=?,name=? WHERE id=1', (str(link), link.name))
        from peach.web_item_edit import _asset
        with self.contract.read_connection() as connection, self.assertRaises(ValueError):
            _asset(connection, 1)
        self.assertEqual(self.video.read_bytes(), b'original video bytes')

    def test_actor_edits_preserve_existing_entity_metadata(self):
        self.save(performers=['演员甲'])
        metadata = '{"agency_rejected":true,"profile":{"height":168}}'
        with self.contract.write_transaction() as connection:
            entity_id = connection.execute("SELECT id FROM entity WHERE canonical_name='演员甲'").fetchone()[0]
            connection.execute('UPDATE entity SET metadata_json=? WHERE id=?', (metadata, entity_id))
        self.save(title='确认标题', performers=['演员甲', '演员乙'])
        with self.contract.read_connection() as connection:
            self.assertEqual(connection.execute('SELECT metadata_json FROM entity WHERE id=?', (entity_id,)).fetchone()[0], metadata)

    def test_cover_only_save_leaves_unknown_fields_open_for_metadata(self):
        from peach.field_owners import parse_owners
        image = io.BytesIO()
        Image.new('RGB', (640, 900), 'gray').save(image, 'PNG')
        self.save(cover='data:image/png;base64,' + base64.b64encode(image.getvalue()).decode())
        with self.contract.read_connection() as connection:
            owners = parse_owners(connection.execute('SELECT field_owners FROM asset WHERE id=1').fetchone()[0])
            self.assertNotIn('catalog_title', owners)
            self.assertIsNone(connection.execute("SELECT status FROM review_decision WHERE item_key='asset:1:performers'").fetchone())

    def test_untouched_nfo_title_and_actor_details_are_preserved(self):
        import xml.etree.ElementTree as ET
        self.video.with_suffix('.nfo').write_text('<movie><title>NFO 标题</title>'
            '<actor><name>本地演员</name><role>原角色</role><thumb>photo.jpg</thumb></actor></movie>', encoding='utf-8')
        self.save(filename='MDS-685 [中字].mp4')
        root = ET.parse(self.root / 'MDS-685 [中字].nfo').getroot()
        self.assertEqual(root.findtext('title'), 'NFO 标题')
        self.assertEqual(root.findtext('actor/role'), '原角色')
        self.assertEqual(root.findtext('actor/thumb'), 'photo.jpg')

    def test_paired_subtitle_record_follows_the_manual_rename(self):
        from peach.subtitles import subtitles_for
        subtitle = self.video.with_name(self.video.stem + '.zh.srt')
        subtitle.write_text('subtitle bytes', encoding='utf-8')
        with self.contract.write_transaction() as connection:
            connection.execute("INSERT INTO asset_subtitle(id,asset_id,location,path,name,format,pairing,first_seen,last_seen) "
                "VALUES(1,1,'local',?,?,'srt','exact','now','now')", (str(subtitle), subtitle.name))
        self.save(filename='MDS-685 [中字].mp4')
        with self.contract.read_connection() as connection:
            row = subtitles_for(connection, 1)[0]
            self.assertEqual(row['id'], 1)
            self.assertEqual(row['name'], 'MDS-685 [中字].zh.srt')
            self.assertEqual(Path(row['path']).read_text(encoding='utf-8'), 'subtitle bytes')

    def test_rekey_preserves_a_concurrent_cache_even_if_the_edit_later_fails(self):
        from peach.web_item_edit import _rekey_poster
        poster = self.video.with_name(self.video.stem + '-poster.jpg')
        Image.new('RGB', (640, 900), 'gray').save(poster)
        target = self.contract.cover_root / 'ABW-232.jpg'
        def concurrent_install(path, *_args, **kwargs):
            self.assertFalse(kwargs['replace_existing'])
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(b'concurrent cover')
            raise FileExistsError('已有封面')
        with mock.patch('peach.web_item_edit.install_cover', side_effect=concurrent_install):
            with self.assertRaises(ValueError), ExitStack() as undo:
                _rekey_poster(self.contract, undo, dict(id=1, code='ABW-232', catalog_title=''), self.video)
                raise ValueError('后续保存失败')
        self.assertEqual(target.read_bytes(), b'concurrent cover')
