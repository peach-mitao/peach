"""网页媒体目录：按需读取一个目录，不触发扫描、探测或媒体写入。"""
from pathlib import Path, PurePosixPath, PureWindowsPath
import json

from . import media_io, media_libraries, settings_file
from .media_folders import path_predicate
from .platform import is_unmapped, translate_ledger_path
from .user_messages import UserValueError


def q_media_directory(contract, args):
    config = settings_file.active()
    roots = []
    for library in media_libraries.libraries(config):
        for root in library['roots']:
            mount = translate_ledger_path(root['root'])
            if not is_unmapped(mount):
                roots.append({'id': root['root_id'], 'name': library['name'],
                              'location': root['location'], 'ledger_root': root['root'],
                              'mount': str(mount)})
    public_roots = [{key: value for key, value in root.items() if key != 'ledger_root'} for root in roots]
    result = {'roots': public_roots, 'root': None, 'relative': '', 'directories': [],
              'files': [], 'next_offset': None, 'state': 'roots'}
    root_id, relative = args.get('root', ''), args.get('relative', '')
    focus_name = ''
    if args.get('asset'):
        position = asset_directory(contract, roots, args['asset'])
        if 'last_path' in position:
            return {**result, 'state': 'unmapped', **position}
        root_id, relative, focus_name = position['root'], position['relative'], position['focus_name']
    if not root_id:
        return result
    root = next((row for row in roots if row['id'] == root_id), None)
    parts = PurePosixPath(relative)
    if root is None or parts.is_absolute() or '..' in parts.parts or '\\' in relative:
        raise UserValueError('errors.nasDirectories.outsideRoots')
    try:
        offset = int(args.get('offset', '0'))
        if not 0 <= offset < 2**31:
            raise ValueError
    except (ValueError, TypeError):
        raise UserValueError('errors.nasDirectories.invalidOffset') from None
    target = Path(root['mount']).joinpath(*parts.parts)
    result.update(root=root_id, relative=str(parts) if parts.parts else '', focus_name=focus_name,
                  path=str(target), state='ready')
    # 台账只查当前层；目录读取在可终止子进程内执行，离线网盘不占住请求线程。
    ledger_directory = str(PureWindowsPath(root['ledger_root']).joinpath(*parts.parts))
    clause, values = path_predicate(root['location'], ledger_directory, False)
    with contract.read_connection() as connection:
        indexed = {PureWindowsPath(path).name: asset_id for asset_id, path in connection.execute(
            f'SELECT a.id,a.path FROM asset a WHERE {clause} AND COALESCE(a.disposal,\'\') NOT IN (\'trash\',\'vanished\')', values)}
    try:
        page = media_io._request('browse', str(target), value=json.dumps({
            'allowed': [root['mount']], 'offset': offset, 'include_files': True,
            'focus_name': focus_name}), timeout=10)
    except PermissionError:
        return {**result, 'state': 'denied'}
    except FileNotFoundError:
        return {**result, 'state': 'missing'}
    except TimeoutError:
        return {**result, 'state': 'timeout'}
    except OSError:
        return {**result, 'state': 'unreachable'}
    except ValueError:
        raise UserValueError('errors.nasDirectories.outsideRoots') from None
    result.update(directories=[{'name': item['name']} for item in page['directories']],
                  files=[{**item, 'asset_id': indexed.get(item['name'])} for item in page['files']],
                  next_offset=page['next_offset'], offset=page['offset'], read_only=page['read_only'])
    return result


def asset_directory(contract, roots, value):
    """从账本定位文件，嵌套配置优先采用最具体的授权根。"""
    try:
        asset_id = int(value)
    except (ValueError, TypeError):
        raise UserValueError('api.folders.folderMissing') from None
    with contract.read_connection() as connection:
        asset = connection.execute('SELECT location,path FROM asset WHERE id=?', (asset_id,)).fetchone()
    if asset is None or not asset[1]:
        raise UserValueError('api.folders.folderMissing')
    path = PureWindowsPath(asset[1])
    matching = [row for row in roots if row['location'] == asset[0]
                and path.is_relative_to(PureWindowsPath(row['ledger_root']))]
    if not matching:
        return {'last_path': str(path)}
    root = max(matching, key=lambda row: len(PureWindowsPath(row['ledger_root']).parts))
    return {'root': root['id'], 'relative': '/'.join(path.parent.relative_to(PureWindowsPath(root['ledger_root'])).parts),
            'focus_name': path.name}
