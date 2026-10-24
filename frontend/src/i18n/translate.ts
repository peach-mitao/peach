/* 界面译文：按渲染出来的文字查译文表，在 DOM 上原位换成目标语言。
 *
 * 源码只写中文，组件与壳都不经过翻译函数；这一层在页面启动时接上，之后看着整棵文档：新插入的节点、
 * React 改写的文本、`title` 这类可读属性都按原文查表。查表分三步：整句精确匹配；带 `{0}` 的句式
 * 匹配，占位处的值再查一次表；仍不匹配时按标点切段，逐段精确匹配。查不到的原样保留。
 *
 * 一个元素下只有几枚相邻文本节点时（JSX 里文字夹着表达式），按整段查句式，译文写进第一枚、其余清空：
 * 中日文语序不同，逐节点翻译拼不出通顺的句子。节点和属性都记着原文与写下的译文，React 再改写时
 * 能分清是新的原文还是自己写的那一份。`translate="no"`、可编辑区与代码块里的文字不动。 */

const HAN = /[㐀-鿿]/;
const HAN_ALL = /[㐀-鿿]/g;
const PLACEHOLDER = /\{(\d+)\}/g;
const SEGMENT = /(\s*[·・|｜/／、，,：:；;（）()「」『』【】[\]—→←]\s*)/;
const CACHE_LIMIT = 4000;

export const TRANSLATED_ATTRIBUTES = [
  'title', 'aria-label', 'aria-description', 'aria-roledescription', 'aria-valuetext', 'placeholder', 'alt', 'label',
] as const;

const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

interface Pattern { anchor: string; regex: RegExp; order: number[]; value: string; weight: number }

function compile(key: string, value: string): Pattern | null {
  const literals = key.split(PLACEHOLDER).filter((_, index) => index % 2 === 0);
  const weight = (literals.join('').match(HAN_ALL) ?? []).length;
  if (!weight) return null;
  /* 原文里只有一个汉字的句式（`{0}个`）太宽，占位处只收不含汉字的值，免得吞掉别的句子。 */
  const capture = weight > 1 ? '(.+?)' : '([^\\u3400-\\u9fff]+?)';
  const order: number[] = [];
  const source = key.split(PLACEHOLDER).map((part, index) => {
    if (index % 2) { order.push(Number(part)); return capture }
    return escape(part).replace(/ /g, '\\s*');
  }).join('');
  const anchor = literals.reduce((longest, part) => part.trim().length > longest.length ? part.trim() : longest, '');
  return { anchor, regex: new RegExp(`^${source}$`), order, value, weight };
}

export type Translate = (text: string) => string;

/** 由译文表建一个翻译函数。表的键是规范化后的原文（空白折叠、去首尾），值是译文。 */
export function createTranslator(table: Readonly<Record<string, string>>): Translate {
  const exact = new Map<string, string>();
  const patterns: Pattern[] = [];
  for (const [key, value] of Object.entries(table)) {
    if (!value) continue;
    const normalized = normalize(key);
    if (/\{\d+\}/.test(normalized)) {
      const pattern = compile(normalized, value);
      if (pattern) patterns.push(pattern);
    } else {
      exact.set(normalized, value);
    }
  }
  patterns.sort((a, b) => b.weight - a.weight || b.anchor.length - a.anchor.length);
  const cache = new Map<string, string>();

  const matchPattern = (text: string, depth: number): string | null => {
    for (const pattern of patterns) {
      if (pattern.anchor && !text.includes(pattern.anchor)) continue;
      const match = pattern.regex.exec(text);
      if (!match) continue;
      const values: string[] = [];
      pattern.order.forEach((slot, index) => { values[slot] = match[index + 1] ?? '' });
      return pattern.value.replace(PLACEHOLDER, (_, slot: string) => lookup(values[Number(slot)] ?? '', depth + 1));
    }
    return null;
  };

  /* 先按标点切，切出来的段仍不匹配再按空白切（`后台任务 alt+T` 这类后面拼了快捷键的标签）。 */
  const bySegments = (text: string, depth: number, separator = SEGMENT): string | null => {
    const parts = text.split(separator);
    if (parts.length < 2) return separator === SEGMENT ? bySegments(text, depth, /(\s+)/) : null;
    let changed = false;
    const next = parts.map((part, index) => {
      if (index % 2 || !HAN.test(part)) return part;
      const trimmed = part.trim();
      const translated = exact.get(trimmed) ?? (depth < 2 ? matchPattern(trimmed, depth) : null)
        ?? (separator === SEGMENT ? bySegments(trimmed, depth, /(\s+)/) : null);
      if (translated == null) return part;
      changed = true;
      return part.replace(trimmed, translated);
    });
    return changed ? next.join('') : null;
  };

  function lookup(text: string, depth: number): string {
    const normalized = normalize(text);
    if (!HAN.test(normalized)) return text;
    const known = exact.get(normalized);
    if (known != null) return known;
    if (depth > 2) return text;
    return matchPattern(normalized, depth) ?? bySegments(normalized, depth) ?? text;
  }

  return (text: string) => {
    if (!HAN.test(text)) return text;
    let result = cache.get(text);
    if (result === undefined) {
      const translated = lookup(text, 0);
      /* 首尾空白属于排版，不属于原文：JSX 里相邻文本节点之间靠它隔开。 */
      result = translated === text ? text : `${/^\s*/.exec(text)![0]}${translated}${/\s*$/.exec(text)![0]}`;
      if (cache.size >= CACHE_LIMIT) cache.clear();
      cache.set(text, result);
    }
    return result;
  };
}

const SKIP = 'script,style,textarea,code,pre,[contenteditable]:not([contenteditable="false"]),[translate="no"]';
/* 只有这几枚文本节点的元素按整段翻译；再多就是一大段正文，逐节点更稳。 */
const GROUP_LIMIT = 8;

/** 接上整棵文档的翻译。返回解除观察的函数。 */
export function observeTranslations(root: Element, translate: Translate): () => void {
  const sources = new WeakMap<Text, string>();
  const written = new WeakMap<Text, string>();
  const attributes = new WeakMap<Element, Map<string, string>>();
  const skipped = (element: Element | null) => !element || element.closest(SKIP) !== null;

  const write = (node: Text, value: string) => {
    written.set(node, value);
    if (node.nodeValue !== value) node.nodeValue = value;
  };
  /* 节点此刻的原文：内容还是自己写下的那一份就取记下的原文，否则内容本身就是新的原文。 */
  const source = (node: Text) => {
    const value = node.nodeValue ?? '';
    if (written.has(node) && written.get(node) === value) return sources.get(node) ?? value;
    sources.set(node, value);
    return value;
  };

  const textGroup = (parent: Element): Text[] | null => {
    const nodes = parent.childNodes;
    if (nodes.length < 2 || nodes.length > GROUP_LIMIT) return null;
    for (const node of nodes) if (node.nodeType !== Node.TEXT_NODE) return null;
    return [...nodes] as Text[];
  };

  const translateText = (node: Text) => {
    const parent = node.parentElement;
    if (skipped(parent)) return;
    const group = parent && textGroup(parent);
    if (group) {
      const originals = group.map(source);
      const whole = originals.join('');
      const translated = HAN.test(whole) ? translate(whole) : whole;
      if (translated !== whole) {
        group.forEach((item, index) => write(item, index ? '' : translated));
        return;
      }
      group.forEach((item, index) => write(item, translate(originals[index] ?? '')));
      return;
    }
    const original = source(node);
    write(node, HAN.test(original) ? translate(original) : original);
  };

  const translateAttribute = (element: Element, name: string) => {
    const value = element.getAttribute(name);
    if (value == null || !HAN.test(value) || skipped(element)) return;
    const mine = attributes.get(element);
    if (mine?.get(name) === value) return;
    const translated = translate(value);
    if (!mine) attributes.set(element, new Map([[name, translated]]));
    else mine.set(name, translated);
    if (translated !== value) element.setAttribute(name, translated);
  };

  const translateTree = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) { translateText(node as Text); return }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const element = node as Element;
    if (skipped(element)) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    for (let current: Node | null = element; current; current = walker.nextNode()) {
      if (current.nodeType === Node.TEXT_NODE) {
        if (HAN.test(current.nodeValue ?? '') || written.has(current as Text)) translateText(current as Text);
        continue;
      }
      for (const name of TRANSLATED_ATTRIBUTES) translateAttribute(current as Element, name);
    }
  };

  translateTree(root);
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'characterData') translateText(record.target as Text);
      else if (record.type === 'attributes') translateAttribute(record.target as Element, record.attributeName ?? '');
      else {
        record.addedNodes.forEach(translateTree);
        /* 整段翻译的那组里删掉或换掉一枚，剩下几枚得按新的组合重算。 */
        if (record.removedNodes.length && record.target.nodeType === Node.ELEMENT_NODE) {
          const first = (record.target as Element).firstChild;
          if (first?.nodeType === Node.TEXT_NODE) translateText(first as Text);
        }
      }
    }
  });
  observer.observe(root, {
    subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...TRANSLATED_ATTRIBUTES],
  });
  return () => observer.disconnect();
}
