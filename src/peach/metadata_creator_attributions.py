"""创作者历史投影的全库审计与逐关系修复。"""
from __future__ import annotations

import hashlib
import json
import re
import sqlite3
from collections import defaultdict

from .catalog_rules import compact_label, western_release_identity, release_code_from_text
from .classification import is_structural_creator
from .code_creators import SETTLED_VERDICTS, classify as classify_code
from .entities import normalize_entity_name, upsert_asset_entity
from .field_owners import is_protected, owner_of, write_owned_fields
from .studio_sites import is_platform, normalise
from .sources.dmm import matching_cids

OWNER = 'script:creator-attributions'
# 官网目录把模特与作品编号分列；这些编号属于作品，不是账号。
SITE_RELEASES = {
    'legsjapan': 'https://www.legsjapan.com/en/',
    'fellatiojapan': 'https://www.fellatiojapan.com/en/',
}
FIELDS = ('asset_id', 'entity_id', 'current_creator', 'relation_source', 'confidence',
          'medium', 'path', 'name', 'studio', 'code', 'flat_creator', 'field_owner', 'studio_owner', 'revision',
          'verdict', 'action', 'proposed_studio', 'reason')


def _site_release(value: str) -> str:
    text = re.sub(r'^\[[^\]]+\]', '', str(value)).strip().lower()
    text = re.sub(r'\.(?:mp4|mkv|avi|wmv|mov|jpg|png|webp)$', '', text)
    match = re.fullmatch(r'(legsjapan|fellatiojapan)[-_](\d{3,6})[-_]*', text)
    return f'{match[1]}-{int(match[2])}' if match else ''


def _publisher_release(row: dict, studios: dict[str, set[str]]) -> bool:
    creator = str(row['current_creator'])
    if row['studio'] or normalise(creator) not in studios:
        return False
    parts = re.split(r'[\\/]', str(row['path']))
    publisher = re.compile(r'^' + re.escape(creator) + r'[ ._-]+\d{2,4}[-.]\d{2}[-.]\d{2}(?!\d)', re.I)
    domain = '[' + creator.casefold() + '.com]'
    return any(publisher.match(part) or domain in part.casefold() for part in parts)


def _file_identifier(row: dict) -> tuple[str, str]:
    creator = str(row['current_creator'])
    verdict, _, reason = classify_code(creator, [dict(
        path=row['path'], name=row['name'], code=row['code'])])
    if verdict in SETTLED_VERDICTS:
        return 'release_identifier', f'{reason}；只移除创作者投影，番号不改写'
    site = _site_release(creator)
    if site and site == _site_release(str(row['name'])):
        return 'release_identifier', f'目录与媒体文件同为站点作品号 {site}；官网目录 {SITE_RELEASES[site.split("-")[0]]}'
    identifier = release_code_from_text(re.sub(r'_\d{3}$', '', creator))
    cid = re.sub(r'_\d{3}$', '', re.sub(r'\.[^.]+$', '', str(row['name'] or '')))
    if identifier and re.fullmatch(r'[a-z]+\d{5}(?:hhb|mhb|dmb|dm|hq|sd|hd)', cid, re.I) and matching_cids(identifier, [cid]):
        return 'release_identifier', f'目录番号 {identifier} 与文件 DMM 商品标识一致；番号不改写'
    if verdict == '存疑':
        return 'identifier_candidate', reason
    return '', ''


def _release_title(row: dict, people: set[str]) -> bool:
    """带发行日期的场景标题；短人名与已有出演者身份交回复核。"""
    name = str(row['current_creator'])
    if normalize_entity_name(name) in people:
        return False
    key = compact_label(name)
    for part in re.split(r'[\\/]', str(row['path'])):
        identity = western_release_identity(part)
        if not identity:
            continue
        matched = re.search(r'\.(?:\d{4}|\d{2})\.\d{2}\.\d{2}\.', part)
        tail = compact_label(part[matched.end():]) if matched else ''
        if tail.startswith(key) and (len(name.split()) >= 4 or any(
                key.startswith(compact_label(person)) and key != compact_label(person)
                for person in people if len(compact_label(person)) >= 5)):
            return True
    return False


def classify(row: dict, *, studios: dict[str, set[str]], people: set[str]) -> tuple[str, str, str]:
    """明确错误才提供 remove；身份冲突与目录推断只提供 review。"""
    creator = str(row['current_creator'])
    source = str(row['relation_source'])
    if source != 'legacy:asset':
        return 'source_identity', 'keep', '保留独立来源的创作者关系'
    if is_protected(str(row['field_owner'])):
        return 'protected', 'review', '兼容字段属于用户或复核判断'
    if re.match(r'^[a-z][a-z0-9+.-]*://', str(row['path']), re.I):
        return 'online_account', 'keep', '在线账号身份，不参与本地目录判定'
    if row.get('has_identity_evidence'):
        return 'identity_conflict', 'review', '实体有外部身份引用或用户判断，需逐项复核'
    if is_platform(creator):
        return 'platform', 'remove', '名称是发行平台；实际卖主或账号才是创作者'
    studio = str(row['studio'] or '')
    studio_names = studios.get(normalise(studio), {normalise(studio)}) if studio else set()
    if normalise(creator) and normalise(creator) in studio_names:
        return 'studio', 'remove', f'同作品发行厂牌为 {studio}，与创作者名称或其别名一致'
    if _publisher_release(row, studios):
        return 'studio_release', 'remove', '已登记厂牌名称与同作品发行文件的厂牌 token 一致'
    identifier_verdict, identifier_reason = _file_identifier(row)
    if identifier_verdict == 'release_identifier':
        return identifier_verdict, 'remove', identifier_reason
    if is_structural_creator(creator):
        return 'structural', 'remove', '名称是已核定的结构目录'
    if _release_title(row, people):
        return 'release_title', 'remove', '名称与带厂牌、发行日期的场景标题一致'
    title = str(row.get('catalog_title') or '')
    if (len(compact_label(creator)) >= 8 and title
            and compact_label(creator) == compact_label(title)
            and normalize_entity_name(creator) not in people):
        return 'catalog_title', 'remove', '名称与同作品的发行标题完全一致'
    if normalize_entity_name(creator) in people:
        return 'performer_overlap', 'review', '与出演者姓名或别名一致，尚无卖主身份或同人确认'
    if identifier_verdict:
        return identifier_verdict, 'review', identifier_reason
    return 'legacy_projection', 'review', '只有历史目录投影；需账号、水印、发行来源或用户确认'


def collect(connection: sqlite3.Connection) -> list[dict]:
    """一次读取所有关系和身份来源，不逐个实体全表扫描。"""
    cursor = connection.cursor()
    cursor.row_factory = sqlite3.Row
    studio_names: dict[int, set[str]] = defaultdict(set)
    people: set[str] = set()
    for row in cursor.execute(
        "SELECT e.id,e.kind,e.canonical_name AS name FROM entity e WHERE e.kind IN ('studio','performer') "
        "UNION ALL SELECT e.id,e.kind,a.alias FROM entity e JOIN entity_alias a ON a.entity_id=e.id "
        "WHERE e.kind IN ('studio','performer')"):
        if row['kind'] == 'studio':
            studio_names[int(row['id'])].add(normalise(str(row['name'])))
        else:
            people.add(normalize_entity_name(str(row['name'])))
    studios = {name: names for names in studio_names.values() for name in names}
    evidence = {int(row[0]) for row in connection.execute(
        "SELECT entity_id FROM entity_external_ref UNION "
        "SELECT entity_id FROM entity_alias WHERE source LIKE 'user:%' OR source LIKE 'review:%' UNION "
        "SELECT entity_id FROM asset_entity WHERE role='creator' AND source<>'legacy:asset'")}
    query = """SELECT a.id AS asset_id,e.id AS entity_id,e.canonical_name AS current_creator,
        ae.source AS relation_source,ae.confidence,a.medium,a.path,a.name,a.studio,a.code,a.creator AS flat_creator,
        a.catalog_title,a.field_owners,a.mutation_revision AS revision
        FROM asset_entity ae JOIN entity e ON e.id=ae.entity_id AND e.kind='creator'
        JOIN asset a ON a.id=ae.asset_id WHERE ae.role='creator' ORDER BY e.id,a.id,ae.source"""
    result = []
    for raw in cursor.execute(query):
        row = dict(raw)
        row['field_owner'] = owner_of(row['field_owners'], 'creator')
        row['studio_owner'] = owner_of(row.pop('field_owners'), 'studio')
        row['has_identity_evidence'] = int(row['entity_id']) in evidence
        row['verdict'], row['action'], row['reason'] = classify(row, studios=studios, people=people)
        row['proposed_studio'] = row['current_creator'] if row['verdict'] == 'studio_release' and not is_protected(row['studio_owner']) else ''
        result.append({field: row[field] for field in FIELDS})
    return result


def fingerprint(rows: list[dict]) -> str:
    return hashlib.sha256(json.dumps(rows, ensure_ascii=False, sort_keys=True).encode()).hexdigest()


def _asset_fields(cursor, asset_id: int) -> dict:
    return dict(cursor.execute('SELECT id,creator,studio,field_owners,mutation_revision FROM asset WHERE id=?',
                               (asset_id,)).fetchone() or {})


def _creator_relations(connection, asset_ids: list[int]) -> list[dict]:
    cursor = connection.cursor()
    cursor.row_factory = sqlite3.Row
    return [dict(row) for asset_id in asset_ids for row in cursor.execute(
        "SELECT * FROM asset_entity WHERE asset_id=? AND role='creator' ORDER BY entity_id,source", (asset_id,))]


def _land_studio(connection, cursor, row: dict) -> dict | None:
    if not row['proposed_studio']:
        return None
    asset_id = int(row['asset_id'])
    # 此分支只认已登记的厂牌，不创建新身份。
    entity = cursor.execute("SELECT id,canonical_name FROM entity WHERE kind='studio' AND normalized_name=?",
                            (normalize_entity_name(row['proposed_studio']),)).fetchone()
    if not entity:
        raise ValueError('计划中的厂牌身份不存在')
    if connection.execute("SELECT 1 FROM asset_entity WHERE asset_id=? AND entity_id=? AND role='studio'",
                          (asset_id, entity['id'])).fetchone():
        added = None
    else:
        upsert_asset_entity(connection, kind='studio', name=entity['canonical_name'], asset_id=asset_id,
                            role='studio', source=OWNER, metadata={'evidence': row['reason']},
                            update_entity_metadata=False)
        added = dict(cursor.execute("SELECT * FROM asset_entity WHERE asset_id=? AND entity_id=? AND role='studio' AND source=?",
                                    (asset_id, entity['id'], OWNER)).fetchone())
    fields = _asset_fields(cursor, asset_id)
    write_owned_fields(connection, [asset_id], {'studio': entity['canonical_name']}, OWNER,
                       require_empty=True, expected_revision=fields['mutation_revision'])
    return added


def apply_plan(connection: sqlite3.Connection, plan: list[dict]) -> dict:
    """调用方持有事务；校验整批当前判定，保留实体与其它来源断言。"""
    current = [row for row in collect(connection) if row['action'] == 'remove']
    if fingerprint(current) != fingerprint(plan):
        raise ValueError('审计计划与当前账本不一致，请重新预览')
    removed = []
    added = []
    asset_ids = sorted({int(row['asset_id']) for row in plan})
    cursor = connection.cursor()
    cursor.row_factory = sqlite3.Row
    before_assets = {asset_id: _asset_fields(cursor, asset_id) for asset_id in asset_ids}
    for row in plan:
        key = (row['asset_id'], row['entity_id'], row['relation_source'])
        raw = cursor.execute("SELECT * FROM asset_entity WHERE asset_id=? AND entity_id=? "
                             "AND role='creator' AND source=?", key).fetchone()
        removed.append(dict(raw))
        connection.execute("DELETE FROM asset_entity WHERE asset_id=? AND entity_id=? "
                           "AND role='creator' AND source=?", key)
        studio_relation = _land_studio(connection, cursor, row)
        if studio_relation:
            added.append(studio_relation)
    for asset_id, before in before_assets.items():
        names = {str(row[0]) for row in connection.execute(
            "SELECT DISTINCT e.canonical_name FROM asset_entity ae JOIN entity e ON e.id=ae.entity_id "
            "WHERE ae.asset_id=? AND ae.role='creator' AND e.kind='creator'", (asset_id,))}
        removed_names = {str(row['current_creator']) for row in plan if int(row['asset_id']) == asset_id}
        if before['creator'] not in removed_names or before['creator'] in names:
            continue
        if len(names) > 1:
            raise ValueError(f'资产 {asset_id} 有多个存续创作者，需复核兼容投影')
        value = next(iter(names), None)
        current_fields = _asset_fields(cursor, asset_id)
        write_owned_fields(connection, [asset_id], {'creator': value}, OWNER,
                           expected_revision=current_fields['mutation_revision'])
        after = _asset_fields(cursor, asset_id)
        if after['creator'] != value:
            raise ValueError(f'资产 {asset_id} 的创作者字段拒绝写入')
    changed = [{'before': before, 'after': _asset_fields(cursor, asset_id)}
               for asset_id, before in before_assets.items() if _asset_fields(cursor, asset_id) != before]
    return {'relations': removed, 'added_relations': added, 'fields': changed, 'plan': plan,
            'remaining_creator_relations': _creator_relations(connection, asset_ids)}


def restore(connection: sqlite3.Connection, manifest: dict) -> None:
    """仅在本批字段和关系未被后续操作改动时恢复整批。"""
    cursor = connection.cursor()
    cursor.row_factory = sqlite3.Row
    for item in manifest['fields']:
        after = item['after']
        current = _asset_fields(cursor, after['id'])
        if current != after:
            raise ValueError(f"资产 {after['id']} 已发生后续改动，拒绝回滚整批")
    asset_ids = sorted({int(row['asset_id']) for row in manifest['relations']})
    if _creator_relations(connection, asset_ids) != manifest['remaining_creator_relations']:
        raise ValueError('创作者关系已发生后续改动，拒绝回滚整批')
    for row in manifest['added_relations']:
        current = cursor.execute('SELECT * FROM asset_entity WHERE asset_id=? AND entity_id=? AND role=? AND source=?',
                                 tuple(row[key] for key in ('asset_id', 'entity_id', 'role', 'source'))).fetchone()
        if not current or dict(current) != row:
            raise ValueError('厂牌关系已发生后续改动，拒绝回滚整批')
    for row in manifest['relations']:
        if connection.execute("SELECT 1 FROM asset_entity WHERE asset_id=? AND entity_id=? AND role=? AND source=?",
                              tuple(row[key] for key in ('asset_id', 'entity_id', 'role', 'source'))).fetchone():
            raise ValueError('创作者关系已存在，拒绝回滚整批')
        if not connection.execute('SELECT 1 FROM entity WHERE id=?', (row['entity_id'],)).fetchone():
            raise ValueError('实体已不存在，拒绝回滚整批')
    for row in manifest['relations']:
        columns = tuple(row)
        connection.execute(f"INSERT INTO asset_entity({','.join(columns)}) VALUES({','.join('?' for _ in columns)})",
                           tuple(row.values()))
    for row in manifest['added_relations']:
        connection.execute('DELETE FROM asset_entity WHERE asset_id=? AND entity_id=? AND role=? AND source=?',
                           tuple(row[key] for key in ('asset_id', 'entity_id', 'role', 'source')))
    for item in manifest['fields']:
        before, after = item['before'], item['after']
        owner = owner_of(before['field_owners'], 'creator') or OWNER
        write_owned_fields(connection, [before['id']], {'creator': before['creator']}, owner,
                           expected_revision=after['mutation_revision'])
        current = _asset_fields(cursor, before['id'])
        if before['studio'] != after['studio']:
            owner = owner_of(before['field_owners'], 'studio') or OWNER
            write_owned_fields(connection, [before['id']], {'studio': before['studio']}, owner,
                               expected_revision=current['mutation_revision'])
        connection.execute('UPDATE asset SET field_owners=? WHERE id=?', (before['field_owners'], before['id']))
