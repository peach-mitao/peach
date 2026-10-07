"""CloudDrive HTTPS WebDAV 的冲突、成员核验、应答歧义与路径边界。"""
import unittest
from types import SimpleNamespace
from unittest.mock import Mock, patch
from urllib.parse import quote, unquote, urlsplit

import httpx
import grpc

from peach.organize_clouddrive import DAV_ORIGIN, PikPakDav, UnconfirmedMove
from peach import organize_clouddrive


class WebDavMoves(unittest.TestCase):
    def setUp(self):
        self.entries = {'A:\\old': True, 'A:\\old\\film.mp4': 20, 'A:\\new': True}
        self.requests = []
        self.move_status = 201
        self.move_timeout = False
        self.omit_after_move = False
        self.refresh = Mock()
        self.http = httpx.Client(transport=httpx.MockTransport(self.handle), follow_redirects=False)
        self.addCleanup(self.http.close)
        self.dav = PikPakDav(self.http, 'A:\\', self.refresh)

    def handle(self, request):
        path = 'A:' + unquote(urlsplit(str(request.url)).path).replace('/', '\\').rstrip('\\')
        if path == 'A:':
            path += '\\'
        self.requests.append((request.method, path, request.headers))
        if request.method == 'MOVE':
            if self.move_timeout:
                raise httpx.ReadTimeout('模拟应答未取得', request=request)
            target = 'A:' + unquote(urlsplit(request.headers['Destination']).path).replace('/', '\\')
            if self.move_status == 201:
                items = list(self.entries.items())
                for name, value in items:
                    if name == path or name.startswith(path + '\\'):
                        self.entries[target + name[len(path):]] = value
                        del self.entries[name]
                if self.omit_after_move:
                    self.entries.pop(target + '\\film.mp4', None)
            return httpx.Response(self.move_status)
        if request.method == 'MKCOL':
            self.entries[path] = True
            return httpx.Response(201)
        if request.method != 'PROPFIND':
            return httpx.Response(405)
        if path != 'A:\\' and self.entries.get(path) is not True:
            return httpx.Response(404)
        names = [(path, True)] + [(name, value) for name, value in self.entries.items()
                    if name != path and name.rsplit('\\', 1)[0].rstrip('\\') == path.rstrip('\\')]
        responses = []
        for name, value in names:
            href = quote('/' + name[3:].replace('\\', '/'), safe='/')
            kind = '<d:collection/>' if value is True else ''
            size = 0 if value is True else value
            responses.append(f'<d:response><d:href>{href}</d:href><d:propstat><d:prop>'
                             f'<d:resourcetype>{kind}</d:resourcetype><d:getcontentlength>{size}</d:getcontentlength>'
                             '</d:prop><d:status>HTTP/1.1 200 OK</d:status></d:propstat></d:response>')
        return httpx.Response(207, content=('<d:multistatus xmlns:d="DAV:">' + ''.join(responses) + '</d:multistatus>').encode())

    def test_file_move_preserves_size_and_refreshes_both_parents(self):
        self.dav.move('A:\\old\\film.mp4', 'A:\\new\\film.mp4')
        self.assertEqual(self.entries['A:\\new\\film.mp4'], 20)
        self.assertNotIn('A:\\old\\film.mp4', self.entries)
        self.assertEqual({c.args[0] for c in self.refresh.call_args_list}, {'A:\\old', 'A:\\new'})
        request = next(r for r in self.requests if r[0] == 'MOVE')
        self.assertEqual(request[2]['Overwrite'], 'F')
        self.assertTrue(request[2]['Destination'].startswith(DAV_ORIGIN))

    def test_target_collision_never_submits_move(self):
        self.entries['A:\\new\\film.mp4'] = 40
        with self.assertRaises(FileExistsError):
            self.dav.move('A:\\old\\film.mp4', 'A:\\new\\film.mp4')
        self.assertFalse(any(r[0] == 'MOVE' for r in self.requests))
        self.assertEqual(self.entries['A:\\new\\film.mp4'], 40)

    def test_failed_request_with_unchanged_source_is_recoverable(self):
        self.move_status = 403
        with self.assertRaises(FileNotFoundError):
            self.dav.move('A:\\old\\film.mp4', 'A:\\new\\film.mp4')
        self.assertEqual(self.entries['A:\\old\\film.mp4'], 20)

    def test_collection_move_checks_all_members(self):
        self.dav.move('A:\\old', 'A:\\new\\collection')
        self.assertEqual(self.entries['A:\\new\\collection\\film.mp4'], 20)
        self.assertNotIn('A:\\old', self.entries)

    def test_move_timeout_preserves_intent_when_source_is_still_present(self):
        self.move_timeout = True
        with self.assertRaises(UnconfirmedMove):
            self.dav.move('A:\\old\\film.mp4', 'A:\\new\\film.mp4')
        self.assertEqual(sum(r[0] == 'MOVE' for r in self.requests), 1)
        self.assertEqual(self.entries['A:\\old\\film.mp4'], 20)

    def test_incomplete_collection_stops_without_repeating_move(self):
        self.omit_after_move = True
        with self.assertRaises(UnconfirmedMove):
            self.dav.move('A:\\old', 'A:\\new\\collection')
        self.assertEqual(sum(r[0] == 'MOVE' for r in self.requests), 1)

    def test_success_acknowledgement_requires_namespace_change(self):
        for status in (200, 202, 204, 207):
            with self.subTest(status=status):
                self.requests.clear()
                self.move_status = status
                with self.assertRaises(UnconfirmedMove):
                    self.dav.move('A:\\old\\film.mp4', 'A:\\new\\film.mp4')
                self.assertEqual(sum(r[0] == 'MOVE' for r in self.requests), 1)
                self.assertEqual(self.entries['A:\\old\\film.mp4'], 20)

    def test_empty_collection_requires_destination_entry(self):
        del self.entries['A:\\old\\film.mp4']
        self.dav.move('A:\\old', 'A:\\new\\empty')
        self.assertIs(self.entries['A:\\new\\empty'], True)

    def test_nested_parent_is_created_in_order(self):
        self.dav.move('A:\\old\\film.mp4', 'A:\\deep\\nested\\film.mp4')
        self.assertEqual([r[1] for r in self.requests if r[0] == 'MKCOL'], ['A:\\deep', 'A:\\deep\\nested'])

    def test_cross_drive_is_rejected_before_network(self):
        with self.assertRaises(ValueError):
            self.dav.move('A:\\old\\film.mp4', 'R:\\film.mp4')
        self.assertFalse(self.requests)

    def test_unicode_path_is_utf8_percent_encoded(self):
        self.assertEqual(self.dav.url('A:\\创作者\\a b.mp4'), DAV_ORIGIN + '/%E5%88%9B%E4%BD%9C%E8%80%85/a%20b.mp4')

    def test_creator_handle_uses_provider_literal_at_path(self):
        self.entries.update({'A:\\old\\creator@handle': True, 'A:\\old\\creator@handle\\film.mp4': 20})

        def provider(request):
            if b'%40' in request.url.raw_path or '%40' in request.headers.get('Destination', ''):
                return httpx.Response(404)
            return self.handle(request)

        with httpx.Client(transport=httpx.MockTransport(provider)) as http:
            dav = PikPakDav(http, 'A:\\', self.refresh)
            dav.move('A:\\old\\creator@handle', 'A:\\new\\creator@handle')
        self.assertEqual(self.entries['A:\\new\\creator@handle\\film.mp4'], 20)
        self.assertNotIn('A:\\old\\creator@handle', self.entries)

    def test_same_parent_rename_uses_verified_official_operation(self):
        def rename(source, target):
            self.entries[target] = self.entries.pop(source)
            return True
        self.dav.rename = Mock(side_effect=rename)
        self.dav.move('A:\\old\\film.mp4', 'A:\\old\\title.mp4')
        self.dav.rename.assert_called_once_with('A:\\old\\film.mp4', 'A:\\old\\title.mp4')
        self.assertEqual(self.entries['A:\\old\\title.mp4'], 20)
        self.assertFalse(any(r[0] == 'MOVE' for r in self.requests))

    def test_official_rename_ack_requires_actual_path_change(self):
        self.dav.rename = Mock(return_value=True)
        with self.assertRaises(UnconfirmedMove):
            self.dav.move('A:\\old\\film.mp4', 'A:\\old\\title.mp4')
        self.assertEqual(self.entries['A:\\old\\film.mp4'], 20)
        self.dav.rename.assert_called_once()


class AuthenticationSamples(unittest.TestCase):
    class Missing(grpc.RpcError):
        def code(self):
            return grpc.StatusCode.NOT_FOUND

    def test_moved_sample_uses_existing_catalog_sample(self):
        cloud = Mock(token='test-token')
        reply = SimpleNamespace(directUrl=DAV_ORIGIN+'/available/image.jpg', userAgent='', additionalHeaders={'Authorization':'test-credential'})
        stub = cloud.channel.unary_unary.return_value
        stub.side_effect = [self.Missing(), reply]
        with patch.object(organize_clouddrive, '_fallback_samples', return_value=['A:\\available\\image.jpg']):
            headers = organize_clouddrive._download_headers(cloud, 'A:\\moved\\image.jpg')
        self.assertEqual(headers, {'Authorization':'test-credential'})
        self.assertEqual([c.args[0].path for c in stub.call_args_list], ['/Pikpak/moved/image.jpg','/Pikpak/available/image.jpg'])

    def test_missing_samples_stop_after_three_calls(self):
        cloud = Mock(token='test-token')
        stub = cloud.channel.unary_unary.return_value
        stub.side_effect = self.Missing()
        with patch.object(organize_clouddrive, '_fallback_samples', return_value=['A:\\first.jpg','A:\\second.jpg']), self.assertRaises(ValueError):
            organize_clouddrive._download_headers(cloud, 'A:\\moved.jpg')
        self.assertEqual(stub.call_count, 3)

    def test_foreign_download_source_is_rejected(self):
        cloud = Mock(token='test-token')
        cloud.channel.unary_unary.return_value.return_value = SimpleNamespace(directUrl='https://example.test/image.jpg', additionalHeaders={}, userAgent='')
        with self.assertRaises(ValueError):
            organize_clouddrive._download_headers(cloud, 'A:\\image.jpg')
