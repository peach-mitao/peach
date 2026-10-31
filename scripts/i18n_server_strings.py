"""服务端返回给页面的中文原文清单：列出界面译文表 `frontend/src/i18n/ja.json` 里还没有的条目。

页面上的翻译层按渲染出来的文字查表，不区分文字来自前端源码还是接口，所以服务端写进响应的提示、标签与错误
也按同一张表翻译。这里用标准库 `ast` 收 `src/peach` 里含汉字的字符串，形状与 `frontend/scripts/i18n-extract.mjs`
一致：空白折叠，f-string 的表达式写成 `{0}`、`{1}`，HTML 片段按标签切开。

不收的：文档字符串、日志与终端输出、正则；词表、规则与站点解析模块（`DATA_MODULES`）里的中文是数据，
译了会把标签等馆藏数据在页面上一起换掉；托盘、命令行与设置文件的文字不进浏览器。默认只读，`--json` 输出全部原文。
"""
from __future__ import annotations

import argparse
import ast
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "peach"
TABLE = ROOT / "frontend" / "src" / "i18n" / "ja.json"
HAN = re.compile(r"[㐀-鿿]")
TAG = re.compile(r"<[^<>]*>")
ATTRIBUTES = re.compile(
    r"\b(?:title|aria-label|aria-description|aria-roledescription|aria-valuetext|placeholder|alt|label)"
    r"\s*=\s*([\"'])(.*?)\1")
DATA_MODULES = frozenset({
    "genre_taxonomy.py", "catalog_rules.py", "kanji.py", "studio_icons.py", "studio_sites.py",
    "company_profiles.py", "cli.py", "tray.py", "settings_file.py",
})
DATA_PACKAGES = ("sources/",)
#: 服务端原样转给页面的资源文件（媒体来源的名称与标签）；其余资源文件是站点与垃圾文件词表。
RESOURCE_FILES = (ROOT / "resources" / "media-sources.json",)
OUTPUT_CALLS = frozenset({"debug", "info", "warning", "error", "exception", "critical", "log", "print"})


def normalize(text: str) -> str:
    return " ".join(text.split())


def _renumber(key: str) -> str:
    """每一段的占位符从 `{0}` 重新编号，和运行时按文本节点查表的粒度一致。"""
    counter = iter(range(len(key)))
    return re.sub(r"\{\d+\}", lambda _: f"{{{next(counter)}}}", key)


def split_markup(text: str) -> list[str]:
    """同 `i18n-extract.mjs` 的 `splitMarkup`：标签之间的正文与标签里的可读属性值各成一键。"""
    keys = [attribute.group(2) for tag in TAG.finditer(text) for attribute in ATTRIBUTES.finditer(tag.group(0))]
    keys += [part[part.rfind(">") + 1:].split("<")[0] for part in TAG.split(text)]
    return [key for key in (normalize(_renumber(key)) for key in keys) if HAN.search(key)]


def _docstrings(tree: ast.AST) -> set[int]:
    found = set()
    for node in ast.walk(tree):
        if isinstance(node, (ast.Module, ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)) and node.body:
            first = node.body[0]
            if isinstance(first, ast.Expr) and isinstance(first.value, ast.Constant) and isinstance(first.value.value, str):
                found.add(id(first.value))
    return found


def _skipped_calls(tree: ast.AST) -> set[int]:
    """日志、print 与 `re.*` 调用里的字符串节点：前两样不进页面，正则是匹配用的原文。"""
    skipped = set()
    for node in ast.walk(tree):
        if not isinstance(node, ast.Call):
            continue
        func = node.func
        name = func.attr if isinstance(func, ast.Attribute) else func.id if isinstance(func, ast.Name) else ""
        regex = isinstance(func, ast.Attribute) and isinstance(func.value, ast.Name) and func.value.id == "re"
        if name in OUTPUT_CALLS or regex:
            skipped.update(id(child) for child in ast.walk(node))
    return skipped


def extract_source(source: str) -> list[str]:
    tree = ast.parse(source)
    skipped = _docstrings(tree) | _skipped_calls(tree)
    inside = set()
    keys = []
    for node in ast.walk(tree):
        if id(node) in skipped or id(node) in inside:
            continue
        if isinstance(node, ast.JoinedStr):
            parts, index = [], 0
            for value in node.values:
                inside.update(id(child) for child in ast.walk(value))
                if isinstance(value, ast.Constant):
                    parts.append(str(value.value))
                else:
                    parts.append(f"{{{index}}}")
                    index += 1
            text = "".join(parts)
        elif isinstance(node, ast.Constant) and isinstance(node.value, str):
            text = node.value
        else:
            continue
        if HAN.search(text) and "\\" not in text and "(?" not in text:
            keys.extend(split_markup(text))
    return keys


def collect_keys(root: Path = SOURCE) -> list[str]:
    keys = set()
    for path in sorted(root.rglob("*.py")):
        relative = path.relative_to(root).as_posix()
        if relative in DATA_MODULES or relative.startswith(DATA_PACKAGES):
            continue
        keys.update(extract_source(path.read_text(encoding="utf-8")))
    for resource in RESOURCE_FILES:
        keys.update(normalize(value) for row in json.loads(resource.read_text(encoding="utf-8"))
                    for value in row.values() if isinstance(value, str) and HAN.search(value))
    return sorted(keys)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--json", action="store_true", help="输出全部原文")
    args = parser.parse_args(argv)
    keys = collect_keys()
    if args.json:
        print(json.dumps(keys, ensure_ascii=False, indent=1))
        return 0
    table = json.loads(TABLE.read_text(encoding="utf-8"))
    missing = [key for key in keys if key not in table]
    for key in missing:
        print(key)
    print(f"服务端原文 {len(keys)} 条，日文译文缺 {len(missing)} 条。", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
