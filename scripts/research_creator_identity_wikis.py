"""身份待核验的创作者按页名查 sougouwiki 与 av_neme，产出身份清单；账本只读。

清单交给 `apply_entity_identity_research.py --findings` 预览、冻结和写入。取页失败的实体
不进清单，打印成未取得，下一批再问。
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT/'src'))
from peach import entity_identity_research as research  # noqa: E402
from peach.classification import is_repost_creator, is_structural_creator, numbered_cast_shape  # noqa: E402
from peach.config import DATABASE_PATH, SOURCES_DIR  # noqa: E402
from peach.entities import normalize_entity_name  # noqa: E402
from peach.fsutil import atomic_write_text  # noqa: E402
from peach.scripting import HostLimiter, open_readonly  # noqa: E402
from peach.sources.seesaa import AV_NEME, SEESAA, WikiPages  # noqa: E402


def targets(connection, entity_ids):
    """(实体 id, 规范名, 文件名前缀)；默认是本来源记为身份待核验候选的创作者。"""
    if entity_ids:
        marks = ','.join('?' for _ in entity_ids)
        rows = connection.execute(f"SELECT id,canonical_name FROM entity WHERE kind='creator' AND id IN ({marks})",
                                  entity_ids).fetchall()
    else:
        rows = connection.execute(
            "SELECT e.id,e.canonical_name FROM entity e JOIN entity_classification ec ON ec.entity_id=e.id "
            "WHERE e.kind='creator' AND ec.facet='identity' AND ec.value='unknown' AND ec.source=? "
            "AND ec.status='candidate' ORDER BY e.id", (research.SOURCE,)).fetchall()
    people = {normalize_entity_name(row[0]) for row in connection.execute(
        "SELECT canonical_name FROM entity WHERE kind='performer' UNION "
        "SELECT a.alias FROM entity_alias a JOIN entity e ON e.id=a.entity_id WHERE e.kind='performer'")}
    files = defaultdict(list)
    for entity_id, name in connection.execute(
            "SELECT ae.entity_id,a.name FROM asset_entity ae JOIN asset a ON a.id=ae.asset_id "
            "WHERE ae.role='creator' AND a.medium='video'"):
        files[entity_id].append(str(name or ''))
    result = []
    for entity_id, name in rows:
        if is_structural_creator(name) or is_repost_creator(name):
            continue
        shape = numbered_cast_shape(files.get(entity_id, []), people)
        result.append((entity_id, name, [shape['prefix']] if shape and shape['prefix'] else []))
    return result


def main():
    parser = argparse.ArgumentParser(description='按页名查日本资料站，产出创作者身份清单')
    parser.add_argument('--db', type=Path, default=DATABASE_PATH)
    parser.add_argument('--output', type=Path, required=True, help='身份清单 JSON')
    parser.add_argument('--entity', type=int, action='append', default=[], help='只查这些实体，可重复')
    parser.add_argument('--cache-dir', type=Path, default=SOURCES_DIR/'metadata'/'javinizer-go'/'seesaa-pages')
    parser.add_argument('--max-requests', type=int, default=80, help='每站本批请求上限')
    args = parser.parse_args()
    connection = open_readonly(args.db)
    try:
        todo = targets(connection, args.entity)
    finally:
        connection.close()
    # 两站同一主机，共用一个主机间隔。
    limiter = HostLimiter({}, default_interval=SEESAA.interval)
    pages = {'sougouwiki': WikiPages(args.cache_dir, config=SEESAA, limiter=limiter, max_requests=args.max_requests),
             'av_neme': WikiPages(args.cache_dir, config=AV_NEME, limiter=limiter, max_requests=args.max_requests)}
    findings, unfetched = [], []
    try:
        for entity_id, name, prefixes in todo:
            finding = research.wiki_finding(entity_id, name, research.lookup_keys(name, prefixes), pages)
            if finding is None:
                unfetched.append(name)
            else:
                findings.append(finding)
    finally:
        for wiki in pages.values():
            wiki.close()
    atomic_write_text(args.output, json.dumps(findings, ensure_ascii=False, indent=2))
    hits = [row['name'] for row in findings if any(claim['value'] == 'release' for claim in row['claims'])]
    print(json.dumps({'queried': len(todo), 'findings': len(findings), 'release_pages': hits,
                      'unfetched': unfetched}, ensure_ascii=False))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
