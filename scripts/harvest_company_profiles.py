"""逐家采集公开公司资料；默认只生成可复核的 JSON，不写账本。"""
from __future__ import annotations

import argparse
import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlsplit

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'src'))

from peach.company_profiles import extract_for_entity, brand_facts, fill, fill_aliases  # noqa: E402
from peach.http import HttpRequest, HttpxTransport, body_text  # noqa: E402
from peach.scripting import (USER_AGENT, HostLimiter, add_ledger_write_args, counts_of,
                             open_for_write, open_readonly, verify_after_write)  # noqa: E402
from peach.studio_sites import parked_reason, page_title  # noqa: E402
from find_studio_socials import affirmative_link  # noqa: E402
from install_entity_links import plan, check_links, install  # noqa: E402


def scan(entity: dict, root: Path, limiter: HostLimiter) -> dict:
    result = {'entity_id': entity['id'], 'kind': entity['kind'], 'name': entity['canonical_name'],
              'facts': {}, 'pages': [], 'conflicts': [], 'socials': [], 'status': '未取得'}
    urls = [link['url'] for link in entity['links'] if link['link_kind'] == 'official'
            and link['url'].startswith('https://') and 'web.archive.org' not in link['url']][:2]
    if not urls:
        result['reason'] = '没有可访问的已确认官网；存档官网另行复核'
        return result
    http = HttpxTransport()
    try:
        visited = set()
        while urls and len(visited) < 5:
            url = urls.pop(0)
            if url in visited:
                continue
            visited.add(url)
            limiter.wait(url)
            try:
                response = http(HttpRequest('GET', url, {'User-Agent': USER_AGENT}), 7.0, 2 << 20)
                status = response.status
                final = response.url or url
                item = {'url': url, 'final_url': final, 'http_status': status}
                result['pages'].append(item)
                if status != 200:
                    item['reason'] = f'HTTP {status}'
                    if status in {403, 429}:
                        break
                    continue
                html = body_text(response.body, response.headers)
                reason = parked_reason(page_title(response.body), html, str(response.headers), final)
                if reason:
                    item['reason'] = reason
                    continue
                # 域名改变需要重新核对身份，不跟随新站自动写入。
                if (urlsplit(final).hostname or '').removeprefix('www.') != (urlsplit(url).hostname or '').removeprefix('www.'):
                    item['reason'] = '官网重定向到其他域名，需要身份复核'
                    continue
                file = root / f"{entity['id']}-{len(visited)}.html"
                file.write_text(html, encoding='utf-8')
                item['cache'] = str(file)
                parsed = extract_for_entity(html, final, entity['canonical_name'])
                parsed['facts'].update(brand_facts(html, final, entity['canonical_name']))
                for key, fact in parsed['facts'].items():
                    held = result['facts'].get(key)
                    if held and held['value'] != fact['value']:
                        result['conflicts'].append({'field': key, 'values': [held, fact]})
                    else:
                        result['facts'][key] = fact
                result['conflicts'].extend(parsed['conflicts'])
                result['socials'].extend(parsed['socials'])
                for target in parsed['company_pages']:
                    if target not in visited and target not in urls:
                        urls.append(target)
                gate = affirmative_link(html, final)
                if gate and gate not in visited:
                    urls.insert(0, gate)
                result['status'] = '已核查'
            except Exception as error:
                result['pages'].append({'url': url, 'reason': f'{type(error).__name__}: {str(error)[:150]}'})
        for conflict in result['conflicts']:
            result['facts'].pop(conflict['field'], None)
    finally:
        http.close()
    return result


def land(args: argparse.Namespace) -> int:
    """写入已观测的填空清单，保存计数、出处与回执。"""
    rows = json.loads(args.input.read_text(encoding='utf-8'))['entities']
    connection = open_for_write(args)
    try:
        before = counts_of(connection)
        before_fk = connection.execute('PRAGMA foreign_key_check').fetchall()
        changes = []
        link_rows = [link for row in rows if row.get('status') != 'candidate'
                     for link in row.get('links', []) if link.get('status') == 'observed']
        links = plan(connection, link_rows)
        check_links(links)
        for link in links:
            if link['action'] == 'relabel':
                link.update(action='skip', reason='保留既有链接标签')
        for row in rows:
            if row.get('status') == 'candidate':
                changes.append({'entity_id': row['entity_id'], 'skipped': '候选尚未复核'})
                continue
            facts = {key: fact for key, fact in row.get('facts', {}).items()
                     if fact.get('status') == 'observed'}
            if args.apply:
                changes.append({'entity_id': row['entity_id'], **fill(connection, row['entity_id'], facts, source='auto:company-profile', batch=args.batch),
                                'aliases_written': fill_aliases(connection, row['entity_id'], row.get('aliases', []), batch=args.batch)})
            else:
                changes.append({'entity_id': row['entity_id'], 'planned': list(facts)})
        if args.apply:
            links_written = install(connection, links, 'auto:company-profile', batch=args.batch)
            connection.commit()
        after = counts_of(connection)
        integrity, foreign_keys = verify_after_write(connection)
        receipt = {'apply': args.apply, 'before': before, 'after': after, 'integrity': integrity,
                   'foreign_keys_before': len(before_fk), 'foreign_keys_after': foreign_keys, 'changes': changes,
                   'links': links, 'links_written': links_written if args.apply else 0}
        args.output.write_text(json.dumps(receipt, ensure_ascii=False, indent=2), encoding='utf-8')
        print(json.dumps({'entities_changed': sum(bool(row.get('written')) for row in changes), 'fields_written': sum(len(row.get('written', [])) for row in changes), 'integrity': integrity, 'foreign_keys': foreign_keys}))
        return 0 if integrity == 'ok' and foreign_keys == len(before_fk) else 1
    finally:
        connection.close()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    add_ledger_write_args(parser)
    parser.add_argument('--inventory', type=Path)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--cache', type=Path)
    parser.add_argument('--input', type=Path)
    parser.add_argument('--resume', action='store_true')
    parser.add_argument('--batch', default='')
    args = parser.parse_args()
    if args.input:
        if args.apply and not args.batch:
            parser.error('--apply 需要 --batch 记录可撤回的批次')
        return land(args)
    if args.inventory:
        entities = json.loads(args.inventory.read_text(encoding='utf-8'))['entities']
    else:
        with open_readonly(args.db) as connection:
            entities = []
            for row in connection.execute("SELECT id,kind,canonical_name FROM entity WHERE kind IN ('studio','agency') ORDER BY id"):
                item = dict(row)
                item['links'] = [dict(link) for link in connection.execute("SELECT link_kind,url FROM entity_link WHERE entity_id=?", (item['id'],))]
                entities.append(item)
    if args.cache is None:
        parser.error('采集需要 --cache 保存原始页面')
    args.cache.mkdir(parents=True, exist_ok=True)
    results = json.loads(args.output.read_text(encoding='utf-8'))['entities'] if args.resume and args.output.exists() else []
    done = {item['entity_id'] for item in results if item['status'] == '已核查'
            or item.get('reason') or any(page.get('http_status') in {403, 429} for page in item['pages'])}
    results = [item for item in results if item['entity_id'] in done]
    limiter = HostLimiter({}, default_interval=1.5)
    with ThreadPoolExecutor(max_workers=3) as workers:
        futures = {workers.submit(scan, entity, args.cache, limiter): entity for entity in entities if entity['id'] not in done}
        for future in as_completed(futures):
            result = future.result()
            results.append(result)
            args.output.write_text(json.dumps({'entities': results}, ensure_ascii=False, indent=2), encoding='utf-8')
            print(f"{len(results)}/{len(entities)} {result['name']} {result['status']} {list(result['facts'])}", flush=True)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
