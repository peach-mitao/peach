"""馆藏目录分类：冻结整包计划、同盘移动、逐目录回执与失败恢复。"""
from __future__ import annotations
import argparse
import csv
import hashlib
import importlib.util
import json
import re
import sqlite3
import sys
import tempfile
import time
from collections import Counter, defaultdict
from pathlib import Path, PureWindowsPath

PROJECT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT / 'src'))
from peach import organize
from peach.catalog_rules import is_jav_code, is_korean_mib_code, normalise_code_key, promo_free_key, western_release_identity, release_code_from_filename, same_release_code
from peach.classification import is_structural_creator
from peach.config import DATABASE_PATH, GENERATED_DIR
from peach.entity_classification import category_predicates
from peach.jobs import PidFileLock
from peach.migrations import sqlite_backup
from peach.organize_templates import MAX_PATH, sanitise_component
from peach.platform import location_roots, resolve_root, root_online, translate_ledger_path
from peach.review_csv import write_rows
from peach.regions import infer_region
from peach.scripting import open_readonly
from peach.sources.onepondo import STUDIO as ONEPONDO_STUDIO, movie_id
from peach.web_catalog import effective_region_sql

OUT = GENERATED_DIR / 'library-organize'
_spec = importlib.util.spec_from_file_location('directory_flatten', Path(__file__).with_name('flatten_release_dirs.py'))
flatten = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(flatten)
FIELDS = ('id', 'path', 'name', 'medium', 'disposal', 'code', 'studio', 'creator', 'mutation_revision')
GENERIC = {'创作者', '网黄博主', '卖家', '动画作者', '日本', '西方', '欧美', '番号',
           'MVP', 'xxr', 'kkg', '云下载', 'Pack From Shared', 'My Pack', '_未知厂牌', 'FC2-PPV', 'FC2'}

def save(path, payload):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding='utf-8')
    temporary.replace(path)

def signature(row):
    return {key: row[key] for key in FIELDS}

def beneath(path, root):
    p, r = PureWindowsPath(path).parts, PureWindowsPath(root).parts
    return len(p) > len(r) and tuple(x.casefold() for x in p[:len(r)]) == tuple(x.casefold() for x in r)

def rewrite(path, source, target):
    return str(PureWindowsPath(target, *PureWindowsPath(path).parts[len(PureWindowsPath(source).parts):]))

def snapshots(db, source):
    prefix = str(source).rstrip('\\') + '\\'
    escaped = prefix.replace('!', '!!').replace('%', '!%').replace('_', '!_') + '%'
    return [signature(r) for r in db.execute('SELECT '+','.join(FIELDS)+' FROM asset WHERE path LIKE ? ESCAPE ? ORDER BY id', (escaped, '!'))]

def subtitles(db, source):
    prefix = str(source).rstrip('\\') + '\\'
    escaped = prefix.replace('!', '!!').replace('%', '!%').replace('_', '!_') + '%'
    return [dict(r) for r in db.execute('SELECT id,asset_id,location,path FROM asset_subtitle WHERE path LIKE ? ESCAPE ? ORDER BY id', (escaped, '!'))]

def update_paths(db, op):
    for table, rows in (('asset', op['rows']), ('asset_subtitle', op['subtitles'])):
        for row in rows:
            changed = db.execute('UPDATE '+table+' SET path=? WHERE id=? AND path=?',
                                 (rewrite(row['path'], op['source'], op['target']), row['id'], row['path'])).rowcount
            if changed != 1:
                raise ValueError('账本路径更新失败：'+table)

def operation(kind, source, target, rows, reason):
    key = hashlib.sha256((kind + '\0' + source + '\0' + target).encode()).hexdigest()[:20]
    return dict(key=key, kind=kind, source=source, target=target, rows=rows, reason=reason)

def entity_guard(db, source):
    prefix = str(source).rstrip('\\') + '\\'
    escaped = prefix.replace('!', '!!').replace('%', '!%').replace('_', '!_') + '%'
    entities = [dict(r) for r in db.execute("SELECT DISTINCT ae.asset_id,ae.role,e.id,e.canonical_name,e.region FROM asset a JOIN asset_entity ae ON ae.asset_id=a.id JOIN entity e ON e.id=ae.entity_id WHERE a.path LIKE ? ESCAPE '!' AND e.kind IN ('creator','studio') ORDER BY ae.asset_id,e.id,ae.role", (escaped,))]
    ids = {r['id'] for r in entities}
    facts = [dict(r) for r in db.execute('SELECT entity_id,facet,value,status,source FROM entity_classification ORDER BY entity_id,facet,value,status,source') if r['entity_id'] in ids]
    regions = [dict(r) for r in db.execute("SELECT id,region FROM asset WHERE path LIKE ? ESCAPE '!' ORDER BY id", (escaped,))]
    return dict(entities=entities, facts=facts, regions=regions)

def entity_guard_index(db):
    """冻结计划一次读取身份关系，逐目录只按资产 ID 取证。"""
    entities, facts = defaultdict(list), defaultdict(list)
    for row in db.execute("SELECT DISTINCT ae.asset_id,ae.role,e.id,e.canonical_name,e.region FROM asset_entity ae JOIN entity e ON e.id=ae.entity_id WHERE e.kind IN ('creator','studio') ORDER BY ae.asset_id,e.id,ae.role"):
        entities[row['asset_id']].append(dict(row))
    for row in db.execute('SELECT entity_id,facet,value,status,source FROM entity_classification ORDER BY entity_id,facet,value,status,source'):
        facts[row['entity_id']].append(dict(row))
    return entities, facts

def indexed_guard(rows, regions, index):
    entities, facts = index
    linked = [entry for row in rows for entry in entities.get(row['id'], [])]
    identities = sorted({entry['id'] for entry in linked})
    return dict(entities=linked, facts=[entry for eid in identities for entry in facts.get(eid, [])],
                regions=[dict(id=row['id'], region=regions[row['id']]) for row in rows])

def label(row, creators, categories, unverified):
    if row['disposal'] is not None or row['medium'] not in {'video', 'image', 'audio', 'archive'}:
        return None
    code = normalise_code_key(row['code'])
    region = row.get('effective_region', '')
    if is_jav_code(code) and region in ('', 'jp') and not is_korean_mib_code(code):
        if code.startswith('FC2'):
            return ('release', '日本', 'FC2', code)
        if row['studio']:
            return ('release', '日本', row['studio'], code)
        return None
    owners = creators.get(row['id'], [])
    if len(owners) == 1:
        entity_id, name = owners[0]
        if entity_id not in unverified and not is_structural_creator(name):
            matched = categories.get(entity_id, [])
            if len(matched) == 1:
                return ('creator', matched[0], name)
    if row['studio'] and region in ('', 'west') and western_release_identity(row['name']):
        return ('western', '西方', row['studio'])
    return None

def release_directory_matches(name, owner):
    """整包目录可含发行站、画质与分片标记；日期编号保留片商边界。"""
    parsed = release_code_from_filename(name)
    if not parsed:
        return promo_free_key(name) == promo_free_key(owner[3])
    if same_release_code(parsed, owner[3]):
        return True
    return (owner[2] == ONEPONDO_STUDIO and bool(movie_id(parsed))
            and movie_id(parsed) == movie_id(owner[3]))

def compatible_sidecar(row, owner, creators):
    """配套图只随确定的整包移动，不给图片补身份字段。"""
    if row['medium'] != 'image' or row['disposal'] is not None:
        return False
    if row.get('creator') or creators.get(row['id']):
        return False
    if owner[0] != 'release' or row.get('effective_region', '') not in ('', 'jp'):
        return False
    if row.get('studio') and row['studio'] != owner[2]:
        return False
    code = normalise_code_key(row.get('code'))
    return not code or code == owner[3] or (
        owner[2] == ONEPONDO_STUDIO and bool(movie_id(code))
        and movie_id(code) == movie_id(owner[3]))

def build_plan(stage, batch=None):
    stem = stage + ('-' + batch if batch else '')
    receipt_path = OUT / f'{stem}-receipt.json'
    if receipt_path.exists() and json.loads(receipt_path.read_text(encoding='utf-8')).get('entries'):
        raise ValueError('已有执行回执，请使用新的批次编号')
    roots = location_roots()
    with open_readonly(DATABASE_PATH) as db:
        db.execute('BEGIN')
        operations, skipped = [], []
        if stage == 'flatten':
            with (OUT / f'{stem}-plan.csv').open(encoding='utf-8-sig', newline='') as handle:
                for row in csv.DictReader(handle):
                    if row['verified'] == 'ok':
                        operations.append(operation(row['kind'], row['ledger_dir'], row['target_dir'],
                                                    snapshots(db, row['ledger_dir']), '冗余目录层或广告标记'))
                    else:
                        skipped.append(dict(source=row['ledger_dir'], reason=row['verified']))
        else:
            predicates = category_predicates(connection=db)
            categories = {}
            names = {'blogger': '网黄博主', 'seller': '卖家', 'animation': '动画作者'}
            for entity_id, name, *matched in db.execute('SELECT e.id,e.canonical_name,' + ','.join(
                    '(' + predicates[k] + ')' for k in names) + " FROM entity e WHERE e.kind='creator'"):
                categories[entity_id] = [name for name, value in zip(names.values(), matched) if value]
            unverified = {r[0] for r in db.execute("SELECT entity_id FROM entity_classification WHERE facet='identity' AND value='unknown' AND status='candidate'")}
            creators = defaultdict(list)
            for asset_id, entity_id, name in db.execute("SELECT DISTINCT ae.asset_id,e.id,e.canonical_name FROM asset_entity ae JOIN entity e ON e.id=ae.entity_id WHERE e.kind='creator' AND ae.role='creator'"):
                creators[asset_id].append((entity_id, name))
            nodes = {}
            db.create_function('infer_region', 2, infer_region, deterministic=True)
            all_rows = [dict(r) for r in db.execute("SELECT a.*,"+effective_region_sql()+" AS effective_region FROM asset a WHERE a.location IN ('115','pikpak','local') AND a.path IS NOT NULL AND trim(a.path)<>'' ORDER BY a.id")]
            rows_by_id = {row['id']: row for row in all_rows}
            mounts = {root:root_online(translate_ledger_path(root)) for values in roots.values() for root in values}
            for row in all_rows:
                location, index, _ = resolve_root(row['path'], roots)
                if location != row['location'] or index < 0:
                    skipped.append(dict(source=row['path'], reason='不在来源根内'))
                    continue
                root = roots[location][index]
                owner = label(row, creators, categories, unverified)
                row['_owner'], row['_root'] = owner, root
                parent = PureWindowsPath(row['path']).parent
                while str(parent).casefold() != str(PureWindowsPath(root)).casefold():
                    key = str(parent)
                    node = nodes.setdefault(key, dict(rows=[], labels=set(), unknown=[], root=root))
                    node['rows'].append(signature(row))
                    if owner:
                        node['labels'].add(owner)
                    elif row['disposal'] is None and row['medium'] in {'video', 'image', 'audio', 'archive'}:
                        node['unknown'].append(row)
                    if parent.parent == parent:
                        raise ValueError('目录不在声明来源根内')
                    parent = parent.parent
            selected = set()
            for source, node in sorted(nodes.items(), key=lambda pair: (len(PureWindowsPath(pair[0]).parts), pair[0])):
                path = PureWindowsPath(source)
                if path.name in GENERIC or len(node['labels']) != 1:
                    continue
                owner = next(iter(node['labels']))
                if any(not compatible_sidecar(row, owner, creators) for row in node['unknown']):
                    continue
                if owner[0] == 'release':
                    if not release_directory_matches(path.name, owner):
                        continue
                    for row in node['rows']:
                        rows_by_id[row['id']]['_owner'] = owner
                    parts = owner[1:]
                else:
                    category, canonical = owner[1:]
                    relative = path.relative_to(PureWindowsPath(node['root'])).parts
                    tail = list(relative)
                    while tail and tail[0] in GENERIC:
                        tail.pop(0)
                    if tail and promo_free_key(tail[0]) == promo_free_key(canonical):
                        tail.pop(0)
                    if tail and promo_free_key(tail[-1]) == promo_free_key(canonical):
                        tail.pop()
                    parts = (category, canonical, *tail)
                target = str(PureWindowsPath(node['root'], *(sanitise_component(part) for part in parts)))
                if target.casefold() == source.casefold():
                    continue
                if beneath(target, source) or beneath(source, target):
                    skipped.append(dict(source=source, reason='目标与来源相互包含'))
                    continue
                if any(len(rewrite(r['path'], source, target).encode('utf-16-le')) // 2 > MAX_PATH for r in node['rows']):
                    skipped.append(dict(source=source, reason='路径过长'))
                    continue
                if any(str(parent).casefold() in selected for parent in (path, *path.parents)):
                    continue
                selected.add(source.casefold())
                operations.append(operation('rename', source, target, sorted(node['rows'], key=lambda r: r['id']),
                                            '账本规范归属：' + '/'.join(owner[1:])))
            covered = {r['id'] for op in operations for r in op['rows']}
            for row in all_rows:
                if row['disposal'] is None and row['id'] not in covered:
                    owner, root = row.get('_owner'), row.get('_root')
                    if root and not mounts[root]:
                        reason = '来源离线，保留原位置'
                    elif owner and beneath(row['path'], str(PureWindowsPath(root, *(sanitise_component(p) for p in (owner[1:] if owner[0]=='release' else owner[1:3]))))):
                        reason = '已在规范分类目录'
                    elif row['medium'] == 'other':
                        reason = '附带文件缺少明确作品目录，保留原位置'
                    elif owner:
                        reason = '归属明确，但目录混合、命名不足或路径过长，保留原位置'
                    else:
                        reason = '归属未确认，保留原位置'
                    skipped.append(dict(source=row['path'], reason=reason))
        if stage == 'rehome':
            guard_index = entity_guard_index(db)
            regions = {row['id']: row['region'] for row in all_rows}
        for op in operations:
            op['subtitles'] = subtitles(db, op['source'])
            if stage == 'rehome':
                op['entities'] = indexed_guard(op['rows'], regions, guard_index)
        payload = dict(format=1, stage=stage, roots=roots, operations=operations, skipped=skipped)
    path = OUT / f'{stem}-manifest.json'
    save(path, payload)
    write_rows(OUT / f'{stem}-directories.csv', ['key', 'kind', 'source', 'target', 'assets', 'reason'],
               [dict(key=op['key'], kind=op['kind'], source=op['source'], target=op['target'], assets=len(op['rows']), reason=op['reason']) for op in operations])
    write_rows(OUT / f'{stem}-pending.csv', ['source', 'reason'], skipped)
    print(json.dumps(dict(stage=stage, directories=len(operations), assets=len({r['id'] for op in operations for r in op['rows']}), pending=len(skipped)), ensure_ascii=False))

def expand(source, target, *, deadline, count=None):
    count = [0] if count is None else count
    if time.monotonic() > deadline:
        raise TimeoutError('目录预检超时')
    if source.is_symlink() or target.is_symlink():
        raise ValueError('拒绝符号链接')
    if not source.exists():
        raise FileNotFoundError('源目录不存在')
    if not target.exists():
        return [(str(source), str(target))], []
    if not source.is_dir() or not target.is_dir():
        raise FileExistsError('目标同名文件已存在')
    entries = list(source.iterdir())
    count[0] += len(entries)
    if count[0] > 100000:
        raise ValueError('目录项超过本批预算')
    pairs, empty = [], [str(source)]
    for entry in entries:
        child_pairs, child_empty = expand(entry, target / entry.name, deadline=deadline, count=count)
        pairs.extend(child_pairs)
        empty.extend(child_empty)
    return pairs, empty

def restore(pairs):
    failures = []
    for source, target in reversed(pairs):
        old, new = translate_ledger_path(source), translate_ledger_path(target)
        if old.exists() and not new.exists():
            continue
        if not old.exists() and new.exists():
            try:
                organize._rename(target, source)
            except OSError as error:
                failures.append(dict(source=source, target=target, error=str(error)))
        else:
            failures.append(dict(source=source, target=target, error='恢复路径状态冲突'))
    return failures

def collapse_moves(source, target):
    parent = translate_ledger_path(target)
    temporary = parent.with_name('.peach-organize-' + hashlib.sha256(source.encode()).hexdigest()[:20])
    if temporary.exists() or temporary.is_symlink():
        raise FileExistsError('临时目录已存在')
    child = temporary / translate_ledger_path(source).name
    state = dict(parent=str(parent), temporary=str(temporary), child=str(child), original=source)
    return [(str(parent), str(temporary)), (str(child), str(parent))], state

def restore_entry(entry):
    shared = entry.get('shared_stage')
    if shared:
        temporary = translate_ledger_path(shared['temporary'])
        if not temporary.exists() and not entry.get('shared_started'):
            return []
        failures = restore(entry['moves'][1:])
        if failures:
            return failures
        try:
            organize._rename(str(temporary), shared['original'])
            return []
        except OSError as error:
            return [dict(error=str(error), **shared)]
    state = entry.get('collapse')
    if not state:
        return restore(entry['moves'])
    parent, temporary, child = (translate_ledger_path(state[k]) for k in ('parent','temporary','child'))
    try:
        if not temporary.exists():
            if translate_ledger_path(state['original']).is_dir():
                return []
            if not parent.is_dir():
                raise RuntimeError('恢复所需目录未取得')
            temporary.mkdir()
        if child.exists() and not parent.exists():
            organize._rename(str(temporary), str(parent))
        elif not child.exists() and parent.exists():
            organize._rename(str(parent), str(child))
            organize._rename(str(temporary), str(parent))
        else:
            raise RuntimeError('恢复路径状态冲突')
        return []
    except Exception as error:
        return [dict(error=str(error), **state)]

def cleanup_collapse(entry):
    state = entry.get('collapse') or entry.get('shared_stage')
    if state:
        temporary = translate_ledger_path(state['temporary'])
        if temporary.exists():
            try:
                temporary.rmdir()
                entry.pop('cleanup_error', None)
            except OSError as error:
                entry['cleanup_error'] = str(error)

def recover(db, payload, receipt, path):
    operations = {op['key']: op for op in payload['operations']}
    for entry in receipt['entries']:
        if entry['status'] not in {'intent', 'filesystem'}:
            if entry['status'] == 'rollback_failed':
                raise RuntimeError('上一批存在未恢复的文件')
            continue
        op = operations[entry['key']]
        expected = [dict(r, path=rewrite(r['path'], op['source'], op['target'])) for r in op['rows']]
        current = []
        for row in op['rows']:
            present = db.execute('SELECT * FROM asset WHERE id=?', (row['id'],)).fetchone()
            current.append(signature(present) if present else None)
        current_subs = [dict(db.execute('SELECT id,asset_id,location,path FROM asset_subtitle WHERE id=?', (r['id'],)).fetchone()) for r in op['subtitles']]
        expected_subs = [dict(r, path=rewrite(r['path'], op['source'], op['target'])) for r in op['subtitles']]
        if current == expected and current_subs == expected_subs:
            targets = ([entry['target']] if entry.get('collapse') else
                       [new for old, new in entry['moves'][1:]] if entry.get('shared_stage') else
                       [new for old, new in entry['moves']])
            if any(not translate_ledger_path(new).exists() for new in targets):
                raise RuntimeError('已提交批次的目标文件未取得')
            entry['status'] = 'committed'
            cleanup_collapse(entry)
        elif current == op['rows'] and current_subs == op['subtitles']:
            failures = restore_entry(entry)
            entry['status'] = 'rollback_failed' if failures else 'restored'
            if failures:
                save(path, receipt)
                raise RuntimeError('中断批次的文件恢复失败')
        else:
            raise RuntimeError('中断批次的账本已经发生其他变化')
        save(path, receipt)

def run_apply(stage, backup, limit, seconds, location=None, retry_failed=False, skip_collapses=False, batch=None):
    if backup is None:
        raise ValueError('--apply 必须同时给 --backup')
    stem = stage + ('-' + batch if batch else '')
    payload = json.loads((OUT / f'{stem}-manifest.json').read_text(encoding='utf-8'))
    if payload.get('format') != 1 or payload.get('stage') != stage:
        raise ValueError('计划格式不受支持，请使用新的批次编号冻结计划')
    receipt_path = OUT / f'{stem}-receipt.json'
    receipt = json.loads(receipt_path.read_text(encoding='utf-8')) if receipt_path.exists() else dict(entries=[], failures=[])
    lock = PidFileLock(OUT / 'directory-job.lock')
    lock.acquire()
    try:
        sqlite_backup(DATABASE_PATH, backup)
        receipt.setdefault('backups', []).append(str(backup))
        db = sqlite3.connect(DATABASE_PATH, timeout=15)
        db.row_factory = sqlite3.Row
        recover(db, payload, receipt, receipt_path)
        baseline = {tuple(r) for r in db.execute('PRAGMA foreign_key_check')}
        before_assets = db.execute('SELECT count(*) FROM asset').fetchone()[0]
        before_subtitles = db.execute('SELECT count(*) FROM asset_subtitle').fetchone()[0]
        done = {r['key'] for r in receipt['entries'] if r['status'] == 'committed'}
        failed = set() if retry_failed else {r['key'] for r in receipt['failures']}
        deadline, checked = time.monotonic() + seconds, 0
        unavailable = set()
        provider_errors = Counter()
        for op in payload['operations']:
            if skip_collapses and op['kind'] == 'collapse':
                continue
            if op['key'] in done or op['key'] in failed:
                continue
            if checked >= limit or time.monotonic() >= deadline:
                break
            op_location, _, _ = resolve_root(op['source'] + '\\_', payload['roots'])
            if (location and op_location != location) or op_location in unavailable:
                continue
            checked += 1
            pairs, journal, committed = [], None, False
            try:
                source, target = op['source'], op['target']
                old_location, old_index, _ = resolve_root(source + '\\_', payload['roots'])
                new_location, new_index, _ = resolve_root(target + '\\_', payload['roots'])
                if old_location != new_location or old_index != new_index or old_index < 0:
                    raise ValueError('来源根不一致')
                root = payload['roots'][old_location][old_index]
                if not beneath(source, root) or not beneath(target, root) or not root_online(translate_ledger_path(root)):
                    unavailable.add(old_location)
                    raise ValueError('来源未挂载或操作越出根目录')
                if beneath(target, source) or (beneath(source, target) and op['kind'] != 'collapse'):
                    raise ValueError('来源与目标相互包含')
                local_source, local_target = translate_ledger_path(source), translate_ledger_path(target)
                if not local_source.is_dir():
                    raise ValueError('源路径不是目录或未挂载')
                if local_source.is_symlink() or local_target.is_symlink():
                    raise ValueError('拒绝符号链接目录')
                if op['kind'] == 'collapse':
                    if PureWindowsPath(source).parent != PureWindowsPath(target):
                        raise ValueError('合并目标不是直接父目录')
                    if flatten.directory_key(PureWindowsPath(source).name) != flatten.directory_key(PureWindowsPath(target).name):
                        raise ValueError('目录名不冗余')
                    exclusive_parent = sorted(p.name for p in local_target.iterdir()) == [local_source.name]
                db.execute('BEGIN IMMEDIATE')
                if snapshots(db, source) != op['rows']:
                    raise ValueError('冻结计划已失效：路径或元数据发生变化')
                if subtitles(db, source) != op['subtitles']:
                    raise ValueError('冻结计划已失效：字幕路径发生变化')
                if stage == 'rehome' and entity_guard(db, source) != op['entities']:
                    raise ValueError('冻结计划已失效：创作者身份发生变化')
                collapse, shared_stage = None, None
                if op['kind'] == 'collapse' and exclusive_parent:
                    physical_pairs, collapse = collapse_moves(source, target)
                    if not beneath(physical_pairs[0][1], root):
                        raise ValueError('临时目录越出根目录')
                    empty = []
                elif op['kind'] == 'collapse' and any(
                        p.name.casefold() == local_source.name.casefold() for p in local_source.iterdir()):
                    temporary = local_source.with_name('.peach-organize-' + hashlib.sha256(source.encode()).hexdigest()[:20])
                    if temporary.exists() or temporary.is_symlink() or not beneath(str(temporary), root):
                        raise ValueError('暂存目录冲突或越出根目录')
                    entries = list(local_source.iterdir())
                    for entry in entries:
                        if entry.is_symlink() or (entry.name.casefold() != local_source.name.casefold()
                                                 and (local_target / entry.name).exists()):
                            raise ValueError('目标条目冲突或符号链接')
                    shared_stage = dict(original=source, temporary=str(temporary))
                    physical_pairs = [(str(local_source), str(temporary))] + [
                        (str(temporary / p.name), str(local_target / p.name)) for p in entries]
                    empty = [str(temporary)]
                else:
                    physical_pairs, empty = expand(local_source, local_target, deadline=min(deadline, time.monotonic() + 90))
                pairs = [(str(PureWindowsPath(a)), str(PureWindowsPath(b))) for a, b in physical_pairs]
                journal = dict(key=op['key'], status='intent', source=source, target=target, moves=pairs, empty=empty,
                               assets=len(op['rows']), collapse=collapse, shared_stage=shared_stage,
                               retry_failed=retry_failed)
                receipt['entries'].append(journal)
                save(receipt_path, receipt)
                for move_index, (old, new) in enumerate(pairs):
                    organize._rename(old, new)
                    if not translate_ledger_path(new).exists():
                        raise ValueError('移动后目标未取得')
                    if shared_stage and move_index == 0:
                        journal['shared_started'] = True
                        save(receipt_path, receipt)
                journal['status'] = 'filesystem'
                save(receipt_path, receipt)
                update_paths(db, op)
                for table, rows in (('asset', op['rows']), ('asset_subtitle', op['subtitles'])):
                    for row in rows:
                        path = db.execute(f'SELECT path FROM {table} WHERE id=?', (row['id'],)).fetchone()
                        if not path or path[0] != rewrite(row['path'], source, target):
                            raise ValueError('目标账本路径核对失败')
                db.commit()
                committed = True
                journal['status'] = 'committed'
                cleanup_collapse(journal)
                save(receipt_path, receipt)
                for path in sorted(empty, key=lambda p: len(Path(p).parts), reverse=True):
                    try:
                        Path(path).rmdir()
                    except OSError:
                        pass
            except Exception as error:
                if committed:
                    raise RuntimeError('账本已提交，回执保存失败；保留文件位置供续跑核对') from error
                db.rollback()
                rollback_failures = restore_entry(journal) if journal is not None else []
                if journal is not None:
                    journal['status'] = 'rollback_failed' if rollback_failures else 'restored'
                receipt['failures'].append(dict(key=op['key'], source=op['source'], error=str(error), rollback_failures=rollback_failures))
                if isinstance(error, OSError) and getattr(error, 'winerror', None) in {50, 1}:
                    provider_errors[op_location] += 1
                    if provider_errors[op_location] >= 3:
                        unavailable.add(op_location)
                save(receipt_path, receipt)
                if rollback_failures:
                    raise RuntimeError('文件恢复未完成，停止本批') from error
            if checked % 10 == 0:
                print(json.dumps(dict(checked=checked, committed=sum(r['status']=='committed' for r in receipt['entries']), failed=len(receipt['failures'])), ensure_ascii=False), flush=True)
        after_assets = db.execute('SELECT count(*) FROM asset').fetchone()[0]
        after_subtitles = db.execute('SELECT count(*) FROM asset_subtitle').fetchone()[0]
        integrity = db.execute('PRAGMA integrity_check').fetchone()[0]
        final_fk = {tuple(r) for r in db.execute('PRAGMA foreign_key_check')}
        receipt['verification'] = dict(asset_before=before_assets, asset_after=after_assets, integrity=integrity,
                                       subtitles_before=before_subtitles, subtitles_after=after_subtitles,
                                       existing_foreign_keys=len(baseline), new_foreign_keys=list(final_fk-baseline))
        save(receipt_path, receipt)
        db.close()
        row = dict(id=1, disposal=None, medium='video', code='ABP-123', studio='Prestige',
                   name='ABP-123.mp4', effective_region='jp')
        assert label(row, {}, {}, set()) == ('release','日本','Prestige','ABP-123')
        assert label(dict(row,code='MDX-0123',effective_region='cn'), {}, {}, set()) is None
        assert label(dict(row,code='CA-103',effective_region='kr'), {}, {}, set()) is None
        creator_row = dict(row,code=None,studio=None,effective_region='')
        assert label(creator_row, {1:[(12,'creator')]}, {12:['卖家']}, set()) == ('creator','卖家','creator')
        assert label(creator_row, {1:[(12,'creator')]}, {12:['卖家']}, {12}) is None
        assert label(creator_row, {1:[(12,'creator')]}, {12:['卖家','动画作者']}, set()) is None
        assert before_assets == after_assets and before_subtitles == after_subtitles and integrity == 'ok' and not final_fk-baseline
        print(json.dumps(dict(stage=stage, checked=checked, committed=sum(r['status']=='committed' for r in receipt['entries']),
                              failed=len(receipt['failures']), verification=receipt['verification']), ensure_ascii=False))
    finally:
        lock.release()

def self_check():
    with tempfile.TemporaryDirectory() as directory:
        root = Path(directory).resolve()
        wrapper = root / 'wrapper.mp4'
        wrapper.mkdir()
        (wrapper / 'wrapper.mp4').write_bytes(b'wrapped media')
        temporary = root / '.peach-organize-proof'
        pairs = [(str(wrapper), str(temporary)), (str(temporary / 'wrapper.mp4'), str(wrapper))]
        for steps in (0, 1, 2):
            entry = dict(moves=pairs, shared_stage=dict(original=str(wrapper), temporary=str(temporary)),
                         shared_started=steps > 0)
            for old, new in pairs[:steps]:
                organize._rename(old, new)
            if steps == 2:
                temporary.rmdir()
            assert not restore_entry(entry)
            assert (wrapper / 'wrapper.mp4').read_bytes() == b'wrapped media'
            assert not temporary.exists()
        original = root / 'same' / 'same'
        original.mkdir(parents=True)
        (original / 'proof.jpg').write_bytes(b'proof')
        for steps in (0, 1, 2):
            moves, state = collapse_moves(str(original), str(original.parent))
            entry = dict(moves=moves, collapse=state)
            for old, new in moves[:steps]:
                organize._rename(old, new)
            assert not restore_entry(entry)
            assert (original / 'proof.jpg').read_bytes() == b'proof'
            assert not Path(state['temporary']).exists()
        source, target = root / 'source', root / 'target'
        source.mkdir(); target.mkdir()
        (source / 'film.mp4').write_bytes(b'video')
        (source / 'film.srt').write_bytes(b'subtitle')
        (source / 'poster.jpg').write_bytes(b'cover')
        pairs, _ = expand(source, target, deadline=time.monotonic()+10)
        assert len(pairs) == 3
        for old, new in pairs:
            organize._rename(old, new)
        assert (target / 'film.srt').read_bytes() == b'subtitle'
        assert (target / 'poster.jpg').read_bytes() == b'cover'
        assert not restore(pairs)
        assert (source / 'film.mp4').read_bytes() == b'video'
        (target / 'film.mp4').write_bytes(b'existing')
        try:
            expand(source, target, deadline=time.monotonic()+10)
        except FileExistsError:
            pass
        else:
            raise AssertionError('同名文件必须拒绝')
        assert (target / 'film.mp4').read_bytes() == b'existing'
        assert beneath('B:\\日本\\片商\\ABC-123', 'B:\\')
        assert not beneath('B:\\MediaOther\\a', 'B:\\Media')
        assert rewrite('B:\\old\\sub\\film.mp4','B:\\old','B:\\new') == 'B:\\new\\sub\\film.mp4'
        db = sqlite3.connect(':memory:'); db.row_factory = sqlite3.Row
        db.execute('CREATE TABLE asset(id INTEGER PRIMARY KEY,path TEXT UNIQUE)')
        db.execute('CREATE TABLE asset_subtitle(id INTEGER PRIMARY KEY,asset_id INTEGER,location TEXT,path TEXT UNIQUE)')
        db.execute('INSERT INTO asset VALUES(1,?)', ('B:\\old\\film.mp4',))
        db.execute('INSERT INTO asset_subtitle VALUES(1,1,?,?)', ('115','B:\\old\\film.srt'))
        db.commit()
        op = dict(source='B:\\old', target='B:\\new', rows=[dict(id=1,path='B:\\old\\film.mp4')], subtitles=subtitles(db,'B:\\old'))
        update_paths(db, op)
        assert db.execute('SELECT path FROM asset_subtitle').fetchone()[0] == 'B:\\new\\film.srt'
        db.rollback()
        assert db.execute('SELECT path FROM asset').fetchone()[0] == 'B:\\old\\film.mp4'
        assert db.execute('SELECT path FROM asset_subtitle').fetchone()[0] == 'B:\\old\\film.srt'
        db.close()
    print('临时目录实证通过：封面、字幕、恢复、重名拒绝和路径边界。')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', choices=('flatten', 'rehome'), default='rehome')
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--backup', type=Path)
    parser.add_argument('--limit', type=int, default=1000)
    parser.add_argument('--seconds', type=int, default=1200)
    parser.add_argument('--self-check', action='store_true')
    parser.add_argument('--location', choices=('115','pikpak','local'))
    parser.add_argument('--retry-failed', action='store_true')
    parser.add_argument('--skip-collapses', action='store_true')
    parser.add_argument('--batch', type=lambda value: value if re.fullmatch(r'[a-zA-Z0-9_-]+', value)
                        else parser.error('批次编号只能包含字母、数字、下划线与连字号'))
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    if args.self_check:
        self_check()
    elif args.apply:
        run_apply(args.stage, args.backup, args.limit, args.seconds, args.location, args.retry_failed, args.skip_collapses, args.batch)
    else:
        build_plan(args.stage, args.batch)
