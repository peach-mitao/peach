"""西方出演者的图库候选与发行方作品封面。"""
from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path
from urllib.parse import quote, urljoin, urlsplit, urlunsplit

from bs4 import BeautifulSoup

from .catalog_rules import normalise_code_key
from .http import HttpRequest, HttpTransport, public_https_url, response_text
from .user_agent import USER_AGENT

SITES = frozenset(('tushy', 'tushyraw', 'vixen', 'blacked', 'blackedraw',
                   'deeper', 'slayed', 'milfy', 'wifey'))
PAGE_LIMIT = 4 * 1024 * 1024
TIMEOUT = 20
SEARCH_QUERY = '''query PeachSearch($query:String!,$site:Site!,$first:Int){
searchVideos(input:{query:$query,site:$site,first:$first}){edges{node{
title slug releaseDate models{name} }}}}'''
SCENE_QUERY = '''query PeachScene($videoSlug:String,$site:Site){
findOneVideo(input:{slug:$videoSlug,site:$site}){
title releaseDate models{name} images{poster{src width}}}}'''


def artwork_key(asset_id: int, code: str | None) -> str:
    """番号封面共用一份；没有番号的作品使用资产键，不改真相字段。"""
    return normalise_code_key(code) or f'ASSET-ID-{int(asset_id)}'


def artwork_cast_size(cover: Path, ledger_count: int) -> int:
    """发行方的完整出演名单也参与合演保护，不靠馆藏名单推断只有一个人。"""
    try:
        evidence = json.loads(cover.with_suffix('.scraping.json').read_text(encoding='utf8'))
    except (OSError, ValueError):
        return ledger_count
    names = evidence.get('performers') if isinstance(evidence, dict) and evidence.get('provider') == 'western-official' else None
    if not isinstance(names, list):
        return ledger_count
    return max(ledger_count, len({_name(n) for n in names if isinstance(n, str) and _name(n)}))


def _name(name: str) -> str:
    return re.sub(r'[\W_]+', '', str(name).casefold())


def babepedia_page(http: HttpTransport, name: str, aliases=(), *, profile_url: str = '') -> tuple:
    """读取与名字栏或别名明确相符的档案。"""
    url = profile_url or 'https://www.babepedia.com/babe/' + quote(name.replace(' ', '_'))
    parsed_profile = urlsplit(url)
    if (not public_https_url(url) or parsed_profile.hostname not in ('www.babepedia.com', 'babepedia.com')
            or not parsed_profile.path.startswith('/babe/')):
        raise ValueError('Babepedia 未取得：档案地址不一致')
    response = http(HttpRequest('GET', url, {'User-Agent': USER_AGENT}), TIMEOUT, PAGE_LIMIT)
    if response.status != 200:
        raise ValueError(f'Babepedia 未取得：HTTP {response.status}')
    soup = BeautifulSoup(response_text(response), 'html.parser')
    heading = soup.select_one('h1#babename')
    found = heading.get_text(' ', strip=True) if heading else ''
    known = {_name(n) for n in (name, *aliases)}
    aka = soup.select_one('h2#aka')
    if aka:
        for label in aka.select('small, #aliasinfobtn'):
            label.decompose()
    alias_names = [n.strip() for n in aka.get_text(' ', strip=True).split(' - ') if n.strip()] if aka else []
    listed = {_name(n) for n in alias_names}
    if not found or not (known & {_name(found), *listed}):
        raise ValueError('Babepedia 未取得：档案身份不一致')
    final = response.url or url
    if urlsplit(final).hostname not in ('www.babepedia.com', 'babepedia.com'):
        raise ValueError('Babepedia 未取得：来源域名不一致')
    return soup, final, found, alias_names


def babepedia_portraits(http: HttpTransport, name: str, aliases=(), *, profile_url: str = '') -> list[dict]:
    """主图与本人档案图库作为候选；推荐人物不参与。"""
    soup, final, found, _ = babepedia_page(http, name, aliases, profile_url=profile_url)
    portraits = []
    seen = set()
    for link in soup.select('#profbox2 a.img[href], .useruploads2 a.img[href]'):
        image = urljoin(final, str(link['href']))
        parsed = urlsplit(image)
        primary = parsed.path.startswith('/pics/') and link.find_parent(id='profbox2') is not None
        thumbnail = link.find('img')
        gallery = (parsed.path.startswith('/user-uploads/') and thumbnail is not None
                   and _name(thumbnail.get('alt', '')) == _name(found)
                   and link.find_parent(class_='useruploads2') is not None)
        if (parsed.hostname not in ('www.babepedia.com', 'babepedia.com')
                or parsed.port not in (None, 443)
                or not (primary or gallery) or not public_https_url(image)
                or image in seen):
            continue
        image = urlunsplit((parsed.scheme, parsed.netloc, quote(parsed.path, safe='/%'), parsed.query, ''))
        seen.add(image)
        portraits.append({'provider': 'babepedia', 'source_kind': 'external_media_library',
                          'upstream_url': image, 'profile_url': final,
                          'external_id': f'babepedia:{found}', 'matched_name': found,
                          'name_source': 'babepedia-profile', 'identity_verified': True,
                          'automatic_install': primary})
        if len(portraits) == 48:
            break
    return portraits


def filename_date(name: str, site: str) -> str:
    """发行方前缀后的日期，限定 2000 年后的发行日期格式。"""
    match = re.match(rf'^{re.escape(site)}[._ -](\d{{2}}|20\d{{2}})[._ -](\d{{2}})[._ -](\d{{2}})[._ -]',
                     name, re.I)
    if not match:
        return ''
    year, month, day = map(int, match.groups())
    try:
        return date(year + 2000 if year < 100 else year, month, day).isoformat()
    except ValueError:
        return ''


def _graphql(http: HttpTransport, site: str, query: str, variables: dict) -> dict:
    if site not in SITES:
        raise ValueError('未支持的发行方')
    variables = {**variables, 'site': site.upper()}
    response = http(HttpRequest('POST', f'https://www.{site}.com/graphql',
                               {'User-Agent': USER_AGENT, 'Content-Type': 'application/json',
                                'Accept': 'application/json', 'Referer': f'https://www.{site}.com/'},
                               json.dumps({'query': query, 'variables': variables}).encode()),
                    TIMEOUT, PAGE_LIMIT)
    if response.status != 200:
        raise ValueError(f'官方封面未取得：HTTP {response.status}')
    data = json.loads(response.body)
    if data.get('errors') or not isinstance(data.get('data'), dict):
        raise ValueError('官方封面未取得：接口没有返回有效资料')
    return data['data']


def official_scene(http: HttpTransport, site: str, performer: str, released: str) -> dict | None:
    """搜索不是身份判定：名字与发行日期同时精确匹配，唯一结果才取详情。"""
    date.fromisoformat(released)
    search = _graphql(http, site, SEARCH_QUERY, {'query': performer, 'first': 30})
    edges = (search.get('searchVideos') or {}).get('edges') or []
    def matches(node):
        return (str(node.get('releaseDate') or '').split('T')[0] == released
                and _name(performer) in {_name(m.get('name', '')) for m in node.get('models') or []})
    hits = {(edge.get('node') or {}).get('slug'): edge['node'] for edge in edges
            if isinstance(edge.get('node'), dict) and edge['node'].get('slug') and matches(edge['node'])}
    if len(hits) != 1:
        return None
    slug = next(iter(hits))
    scene = _graphql(http, site, SCENE_QUERY, {'videoSlug': slug}).get('findOneVideo')
    if not isinstance(scene, dict) or not matches(scene):
        return None
    images = [image for image in (scene.get('images') or {}).get('poster') or []
              if public_https_url(str(image.get('src') or ''))
              and (urlsplit(image['src']).hostname or '').endswith('.' + site + '.com')
              and isinstance(image.get('width'), (int, float))]
    if not images:
        return None
    return {'title': scene.get('title'), 'date': released, 'site': site,
            'performers': [m['name'] for m in scene.get('models') or [] if m.get('name')],
            'source_url': f'https://www.{site}.com/videos/{quote(slug)}',
            'image_url': max(images, key=lambda image: image['width'])['src']}
