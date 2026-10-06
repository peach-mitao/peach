from __future__ import annotations

import re


# These values were verified as legacy collection/folder labels, not creator
# identities. Keep this boundary centralized so board generation and review
# application cannot disagree again.
STRUCTURAL_CREATORS = frozenset({"门槛", "视频", "宣傳文件", "宣传文件", "asce",
    "合集-洛丽塔 多创作者", "合集-足交 多创作者", "kj", "AI增强",
    "背身足交", "白丝", "黑丝后入", "巨乳白虎", "풋잡모음", "&网红套图（漏点）",
    "万人求档", "某某门事件", "白袜党福音", "蜜桃臀", "前女友",
    "검스A맨발B_풋잡", "검스_후_맨발_풋잡", "직접구매_최고급_풋잡_2",
    "245mm_큐빅페티녀_발빨맨발_풋잡_사정"})

_EPISODE = re.compile(r"(?<![A-Za-z0-9])S\d{1,2}E\d{1,3}(?!\d)", re.IGNORECASE)
_MAINSTREAM_RELEASE = re.compile(
    r"WEB[ ._-]?(?:DL|Rip)|HDTV|BluRay|AppleTor|\[rartv\]",
    re.IGNORECASE,
)


def is_structural_creator(name: str | None) -> bool:
    if not name:
        return False
    folded = name.strip().casefold()
    return (folded in {candidate.casefold() for candidate in STRUCTURAL_CREATORS}
            or bool(re.fullmatch(r"(?:\d{4}[年._-])?(?:0?[1-9]|1[0-2])月", folded))
            or bool(re.fullmatch(r"(?:4k|6k|8k|1080p|720p|2160p|高清|超清|去重版|整合用)", folded)))


def is_repost_creator(name: str | None) -> bool:
    """已登记转载渠道的域名水印，不按任意域名否定账号。"""
    from .catalog_rules import REPOST_SITE_LABELS
    match = re.match(r'^\[?(?:www\.)?([a-z0-9]+)\.(?:com|me|la|tv|xyz|cc)(?:$|[^a-z])',
                     str(name or '').strip(), re.I)
    return bool(match and match[1].casefold() in REPOST_SITE_LABELS)


def creator_collection_base(name: str) -> str:
    """剥离集合的月份与画质后缀；调用方须核对已有账号身份。"""
    suffix = (r'(?:\s*(?:4k|6k|8k|去重版|整合用)|'
              r'\s*(?:20\d{2}[.年_-](?:0?[1-9]|1[0-2])(?:月)?|'
              r'(?:0?[1-9]|1[0-2])月|20\d{2}年[一二三四五六七八九十]+月|'
              r'\d{4}\s*[一二三四五六七八九十]+月))$')
    return re.sub(suffix, '', name, flags=re.I).strip()


SITE_RELEASES = {'legsjapan': 'https://www.legsjapan.com/en/',
                'fellatiojapan': 'https://www.fellatiojapan.com/en/'}


def _site_release(value: str) -> str:
    text = re.sub(r'^\[[^\]]+\]', '', str(value)).strip().lower()
    text = re.sub(r'^\d+[-_ ]+(?=(?:legs|fellatio)japan)', '', text)
    text = re.sub(r'\.(?:mp4|mkv|avi|wmv|mov|jpg|png|webp)$', '', text)
    match = re.search(r'(?<![a-z])(legsjapan|fellatiojapan)[-_](\d{3,6})(?=$|[-_. @])', text)
    return f'{match[1]}-{int(match[2])}' if match else ''


def creator_release_identifier(creator: str, *, path: str, filename: str, code: str | None) -> tuple[str, str]:
    """审计与摄取共用文件级发行证据；账号形似番号并不足以拒绝身份。"""
    from .catalog_rules import release_code_from_text, is_jav_code, normalise_code_key
    from .code_creators import SETTLED_VERDICTS, classify as classify_code
    from .sources.dmm import matching_cids
    verdict, _, reason = classify_code(creator,[dict(path=path,name=filename,code=code)])
    if verdict in SETTLED_VERDICTS:
        return 'release_identifier', f'{reason}；只移除创作者投影，番号不改写'
    site = _site_release(creator)
    site_path = any(_site_release(part) == site for part in re.split(r'[\\/]',path)) if site else False
    numbered_file = re.match(r'^(\d{3,6})[-_]',filename)
    if site and (site == _site_release(filename) or
                 (site_path and numbered_file and int(numbered_file[1]) == int(site.split('-')[1]))):
        return 'release_identifier', f'目录与媒体文件同为站点作品号 {site}；官网目录 {SITE_RELEASES[site.split("-")[0]]}'
    versionless = re.sub(r'[-_](?:[468]k|hd)(?:[-_](?:c|ch))?$', '', creator, flags=re.I)
    identity = release_code_from_text(versionless)
    if identity and is_jav_code(identity) and re.search(
            r'(?<![a-z0-9])' + re.escape(versionless) + r'(?:[-_](?:[468]k|hd)\d?(?:[-_]c)?)?\.[a-z0-9]+$',filename,re.I):
        return 'release_identifier', f'目录与媒体文件的发行标识 {identity} 一致；画质与版本后缀不作为账号'
    product = re.fullmatch(r'([a-z]{2,8})(\d{5})(?:hhb|mhb|dmb|dm|hq|sd|hd|pl)',creator,re.I)
    if product and re.fullmatch(re.escape(product[1]+product[2])+r'(?:\.part\d+)?\.[a-z0-9]+',filename,re.I):
        identity = normalise_code_key(product[1]+'-'+product[2])
        if is_jav_code(identity):
            return 'release_identifier', f'目录商品标识与媒体文件 {product[1]+product[2]} 一致；番号不改写'
    identifier = release_code_from_text(re.sub(r'_\d{3}$', '', creator))
    cid = re.sub(r'_\d{3}$', '', re.sub(r'\.[^.]+$', '', filename))
    if identifier and re.fullmatch(r'[a-z]+\d{5}(?:hhb|mhb|dmb|dm|hq|sd|hd|pl)',cid,re.I) and matching_cids(identifier,[cid]):
        return 'release_identifier', f'目录番号 {identifier} 与文件 DMM 商品标识一致；番号不改写'
    return ('identifier_candidate',reason) if verdict == '存疑' else ('','')


def is_probable_mainstream_release(name: str | None, path: str | None = None) -> bool:
    """Return only strong TV-release candidates; callers must still review them."""
    text = " ".join(part for part in (name, path) if part)
    return bool(_EPISODE.search(text) and _MAINSTREAM_RELEASE.search(text))
