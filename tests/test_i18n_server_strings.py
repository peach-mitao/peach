"""服务端原文清单按页面上的文字形状收键，数据与终端输出不进清单。"""
import tempfile
import unittest
from pathlib import Path

from scripts import i18n_server_strings as server


class ServerStringTests(unittest.TestCase):
    def test_response_text_is_collected_in_the_shape_the_page_renders(self):
        source = '\n'.join([
            '"""模块说明不进清单。"""',
            'import logging, re',
            'LOGGER = logging.getLogger(__name__)',
            'def view(count, name):',
            '    """函数说明不进清单。"""',
            '    LOGGER.warning("日志不进清单")',
            '    print("终端输出不进清单")',
            '    re.compile("正则不进清单")',
            '    return {"label": "本地磁盘", "detail": f"共 {count} 部：{name}",',
            '            "html": \'<b title="删除">封面</b>  与  海报\'}',
        ])
        keys = server.extract_source(source)
        self.assertCountEqual(keys, ["本地磁盘", "共 {0} 部：{1}", "删除", "封面", "与 海报"])

    def test_vocabulary_and_site_parsers_are_data_not_page_text(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "sources").mkdir()
            (root / "genre_taxonomy.py").write_text('TAGS = ["词表里的标签"]\n', encoding="utf-8")
            (root / "sources" / "site.py").write_text('FIELD = "站点字段"\n', encoding="utf-8")
            (root / "routes.py").write_text('MESSAGE = "保存失败"\n', encoding="utf-8")
            keys = server.collect_keys(root)
        self.assertIn("保存失败", keys)
        self.assertNotIn("词表里的标签", keys)
        self.assertNotIn("站点字段", keys)
        # 媒体来源的标签由服务端原样转给页面。
        self.assertIn("本地磁盘", keys)


if __name__ == "__main__":
    unittest.main()
