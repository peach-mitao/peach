"""公司资料的公开字段、逐字段来源和填空写入。

厂牌与事务所资料保存在 entity.metadata_json.company_profile；不参与身份归并。
成立日期、品牌启动与运营公司各有字段。每格保存来源 URL、原文和批次，自动结果只填空。
"""
from __future__ import annotations

import json
import re
import sqlite3
from datetime import datetime, timezone
from urllib.parse import urljoin, urlsplit

from bs4 import BeautifulSoup

from .http import public_https_url
from .entities import normalize_entity_name

KEY = 'company_profile'
FIELDS = ('legal_name', 'founded', 'launched', 'country', 'location', 'operator', 'parent', 'group', 'distributor')
LABELS = {
    '会社名': 'legal_name', '社名': 'legal_name', '商号': 'legal_name',
    '法人名': 'legal_name', 'companyname': 'legal_name',
    '設立': 'founded', '設立年月日': 'founded', '設立年月': 'founded',
    '創立': 'founded', '創業': 'founded', 'founded': 'founded',
    'ブランド設立': 'launched', 'レーベル設立': 'launched', 'ブランド開始': 'launched',
    '所在地': 'location', '本社所在地': 'location', '本店所在地': 'location',
    '住所': 'location', '本社': 'location', 'address': 'location', 'headquarters': 'location',
    '運営会社': 'operator', '運営法人': 'operator', 'operatedby': 'operator',
    '親会社': 'parent', 'parentcompany': 'parent',
    '国': 'country', 'country': 'country',
}
COMPANY_LINK = re.compile(r'会社概要|企業情報|会社案内|特定商取引|about\s*(?:us)?|company\s*(?:profile)?|terms\s*(?:of|and|&)?\s*(?:service|use|conditions)|privacy\s*policy', re.I)
SOCIAL_HOSTS = {'x.com', 'twitter.com', 'instagram.com', 'youtube.com', 'tiktok.com', 'facebook.com', 'threads.net', 'threads.com'}


def _clean(value: str) -> str:
    return re.sub(r'\s+', ' ', value).strip()


def date_text(value: str) -> str | None:
    """只接受明确日期或年份；不从版权、周年数字或公司简介里猜成立年。"""
    value = value.strip()
    era = re.fullmatch(r'(昭和|平成|令和)(元|\d{1,2})年(.*)', value)
    if era:
        offset = {'昭和': 1925, '平成': 1988, '令和': 2018}[era[1]]
        value = f"{offset + (1 if era[2] == '元' else int(era[2]))}年{era[3]}"
    match = re.fullmatch(r'(18\d{2}|19\d{2}|20\d{2})(?:[年/.-](\d{1,2})(?:[月/.-](\d{1,2})日?)?月?)?(?:年)?', value)
    if not match:
        return None
    year, month, day = match.groups()
    try:
        datetime(int(year), int(month or 1), int(day or 1))
    except ValueError:
        return None
    return year + (f'-{int(month):02d}' if month else '') + (f'-{int(day):02d}' if day else '')


def _labelled_pairs(soup: BeautifulSoup) -> list[tuple[str, str]]:
    """公司概要中的两列表格、定义列表与成对区块。"""
    pairs = []
    for row in soup.select('tr'):
        cells = row.find_all(['th', 'td'], recursive=False)
        if len(cells) == 2:
            pairs.append((cells[0].get_text(' ', strip=True), cells[1].get_text(' ', strip=True)))
    for label in soup.select('dt'):
        value = label.find_next_sibling('dd')
        if value:
            pairs.append((label.get_text(' ', strip=True), value.get_text(' ', strip=True)))
    for row in soup.select('div, li'):
        cells = row.find_all(['div', 'span', 'p'], recursive=False)
        if len(cells) == 2 and re.sub(r'[\s:：]', '', cells[0].get_text()).casefold() in LABELS:
            pairs.append((cells[0].get_text(' ', strip=True), cells[1].get_text(' ', strip=True)))
    return pairs


def _page_links(soup: BeautifulSoup, source_url: str) -> tuple[list, list]:
    """同站公司资料入口与社媒候选；候选账号需要独立核对归属。"""
    pages, socials = [], []
    host = (urlsplit(source_url).hostname or '').removeprefix('www.')
    for anchor in soup.select('a[href]'):
        target = urljoin(source_url, str(anchor['href']))
        target_host = (urlsplit(target).hostname or '').removeprefix('www.')
        text = _clean(anchor.get_text(' ', strip=True))
        if public_https_url(target) and target_host == host and len(text) < 65 and COMPANY_LINK.search(text):
            if target not in pages:
                pages.append(target)
        if public_https_url(target) and target_host in SOCIAL_HOSTS:
            path = urlsplit(target).path.strip('/')
            if path and not re.search(r'(?:^|/)(?:intent|share|sharer|status|watch|search|embed)(?:/|$)', path):
                socials.append({'url': target, 'label': text, 'source_url': source_url})
    return pages[:3], socials


def extract(html: str, source_url: str) -> dict:
    """读取官网明确标注的字段，歧义字段留在 conflicts 中。"""
    soup = BeautifulSoup(html, 'html.parser')
    facts, conflicts = {}, []
    for label, raw in _labelled_pairs(soup):
        key = LABELS.get(re.sub(r'[\s:：]', '', label).casefold())
        raw = _clean(raw)
        if not key or not raw or len(raw) > 240:
            continue
        value = date_text(raw) if key in {'founded', 'launched'} else raw
        if key == 'location':
            value = re.split(r'\s*(?:TEL\s*[:：]|FAX\s*[:：]|■|丸ノ内線)', raw, maxsplit=1, flags=re.I)[0].strip()
        if not value:
            continue
        fact = {'value': value, 'source_url': source_url, 'evidence': f'{_clean(label)}：{raw}', 'status': 'observed'}
        if key in facts and facts[key]['value'] != value:
            conflicts.append({'field': key, 'values': [facts.pop(key), fact]})
        elif not any(item['field'] == key for item in conflicts):
            facts[key] = fact
    pages, socials = _page_links(soup, source_url)
    return {'facts': facts, 'conflicts': conflicts, 'company_pages': pages, 'socials': socials}


def _vmg_facts(text: str, source_url: str, name: str) -> dict:
    """VMG 的站点条款、品牌启动与官方品牌名录。"""
    host = (urlsplit(source_url).hostname or '').removeprefix('www.')
    facts = {}

    def keep(key: str, value: str, evidence: str) -> None:
        facts[key] = {'value': value, 'source_url': source_url, 'evidence': evidence, 'status': 'observed'}

    if host in {'vixen.com', 'tushy.com', 'blacked.com'} and urlsplit(source_url).path == '/terms':
        match = re.search(r'These terms of service are entered into between you and ([^.]+?)(?:\s*\(|\.)', text, re.I)
        if match and name.casefold() == host.split('.')[0]:
            keep('operator', match[1].strip(), match[0])
    if host == 'vixengroup.com':
        if urlsplit(source_url).path.rstrip('/') == '/vixen10' and name == 'Vixen':
            match = re.search(r'\bSince (20\d{2})\.', text)
            if match:
                keep('launched', match[1], match[0])
        listing = re.search(r'OUR BRANDS .*?Explore ([^.]+), all available on Vixen Plus', text)
        if listing and name in {'Vixen', 'Tushy', 'Blacked'} and 'Vixen Media Group' in text:
            names = [part.strip().removeprefix('and ') for part in listing[1].split(',')]
            if name in names:
                keep('group', 'Vixen Media Group', listing[0])
    return facts


def _corporate_events(soup: BeautifulSoup, text: str, source_url: str, name: str) -> dict:
    """公司招聘页、法人沿革与分工陈述。"""
    host = (urlsplit(source_url).hostname or '').removeprefix('www.')
    facts = {}

    def keep(key: str, value: str, evidence: str) -> None:
        facts[key] = {'value': value, 'source_url': source_url, 'evidence': evidence, 'status': 'observed'}

    if host == 'arwrk.net' and urlsplit(source_url).path == '/recruit/prestige-av/' and name == 'Prestige':
        heading = soup.select_one('h1')
        if heading and '有限会社プレステージ' in heading.get_text():
            keep('legal_name', '有限会社プレステージ', heading.get_text(' ', strip=True))
    if host == 'corporate.sod.co.jp' and name == 'SOD Create':
        if '/business/softondemand' in source_url and 'SODクリエイト株式会社を設立。ソフト・オン・デマンドが販売・物流業務などを担う' in text:
            keep('distributor', 'ソフト・オン・デマンド株式会社', 'SODクリエイト株式会社を設立。ソフト・オン・デマンドが販売・物流業務などを担う形になりました。')
        if 'SODグループ' in text and 'SODクリエイト株式会社' in text:
            keep('group', 'SODグループ', 'SODグループ：SODクリエイト株式会社')
    if host == 't-powers.co.jp' and '/company' in source_url:
        # 法人成立与2001年的集团创立是两件事，读取时间线里的法人事件。
        for row in soup.select('dl, .p-company__history-list-item'):
            year = row.select_one('dt, .p-company__history-list-year-text')
            detail = row.select_one('dd, .p-company__history-list-desc')
            if year and detail:
                detail_text = _clean(detail.get_text(' ', strip=True))
                if 'ティーパワーズ株式会社を設立' in detail_text:
                    date = date_text(year.get_text(strip=True))
                    if date:
                        keep('founded', date, f'{year.get_text(strip=True)} {detail_text}')
                        keep('legal_name', 'ティーパワーズ株式会社', detail_text)
    return facts


def brand_facts(html: str, source_url: str, name: str) -> dict:
    """官方品牌页明确陈述的事实；运营主体与集团名录分别读取。"""
    soup = BeautifulSoup(html, 'html.parser')
    for node in soup(['script', 'style']):
        node.decompose()
    text = _clean(soup.get_text(' ', strip=True))
    host = (urlsplit(source_url).hostname or '').removeprefix('www.')
    facts = _vmg_facts(text, source_url, name)
    facts.update(_corporate_events(soup, text, source_url, name))
    if host == 'falenogroup.com' and name == '素人CLOVER' and '/makers' in source_url:
        if 'メーカー一覧' in text and 'FALENO GROUP' in text and re.search(r'\b素人CLOVER\s+PROFILE', text):
            facts['group'] = {'value': 'FALENO GROUP', 'source_url': source_url,
                              'evidence': 'メーカー一覧：素人CLOVER PROFILE', 'status': 'observed'}
    if host == 'dorcel.com' and name == 'DorcelClub' and '/confidentialitedonnees' in source_url:
        # 隐私页的法文句子按字符倒序存放；只读该站域名与明确运营陈述的完整句子。
        for node in soup.find_all(string=lambda value: value and 'TFK secivreS ycnegAbeW' in value):
            statement = _clean(str(node)[::-1])
            if statement.startswith('WebAgency Services KFT') and 'exploite les Sites internet dorcelclub.com' in statement:
                facts['operator'] = {'value': 'WebAgency Services KFT', 'source_url': source_url,
                                     'evidence': statement, 'status': 'observed'}
    return facts


def extract_for_entity(html: str, source_url: str, name: str) -> dict:
    """集团页面只读该实体的公司表，不合并其他子公司的成立日期。"""
    if (urlsplit(source_url).hostname or '') == 'corporate.sod.co.jp' and name == 'SOD Create':
        soup = BeautifulSoup(html, 'html.parser')
        tables = [table for table in soup.select('table')
                  if any(cell.get_text(strip=True) == 'SODクリエイト株式会社' for cell in table.select('td'))]
        if len(tables) == 1:
            return extract(str(tables[0]), source_url)
        return {'facts': {}, 'conflicts': [], 'company_pages': [], 'socials': []}
    return extract(html, source_url)


def public_profile(metadata: dict) -> dict:
    """API 的值与逐字段来源；未知字段不进入显示契约。"""
    profile = metadata.get(KEY)
    if not isinstance(profile, dict):
        return {}
    return {key: dict(value) for key, value in profile.items()
            if key in FIELDS and isinstance(value, dict) and isinstance(value.get('value'), str)
            and value.get('status') != 'candidate'
            and value['value'].strip() and public_https_url(str(value.get('source_url', '')))}


def fill_aliases(connection: sqlite3.Connection, entity_id: int, aliases: list[dict], *, batch: str) -> list[str]:
    """只补带官方出处的观测别名；与其他同类实体冲突时留在复核文件。"""
    row = connection.execute('SELECT kind,canonical_name FROM entity WHERE id=?', (entity_id,)).fetchone()
    if not row or row[0] not in {'studio', 'agency'}:
        return []
    written = []
    for alias in aliases:
        name = str(alias.get('value', '')).strip()
        if alias.get('status') != 'observed' or not name or name == row[1] or not public_https_url(alias.get('source_url', '')):
            continue
        normalized = normalize_entity_name(name)
        conflict = connection.execute(
            'SELECT e.id FROM entity e LEFT JOIN entity_alias a ON a.entity_id=e.id '
            'WHERE e.kind=? AND e.id!=? AND (e.normalized_name=? OR a.normalized_alias=?) LIMIT 1',
            (row[0], entity_id, normalized, normalized)).fetchone()
        if conflict:
            continue
        connection.execute('INSERT OR IGNORE INTO entity_alias(entity_id,alias,normalized_alias,source,confidence) VALUES(?,?,?,?,1)',
                           (entity_id, name, normalized, batch))
        if connection.execute('SELECT changes()').fetchone()[0]:
            written.append(name)
    return written


def fill(connection: sqlite3.Connection, entity_id: int, facts: dict, *, source: str, batch: str) -> dict:
    """给公司资料填空，保留其他元信息和既有字段。调用方负责事务。"""
    row = connection.execute('SELECT kind,metadata_json FROM entity WHERE id=?', (entity_id,)).fetchone()
    if row is None or row[0] not in {'studio', 'agency'}:
        return {'written': [], 'conflicts': []}
    metadata = json.loads(row[1] or '{}')
    held = metadata.get(KEY, {})
    if not isinstance(held, dict):
        return {'written': [], 'conflicts': ['company_profile']}
    written, conflicts = [], []
    now = datetime.now(timezone.utc).isoformat()
    for key, fact in public_profile({KEY: facts}).items():
        if key in held:
            if held[key] != fact and (not isinstance(held[key], dict) or held[key].get('value') != fact['value']):
                conflicts.append(key)
            continue
        held[key] = {**fact, 'source': source, 'batch': batch, 'fetched_at': now}
        written.append(key)
    if written:
        metadata[KEY] = held
        connection.execute('UPDATE entity SET metadata_json=?,updated_at=? WHERE id=?',
                           (json.dumps(metadata, ensure_ascii=False), now, entity_id))
    return {'written': written, 'conflicts': conflicts}


def planned_revert(connection: sqlite3.Connection, source: str, batch: str) -> list[dict]:
    """只列这批拥有的公司资料格，其他元信息不受影响。"""
    found = []
    for row in connection.execute("SELECT id,canonical_name,metadata_json FROM entity WHERE kind IN ('studio','agency')"):
        metadata = json.loads(row[2] or '{}')
        fields = [key for key, fact in public_profile(metadata).items()
                  if fact.get('source') == source and (not batch or fact.get('batch') == batch)]
        if fields:
            found.append({'entity_id': row[0], 'entity': row[1], 'fields': fields})
    return found


def revert(connection: sqlite3.Connection, rows: list[dict]) -> int:
    """撤回已列出的字段，保留公司的其他资料。"""
    count = 0
    for item in rows:
        raw = connection.execute('SELECT metadata_json FROM entity WHERE id=?', (item['entity_id'],)).fetchone()
        metadata = json.loads(raw[0] or '{}')
        for key in item['fields']:
            metadata[KEY].pop(key, None)
            count += 1
        if not metadata[KEY]:
            metadata.pop(KEY)
        connection.execute('UPDATE entity SET metadata_json=? WHERE id=?', (json.dumps(metadata, ensure_ascii=False), item['entity_id']))
    return count
