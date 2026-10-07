"""恢复英文媒体文件名的单词间隔，保留原字符、序号和扩展名。"""
from __future__ import annotations

import argparse
import json
import re
import sys
from contextlib import closing
from pathlib import Path, PureWindowsPath

PROJECT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT / 'src'))

from peach import organize
from peach.config import GENERATED_DIR
from peach.platform import location_roots, resolve_root, root_online, translate_ledger_path
from peach.review_csv import read_rows, write_rows
from peach.scripting import add_ledger_write_args, open_for_write, open_readonly
from wordninja_enhanced import LanguageModel

WORDS = PROJECT / 'resources' / 'naming' / 'english_filename_words.txt'
FIELDS = (*organize.PLAN_FIELDS, 'size', 'original_name', 'new_name')


def model():
    words = [line.strip() for line in WORDS.read_text(encoding='utf-8').splitlines()
             if line.strip() and not line.startswith('#')]
    return LanguageModel(add_words=words, add_to_top=True, overwrite=True)


def spaced_name(name, language):
    """仅插入空格，词典不确定性不会改写内容字符。"""
    path = PureWindowsPath(name)
    if path.suffix.casefold() not in {'.mp4', '.mkv', '.avi', '.mov', '.wmv', '.webm'}:
        return name
    def words(match):
        text = re.sub(r'(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])', ' ', match.group())
        return language.rejoin(text)
    stem = re.sub(r'[A-Za-z]+', words, path.stem)
    stem = re.sub(r'([,;!])(?=[A-Za-z])', r'\1 ', stem)
    if re.sub(r'\s', '', stem) != re.sub(r'\s', '', path.stem):
        raise ValueError('英文分词改变了内容字符')
    return stem + path.suffix


def plan(connection, root):
    canonical_root = str(PureWindowsPath(root))
    owner, index, _ = resolve_root(canonical_root + '\\_', location_roots())
    if not owner or index < 0 or not root_online(translate_ledger_path(canonical_root)):
        raise ValueError('目录不在在线馆藏来源内')
    language = model()
    result, claimed = [], set()
    for row in connection.execute('SELECT id,path,name,size FROM asset WHERE location=? AND disposal IS NULL AND medium=\'video\' ORDER BY id', (owner,)):
        if str(PureWindowsPath(row['path']).parent).casefold() != canonical_root.casefold():
            continue
        new = spaced_name(row['name'], language)
        if new == row['name']:
            continue
        target = str(PureWindowsPath(row['path']).with_name(new))
        if len(target) > organize.MAX_PATH or target.casefold() in claimed:
            raise ValueError('分词目标重名或路径过长')
        claimed.add(target.casefold())
        result.append(dict(asset_id=row['id'], location=owner, current_path=row['path'], target_path=target,
                           action='rename', reason='', size=row['size'], original_name=row['name'], new_name=new))
    return result


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    add_ledger_write_args(parser)
    parser.add_argument('--root', required=True)
    parser.add_argument('--review-csv', type=Path)
    parser.add_argument('--out', type=Path, default=GENERATED_DIR / 'english-name-spacing.csv')
    args = parser.parse_args(argv)
    if not args.apply:
        with closing(open_readonly(args.db)) as connection:
            rows = plan(connection, args.root)
        write_rows(args.out, FIELDS, rows, atomic=True)
        print(json.dumps(dict(planned=len(rows), review=str(args.out)), ensure_ascii=False))
        return 0
    if not args.review_csv:
        parser.error('--apply 必须给 --review-csv，消费已冻结的原名与目标名')
    rows = read_rows(args.review_csv)
    seen = set()
    with closing(open_readonly(args.db)) as connection:
        for row in rows:
            asset_id = int(row['asset_id'])
            held = connection.execute('SELECT path,size FROM asset WHERE id=? AND disposal IS NULL', (asset_id,)).fetchone()
            source = PureWindowsPath(row['current_path'])
            target = PureWindowsPath(row['target_path'])
            location, index, _ = resolve_root(str(source), location_roots())
            if location != row['location'] or index < 0 or not root_online(translate_ledger_path(str(source.parent))):
                raise ValueError('英文文件名不在在线馆藏来源内')
            if asset_id in seen or held is None or tuple(held) != (str(source), int(row['size'])):
                raise ValueError('英文文件名复核已失效')
            if str(source.parent).casefold() != str(PureWindowsPath(args.root)).casefold() or source.parent != target.parent:
                raise ValueError('英文分词只能在指定目录内改名')
            if row['action'] != 'rename' or re.sub(r'\s', '', source.name) != re.sub(r'\s', '', target.name):
                raise ValueError('英文文件名复核改变了内容字符')
            native = translate_ledger_path(str(source))
            if native.is_symlink() or not native.is_file() or native.stat().st_size != int(row['size']):
                raise ValueError('英文文件体积或类型变化')
            seen.add(asset_id)
    connection = open_for_write(args)
    try:
        baseline = {tuple(r) for r in connection.execute('PRAGMA foreign_key_check')}
        count = connection.execute('SELECT count(*) FROM asset').fetchone()[0]
        result = organize.apply_plan(connection, rows, generated_root=GENERATED_DIR)
        if connection.execute('PRAGMA integrity_check').fetchone()[0] != 'ok' or {tuple(r) for r in connection.execute('PRAGMA foreign_key_check')} - baseline or connection.execute('SELECT count(*) FROM asset').fetchone()[0] != count:
            raise RuntimeError('英文文件名核验失败')
        print(json.dumps(result, ensure_ascii=False))
        return 1 if result['failed'] else 0
    finally:
        connection.close()


if __name__ == '__main__':
    raise SystemExit(main())
