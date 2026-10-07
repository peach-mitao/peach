"""PikPak WebDAV 的同来源 HTTPS 移动与有界核验。"""
from __future__ import annotations

from contextlib import closing, contextmanager
from pathlib import PureWindowsPath
from urllib.parse import quote, unquote, urlsplit
from xml.etree import ElementTree as ET

import httpx
import grpc
from google.protobuf import descriptor_pb2, descriptor_pool, message_factory

from . import organize
from .downloads_clouddrive import CloudDriveClient, SERVICE, discover
from .downloads import CLOUDDRIVE_CREDENTIAL, DownloadSettings
from .follow_secrets import CredentialStore
from .config import DATABASE_PATH, SECRETS_DIR, STATE_DIR
from .scripting import open_readonly

MAX_RESPONSE = 2 * 1024 * 1024
MAX_FILES = 10000
DAV_ORIGIN = 'https://dav.mypikpak.com'


class UnconfirmedMove(SystemExit):
    """保留移动意图，停止当前进程供续跑核对。"""


def _messages():
    """CloudDrive 官方 GetDownloadUrlPath/GetSubFiles 消息的所需字段。"""
    from . import downloads_clouddrive_pb2 as pb
    proto = descriptor_pb2.FileDescriptorProto(
        name='peach_organize_cloud.proto', package='peach_organize_cloud', syntax='proto3')
    proto.dependency.append(pb.DESCRIPTOR.name)
    request = proto.message_type.add(name='DownloadRequest')
    request.field.add(name='path', number=1, type=9, label=1)
    request.field.add(name='get_direct_url', number=4, type=8, label=1)
    reply = proto.message_type.add(name='DownloadReply')
    reply.field.add(name='directUrl', number=3, type=9, label=1)
    reply.field.add(name='userAgent', number=4, type=9, label=1)
    entry = reply.nested_type.add(name='HeadersEntry')
    entry.options.map_entry = True
    entry.field.add(name='key', number=1, type=9, label=1)
    entry.field.add(name='value', number=2, type=9, label=1)
    reply.field.add(name='additionalHeaders', number=5, type=11, label=3,
                    type_name='.peach_organize_cloud.DownloadReply.HeadersEntry')
    listing = proto.message_type.add(name='ListRequest')
    listing.field.add(name='path', number=1, type=9, label=1)
    listing.field.add(name='forceRefresh', number=2, type=8, label=1)
    result = proto.message_type.add(name='ListReply')
    result.field.add(name='subFiles', number=1, type=11, label=3,
                     type_name='.clouddrive.CloudDriveFile')
    rename = proto.message_type.add(name='RenameRequest')
    rename.field.add(name='path', number=1, type=9, label=1)
    rename.field.add(name='newName', number=2, type=9, label=1)
    pool = descriptor_pool.DescriptorPool()
    pool.AddSerializedFile(pb.DESCRIPTOR.dependencies[0].serialized_pb)
    pool.AddSerializedFile(pb.DESCRIPTOR.serialized_pb)
    pool.Add(proto)
    return tuple(message_factory.GetMessageClass(pool.FindMessageTypeByName('peach_organize_cloud.' + name))
                 for name in ('DownloadRequest', 'DownloadReply', 'ListRequest', 'ListReply', 'RenameRequest'))


DownloadRequest, DownloadReply, ListRequest, ListReply, RenameRequest = _messages()


class PikPakDav:
    def __init__(self, http: httpx.Client, root: str, refresh, rename=None, listing=None):
        self.http, self.root, self.refresh = http, PureWindowsPath(root), refresh
        self.rename = rename
        self.listing = listing
        if self.root != PureWindowsPath('A:\\'):
            raise ValueError('HTTPS WebDAV 整理只支持已声明的 A 盘根目录')

    def url(self, path: str) -> str:
        item = PureWindowsPath(path)
        if item.drive.casefold() != self.root.drive.casefold() or '..' in item.parts or not item.is_absolute():
            raise ValueError('WebDAV 路径越出已声明来源')
        return DAV_ORIGIN + quote('/' + '/'.join(item.parts[1:]), safe='/@')

    def request(self, method, path, **kwargs):
        try:
            with self.http.stream(method, self.url(path), **kwargs) as response:
                chunks, size = [], 0
                for chunk in response.iter_bytes():
                    size += len(chunk)
                    if size > MAX_RESPONSE:
                        raise ValueError('WebDAV 响应超过预算')
                    chunks.append(chunk)
                return response.status_code, b''.join(chunks)
        except httpx.HTTPError:
            raise OSError('WebDAV 网络应答未取得') from None

    def list(self, path):
        if self.listing is not None:
            self.url(path)
            return self.listing(path)
        status, body = self.request('PROPFIND', path, headers={'Depth': '1'})
        if status != 207:
            raise OSError('WebDAV 目录应答未取得：HTTP ' + str(status))
        result, seen = [], set()
        parent = PureWindowsPath(path)
        for node in ET.fromstring(body).findall('{DAV:}response'):
            href = urlsplit(node.findtext('{DAV:}href') or '')
            if href.netloc and (href.scheme + '://' + href.netloc) != DAV_ORIGIN:
                raise ValueError('WebDAV 成员来自其他来源')
            name = PureWindowsPath('A:' + unquote(href.path, errors='strict').replace('/', '\\'))
            if name != parent and name.parent != parent:
                raise ValueError('WebDAV 成员越出所列目录')
            if name in seen:
                raise ValueError('WebDAV 目录存在重复路径')
            seen.add(name)
            valid = [p for p in node.findall('{DAV:}propstat')
                     if (p.findtext('{DAV:}status') or '').split()[1:2] == ['200']]
            if len(valid) != 1:
                raise ValueError('WebDAV 成员属性未完整取得')
            props = valid[0].find('{DAV:}prop')
            if props is None:
                raise ValueError('WebDAV 成员属性为空')
            if name != parent:
                result.append(dict(path=str(name), size=int(props.findtext('{DAV:}getcontentlength') or 0),
                                   directory=props.find('{DAV:}resourcetype/{DAV:}collection') is not None))
        if parent not in seen:
            raise ValueError('WebDAV 应答缺少目录自身')
        return result

    def tree(self, path):
        pending, files, visited = [path], [], set()
        while pending:
            parent = pending.pop()
            if parent in visited or len(visited) >= MAX_FILES:
                raise ValueError('WebDAV 目录遍历超过预算或循环')
            visited.add(parent)
            for entry in self.list(parent):
                if entry['directory']:
                    pending.append(entry['path'])
                else:
                    files.append(entry)
            if len(files) > MAX_FILES:
                raise ValueError('WebDAV 文件成员超过预算')
        return files

    def ensure_parent(self, path):
        parent = PureWindowsPath(path).parent
        if parent == self.root:
            return
        self.ensure_parent(str(parent))
        grandparent = str(parent.parent)
        listing = self.list(grandparent)
        matches = [r for r in listing if PureWindowsPath(r['path']) == parent]
        if matches:
            if not matches[0]['directory']:
                raise ValueError('目标父路径不是目录')
            return
        status, _ = self.request('MKCOL', str(parent))
        if status != 201:
            raise OSError('WebDAV 创建父目录失败：HTTP ' + str(status))
        self.refresh(grandparent)

    def submit_move(self, source, target):
        if PureWindowsPath(source).parent == PureWindowsPath(target).parent and self.rename is not None:
            return 200 if self.rename(source, target) else None
        return self.request('MOVE', source, headers={'Destination': self.url(target), 'Overwrite': 'F'})[0]

    def move(self, source, target):
        self.url(source)
        self.url(target)
        old_parent, new_parent = str(PureWindowsPath(source).parent), str(PureWindowsPath(target).parent)
        entries = self.list(old_parent)
        found = [r for r in entries if PureWindowsPath(r['path']) == PureWindowsPath(source)]
        if len(found) != 1:
            raise FileNotFoundError('WebDAV 来源未取得')
        before = self.tree(source) if found[0]['directory'] else found
        self.ensure_parent(target)
        if any(PureWindowsPath(r['path']) == PureWindowsPath(target) for r in self.list(new_parent)):
            raise FileExistsError('WebDAV 目标已存在')
        try:
            response_status = self.submit_move(source, target)
        except OSError:
            response_status = None
        try:
            after_parent = self.list(new_parent)
            old_listing = self.list(old_parent)
            arrived = [r for r in after_parent if PureWindowsPath(r['path']) == PureWindowsPath(target)]
            still_present = any(PureWindowsPath(r['path']) == PureWindowsPath(source) for r in old_listing)
            if still_present and not arrived:
                if response_status is None or response_status >= 500 or 200 <= response_status < 300:
                    raise ValueError('WebDAV 请求仍可能在服务端处理')
                raise FileNotFoundError('WebDAV 移动未执行，原文件已确认保留')
            after = self.tree(target) if found[0]['directory'] else arrived
            expected = {(str(PureWindowsPath(target, *PureWindowsPath(r['path']).parts[len(PureWindowsPath(source).parts):])), r['size'])
                        for r in before}
            if still_present or len(arrived) != 1 or arrived[0]['directory'] != found[0]['directory'] or expected != {(r['path'], r['size']) for r in after}:
                raise ValueError('WebDAV 移动状态或完整成员不符')
            for parent in {old_parent, new_parent}:
                self.refresh(parent)
            if found[0]['directory']:
                self.refresh(target)
        except FileNotFoundError:
            raise
        except Exception:
            raise UnconfirmedMove('WebDAV 移动状态未确认，保留意图回执并停止；不重复操作、不写账本') from None


def _cloud_listing(cloud, path):
    """逐层完整读取官方目录元数据并校验来源、父目录与重名。"""
    item = PureWindowsPath(path)
    if item.drive.casefold() != 'a:' or not item.is_absolute() or '..' in item.parts or len(item.parts) > 32:
        raise ValueError('官方目录路径越出 A 盘或超过层级预算')
    previous = None
    for parent in (*reversed(item.parents), item):
        if previous is not None and not any(PureWindowsPath(row['path']) == parent and row['directory'] for row in previous):
            raise FileNotFoundError('官方父目录未列出所需目录')
        request = ListRequest(path=('/Pikpak/' + '/'.join(parent.parts[1:])).rstrip('/'), forceRefresh=True)
        call = cloud.channel.unary_stream(SERVICE + 'GetSubFiles',
            request_serializer=ListRequest.SerializeToString, response_deserializer=ListReply.FromString)
        stream = call(request, timeout=15, metadata=(('authorization', 'Bearer ' + cloud.token),))
        rows, seen = [], set()
        try:
            for response in stream:
                for member in response.subFiles:
                    if not member.fullPathName.startswith('/Pikpak/'):
                        raise ValueError('官方目录成员来自其他来源')
                    name = PureWindowsPath('A:\\' + member.fullPathName[len('/Pikpak/'):].replace('/', '\\'))
                    if name.parent != parent or str(name).casefold() in seen or member.size < 0:
                        raise ValueError('官方目录成员越界、重名或体积无效')
                    seen.add(str(name).casefold())
                    rows.append(dict(path=str(name),size=member.size,directory=member.isDirectory))
                if len(rows) > MAX_FILES:
                    raise ValueError('官方目录成员超过预算')
        except grpc.RpcError as error:
            raise OSError('官方完整目录未取得：' + error.code().name) from None
        finally:
            stream.cancel()
        previous = rows
    return previous


def _fallback_samples():
    with closing(open_readonly(DATABASE_PATH)) as db:
        return [row[0] for row in db.execute(
            "SELECT path FROM asset WHERE location='pikpak' AND disposal IS NULL AND medium='image' "
            "AND path LIKE 'A:%' ORDER BY id LIMIT 2")]


def _download_headers(cloud, sample_path):
    paths = [sample_path]
    stub = cloud.channel.unary_unary(SERVICE + 'GetDownloadUrlPath',
        request_serializer=DownloadRequest.SerializeToString, response_deserializer=DownloadReply.FromString)
    for index in range(3):
        if index >= len(paths):
            break
        path = PureWindowsPath(paths[index])
        if path.drive.casefold() != 'a:' or not path.is_absolute() or '..' in path.parts:
            raise ValueError('认证样本越出 A 盘来源')
        relative = '/' + '/'.join(path.parts[1:])
        try:
            reply = stub(DownloadRequest(path='/Pikpak' + relative, get_direct_url=True), timeout=15,
                         metadata=(('authorization', 'Bearer ' + cloud.token),))
        except grpc.RpcError as error:
            if error.code() != grpc.StatusCode.NOT_FOUND:
                raise ValueError('既有 CloudDrive 直链认证未取得') from None
            if index == 0:
                paths.extend(p for p in _fallback_samples() if p != sample_path)
            continue
        url = urlsplit(reply.directUrl)
        if url.hostname != 'dav.mypikpak.com' or url.scheme not in ('http', 'https') or url.username or url.query or unquote(url.path) != relative:
            raise ValueError('既有直链来源或路径不符')
        headers = dict(reply.additionalHeaders)
        if not any(k.casefold() == 'authorization' for k in headers):
            raise ValueError('既有 WebDAV 认证未取得')
        if reply.userAgent:
            headers['User-Agent'] = reply.userAgent
        return headers
    raise ValueError('既有 CloudDrive 认证样本未取得')


@contextmanager
def pikpak_renames(sample_path: str, roots):
    """仅显式启用的目录批次复用既有 CloudDrive 认证。"""
    if tuple(roots.get('pikpak', ())) != ('A:\\',):
        raise ValueError('PikPak 来源根必须唯一声明为 A 盘')
    credential = CredentialStore(SECRETS_DIR).load(CLOUDDRIVE_CREDENTIAL)
    if not credential or not credential.values.get('token'):
        raise ValueError('既有 CloudDrive 令牌未取得')
    address = DownloadSettings(STATE_DIR).load().clouddrive_address or discover()
    with CloudDriveClient(address, credential.values['token'], timeout=15) as cloud:
        info = cloud.find('/Pikpak')
        if info is None or info.CloudAPI.name.casefold() != 'webdav':
            raise ValueError('既有 PikPak WebDAV 来源未取得')
        headers = _download_headers(cloud, sample_path)

        def rename_remote(source, target):
            from . import downloads_clouddrive_pb2 as pb
            if PureWindowsPath(source).parent != PureWindowsPath(target).parent:
                raise ValueError('官方改名只支持同父目录')
            stub = cloud.channel.unary_unary(SERVICE + 'RenameFile',
                request_serializer=RenameRequest.SerializeToString, response_deserializer=pb.FileOperationResult.FromString)
            try:
                reply = stub(RenameRequest(path='/Pikpak/' + '/'.join(PureWindowsPath(source).parts[1:]),
                             newName=PureWindowsPath(target).name), timeout=15,
                             metadata=(('authorization', 'Bearer ' + cloud.token),))
                return reply.success
            except grpc.RpcError:
                return False

        def refresh(path):
            return _cloud_listing(cloud, path)

        with httpx.Client(headers=headers, timeout=20, follow_redirects=False) as http:
            dav, original = PikPakDav(http, 'A:\\', refresh, rename_remote, listing=refresh), organize._rename

            def rename(source, target):
                if PureWindowsPath(source).drive.casefold() == 'a:':
                    dav.move(source, target)
                else:
                    original(source, target)

            organize._rename = rename
            try:
                yield dav
            finally:
                organize._rename = original
