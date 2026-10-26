"""跨目录本地封面的隔离回归。"""
from contextlib import closing
import hashlib
from pathlib import Path
import sqlite3
import tempfile
import unittest
from unittest.mock import patch

from PIL import Image

from peach.library_processing import process_library
from peach.settings_file import PeachConfig
from support.ledger import fresh_ledger


class CrossDirectoryCoverTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='peach-local-covers-')
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name).resolve()
        self.videos = self.root / 'videos' / 'nested'
        self.images = self.root / 'pictures' / 'another' / 'level'
        self.videos.mkdir(parents=True)
        self.images.mkdir(parents=True)
        self.db = fresh_ledger(self.root)
        self.covers = self.root / 'generated' / 'covers'
        self.config = PeachConfig(self.root, self.root / 'config.toml', present=True,
            locations={'local': (str(self.root / 'videos'), str(self.root / 'pictures'))})

    def asset(self, path, medium, code=None):
        with closing(sqlite3.connect(self.db)) as connection, connection:
            return connection.execute(
                'INSERT INTO asset(location,path,name,medium,code,size) VALUES(?,?,?,?,?,?)',
                ('local', str(path), path.name, medium, code, path.stat().st_size)).lastrowid

    def video(self, name='ABW-232.mp4', code='ABW-232'):
        path = self.videos / name
        path.write_bytes(b'original-video')
        return path, self.asset(path, 'video', code)

    def picture(self, name='abw000000232.jpg', color='red', directory=None, size=(96, 144)):
        path = (directory or self.images) / name
        Image.new('RGB', size, color).save(path)
        self.asset(path, 'image')
        return path

    def process(self, asset_id, **kwargs):
        with patch('peach.library_processing._RemoteSession.collect', return_value=([], 0)), \
                patch('peach.library_processing._finish_collection', return_value={}):
            return process_library(self.config, self.db, self.root / 'review', self.covers,
                stage='metadata', asset_ids=[asset_id], **kwargs)

    def match(self, asset_id, index=None):
        from peach.local_covers import LocalCoverIndex
        with closing(sqlite3.connect(self.db)) as connection:
            connection.row_factory = sqlite3.Row
            row = dict(connection.execute('SELECT * FROM asset WHERE id=?', (asset_id,)).fetchone())
        index = index or LocalCoverIndex(self.config, self.db, self.covers)
        return index.match(row)

    def test_cross_root_long_zero_cover_preserves_original_files(self):
        video, asset_id = self.video()
        picture = self.picture()
        originals = {path: hashlib.sha256(path.read_bytes()).hexdigest() for path in (video, picture)}
        self.process(asset_id)
        self.assertTrue((self.covers / 'ABW-232.jpg').is_file())
        for path, digest in originals.items():
            self.assertEqual(hashlib.sha256(path.read_bytes()).hexdigest(), digest)

    def test_metadata_checkpoint_keeps_local_cover_eligible(self):
        video, asset_id = self.video()
        self.picture()
        self.process(asset_id, resume_state={'completed_metadata': [f'{asset_id}:{video}']})
        self.assertTrue((self.covers / 'ABW-232.jpg').is_file())

    def test_small_local_cover_is_settled_and_kept_on_repeated_run(self):
        from peach.library_processing import cover_settled
        _, asset_id = self.video()
        self.picture()
        self.process(asset_id)
        target = self.covers / 'ABW-232.jpg'
        self.assertTrue(target.is_file())
        original = target.read_bytes()
        self.assertTrue(cover_settled(target))
        self.process(asset_id)
        self.assertEqual(target.read_bytes(), original)

    def test_distinct_cross_directory_images_are_a_conflict(self):
        _, asset_id = self.video()
        self.picture('ABW-232.jpg', 'red')
        self.picture('abw0232.png', 'blue')
        choice = self.match(asset_id)
        self.assertEqual(choice.status, 'conflict')
        self.assertEqual(len(choice.candidates), 2)
        state = self.process(asset_id)
        self.assertEqual(state['local_covers']['conflict'], 1)
        self.assertFalse((self.covers / 'ABW-232.jpg').exists())

    def test_identical_decoded_images_are_one_candidate(self):
        _, asset_id = self.video()
        self.picture('ABW-232.png')
        self.picture('abw000000232.webp')
        # WebP 有损编码不能作为像素一致的证据，另存无损版本。
        Image.new('RGB', (96, 144), 'red').save(self.images / 'abw000000232.webp', lossless=True)
        choice = self.match(asset_id)
        self.assertEqual(choice.status, 'matched')
        self.assertEqual(len(choice.candidates), 2)

    def test_nfo_reference_has_priority_over_sidecar_and_cross_directory(self):
        video, asset_id = self.video()
        explicit = self.picture('explicit.png', 'green', self.videos)
        self.picture('ABW-232.jpg', 'blue', self.videos)
        self.picture()
        video.with_suffix('.nfo').write_text(
            '<movie><id>ABW-232</id><art><poster>explicit.png</poster></art></movie>', encoding='utf-8')
        choice = self.match(asset_id)
        self.assertEqual(choice.source, explicit)
        self.assertEqual(choice.origin, 'nfo')

    def test_same_directory_has_priority_over_cross_directory(self):
        _, asset_id = self.video()
        sidecar = self.picture('ABW-232.png', 'blue', self.videos)
        self.picture()
        self.assertEqual(self.match(asset_id).source, sidecar)

    def test_same_priority_sidecars_require_the_same_picture(self):
        _, asset_id = self.video()
        self.picture('ABW-232.png', 'red', self.videos)
        self.picture('ABW-232.jpg', 'blue', self.videos)
        self.assertEqual(self.match(asset_id).status, 'conflict')

    def test_existing_cover_is_kept(self):
        _, asset_id = self.video()
        self.picture()
        self.covers.mkdir(parents=True)
        target = self.covers / 'ABW-232.jpg'
        Image.new('RGB', (20, 30), 'green').save(target)
        before = target.read_bytes()
        self.assertEqual(self.match(asset_id).status, 'existing')
        self.process(asset_id)
        self.assertEqual(before, target.read_bytes())

    def test_unreadable_candidate_does_not_disqualify_a_valid_picture(self):
        _, asset_id = self.video()
        corrupt = self.images / 'ABW-232.jpg'
        corrupt.write_bytes(b'not-an-image')
        self.asset(corrupt, 'image')
        good = self.picture('ABW0232.png')
        choice = self.match(asset_id)
        self.assertEqual(choice.source, good)
        self.assertEqual(choice.unreadable, (corrupt,))

    def test_animated_webp_and_png_are_unreadable_candidates(self):
        for extension in ('.webp', '.png'):
            with self.subTest(extension=extension):
                video, asset_id = self.video(f'ABW-23{len(extension)}.mp4', f'ABW-23{len(extension)}')
                path = self.images / f'{video.stem}{extension}'
                Image.new('RGB', (40, 60), 'red').save(path, save_all=True,
                    append_images=[Image.new('RGB', (40, 60), 'blue')], duration=100, loop=0)
                self.asset(path, 'image')
                self.assertEqual(self.match(asset_id).status, 'unreadable')

    def test_gif_and_unregistered_roots_are_excluded(self):
        _, asset_id = self.video()
        self.picture('ABW-232.gif')
        outside = self.root / 'outside'
        outside.mkdir()
        self.picture('ABW-232.jpg', directory=outside)
        self.assertEqual(self.match(asset_id).status, 'no_candidate')

    def test_same_directory_image_set_does_not_become_a_cross_directory_cover(self):
        _, asset_id = self.video('ABW-232(1).mp4')
        self.picture('ABW-232(1).jpg', directory=self.videos)
        self.picture('ABW-232(2).jpg', directory=self.videos)
        self.assertEqual(self.match(asset_id).status, 'no_candidate')

    def test_cached_empty_local_evidence_can_find_a_new_image(self):
        _, asset_id = self.video()
        first = self.process(asset_id)
        self.assertTrue(first['local_metadata'])
        self.picture()
        second = self.process(asset_id, resume_state=first)
        self.assertEqual(second['local_covers']['installed'], 1)

    def test_image_index_is_built_once_and_decoding_is_reused(self):
        from peach.local_covers import LocalCoverIndex
        _, first = self.video()
        _, second = self.video('ABW-232-2.mp4')
        self.picture()
        index = LocalCoverIndex(self.config, self.db, self.covers)
        self.assertEqual(self.match(first, index).status, 'matched')
        self.assertEqual(self.match(second, index).status, 'matched')
        self.assertEqual(index.index_builds, 1)
        self.assertEqual(index.decoded_images, 1)

    def test_nfo_identity_conflict_prevents_cover_assignment(self):
        video, asset_id = self.video()
        self.picture()
        video.with_suffix('.nfo').write_text('<movie><id>ABW-233</id></movie>', encoding='utf-8')
        self.assertEqual(self.match(asset_id).status, 'conflict')
        video.with_suffix('.nfo').write_text('<movie><id>ABW-232</id><num>ABW-233</num></movie>', encoding='utf-8')
        self.assertEqual(self.match(asset_id).status, 'conflict')

    def test_shared_release_with_different_local_posters_is_a_conflict(self):
        from peach.local_covers import LocalCoverIndex
        _, first = self.video()
        other = self.root / 'videos' / 'other'
        other.mkdir()
        second_video = other / 'ABW-232.mp4'
        second_video.write_bytes(b'second-edition')
        second = self.asset(second_video, 'video', 'ABW-232')
        self.picture('poster.jpg', 'red', self.videos)
        self.picture('poster.jpg', 'blue', other)
        with closing(sqlite3.connect(self.db)) as connection:
            connection.row_factory = sqlite3.Row
            rows = [dict(row) for row in connection.execute('SELECT * FROM asset WHERE id IN (?,?)', (first, second))]
        choices = LocalCoverIndex(self.config, self.db, self.covers).match_all(rows)
        self.assertEqual([choice.status for choice in choices], ['conflict', 'conflict'])
        selected = self.process(first)
        self.assertEqual(selected['local_covers']['conflict'], 1)
        self.assertFalse((self.covers / 'ABW-232.jpg').exists())

    def test_shared_release_keeps_a_higher_priority_conflict(self):
        from peach.local_covers import LocalCoverIndex
        _, first = self.video()
        other = self.root / 'videos' / 'other'
        other.mkdir()
        second_video = other / 'ABW-232.mp4'
        second_video.write_bytes(b'second-edition')
        self.asset(second_video, 'video', 'ABW-232')
        self.picture('poster.jpg', 'red', self.videos)
        self.picture('poster.png', 'blue', self.videos)
        self.picture('ABW-232.jpg', 'green')
        with closing(sqlite3.connect(self.db)) as connection:
            connection.row_factory = sqlite3.Row
            rows = [dict(row) for row in connection.execute("SELECT * FROM asset WHERE medium='video'")]
        choices = LocalCoverIndex(self.config, self.db, self.covers).match_all(rows)
        self.assertEqual([choice.status for choice in choices], ['conflict', 'conflict'])
        self.process(first)
        self.assertFalse((self.covers / 'ABW-232.jpg').exists())

    def test_single_video_checks_no_unrelated_video_or_progress(self):
        from peach.local_covers import LocalCoverIndex
        _, selected = self.video()
        self.video('IPX-061.mp4', 'IPX-061')
        self.picture()
        with closing(sqlite3.connect(self.db)) as connection:
            connection.row_factory = sqlite3.Row
            row = dict(connection.execute('SELECT * FROM asset WHERE id=?', (selected,)).fetchone())
        index = LocalCoverIndex(self.config, self.db, self.covers)
        progress = []
        with patch.object(index, 'match', wraps=index.match) as lookup:
            choices = index.match_all([row], progress=lambda current: progress.append(current['id']))
        self.assertEqual([call.args[0]['id'] for call in lookup.call_args_list], [selected])
        self.assertEqual(progress, [selected])
        self.assertEqual(choices[0].status, 'matched')

    def test_single_video_keeps_peer_conflicts_and_reports_the_selected_target(self):
        from peach.local_covers import LocalCoverIndex
        _, selected = self.video()
        self.video('ABW-0232r.mp4', 'ABW-0232')
        self.picture('ABW-232.jpg', 'red', self.videos)
        self.picture('ABW-0232r.jpg', 'blue', self.videos)
        with closing(sqlite3.connect(self.db)) as connection:
            connection.row_factory = sqlite3.Row
            row = dict(connection.execute('SELECT * FROM asset WHERE id=?', (selected,)).fetchone())
        progress = []
        choices = LocalCoverIndex(self.config, self.db, self.covers).match_all(
            [row], progress=lambda current: progress.append(current['id']))
        self.assertEqual(choices[0].status, 'conflict')
        self.assertEqual(set(progress), {selected})

    def test_unidentified_single_video_does_not_build_an_unrelated_image_index(self):
        from peach.local_covers import LocalCoverIndex
        _, selected = self.video('未识别的片名.mp4', None)
        self.video()
        self.picture()
        with closing(sqlite3.connect(self.db)) as connection:
            connection.row_factory = sqlite3.Row
            row = dict(connection.execute('SELECT * FROM asset WHERE id=?', (selected,)).fetchone())
        index = LocalCoverIndex(self.config, self.db, self.covers)
        choices = index.match_all([row])
        self.assertEqual(choices[0].status, 'no_candidate')
        self.assertEqual(index.metrics()['index_builds'], 0)

    def test_stored_codes_use_the_existing_validation_and_cache_key(self):
        for stored, expected in [('FC2-1812235', 'FC2-PPV-1812235'),
                                 ('ABW-0232', 'ABW-232'), ('IMG-2022', '')]:
            with self.subTest(stored=stored):
                _, asset_id = self.video(f'unidentified-{stored.replace("-", "_")}-sample.mp4', stored)
                self.assertEqual(self.match(asset_id).code, expected)

    def test_title_prefix_and_long_zero_video_use_local_matching(self):
        self.picture()
        for name in ('ABW-232-UC [sample title].mp4', 'abw000000232.mp4'):
            with self.subTest(name=name):
                _, asset_id = self.video(name, code=None)
                choice = self.match(asset_id)
                self.assertEqual(choice.status, 'matched')
                self.assertEqual(choice.code, 'ABW-232')

    def test_compact_and_versioned_titles_match_once_and_preserve_originals(self):
        self.picture('ABW-232.jpg')
        names = ('abw0232 sample title.mp4', 'ABW-232r sample title.mp4',
                 'ABW_232_示例标题.rmvb', 'abw000000232示例标题.ts')
        videos = [self.video(name, code=None) for name in names]
        sources = {path: (path.read_bytes(), path.stat().st_mtime_ns) for path, _ in videos}
        report = self.root / 'audit.csv'
        from peach.local_covers import run_local_covers
        audit = run_local_covers(self.config, self.db, self.covers, report)
        self.assertEqual(audit['matched'], len(names))
        self.assertEqual(audit['index_builds'], 1)
        self.assertFalse(self.covers.exists())
        applied = run_local_covers(self.config, self.db, self.covers, self.root / 'applied.csv',
                                   apply=True, plan=report)
        self.assertEqual(applied['installed'], 1)
        repeated = run_local_covers(self.config, self.db, self.covers, self.root / 'repeated.csv',
                                    apply=True, plan=report)
        self.assertEqual(repeated['installed'], 0)
        self.assertEqual(repeated['existing'], len(names))
        for path, original in sources.items():
            self.assertEqual((path.read_bytes(), path.stat().st_mtime_ns), original)

    def test_non_local_candidate_uses_the_existing_isolation_boundary(self):
        _, asset_id = self.video()
        picture = self.picture()
        self.config.locations['cloud'] = self.config.locations['local']
        with closing(sqlite3.connect(self.db)) as connection, connection:
            connection.execute("UPDATE asset SET location='cloud' WHERE medium='image'")
        from peach.local_poster import read_fingerprint
        with patch('peach.local_covers.read_fingerprint', wraps=read_fingerprint) as read:
            self.assertEqual(self.match(asset_id).status, 'matched')
        read.assert_called_once_with(picture, isolated=True)

    def test_online_download_keeps_a_concurrently_installed_local_cover(self):
        import io
        import json
        from types import SimpleNamespace
        from peach.cover_artwork import install_cover
        from peach.library_processing import LibraryMetadataProvider
        from peach.local_poster import read_jpeg
        source = self.picture('local.png', 'red')
        local_data, local_size = read_jpeg(source, isolated=False)
        output = io.BytesIO()
        Image.new('RGB', (800, 1000), 'blue').save(output, 'JPEG')
        target = self.covers / 'ABW-232.jpg'
        provider = LibraryMetadataProvider.__new__(LibraryMetadataProvider)
        provider.transport = object()
        provider._official_candidates = lambda *args, **kwargs: ()
        def finish_download(*args, **kwargs):
            install_cover(target, 'ABW-232', local_data, local_size,
                          evidence={'source': 'local_cover'}, replace_existing=False)
            return (SimpleNamespace(source='dmm', url='https://example.test/official.jpg'),
                    (800, 1000), output.getvalue())
        with patch('peach.cover_artwork._sidecars', return_value={}), \
                patch('peach.jav_cover_fetch.best_cover', side_effect=finish_download):
            self.assertFalse(provider.cover('ABW-232', self.covers))
        self.assertEqual(target.read_bytes(), local_data)
        self.assertEqual(json.loads(target.with_suffix('.scraping.json').read_text(encoding='utf-8'))['source'],
                         'local_cover')


class LocalCoverIdentityTests(unittest.TestCase):
    def test_water_pole_title_counters_preserve_the_leading_release_identity(self):
        from peach.catalog_rules import local_cover_code
        for name in ('WPC-009-UC WATER POLE 09 示例演员.mp4',
                     'wpc000000009uc Water Pole 09 sample.mp4',
                     'WPC-009 WATER.POLE.09.jpg',
                     'WPC-009 WATER POLE 09 uncensored.webp'):
            with self.subTest(name=name):
                self.assertEqual(local_cover_code(name), 'WPC-009')

    def test_water_pole_title_counters_do_not_hide_another_release_identity(self):
        from peach.catalog_rules import local_cover_code
        for name in ('WPC-009 WATER POLE 09 IPX-061.mp4',
                     'WPC-009 WATER POLE 09 IPX061.mp4',
                     'WPC-009 WATER POLE 09 [092415_001].jpg',
                     'WPC-009 POLE-009.mp4', 'WATER POLE 09.mp4'):
            with self.subTest(name=name):
                self.assertIsNone(local_cover_code(name))
        self.assertEqual(local_cover_code('POLE-009.mp4'), 'POLE-009')

    def test_quality_punctuation_repetition_and_title_counters_preserve_identity(self):
        from peach.catalog_rules import local_cover_code
        examples = {
            '[高清]n1234_sample_za1_n.mp4': 'n1234',
            '【高清】ABW232 示例.mp4': 'ABW-232',
            '! ABW-232.avi': 'ABW-232',
            'ABW-232ABW-232示例.mp4': 'ABW-232',
            'ABW232 示例 File.001 sample.mp4': 'ABW-232',
            'ABW232 示例 FILE 26 sample.mp4': 'ABW-232',
            'ABW232 示例 Episode-02 sample.mp4': 'ABW-232',
            'ABW232 S Model 51 sample.mp4': 'ABW-232',
            'ABW232 示例 SPECIAL SP 01.mp4': 'ABW-232',
        }
        for name, expected in examples.items():
            with self.subTest(name=name):
                self.assertEqual(local_cover_code(name), expected)

    def test_decorations_and_counters_do_not_hide_distinct_release_identities(self):
        from peach.catalog_rules import local_cover_code
        for name in ('[unknown]ABW232.mp4', '[高清]sample ABW232.mp4',
                     '! sample ABW232.mp4', 'ABW232ABW233示例.mp4',
                     'ABW232 FILE-026.mp4', 'ABW232 SP-001.mp4',
                     'ABW232 MODEL-051.mp4', 'ABW232 Episode-02 XYZ123.mp4',
                     'heydouga4030-1932-1_onekeybatch.mp4', 'sunday2007@sample.mp4'):
            with self.subTest(name=name):
                self.assertIsNone(local_cover_code(name))

    def test_local_title_and_delivery_filename_boundaries(self):
        from peach.catalog_rules import local_cover_code
        examples = {
            'abw0232 sample title.mp4': 'ABW-232',
            'ABW-232r sample title.mp4': 'ABW-232',
            'ABW-232C sample title.mp4': 'ABW-232',
            'ABW-232ch ABW0232 sample title.mp4': 'ABW-232',
            'ABW_232_示例标题.mp4': 'ABW-232',
            'abw000000232示例标题.ts': 'ABW-232',
            'ABW-232-uncensored sample title.mp4': 'ABW-232',
            'ABW-232_UNCENSORED_LEAKED.mp4': 'ABW-232',
            'ABW-232part1 sample title.mp4': 'ABW-232',
            'ABW-232cd2 sample title.mp4': 'ABW-232',
            'ABW-232-1r sample title.mp4': 'ABW-232',
            'ABW- 232r sample title.mp4': 'ABW-232',
            'ABW-02r sample title.mp4': 'ABW-002',
            'ABW-232.rmvb': 'ABW-232',
            'ABW-232 sample title.rmvb': 'ABW-232',
            'ABW232한글제목.mp4': 'ABW-232',
            'ABW-232(2).jpg': 'ABW-232',
            'HD_abw-232_2.mp4': 'ABW-232',
            'abw232-1080p.jpg': 'ABW-232',
            'abw00232pl.jpg': 'ABW-232',
            'heyzo_hd_1031_full-1.mp4': 'HEYZO-1031',
            'Tokyo Hot (n1042)(Sample)[1080p].wmv': 'n1042',
            'n1025_sample_fhd.wmv': 'n1025',
            '1pondo-092415_001-FHD.mp4': '092415_001',
            '040221-001-carib-1080p.mp4': '040221-001',
            '[example.com]ABW-232 sample title.mp4': 'ABW-232',
            'example.com-0512abw232-h264.mp4': 'ABW-232',
            '390JAC040r sample title.ts': '390JAC-040',
            'FC2PPV-001234567-C1.mp4': 'FC2-PPV-001234567',
            'FC2_PPV_001234567_sample_title.mp4': 'FC2-PPV-001234567',
            'MKBD-S118-2 sample title.mp4': 'MKBD-S118',
            'USBA-042 示例标题File14 sample.mp4': 'USBA-042',
        }
        for name, expected in examples.items():
            with self.subTest(name=name):
                self.assertEqual(local_cover_code(name), expected)

    def test_title_extraction_rejects_multiple_identities_and_noise(self):
        from peach.catalog_rules import local_cover_code
        for name in (
            'ABW232 ABW233 sample title.mp4', 'ABW232_ABW233_title.mp4',
            'ABW232_390JAC_040_title.mp4', 'ABW232 [MKBD-S118].mp4',
            'ABW-232 [FC2-PPV-1234567].mp4', 'ABW-232 [092415_001].mp4',
            'ABW-232 [092415-001].mp4', '092415_001 [092415-001].mp4',
            '390JAC040 [JAC040].mp4', 'ABW232garbage sample title.mp4',
            'ABW232' + 'c' * 120 + 'z sample title.mp4',
            'ABW232' + 'c' * 120 + 'z_title.mp4',
            'ABW232go sample title.mp4', 'ABW232z sample title.mp4',
            'ABW123456 sample title.mp4', 'sample ABW232.mp4',
            '1234567 sample title.mp4', '092415001 sample title.mp4',
            'IMG000000232 sample title.mp4', 'VIDEO_2025_02_19.mp4',
            'HHD800 sample title.mp4', 'ABW-S232 sample title.mp4',
            'DCE7230C-730E-1234-ABCD-123456789012.mp4',
            'BlackedRaw.25.11.22.Sample.Title.mp4',
            'n1234garbage.jpg', 'n1234garbage sample.mp4',
            'recording_092415_001bar.jpg',
        ):
            with self.subTest(name=name):
                self.assertIsNone(local_cover_code(name))

    def test_secondary_identity_uses_the_same_normalization(self):
        from peach.catalog_rules import local_cover_code
        for name in ('ABW-232 ABW- 233 sample.mp4',
                     'ABW232_XYZ123pl_title.mp4',
                     'ABW232 [390JAC- 040].mp4'):
            with self.subTest(name=name):
                self.assertIsNone(local_cover_code(name))

    def test_studio_code_zero_variants_have_the_same_identity(self):
        from peach.catalog_rules import local_cover_code, release_identity
        for name in ('ABW-232.jpg', 'abw232.PNG', 'ABW0232.jpeg', 'ABW000000232.webp'):
            with self.subTest(name=name):
                self.assertEqual(release_identity(local_cover_code(name)), 'ABW-232')

    def test_date_separator_maker_prefix_and_fc2_identity_are_preserved(self):
        from peach.catalog_rules import local_cover_code, release_identity
        self.assertNotEqual(release_identity(local_cover_code('092415_001.jpg')),
                            release_identity(local_cover_code('092415-001.jpg')))
        self.assertNotEqual(release_identity(local_cover_code('390JAC-040.jpg')),
                            release_identity(local_cover_code('JAC-040.jpg')))
        self.assertEqual(release_identity(local_cover_code('FC2-PPV-001234567.jpg')), 'FC2-1234567')
        for name in ('1234567.jpg', '092415001.jpg', 'IMG000000232.jpg', 'ABW123456.jpg',
                     'ABW-232-ABW-233.jpg'):
            with self.subTest(name=name):
                self.assertIsNone(local_cover_code(name))
        self.assertEqual(local_cover_code('MKBD-S118.jpg'), 'MKBD-S118')
        self.assertNotEqual(release_identity(local_cover_code('MKBD-S118.jpg')),
                            release_identity(local_cover_code('MKBD-118.jpg')))

    def test_title_prefix_requires_one_explicit_identity(self):
        from peach.catalog_rules import local_cover_code
        self.assertEqual(local_cover_code('ABW-232-UC [sample title].mp4'), 'ABW-232')
        self.assertEqual(local_cover_code('390JAC-040 [sample title].mp4'), '390JAC-040')
        for name in ('ABW-232 ABW-233.mp4', 'ABW-232-ABW-233.jpg',
                     'ABW-232 [ABW000000233].jpg', 'ABW-232 [MKBD-S118].jpg',
                     'IMG-2022 sample.mp4', 'sample ABW-232.mp4', 'ABW-232garbage.mp4'):
            with self.subTest(name=name):
                self.assertIsNone(local_cover_code(name))


class LocalCoverReportTests(unittest.TestCase):
    setUp = CrossDirectoryCoverTests.setUp
    asset = CrossDirectoryCoverTests.asset
    video = CrossDirectoryCoverTests.video
    picture = CrossDirectoryCoverTests.picture
    def test_dry_run_is_read_only_and_apply_requires_the_saved_match(self):
        from peach.local_covers import run_local_covers
        _, asset_id = self.video()
        original = self.picture()
        before_db = self.db.read_bytes()
        report = self.root / 'audit.csv'
        result = run_local_covers(self.config, self.db, self.covers, report)
        self.assertEqual(result['matched'], 1)
        self.assertFalse(self.covers.exists())
        self.assertEqual(before_db, self.db.read_bytes())
        Image.new('RGB', (96, 144), 'blue').save(original)
        applied = run_local_covers(self.config, self.db, self.covers, self.root / 'applied.csv',
                                  apply=True, plan=report)
        self.assertEqual(applied['changed'], 1)
        self.assertFalse((self.covers / 'ABW-232.jpg').exists())
        self.assertEqual(before_db, self.db.read_bytes())

    def test_apply_installs_only_saved_matches_and_is_idempotent(self):
        from peach.local_covers import run_local_covers
        self.video()
        self.picture()
        report = self.root / 'audit.csv'
        run_local_covers(self.config, self.db, self.covers, report)
        first = run_local_covers(self.config, self.db, self.covers, self.root / 'apply.csv',
                                 apply=True, plan=report)
        self.assertEqual(first['installed'], 1)
        before = (self.covers / 'ABW-232.jpg').read_bytes()
        repeated = run_local_covers(self.config, self.db, self.covers, self.root / 'repeat.csv',
                                    apply=True, plan=report)
        self.assertEqual(repeated['existing'], 1)
        self.assertEqual(repeated['installed'], 0)
        self.assertEqual(before, (self.covers / 'ABW-232.jpg').read_bytes())

    def test_apply_cannot_run_without_an_audit(self):
        from peach.local_covers import run_local_covers
        with self.assertRaises(ValueError):
            run_local_covers(self.config, self.db, self.covers, self.root / 'report.csv', apply=True)

    def test_nfo_only_cover_is_visible_without_ledger_identity_writes(self):
        from types import SimpleNamespace
        from peach.local_covers import run_local_covers
        from peach.web_catalog import attach_artwork_fields
        video, asset_id = self.video('local-title.mp4', code=None)
        self.picture('explicit.png', directory=self.videos)
        video.with_suffix('.nfo').write_text(
            '<movie><id>ABW-232</id><art><poster>explicit.png</poster></art></movie>', encoding='utf-8')
        report = self.root / 'audit.csv'
        before = self.db.read_bytes()
        run_local_covers(self.config, self.db, self.covers, report)
        result = run_local_covers(self.config, self.db, self.covers, self.root / 'apply.csv',
                                  apply=True, plan=report)
        self.assertEqual(result['installed'], 1)
        self.assertEqual(self.db.read_bytes(), before)
        contract = SimpleNamespace(has_cover=lambda key: (self.covers / (key + '.jpg')).is_file(),
            cover_frame=lambda key: None, cover_version=lambda key: 'v1', poster_box=lambda key: None)
        item = dict(id=asset_id, name=video.name, code=None)
        attach_artwork_fields(contract, item)
        self.assertTrue(item['has_cover'])
        self.assertEqual(item['cover_key'], f'ASSET-ID-{asset_id}')

    def test_report_outputs_cannot_replace_inputs_or_existing_files(self):
        from peach.local_covers import run_local_covers
        self.video()
        original = self.picture()
        existing = self.root / 'existing.csv'
        existing.write_text('unrelated', encoding='utf-8')
        companion = self.root / 'companion.json'
        companion.write_text('unrelated', encoding='utf-8')
        for report in (self.db, original, existing, companion.with_suffix('.csv'),
                       self.videos / 'new.csv'):
            with self.subTest(report=report):
                with self.assertRaises((ValueError, FileExistsError)):
                    run_local_covers(self.config, self.db, self.covers, report)
        self.assertEqual(existing.read_text(encoding='utf-8'), 'unrelated')
        self.assertEqual(companion.read_text(encoding='utf-8'), 'unrelated')
        self.assertEqual(self.db.read_bytes()[:16], b'SQLite format 3\x00')
        with Image.open(original) as image:
            image.load()

    def test_report_outputs_respect_translated_media_roots(self):
        from dataclasses import replace
        from peach.local_covers import run_local_covers
        self.videos.mkdir(parents=True, exist_ok=True)
        config = replace(self.config, locations={'local': (r'R:\Media',)})
        report = self.videos / 'mapped.csv'
        with patch('peach.local_covers.translate_ledger_path', return_value=self.videos):
            with self.assertRaisesRegex(ValueError, '媒体'):
                run_local_covers(config, self.db, self.covers, report)
        self.assertFalse(report.exists())
        self.assertFalse(report.with_suffix('.json').exists())

    def test_report_outputs_resolve_declared_media_root_aliases(self):
        from dataclasses import replace
        from peach.local_covers import run_local_covers
        nested = self.videos / 'declared'
        nested.mkdir(parents=True, exist_ok=True)
        config = replace(self.config, locations={'local': (str(nested / '..'),)})
        report = self.videos / 'alias.csv'
        with self.assertRaisesRegex(ValueError, '媒体'):
            run_local_covers(config, self.db, self.covers, report)
        self.assertFalse(report.exists())
        self.assertFalse(report.with_suffix('.json').exists())

    def test_atomic_install_does_not_replace_an_existing_cover(self):
        from peach.cover_artwork import install_cover
        from peach.local_poster import read_jpeg
        picture = self.picture()
        data, size = read_jpeg(picture, isolated=False)
        target = self.root / 'covers' / 'ABW-232.jpg'
        install_cover(target, 'ABW-232', data, size, replace_existing=False)
        before = target.read_bytes()
        with self.assertRaises(FileExistsError):
            install_cover(target, 'ABW-232', data, size, replace_existing=False)
        self.assertEqual(target.read_bytes(), before)


class LocalCoverCardTests(unittest.TestCase):
    def test_card_finds_a_local_cover_without_writing_a_code_to_the_ledger(self):
        from types import SimpleNamespace
        from peach.web_catalog import attach_artwork_fields
        contract = SimpleNamespace(has_cover=lambda key: key == 'ABW-232',
            cover_frame=lambda key: None, cover_version=lambda key: 'v1', poster_box=lambda key: None)
        for name in ('ABW-232-UC [sample title].mp4', 'abw0232 sample title.mp4',
                     'ABW-232r sample title.mp4', 'ABW_232_示例标题.rmvb'):
            with self.subTest(name=name):
                item = dict(id=1, code=None, name=name)
                attach_artwork_fields(contract, item)
                self.assertTrue(item['has_cover'])
                self.assertEqual(item['cover_key'], 'ABW-232')
                self.assertIsNone(item['code'])
                item['code'] = 'DTW003'
                attach_artwork_fields(contract, item)
                self.assertEqual(item['cover_key'], 'ABW-232')

    def test_asset_cover_keeps_priority_over_an_inferred_filename_code(self):
        from types import SimpleNamespace
        from peach.web_catalog import attach_artwork_fields
        contract = SimpleNamespace(has_cover=lambda key: key in {'ASSET-ID-1', 'ABW-232'},
            cover_frame=lambda key: None, cover_version=lambda key: 'v1', poster_box=lambda key: None)
        item = dict(id=1, code=None, name='ABW-232-UC [sample title].mp4')
        attach_artwork_fields(contract, item)
        self.assertEqual(item['cover_key'], 'ASSET-ID-1')


class LocalCoverWorkerTests(unittest.TestCase):
    def test_packaged_worker_returns_fingerprints_and_checks_source_hash(self):
        import json
        from peach.cli import main
        from peach.local_poster import read_fingerprint, read_jpeg
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary).resolve()
            source, output = root / 'sample.png', root / 'info.json'
            Image.new('RGB', (24, 36), 'green').save(source)
            expected = read_fingerprint(source, isolated=False)
            self.assertEqual(main(['local-image', str(source), str(output), '--fingerprint']), 0)
            self.assertEqual(tuple(json.loads(output.read_bytes())), expected)
            read_jpeg(source, isolated=False, expected_sha256=expected[1])
            Image.new('RGB', (24, 36), 'blue').save(source)
            with self.assertRaises(ValueError):
                read_jpeg(source, isolated=False, expected_sha256=expected[1])
