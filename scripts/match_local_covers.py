"""按已登记图片盘点本地封面；--apply 严格重放 --plan 中的唯一候选。"""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT / 'src') not in sys.path:
    sys.path.insert(0, str(ROOT / 'src'))


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data-root', type=Path)
    parser.add_argument('--report', type=Path, required=True)
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--plan', type=Path)
    args = parser.parse_args(argv)
    if args.data_root is not None:
        os.environ['PEACH_DATA_ROOT'] = str(args.data_root.resolve())
    from peach.settings_file import load_config
    from peach.local_covers import run_local_covers
    config = load_config()
    result = run_local_covers(config, config.directory('database') / 'ledger.db',
                              config.directory('generated') / 'covers', args.report,
                              apply=args.apply, plan=args.plan)
    print(json.dumps(result, ensure_ascii=False))
    return 1 if result['failed'] else 0


if __name__ == '__main__':
    raise SystemExit(main())
