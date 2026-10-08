"""公开身份来源与馆藏署名的衔接；冻结计划和逐行回执保持可撤回。

研究清单由人或智能体读页面后写成，不是代码判据：分类断言与身份关联一律落 candidate，
等用户复核后才 approved（ADR-0052 决策一）。
"""
from __future__ import annotations

import re
import sqlite3
from datetime import datetime, timezone

from .entities import resolve_entity, upsert_asset_entity
from .entity_classification import write_claim
from .field_owners import is_protected, owner_of, write_owned_fields

SOURCE = 'script:creator-identity-research'


def _rows(connection, table, clause, params):
    cursor = connection.execute(f'SELECT * FROM {table} WHERE {clause} ORDER BY rowid', params)
    columns = [item[0] for item in cursor.description]
    return [dict(zip(columns,raw)) for raw in cursor]


def plan(connection, findings):
    result = []
    for finding in findings:
        entity_id = int(finding['entity_id'])
        entity = _rows(connection, 'entity', 'id=?', (entity_id,))
        if not entity or entity[0]['canonical_name'] != finding['name']:
            raise ValueError('身份清单与实体名称不一致')
        relations = _rows(connection, 'asset_entity', "entity_id=? AND role='creator'", (entity_id,)) if finding.get('cast_studios') else []
        cast = []
        for relation in relations:
            asset = _rows(connection, 'asset', 'id=?', (relation['asset_id'],))[0]
            if relation['source'] != 'legacy:asset' or is_protected(owner_of(asset['field_owners'], 'creator')):
                continue
            # 出演者必须有公开身份来源，且发行署名在厂牌上下文中完整匹配。
            if not finding.get('cast_studios') or asset['studio'] not in finding['cast_studios']:
                continue
            if not any(claim['facet']=='occupation' and claim['value'] in {'adult_performer','actor','model'}
                       and claim['status']=='observed' for claim in finding['claims']):
                raise ValueError('出演者迁移需要已取得的公开职业来源')
            name = re.escape(finding['name']).replace(r'\ ', r'[ ._-]+')
            publisher = re.escape(asset['studio']).replace(r'\ ', r'[ ._-]+')
            parts = re.split(r'[\\/]', asset['path'])
            if not any(re.search(r'^' + publisher + r'[ ._-]+.*(?<!\w)' + name + r'(?!\w)', part, re.I) for part in parts):
                continue
            cast.append({'relation':relation, 'asset':asset})
        result.append({'finding':finding, 'entity':entity[0], 'relations':relations,
                       'claims':_rows(connection, 'entity_classification', 'entity_id=?', (entity_id,)), 'cast':cast})
    return result


def apply(connection, frozen):
    if plan(connection, [row['finding'] for row in frozen]) != frozen:
        raise ValueError('身份计划已过期')
    receipt = {'source':SOURCE, 'changes':[], 'created_entities':[]}
    stamp = datetime.now(timezone.utc).isoformat()
    for row in frozen:
        finding = row['finding']; entity_id = int(finding['entity_id'])
        targets = [entity_id]
        performer = None
        if row['cast']:
            performer = resolve_entity(connection, 'performer', finding['name'])
            existed = performer is not None
            if not existed:
                performer_id = upsert_asset_entity(connection, kind='performer', name=finding['name'],
                    asset_id=row['cast'][0]['asset']['id'], role='performer', source=SOURCE,
                    metadata={'source_url':finding['cast_source_url']}, update_entity_metadata=False)
                # 记录来源关系的 before 必须在插入前，所以先撤掉这条临时创建关系。
                connection.execute("DELETE FROM asset_entity WHERE entity_id=? AND source=?", (performer_id,SOURCE))
                receipt['created_entities'].append(_rows(connection,'entity','id=?',(performer_id,))[0])
            else:
                performer_id = performer['id'] if isinstance(performer, sqlite3.Row) else performer[0]
            targets.append(performer_id)
            receipt['changes'].append({'table':'entity_identity_link', 'clause':'left_id=? AND right_id=? AND source=?',
                'params':[entity_id,performer_id,SOURCE], 'before':_rows(connection,'entity_identity_link','left_id=? AND right_id=? AND source=?',(entity_id,performer_id,SOURCE))})
            connection.execute('INSERT OR IGNORE INTO entity_identity_link VALUES(?,?,?,?,?,?,?,?)',
                (entity_id,performer_id,'same_person',SOURCE,finding['cast_source_url'],
                 '发行文件完整署名与公开出演者身份一致','candidate',stamp))
            for cast in row['cast']:
                asset_id = cast['asset']['id']
                receipt['changes'].append({'table':'asset_entity','clause':"asset_id=? AND (entity_id=? OR (entity_id=? AND source=?))",
                    'params':[asset_id,entity_id,performer_id,SOURCE],
                    'before':_rows(connection,'asset_entity',"asset_id=? AND (entity_id=? OR (entity_id=? AND source=?))",(asset_id,entity_id,performer_id,SOURCE))})
                receipt['changes'].append({'table':'asset','clause':'id=?','params':[asset_id],
                    'before':_rows(connection,'asset','id=?',(asset_id,))})
                upsert_asset_entity(connection, kind='performer',name=finding['name'],asset_id=asset_id,
                    role='performer',source=SOURCE,metadata={'source_url':finding['cast_source_url'], 'evidence':'厂牌发行文件完整署名'},update_entity_metadata=False)
                connection.execute("DELETE FROM asset_entity WHERE asset_id=? AND entity_id=? AND role='creator' AND source='legacy:asset'",(asset_id,entity_id))
                survivors = connection.execute("SELECT e.canonical_name FROM asset_entity ae JOIN entity e ON e.id=ae.entity_id WHERE ae.asset_id=? AND ae.role='creator'", (asset_id,)).fetchall()
                if cast['asset']['creator'] == finding['name']:
                    names = {item[0] for item in survivors}
                    if len(names)>1:
                        raise ValueError('作品存在多个发布者，需复核')
                    write_owned_fields(connection,[asset_id],{'creator':next(iter(names),None)},SOURCE,
                                       expected_revision=cast['asset']['mutation_revision'])
        for target in targets:
            receipt['changes'].append({'table':'entity_classification','clause':'entity_id=? AND source=?','params':[target,SOURCE],
                'before':_rows(connection,'entity_classification','entity_id=? AND source=?',(target,SOURCE))})
            for claim in finding['claims']:
                status = 'rejected' if claim.get('status') == 'rejected' else 'candidate'
                write_claim(connection, entity_id=target, source=SOURCE, **{**claim, 'status': status})
    for change in receipt['changes']:
        change['after'] = _rows(connection,change['table'],change['clause'],change['params'])
    return receipt


def restore(connection, receipt):
    """有后续修改就拒绝撤回，不覆盖观看历史或人的判断。"""
    for change in receipt['changes']:
        if _rows(connection,change['table'],change['clause'],change['params']) != change['after']:
            raise ValueError('身份修复记录已发生后续改动')
    for entity in receipt['created_entities']:
        if _rows(connection,'entity','id=?',(entity['id'],)) != [entity]:
            raise ValueError('新身份已发生后续改动')
    for change in reversed(receipt['changes']):
        table = change['table']
        if table == 'asset':
            old = change['before'][0]
            fields = {'creator':old['creator']}
            write_owned_fields(connection,[old['id']],fields,SOURCE)
            connection.execute('UPDATE asset SET field_owners=? WHERE id=?', (old['field_owners'],old['id']))
            continue
        connection.execute(f'DELETE FROM {table} WHERE ' + change['clause'],change['params'])
        for old in change['before']:
            columns = list(old)
            connection.execute(f'INSERT INTO {table} (' + ','.join(columns) + ') VALUES(' + ','.join('?' for _ in columns) + ')',tuple(old.values()))
    for entity in receipt['created_entities']:
        # 新身份的任何其他引用都需要用户保留；只撤回本批创建的空身份。
        references = connection.execute('SELECT count(*) FROM asset_entity WHERE entity_id=?',(entity['id'],)).fetchone()[0]
        if references:
            raise ValueError('新身份出现额外作品关系')
        tables = [row[0] for row in connection.execute("SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%'")]
        for table in tables:
            if not re.fullmatch(r'[a-zA-Z0-9_]+',table):
                continue
            for foreign in connection.execute(f'PRAGMA foreign_key_list({table})'):
                if foreign[2]=='entity' and connection.execute(f'SELECT 1 FROM {table} WHERE {foreign[3]}=?',(entity['id'],)).fetchone():
                    raise ValueError('新身份出现额外资料')
        connection.execute('DELETE FROM entity WHERE id=?',(entity['id'],))
