"""旧壳 `web/app.js` 的路由表只许减不许增：新页面做成 `frontend/` 的 island 或路由树的元素。

ADR-0022 的迁移方向是逐屏搬出 app.js，可 2026-09-13 盘点时它已长到 10818 行，比立项
时多出四成——每一轮新功能都往旧壳里加一屏。行数拦不住这种增长（拦住的只是注释），
拦得住的是「旧壳里登记了哪些页面」。

冻结的是页面全集，按归属分成三列：壳打开的（app.js `ROUTES` 的字面 match，加上 island 入口经
`window.peachRegisterRoute` 登记的）、路由树用元素画的（`managed-routes.tsx` 各张路由表里带
`element` 的条目）、覆盖组按真实地址匹配的详情与队列（`OVERLAY_PATHS`）。一页搬进路由树就从
app.js 的 `ROUTES` 里删掉，三列互不相交、并起来仍是这张全集。
"""
import pathlib
import re
import unittest

import peach

REPO = pathlib.Path(peach.__file__).resolve().parents[2]
APP = REPO / "web" / "app.js"
FRONTEND_SRC = REPO / "frontend" / "src"
ROUTE_TABLES = FRONTEND_SRC / "react" / "router" / "managed-routes.tsx"
OVERLAY = FRONTEND_SRC / "history" / "overlay.ts"

#: 以字面量写出的页面路径；由 `STATE_ROUTES`、`ROUTE_ENTITIES` 展开的那两组不在此列，
#: 它们的数量由下面的 `SPREADS` 钉住。
FROZEN_ROUTES = frozenset({
    "/", "/trash", "/playlists", "/playlists/:playlist/:item", "/mix/:seed/:item",
    "/parts/:seed/:item", "/editions/:seed/:item", "/item/:id", "/follow/item/:id",
    "/performers", "/creators", "/studios", "/agencies", "/tags", "/stats", "/taste",
    "/review", "/data-cleanup", "/duplicates", "/resource-sync", "/quality-goals",
    "/scraping", "/follow", "/follow-manage", "/configuration", "/activity", "/immerse",
    "/diagnostics",
})
SPREADS = 2

#: 字符串排在注释前面：`'/performers/*'` 里的 `/*` 不是注释。
_STRING_OR_COMMENT = re.compile(r"""('(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")|/\*.*?\*/|//[^\n]*""", re.S)


def without_comments(source: str) -> str:
    return _STRING_OR_COMMENT.sub(lambda hit: hit.group(1) or "", source)


def routes_table(source: str) -> str:
    start = source.index("const ROUTES=[")
    return source[start:source.index("\n];", start)]


def braced(source: str, start: int) -> str:
    """`source[start]` 是 `{`，取到与它配对的 `}` 为止（含两端）。"""
    depth = 0
    for index in range(start, len(source)):
        depth += {"{": 1, "}": -1}.get(source[index], 0)
        if depth == 0:
            return source[start:index + 1]
    raise ValueError("大括号不配对")


def top_level_entries(body: str) -> dict[str, str]:
    """对象字面量第一层的 `'键': 值`，值是内联对象就取整个对象，是标识符就取标识符。"""
    entries = {}
    inner = body[1:-1]
    depth = 0
    index = 0
    while index < len(inner):
        char = inner[index]
        if char in "{[(":
            depth += 1
        elif char in "}])":
            depth -= 1
        elif depth == 0 and char == "'":
            hit = re.match(r"'([^']*)'\s*:\s*", inner[index:])
            if hit:
                value_at = index + hit.end()
                if inner[value_at] == "{":
                    value = braced(inner, value_at)
                else:
                    value = re.match(r"[\w$]+", inner[value_at:]).group(0)
                entries[hit.group(1)] = value
                index = value_at + len(value)
                continue
        index += 1
    return entries


def tree_routes(source: str) -> set[str]:
    """路由树用元素画的页面：各张 `*_ROUTES` 表里带 `element` 的条目（值是共用常量的，看那个常量）。"""
    source = without_comments(source)
    found = set()
    for table in re.finditer(r"export const \w+_ROUTES\b[^=]*=\s*\{", source):
        for path, value in top_level_entries(braced(source, table.end() - 1)).items():
            if not value.startswith("{"):
                shared = re.search(rf"const {re.escape(value)}\b[^=]*=\s*\{{", source)
                value = braced(source, shared.end() - 1)
            if re.search(r"\belement\s*:", value):
                found.add(path)
    return found


def registered_routes() -> set[str]:
    """island 入口经 `window.peachRegisterRoute` 登记给壳的页面。"""
    found = set()
    for path in FRONTEND_SRC.rglob("*.ts*"):
        source = path.read_text(encoding="utf-8")
        if "peachRegisterRoute(" in source:
            found |= set(re.findall(r"match:\s*'([^']*)'", source))
    return found


class LegacyShellRouteTests(unittest.TestCase):
    def setUp(self):
        self.source = APP.read_text(encoding="utf-8")
        self.table = routes_table(self.source)
        self.overlay = set(re.findall(r"'([^']*)'", OVERLAY.read_text(encoding="utf-8").split(
            "export const OVERLAY_PATHS", 1)[1].split("] as const", 1)[0]))
        self.tree = tree_routes(ROUTE_TABLES.read_text(encoding="utf-8"))
        literal = set(re.findall(r"match:\s*'([^']*)'", self.table)) | registered_routes()
        self.shell = literal - self.overlay

    def test_the_three_owners_partition_the_frozen_pages(self):
        self.assertEqual(sorted(self.shell & self.tree), [],
                         "这些页面已经由路由树的元素画，请从 app.js 的 ROUTES 里删掉")
        self.assertEqual(sorted(self.tree & self.overlay), [], "覆盖组的路径不该在页面组里再登记元素")
        union = self.shell | self.tree | self.overlay
        added = sorted(union - FROZEN_ROUTES)
        self.assertEqual(added, [],
                         "多出了页面；新页面请做成 frontend/ 的 island 或路由树的元素，"
                         "并把它加进 FROZEN_ROUTES：" + "、".join(added))
        gone = sorted(FROZEN_ROUTES - union)
        self.assertEqual(gone, [], "这些页面三列里都找不到了，删掉了的话请从 FROZEN_ROUTES 里删掉：" + "、".join(gone))

    def test_the_shell_table_keeps_its_spreads_and_registers_nothing_itself(self):
        self.assertEqual(self.table.count("...Object.entries("), SPREADS,
                         "ROUTES 里展开的路由组数量变了；新增一组同样算往旧壳里加页面")
        self.assertEqual(len(re.findall(r"\bregisterRoute\(", self.source)), 0,
                         "app.js 自己不该调用 registerRoute：那是给 island 入口用的")


if __name__ == "__main__":
    unittest.main()
