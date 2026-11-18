"""网页文件浏览的授权根、只读边界、文件定位和离线状态。"""
import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

from peach import nas_directories, web_media_directory
from peach.migrations import upgrade
from peach.user_messages import UserValueError
from peach.web_state import WebContract

ROOT = Path(__file__).resolve().parents[1]


class MediaDirectoryTests(unittest.TestCase):
    def setUp(self):
        self.root = Path(self.enterContext(TemporaryDirectory())).resolve()
        self.media = self.root / 'media'
        self.media.mkdir()
        self.folder = self.media / 'series'
        self.folder.mkdir()
        (self.folder / 'movie.mp4').write_bytes(b'not read')
        (self.folder / 'unindexed.mp4').touch()
        (self.folder / 'gone.mp4').touch()
        (self.folder / 'child').mkdir()
        self.path = self.root / 'ledger.db'
        upgrade(self.path, ROOT / 'migrations')
        self.contract = WebContract(self.path, candidate_root=self.root / 'generated',
                                    follow_state_root=self.root / 'state', snapshot_root=self.root / 'snapshots')
        self.libraries = [{'name': 'Library', 'roots': [
            {'root_id': 'local', 'root': 'R:\\Media', 'location': 'local'},
            {'root_id': 'cloud', 'root': 'A:\\Cloud', 'location': 'cloud'}]}]
        self.enterContext(patch('peach.web_media_directory.settings_file.active'))
        self.enterContext(patch('peach.web_media_directory.media_libraries.libraries', return_value=self.libraries))
        self.enterContext(patch('peach.web_media_directory.translate_ledger_path',
                                side_effect=lambda path: self.media if path.startswith('R:') else self.root / 'offline'))
        self.enterContext(patch('peach.web_media_directory.is_unmapped', return_value=False))
        self.reader = self.enterContext(patch('peach.web_media_directory.media_io._request', side_effect=self.browse))
        with self.contract.write_transaction() as conn:
            conn.executemany("INSERT INTO asset(id,location,path,name,medium,disposal) VALUES(?,?,?,?, 'video', ?)", [
                (1, 'local', 'R:\\Media\\series\\movie.mp4', 'movie', None),
                (2, 'local', 'R:\\Media\\series\\child\\nested.mp4', 'nested', None),
                (3, 'local', 'R:\\Media\\series\\gone.mp4', 'gone', 'trash'),
                (4, 'other', 'R:\\Media\\series\\unindexed.mp4', 'other source', None),
                (5, 'local', 'Z:\\Missing\\movie.mp4', 'unmounted', None),
            ])

    def browse(self, operation, path, *, value, timeout):
        self.assertEqual(operation, 'browse')
        self.assertEqual(timeout, 10)
        return nas_directories.list_directory(path, **json.loads(value))

    def read(self, **args):
        return web_media_directory.q_media_directory(self.contract, args)

    def test_roots_are_returned_without_touching_any_mount(self):
        result = self.read()
        self.assertEqual([row['id'] for row in result['roots']], ['local', 'cloud'])
        self.assertNotIn('ledger_root', result['roots'][0])
        self.reader.assert_not_called()

    def test_listing_only_marks_current_source_and_directory_live_assets(self):
        before = self.path.read_bytes()
        result = self.read(root='local', relative='series')
        self.assertEqual(result['state'], 'ready')
        self.assertEqual({row['name']: row['asset_id'] for row in result['files']},
                         {'gone.mp4': None, 'movie.mp4': 1, 'unindexed.mp4': None})
        self.assertEqual(result['directories'], [{'name': 'child'}])
        self.assertEqual(self.path.read_bytes(), before)

    def test_asset_position_uses_server_record_instead_of_caller_path(self):
        result = self.read(asset='1', root='cloud', relative='outside')
        self.assertEqual((result['root'], result['relative'], result['focus_name']), ('local', 'series', 'movie.mp4'))
        self.assertEqual(self.reader.call_args.args[1], str(self.folder))
        self.assertEqual(json.loads(self.reader.call_args.kwargs['value'])['allowed'], [str(self.media)])

    def test_unmounted_asset_keeps_its_recorded_position_without_io(self):
        result = self.read(asset='5')
        self.assertEqual(result['state'], 'unmapped')
        self.assertEqual(result['last_path'], 'Z:\\Missing\\movie.mp4')
        self.reader.assert_not_called()

    def test_invalid_scope_and_page_are_refused_before_io(self):
        for args in [dict(root='unknown'), dict(root='local', relative='../elsewhere'),
                     dict(root='local', relative='/etc'), dict(root='local', relative='a\\b'),
                     dict(root='local', offset='-1'), dict(root='local', offset='2147483648'),
                     dict(root='local', offset='not-a-number'), dict(asset='invalid'), dict(asset='999')]:
            with self.subTest(args=args), self.assertRaises(UserValueError):
                self.read(**args)
        self.reader.assert_not_called()

    def test_unavailable_sources_return_distinct_recoverable_states(self):
        for error, state in [(PermissionError, 'denied'), (FileNotFoundError, 'missing'),
                             (TimeoutError, 'timeout'), (OSError, 'unreachable')]:
            with self.subTest(state=state):
                self.reader.side_effect = error('unavailable')
                result = self.read(root='cloud')
                self.assertEqual(result['state'], state)
                self.assertEqual(result['root'], 'cloud')
                self.assertEqual(result['files'], [])

    def test_nested_configured_root_is_used_for_asset_position(self):
        self.libraries[0]['roots'].append({'root_id': 'nested', 'root': 'R:\\Media\\series', 'location': 'local'})
        self.reader.side_effect = None
        self.reader.return_value = {'directories': [], 'files': [{'name': 'movie.mp4'}],
                                    'next_offset': None, 'offset': 0, 'read_only': True}
        result = self.read(asset='1')
        self.assertEqual((result['root'], result['relative']), ('nested', ''))
        self.assertEqual(result['files'][0]['asset_id'], 1)
