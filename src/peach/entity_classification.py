"""实体职业与作品角色分别记录，来源断言可按批撤回。"""
from __future__ import annotations

from datetime import datetime, timezone
from urllib.parse import urlsplit

from .entry_links import EXTERNAL_KIND, JAV_DIRECTORIES

VALUES = {
    'identity': {'person':'个人', 'account':'发布账号', 'organization':'机构',
                 'platform':'平台', 'collection':'合集目录', 'release':'作品标识', 'unknown':'身份待核验'},
    'occupation': {'adult_performer':'成人出演者', 'model':'模特', 'actor':'演员',
                   'artist':'艺术创作者', 'animator':'动画作者', 'content_creator':'内容创作者'},
    'market': {'japanese_av':'日本 AV', 'western_adult':'西方成人发行'},
    'account_role': {'seller':'卖家', 'publisher':'发布者', 'studio':'发行厂牌'},
}
CATEGORIES = {'japanese_av': '女优', 'amateur': '素人', 'western': '西方',
              'blogger': '网黄博主', 'seller': '卖家', 'animation': '动画作者'}
TRUSTED = "status IN ('observed','approved')"


def write_claim(connection, *, entity_id, facet, value, source, evidence,
                source_url='', status='candidate', confidence=0.5, checked_at=None):
    """目录与检索推断保持 candidate，公开来源事实使用 observed，用户复核使用 approved。"""
    if facet not in VALUES or value not in VALUES[facet]:
        raise ValueError('未知身份分类')
    if status not in {'candidate','observed','approved','rejected'}:
        raise ValueError('未知断言状态')
    if not source or not evidence or not 0 <= confidence <= 1:
        raise ValueError('断言缺少来源、证据或有效置信度')
    if status == 'approved' and not source.startswith(('user:', 'review:')):
        raise ValueError('approved 只属于用户复核')
    if status == 'observed' and urlsplit(source_url).scheme != 'https':
        raise ValueError('公开事实需要 HTTPS 来源')
    if status == 'observed' and not source.startswith(('source:', 'script:')):
        raise ValueError('公开事实需要明确来源命名空间')
    # 脚本不覆盖同来源上的用户复核。
    old = connection.execute('SELECT status FROM entity_classification WHERE entity_id=? AND facet=? AND value=? AND source=?',
                             (entity_id,facet,value,source)).fetchone()
    if old and old[0] == 'approved' and status != 'approved':
        raise ValueError('不能覆盖已复核断言')
    connection.execute('INSERT INTO entity_classification VALUES(?,?,?,?,?,?,?,?,?) '
                       'ON CONFLICT(entity_id,facet,value,source) DO UPDATE SET source_url=excluded.source_url,'
                       'evidence=excluded.evidence,status=excluded.status,confidence=excluded.confidence,checked_at=excluded.checked_at',
                       (entity_id,facet,value,source,source_url,evidence,status,confidence,
                        checked_at or datetime.now(timezone.utc).isoformat()))


def classifications(connection, entity_ids):
    """批量下发公开证据与展示字串；待核验不冒充职业。"""
    ids = list(dict.fromkeys(entity_ids))
    result = {entity_id:[] for entity_id in ids}
    if not connection.execute("SELECT 1 FROM sqlite_schema WHERE name='entity_classification'").fetchone():
        return result
    if not ids:
        return result
    cursor = connection.execute('SELECT entity_id,facet,value,source,source_url,evidence,status,confidence,checked_at '
                                'FROM entity_classification WHERE entity_id IN (' + ','.join('?' for _ in ids) + ') '
                                'ORDER BY facet,value,source', ids)
    columns = [column[0] for column in cursor.description]
    for raw in cursor:
        row = dict(zip(columns,raw))
        row['label'] = VALUES.get(row['facet'], {}).get(row['value'], row['value'])
        result[row.pop('entity_id')].append(row)
    return result


def category_predicates(column='e.id', kind_column='e.kind', connection=None):
    """浏览分类分别命中；发行范围与作品类型允许交叉。"""
    providers = ','.join(f"'{provider}'" for provider in sorted(JAV_DIRECTORIES))
    has_claims = connection is None or connection.execute(
        "SELECT 1 FROM sqlite_schema WHERE name='entity_classification'").fetchone()
    def claim(facet, value):
        if not has_claims:
            return '0'
        return (f"EXISTS (SELECT 1 FROM entity_classification ec WHERE ec.entity_id={column} "
                f"AND ec.facet='{facet}' AND ec.value='{value}' AND {TRUSTED})")
    def work(condition):
        return (f"EXISTS (SELECT 1 FROM asset_entity ca JOIN asset av ON av.id=ca.asset_id "
                f"WHERE ca.entity_id={column} AND ca.role='performer' AND av.medium='video' "
                f"AND COALESCE(av.disposal,'')<>'vanished' AND ({condition}))")
    jav = (f"EXISTS (SELECT 1 FROM entity_external_ref er WHERE er.entity_id={column} "
           f"AND er.external_kind='{EXTERNAL_KIND}' AND er.external_id<>'' AND er.provider IN ({providers})) "
           f"OR {claim('market', 'japanese_av')}")
    amateur = work("UPPER(COALESCE(av.code,'')) LIKE 'FC2%' OR EXISTS ("
                   "SELECT 1 FROM asset_entity ta JOIN entity t ON t.id=ta.entity_id "
                   "WHERE ta.asset_id=av.id AND t.kind='tag' AND t.canonical_name='素人')")
    west_work = work("av.region='west'")
    western = f"{claim('market', 'western_adult')} OR {west_work}"
    seller = claim('account_role', 'seller')
    animation = claim('occupation', 'animator')
    creator_video = (f"EXISTS (SELECT 1 FROM asset_entity ca JOIN asset av ON av.id=ca.asset_id "
                     f"WHERE ca.entity_id={column} AND ca.role='creator' AND av.medium='video' "
                     "AND COALESCE(av.disposal,'')<>'vanished')")
    return {
        'japanese_av': f"{kind_column} IN ('performer','creator') AND ({jav})",
        'amateur': f"{kind_column}='performer' AND ({amateur})",
        'western': f"{kind_column}='performer' AND ({western})",
        'blogger': f"{kind_column}='creator' AND ({creator_video}) AND NOT ({seller}) AND NOT ({animation}) AND NOT ({claim('account_role','studio')})",
        'seller': f"{kind_column}='creator' AND ({seller})",
        'animation': f"{kind_column}='creator' AND ({animation})",
    }


def summaries(connection, entity_ids):
    """资料页与分页卡片共用一份浏览分类，不写入账本断言。"""
    ids = list(dict.fromkeys(entity_ids))
    if not ids:
        return {}
    predicates = category_predicates(connection=connection)
    rows = connection.execute('SELECT e.id,' + ','.join(f'({sql})' for sql in predicates.values()) + ' FROM entity e WHERE e.id IN ('
                              + ','.join('?' for _ in ids) + ')', ids)
    result = {}
    for row in rows:
        categories = [key for key, matched in zip(predicates, row[1:]) if matched]
        result[row[0]] = {'identity_categories': categories,
                          'identity_labels': [CATEGORIES[key] for key in categories]}
    return result


def index_scope(connection, kind: str) -> str:
    """艺人名册包含真人账号；卖家与动画作者使用独立名册。"""
    predicates = category_predicates(connection=connection)
    if kind == 'performer':
        return "(e.kind='performer' OR (" + predicates['blogger'] + '))'
    if kind == 'creator':
        return '(' + predicates['seller'] + ' OR ' + predicates['animation'] + ')'
    return "e.kind='" + kind + "'"


def counts(connection, kind, query, visible_clause):
    """对搜索范围中的有效实体独立计数，不受所选分类及分页限制。"""
    predicates = category_predicates(connection=connection)
    sql = ('SELECT ' + ','.join(f'COALESCE(SUM(({value})),0)' for value in predicates.values()) + ' '
           'FROM entity e WHERE ' + index_scope(connection, kind) + ' AND EXISTS ('
           'SELECT 1 FROM asset_entity ae CROSS JOIN asset a ON a.id=ae.asset_id '
           'WHERE ae.entity_id=e.id AND ' + visible_clause + ') ')
    params = []
    if query:
        sql += 'AND e.canonical_name LIKE ? '
        params.append(f'%{query}%')
    totals = connection.execute(sql,params).fetchone()
    return {key: count for key, count in zip(predicates,totals) if count}


def related_identities(connection, entity_id):
    if not connection.execute("SELECT 1 FROM sqlite_schema WHERE name='entity_identity_link'").fetchone():
        return []
    cursor = connection.execute("SELECT e.id,e.kind,e.canonical_name,l.relation,l.source_url,l.evidence "
        "FROM entity_identity_link l JOIN entity e ON e.id=CASE WHEN l.left_id=? THEN l.right_id ELSE l.left_id END "
        "WHERE (l.left_id=? OR l.right_id=?) AND l.status IN ('observed','approved') ORDER BY e.kind,e.canonical_name",
        (entity_id,entity_id,entity_id))
    columns = [column[0] for column in cursor.description]
    return [dict(zip(columns,raw)) for raw in cursor]


def filter_sql(category, column='e.id', connection=None):
    """浏览分类在分页前执行，与资料页采用相同来源判据。"""
    if category in {'','all'}:
        return '', []
    if category not in CATEGORIES:
        return ' AND 0 ', []
    return f' AND ({category_predicates(column, connection=connection)[category]}) ', []


def transfer(connection, source_id, target_id):
    """用户执行实体合并时保留所有来源；同来源冲突显式拒绝。"""
    if not connection.execute("SELECT 1 FROM sqlite_schema WHERE name='entity_classification'").fetchone():
        return
    for raw in connection.execute('SELECT facet,value,source,source_url,evidence,status,confidence,checked_at FROM entity_classification WHERE entity_id=?', (source_id,)).fetchall():
        row = tuple(raw)
        old = connection.execute('SELECT source_url,evidence,status,confidence,checked_at FROM entity_classification WHERE entity_id=? AND facet=? AND value=? AND source=?',
                                 (target_id,*row[:3])).fetchone()
        if old and tuple(old)[:-1] != tuple(row[3:-1]):
            raise ValueError('实体分类来源冲突，需先复核')
        connection.execute('INSERT OR IGNORE INTO entity_classification VALUES(?,?,?,?,?,?,?,?,?)', (target_id,*row))
        if old and row[-1] > old[-1]:
            connection.execute('UPDATE entity_classification SET checked_at=? '
                               'WHERE entity_id=? AND facet=? AND value=? AND source=?',
                               (row[-1], target_id, *row[:3]))
    for raw in connection.execute('SELECT * FROM entity_identity_link WHERE left_id=? OR right_id=?', (source_id,source_id)).fetchall():
        row = list(raw)
        row[:2] = [target_id if value == source_id else value for value in row[:2]]
        if row[0] == row[1]:
            continue
        old = connection.execute('SELECT * FROM entity_identity_link WHERE left_id=? AND right_id=? AND relation=? AND source=?', row[:4]).fetchone()
        if old and tuple(old) != tuple(row):
            raise ValueError('身份关联来源冲突，需先复核')
        connection.execute('INSERT OR IGNORE INTO entity_identity_link VALUES(?,?,?,?,?,?,?,?)', row)
