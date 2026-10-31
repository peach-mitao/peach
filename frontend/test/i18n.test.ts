import { afterEach, describe, expect, it } from 'vitest';
import { extractSource, splitMarkup } from '../scripts/i18n-extract.mjs';
import ja from '../src/i18n/ja.json';
import { resolveLocale } from '../src/i18n/locale';
import { createTranslator, observeTranslations } from '../src/i18n/translate';

const TABLE = {
  '设置': '設定', '封面': 'カバー', '共 {0} 部': '全 {0} 本', '已选 {0} 项': '{0} 件選択中',
  '已保存{0}': '{0}を保存しました', '{0} 个': '{0} 個', '删除': '削除',
};
const translate = createTranslator(TABLE);
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('界面语言', () => {
  it('跟随浏览器时取语言列表里最先出现的中文或日文', () => {
    expect(resolveLocale('auto', ['en-US', 'ja-JP', 'zh-CN'])).toBe('ja');
    expect(resolveLocale('auto', ['zh-TW', 'ja'])).toBe('zh');
    expect(resolveLocale('auto', ['en-US'])).toBe('zh');
    expect(resolveLocale('ja', ['zh-CN'])).toBe('ja');
  });
});

describe('译文查表', () => {
  it('整句、句式与切段依次匹配，查不到的原样保留', () => {
    expect(translate('设置')).toBe('設定');
    expect(translate('  设置 ')).toBe('  設定 ');
    expect(translate('共 12 部')).toBe('全 12 本');
    expect(translate('共12部')).toBe('全 12 本');
    expect(translate('已保存封面')).toBe('カバーを保存しました');
    expect(translate('封面 · 删除')).toBe('カバー · 削除');
    expect(translate('删除 alt+D')).toBe('削除 alt+D');
    expect(translate('三上悠亚')).toBe('三上悠亚');
    expect(translate('Peach')).toBe('Peach');
  });
  it('只含一个汉字的句式不吞掉带汉字的值', () => {
    expect(translate('3 个')).toBe('3 個');
    expect(translate('两个')).toBe('两个');
  });
});

describe('文档翻译', () => {
  let stop = () => {};
  afterEach(() => { stop(); document.body.innerHTML = '' });

  it('翻译已有与新插入的文字和可读属性，跳过不翻译的区域', async () => {
    document.body.innerHTML = '<p>设置</p><button title="删除" aria-label="删除">x</button>'
      + '<span translate="no">设置</span><textarea>设置</textarea>';
    stop = observeTranslations(document.body, translate);
    expect(document.querySelector('p')!.textContent).toBe('設定');
    expect(document.querySelector('button')!.title).toBe('削除');
    expect(document.querySelector('button')!.getAttribute('aria-label')).toBe('削除');
    expect(document.querySelector('span')!.textContent).toBe('设置');
    expect(document.querySelector('textarea')!.value).toBe('设置');
    const added = document.createElement('b');
    added.textContent = '封面';
    document.body.append(added);
    await flush();
    expect(added.textContent).toBe('カバー');
  });

  it('文字夹着表达式时按整段翻译，任一节点再变按新的原文重算', async () => {
    const span = document.createElement('span');
    const [head, count, tail] = ['已选 ', '3', ' 项'].map((text) => document.createTextNode(text));
    span.append(head!, count!, tail!);
    document.body.append(span);
    stop = observeTranslations(document.body, translate);
    expect(span.textContent).toBe('3 件選択中');
    count!.nodeValue = '5';
    await flush();
    expect(span.textContent).toBe('5 件選択中');
    head!.nodeValue = '共 ';
    tail!.nodeValue = ' 部';
    await flush();
    expect(span.textContent).toBe('全 5 本');
  });

  it('原文被改写时重新翻译，自己写下的译文不再处理', async () => {
    document.body.innerHTML = '<p title="设置">设置</p>';
    stop = observeTranslations(document.body, translate);
    const p = document.querySelector('p')!;
    p.firstChild!.nodeValue = '删除';
    p.title = '封面';
    await flush();
    expect(p.textContent).toBe('削除');
    expect(p.title).toBe('カバー');
  });
});

describe('原文清单', () => {
  it('收字符串、模板、JSX 正文与整段，HTML 按标签切开', () => {
    const keys = extractSource('sample.tsx', [
      "const a = '设置';",
      'const b = `共 ${n} 部`;',
      "const c = `<button title=\"删除\">${icon}封面</button>`;",
      'const d = <p>已选 {count} 项</p>;',
      "import x from './设置';",
    ].join('\n'));
    expect(keys).toEqual(expect.arrayContaining(['设置', '共 {0} 部', '删除', '{0}封面', '已选 {0} 项']));
    expect(keys).not.toContain('./设置');
    expect(splitMarkup('<b>封面</b> 与 <i>海报</i>')).toEqual(['封面', '与', '海报']);
  });

  it('日文译文保留原文的每个占位符', () => {
    const broken = Object.entries(ja as Record<string, string>).filter(([key, value]) =>
      (key.match(/\{\d+\}/g) ?? []).some((slot) => !value.includes(slot)));
    expect(broken).toEqual([]);
  });
});
