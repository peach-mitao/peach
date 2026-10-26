"""详情页的显式手动保存：文件名、NFO、配套封面与现有人工字段。"""
import base64
import hashlib
from contextlib import ExitStack
import io
import json
from pathlib import Path, PureWindowsPath
import re
import shutil
import time
import xml.etree.ElementTree as ET

from PIL import Image

from .catalog_rules import (_jav_code_pattern, clear_jav_edition_markers, jav_edition_badges,
                            local_cover_code, normalise_code_key, release_code_from_filename,
                            release_code_from_text, same_release_code)
from .cover_artwork import install_cover
from .entities import normalize_entity_name, upsert_asset_entity
from .field_owners import check_revision, USER_MANUAL, write_owned_fields
from .fsutil import atomic_path, atomic_write_bytes
from .library_nfo import (POSTER_EXTENSIONS, SidecarIndex, directory_files, identity_elements,
                          parse_nfo, read_nfo)
from .local_poster import read_jpeg
from .organize import _rename, _update_row
from .organize_templates import sanitise_component
from .platform import is_windows_path, location_roots, translate_ledger_path, translate_roots
from .scan import medium_of
from .subtitles import pair as pair_subtitle, subtitle_format
from .western_artwork import artwork_key

MAX_IMAGE = 16 * 1024 * 1024


def _asset(connection, asset_id):
    row = connection.execute('SELECT * FROM asset WHERE id=?', (int(asset_id),)).fetchone()
    if row is None or row['medium'] != 'video' or row['location'] != 'local' or row['disposal']:
        raise ValueError('请选择仍在本地媒体库中的视频')
    video = translate_ledger_path(row['path'])
    if video.is_symlink():
        raise ValueError('请编辑实际视频文件，不能改名符号链接')
    video = video.resolve()
    roots = translate_roots(location_roots().get('local', ()))
    if not roots or not any(video.is_relative_to(root.resolve()) for root in roots):
        raise ValueError('视频不在当前登记的本地目录中')
    if not video.is_file():
        raise ValueError('视频文件已不在原位置')
    return dict(row), video


def q_item_edit(contract, args):
    from .web_catalog import q_item
    with contract.read_connection() as connection:
        row, _video = _asset(connection, args['id'])
    item = q_item(contract, row['id'])
    badges = jav_edition_badges(row['name'], row['code'])
    return dict(id=row['id'], filename=row['name'], code=row['code'] or local_cover_code(row['name']) or '',
                title=row['catalog_title'] or '',
                performers=item['performers'], mutation_revision=row['mutation_revision'],
                subtitled='中字' in badges, uncensored='无码破解' in badges)


def _filename(raw, video, edition=None):
    name = str(raw or '')
    if (not name or sanitise_component(name) != name or Path(name).name != name
            or any(char in name for char in ('/', '\\')) or name in ('.', '..')):
        raise ValueError('文件名包含不允许的字符，或长度超出限制')
    if Path(name).suffix.lower() != video.suffix.lower():
        if medium_of(name) != 'other':
            raise ValueError('不能通过改名更换视频扩展名')
        return _filename(name + video.suffix, video, edition)
    if edition is None:
        return name
    if not isinstance(edition, dict) or any(type(edition.get(key)) is not bool for key in ('subtitled', 'uncensored')):
        raise ValueError('版本标记必须是明确的开关')
    stem = clear_jav_edition_markers(Path(name).stem, local_cover_code(name))
    tags = (' [中字]' if edition['subtitled'] else '') + (' [无码破解]' if edition['uncensored'] else '')
    return _filename(stem + tags + video.suffix, video)


def _cover(raw):
    if not raw:
        return None
    if not isinstance(raw, str) or len(raw) > MAX_IMAGE * 4 // 3 + 128:
        raise ValueError('封面图片超过 16 MB')
    try:
        header, encoded = raw.split(',', 1)
        if header not in ('data:image/jpeg;base64', 'data:image/png;base64', 'data:image/webp;base64'):
            raise ValueError('请选择 JPG、PNG 或 WebP 图片')
        data = base64.b64decode(encoded, validate=True)
        if len(data) > MAX_IMAGE:
            raise ValueError('封面图片超过 16 MB')
        with Image.open(io.BytesIO(data)) as image:
            image.load()
            if image.format not in ('JPEG', 'PNG', 'WEBP') or getattr(image, 'is_animated', False):
                raise ValueError('封面必须是静态图片')
            result = io.BytesIO()
            image.convert('RGB').save(result, 'JPEG', quality=95)
            return result.getvalue(), image.size
    except (OSError, ValueError, Image.DecompressionBombError) as error:
        raise ValueError('无法读取封面：' + str(error)) from error


def _requested_code(body):
    if 'code' not in body:
        return None
    raw = body['code']
    if not isinstance(raw, str) or not raw.strip() or len(raw) > 100 or re.search(r'[/\\\x00-\x1f]', raw):
        raise ValueError('请输入有效番号，例如 IPX-061')
    code = release_code_from_text(normalise_code_key(raw))
    pattern = _jav_code_pattern(code) if code else ''
    if (not code or (not re.fullmatch(pattern, raw.strip(), re.I) if pattern
                     else raw.strip().casefold() != code.casefold())):
        raise ValueError('无法识别番号，请只填写番号，片名填在作品标题中')
    return code


def _filename_code(name, code):
    """把显式番号同步到一个文件名，复用现有身份与版本规则。"""
    current = local_cover_code(name)
    if current:
        pattern = _jav_code_pattern(current)
        match = re.search(rf'(?<![A-Z0-9])(?:{pattern})(?!\d)', name, re.I) if pattern else None
        if not match:
            raise ValueError('无法定位文件名中的番号，请直接修改文件名')
        name = name[:match.start()] + code + name[match.end():]
    else:
        name = code + ' ' + name
    if not same_release_code(local_cover_code(name), code):
        raise ValueError('文件名中含有其他编号，请统一番号和文件名后再保存')
    return name


def _restore(path, prior):
    if prior is None:
        path.unlink(missing_ok=True)
    else:
        atomic_write_bytes(path, prior)


def _remember(undo, path):
    prior = path.read_bytes() if path.exists() else None
    undo.callback(_restore, path, prior)


def _check_target(source, target):
    if target.exists() and (source != target or not target.samefile(source)):
        raise ValueError('目标文件已经存在：' + target.name)


def _move(undo, source, target):
    if str(source) == str(target):
        return
    _check_target(source, target)
    try:
        _rename(str(source), str(target))
    except PermissionError as error:
        if getattr(error, 'winerror', None) in (32, 33):
            raise ValueError('视频或配套文件正被占用，请停止播放并关闭占用程序后重试') from error
        raise ValueError('无法改名，请检查视频目录的写入权限') from error
    undo.callback(_rename, str(target), str(source))


def _companions(video, target):
    found = []
    files = directory_files(video.parent)
    index = SidecarIndex(files)
    videos = [path.name for path in index.videos]
    for path in files.values():
        suffix = path.name[len(video.stem):] if path.name.casefold().startswith(video.stem.casefold()) else ''
        if (suffix.lower() in ('.nfo', '.srt', '.ass', '.ssa', '.vtt', '.jpg', '.jpeg', '.png', '.webp', '-poster.jpg', '-poster.jpeg',
                               '-poster.png', '-poster.webp')
                or re.fullmatch(r'\.[\w-]+\.(?:srt|ass|ssa|vtt)', suffix, re.I)):
            if subtitle_format(path.name):
                paired, _pairing = pair_subtitle(path.name, videos)
                if paired and Path(paired).stem.casefold() != video.stem.casefold():
                    continue
            if path.is_symlink() or path.resolve().parent != video.parent:
                raise ValueError('配套文件必须是视频目录中的实际文件')
            found.append((path, target.with_name(target.stem + suffix)))
    shared = set()
    code = release_code_from_filename(video.name)
    poster_stems = {path.stem.casefold() for path, _new in found if path.suffix.lower() in POSTER_EXTENSIONS}
    for peer in index.videos:
        if peer == video:
            continue
        peer_stem = peer.stem.casefold()
        same_stem = peer_stem == video.stem.casefold()
        shared_poster = peer_stem in poster_stems or peer_stem + '-poster' in poster_stems
        if (not same_stem and not shared_poster
                and (not code or not same_release_code(code, release_code_from_filename(peer.name)))):
            continue
        nfo, posters = index.for_video(peer)
        shared.update([nfo, *posters])
        if same_stem:
            shared.update(old for old, _new in found)
            shared.add(video.with_suffix('.nfo'))
    return found, shared


def _nfo_fields(root, title, performers, edited):
    if 'title' in edited:
        for node in root.findall('title'):
            root.remove(node)
        if title:
            ET.SubElement(root, 'title').text = title
    if 'actor' in edited:
        for node in root.findall('actor'):
            root.remove(node)
        for name in performers:
            ET.SubElement(ET.SubElement(root, 'actor'), 'name').text = name


def _nfo(video, target, title, performers, poster, companions, code, edited):
    path = video.with_suffix('.nfo')
    if path.exists():
        _payload, raw = read_nfo(path)
        root = ET.fromstring(raw)
    else:
        root = ET.Element('movie')
        edited = {'title', 'actor'}
    if code:
        for node in list(identity_elements(root)):
            root.remove(node)
        ET.SubElement(root, 'uniqueid', {'type': 'num'}).text = code
    _nfo_fields(root, title, performers, edited)
    renames = {old.name: new.name for old, new in companions}
    for node in root.iter():
        if node.text in renames:
            node.text = renames[node.text]
    if poster:
        art = root.find('art')
        if art is None:
            art = ET.SubElement(root, 'art')
        node = art.find('poster')
        if node is None:
            node = ET.SubElement(art, 'poster')
        node.text = target.stem + '-poster.jpg'
    raw = ET.tostring(root, encoding='utf-8', xml_declaration=True)
    payload = parse_nfo(raw)
    if code and not same_release_code(payload['id'], code):
        raise ValueError('待保存的 NFO 番号与当前视频不一致')
    return raw


def _actors(connection, asset_id, names, stamp):
    connection.execute("DELETE FROM asset_entity WHERE asset_id=? AND role='performer'", (asset_id,))
    connection.execute("DELETE FROM asset_tag WHERE asset_id=? AND tag LIKE '演员:%'", (asset_id,))
    for name in names:
        upsert_asset_entity(connection, kind='performer', name=name, asset_id=asset_id,
                            role='performer', source=USER_MANUAL, confidence=1.0, now=stamp,
                            update_entity_metadata=False)
        connection.execute("INSERT INTO asset_tag(asset_id,tag,source,confidence) VALUES(?,?,?,1.0)",
                           (asset_id, '演员:' + name, USER_MANUAL))
    connection.execute("INSERT INTO review_decision(category,item_key,status,reviewer,note,updated_at) "
        "VALUES('metadata_fields',?,'approved','local-default',?,?) ON CONFLICT(category,item_key) "
        "DO UPDATE SET status=excluded.status,reviewer=excluded.reviewer,note=excluded.note,updated_at=excluded.updated_at",
        (f'asset:{asset_id}:performers', json.dumps({'source': USER_MANUAL, 'value': names}, ensure_ascii=False), stamp))


def _edit_values(body):
    """在打开写事务之前校验表单与静态图片，返回规范的人工值。"""
    names = body.get('performers')
    if (not isinstance(names, list) or len(names) > 100
            or any(not isinstance(name, str) or not name.strip() or len(name) > 100
                   or any(ord(char) < 32 for char in name) for name in names)):
        raise ValueError('演员必须是姓名列表，每个姓名 1 至 100 个字符')
    names = list({normalize_entity_name(name): name.strip() for name in names}.values())
    title = str(body.get('title') or '').strip()
    if len(title) > 1000 or any(ord(char) < 32 for char in title):
        raise ValueError('标题过长或包含控制字符')
    if type(body.get('expected_revision')) is not int or not isinstance(body.get('expected_name'), str):
        raise ValueError('请重新打开编辑表单')
    return title, names, _cover(body.get('cover')), _requested_code(body)


def _edit_targets(connection, row, video, target, image):
    """预检媒体、配套文件以及本次新建边车的归属和重名。"""
    companions, shared = _companions(video, target)
    if companions:
        ledger = PureWindowsPath(row['path']) if is_windows_path(row['path']) else Path(row['path'])
        paths = {str(ledger.with_name(old.name)): old for old, _new in companions}
        marks = ','.join('?' * len(paths))
        foreign = set()
        for path, name in connection.execute(
                'SELECT s.path,a.name FROM asset_subtitle s JOIN asset a ON a.id=s.asset_id '
                f'WHERE s.location=? AND s.asset_id<>? AND s.path IN ({marks})',
                (row['location'], row['id'], *paths)):
            if Path(name).stem.casefold() == video.stem.casefold():
                shared.add(paths[path])
            else:
                foreign.add(paths[path])
        companions = [(old, new) for old, new in companions if old not in foreign]
    if video.with_suffix('.nfo') in shared and target.stem.casefold() == video.stem.casefold():
        raise ValueError('配套资料正被其他视频共用，请先为当前视频设置独立文件名')
    _check_target(video, target)
    for old, new in companions:
        _check_target(old, new)
    writes = [target.with_suffix('.nfo')]
    if image:
        writes.append(target.with_name(target.stem + '-poster.jpg'))
    owned = {new for _old, new in companions}
    if target != video and any(path.exists() and path not in owned for path in writes):
        raise ValueError('目标配套文件已经存在，请使用其他文件名')
    return companions, shared


def w_item_edit(contract, body):
    from .web_catalog import q_item
    title, names, image, requested_code = _edit_values(body)
    with ExitStack() as undo:
        with contract.write_transaction() as connection:
            connection.execute('BEGIN IMMEDIATE')
            row, video = _asset(connection, body['id'])
            check_revision(connection, [row['id']], body['expected_revision'])
            if row['name'] != body['expected_name']:
                raise ValueError('视频文件名已改变，请重新打开编辑表单')
            current = q_item(contract, row['id'])
            edited = set()
            if title != (row['catalog_title'] or ''):
                edited.add('title')
            if {normalize_entity_name(name) for name in names} != {normalize_entity_name(name) for name in current['performers']}:
                edited.add('actor')
            filename = _filename(body.get('filename'), video)
            if requested_code:
                filename = _filename_code(filename, requested_code)
            target = video.with_name(_filename(filename, video, body.get('edition')))
            code = local_cover_code(target.name) or row['code']
            companions, shared = _edit_targets(connection, row, video, target, image)
            nfo = _nfo(video, target, title, names, image, companions, code, edited)
            ledger = PureWindowsPath(row['path']) if is_windows_path(row['path']) else Path(row['path'])
            _move(undo, video, target)
            for old, new in companions:
                new_path, old_path = str(ledger.with_name(new.name)), str(ledger.with_name(old.name))
                if old in shared and old != new:
                    _remember(undo, new)
                    with atomic_path(new) as temporary:
                        shutil.copyfile(old, temporary)
                    connection.execute('INSERT INTO asset_subtitle(asset_id,location,path,name,language,format,size,mtime,'
                        'pairing,first_seen,last_seen) SELECT ?,location,?,?,language,format,size,mtime,pairing,first_seen,last_seen '
                        'FROM asset_subtitle WHERE location=? AND path=? AND asset_id IS NOT ?',
                        (row['id'], new_path, new.name, row['location'], old_path, row['id']))
                    connection.execute('UPDATE asset_subtitle SET path=?,name=? WHERE location=? AND path=? AND asset_id=?',
                                       (new_path, new.name, row['location'], old_path, row['id']))
                else:
                    _move(undo, old, new)
                    connection.execute('UPDATE asset SET path=?,name=? WHERE path=? AND medium<>?',
                                       (new_path, new.name, old_path, 'video'))
                    connection.execute('UPDATE asset_subtitle SET path=?,name=? WHERE location=? AND path=? '
                                       'AND (asset_id=? OR asset_id IS NULL)',
                                       (new_path, new.name, row['location'], old_path, row['id']))
            _remember(undo, target.with_suffix('.nfo'))
            atomic_write_bytes(target.with_suffix('.nfo'), nfo)
            if not _update_row(connection, row['id'], row['path'], str(ledger.with_name(target.name))):
                raise ValueError('视频记录已改变')
            values = {'catalog_title': title} if 'title' in edited else {}
            if code and (code != row['code'] or requested_code):
                values['code'] = code
            if values:
                write_owned_fields(connection, [row['id']], values, USER_MANUAL)
            row['code'] = code
            row['catalog_title'] = title
            if 'actor' in edited:
                _actors(connection, row['id'], names, time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()))
            if image:
                _install_poster(contract, undo, row, target, image)
            elif values.get('code'):
                _rekey_poster(contract, undo, row, target)
            connection.execute('UPDATE asset SET mutation_revision=mutation_revision+1 WHERE id=? AND mutation_revision=?',
                               (row['id'], body['expected_revision']))
        undo.pop_all()
    contract.cache_bust()
    return q_item(contract, row['id'])


def _install_poster(contract, undo, row, target, image):
    data, size = image
    poster = target.with_name(target.stem + '-poster.jpg')
    _remember(undo, poster)
    atomic_write_bytes(poster, data)
    _cache_poster(contract, undo, row, poster, data, size)


def _rekey_poster(contract, undo, row, target):
    """番号修正时将随文件保留的本地海报登记到新键，旧共享键保持。"""
    cache = contract.cover_root / (artwork_key(row['id'], row['code']) + '.jpg')
    poster = target.with_name(target.stem + '-poster.jpg')
    if not cache.exists() and poster.is_file():
        data, size = read_jpeg(poster, isolated=False)
        _cache_poster(contract, undo, row, poster, data, size, replace_existing=False)


def _cache_poster(contract, undo, row, poster, data, size, *, replace_existing=True):
    code = row['code'] or local_cover_code(poster.name)
    key = artwork_key(row['id'], code)
    cache = contract.cover_root / (key + '.jpg')
    paths = [cache.with_suffix(suffix) for suffix in ('.jpg', '.face.json', '.poster.json', '.scraping.json')]
    prior = [(path, path.read_bytes() if path.exists() else None) for path in paths]
    try:
        install_cover(cache, code or key, data, size, replace_existing=replace_existing,
                      evidence=dict(source='local_cover', source_path=str(poster), title=row['catalog_title'] or '',
                                    raw_sha256=hashlib.sha256(data).hexdigest(),
                                    source_sha256=hashlib.sha256(data).hexdigest(), checked_at=time.time()))
    except FileExistsError:
        if replace_existing:
            raise
        return
    for path, content in prior:
        undo.callback(_restore, path, content)
