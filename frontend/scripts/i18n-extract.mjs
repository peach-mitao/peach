/* 界面译文的原文清单：从前端源码与 `web/index.html` 收集会显示给用户的中文串。
 *
 * 译文表 `src/i18n/ja.json` 以原文为键，运行时翻译层按渲染出来的文字查表（见 `src/i18n/translate.ts`），
 * 所以这里收的键必须和 DOM 里的文字同形：空白折叠成一个空格并去掉首尾，模板与 JSX 里的表达式写成
 * `{0}`、`{1}`，HTML 片段按标签切开，标签里的 `title`、`aria-label` 等属性值单独成键。
 *
 * `node scripts/i18n-extract.mjs` 列出译文表里还没有的原文；`--json` 输出全部原文。 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSync } from 'oxc-parser';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const HAN = /[㐀-鿿]/;
const ATTRIBUTES = /\b(?:title|aria-label|aria-description|aria-roledescription|aria-valuetext|placeholder|alt|label)\s*=\s*(["'])(.*?)\1/g;
const TAG = /<[^<>]*>/g;

export const normalize = text => text.replace(/\s+/g, ' ').trim();

/* 一段可能夹着 HTML 的文字拆成若干键：标签之间的正文各成一键，标签里的可读属性值各成一键。
   占位符在每一段里从 `{0}` 重新编号，和运行时按文本节点查表的粒度一致。 */
export function splitMarkup(text) {
  const keys = [];
  for (const match of text.matchAll(TAG)) {
    for (const attribute of match[0].matchAll(ATTRIBUTES)) keys.push(attribute[2]);
  }
  /* 标签被字符串拼接切断时，残片两头的半个标签不属于正文。 */
  keys.push(...text.split(TAG).map(part => part.slice(part.lastIndexOf('>') + 1).split('<')[0]));
  return keys.map(key => {
    let index = 0;
    return normalize(key.replace(/\{\d+\}/g, () => `{${index++}}`));
  }).filter(key => HAN.test(key));
}

const placeholders = parts => parts.map((part, index) => index ? `{${index - 1}}${part}` : part).join('');

export function extractSource(path, source) {
  const parsed = parseSync(path, source);
  const keys = [];
  const walk = (node, parent, key) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(item => walk(item, parent, key)); return; }
    const machine = (parent?.type === 'ImportDeclaration' || parent?.type?.startsWith('Export')) && key === 'source'
      || key === 'key' && !parent?.computed;
    if (!machine && node.type === 'Literal' && typeof node.value === 'string' && HAN.test(node.value)) {
      keys.push(...splitMarkup(node.value));
    }
    if (node.type === 'TemplateLiteral' && node.quasis.some(quasi => HAN.test(quasi.value.cooked ?? ''))) {
      keys.push(...splitMarkup(placeholders(node.quasis.map(quasi => quasi.value.cooked ?? ''))));
    }
    if (node.type === 'JSXText' && HAN.test(node.value)) keys.push(normalize(node.value));
    /* 只有文字和表达式、不夹子元素的一段 JSX 正文，渲染出来是同一个元素下相邻的几枚文本节点，
       运行时按整段查表，这里也收整段。 */
    if (node.type === 'JSXElement' && node.children.length > 1
      && node.children.every(child => child.type === 'JSXText' || child.type === 'JSXExpressionContainer')
      && node.children.some(child => child.type === 'JSXText' && HAN.test(child.value))) {
      let index = 0;
      const text = node.children.map(child => child.type === 'JSXText' ? child.value
        : child.expression.type === 'JSXEmptyExpression' ? '' : `{${index++}}`).join('');
      keys.push(normalize(text));
    }
    for (const [childKey, child] of Object.entries(node)) {
      if (childKey !== 'comments') walk(child, node, childKey);
    }
  };
  walk(parsed.program);
  return keys.filter(key => HAN.test(key));
}

export function extractHtml(source) {
  const body = source.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '');
  return splitMarkup(body);
}

export function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : /\.[jt]sx?$/.test(path) ? [path] : [];
  });
}

export function collectKeys() {
  const keys = new Set();
  for (const path of sourceFiles(join(root, 'frontend/src'))) {
    for (const key of extractSource(path, readFileSync(path, 'utf8'))) keys.add(key);
  }
  for (const key of extractHtml(readFileSync(join(root, 'web/index.html'), 'utf8'))) keys.add(key);
  return [...keys].sort();
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const keys = collectKeys();
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(keys, null, 1));
  } else {
    const table = JSON.parse(readFileSync(join(root, 'frontend/src/i18n/ja.json'), 'utf8'));
    const missing = keys.filter(key => !(key in table));
    for (const key of missing) console.log(key);
    console.error(`界面原文 ${keys.length} 条，日文译文缺 ${missing.length} 条。`);
  }
}
