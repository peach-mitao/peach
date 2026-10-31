/* 界面语言的入口：主界面与独立页面在挂载前各调一次 `installUiLocale`。
 *
 * 中文是源码本身，不接任何东西；日文接上 `translate.ts` 的文档观察，译文表 `ja.json` 的缺项由
 * `scripts/i18n-extract.mjs` 列出。`<html lang>` 跟着换，字体回退按语言挑字形。 */
import ja from './ja.json';
import { uiLocale, type UiLocale } from './locale';
import { createTranslator, observeTranslations, type Translate } from './translate';

export { localePreference, setLocalePreference, type LocalePreference } from './locale';

let active: Translate = (text) => text;

/** 写进 DOM 之前就要拆开的文字（逐字错峰的读数）先在这里换成译文：拆成单字之后整句就查不到了。 */
export const translateText: Translate = (text) => active(text);

/* 样式表的字体栈点名了中文字体（`PingFang SC`、`Microsoft YaHei UI`），汉字会按简体字形画。
   同名 `@font-face` 盖过系统字体，日文界面下把这几个名字指到同平台的日文字体上，字体栈本身不动。 */
const FACES: readonly [family: string, regular: string[], bold: string[]][] = [
  ['PingFang SC', ['Hiragino Sans W3', 'HiraginoSans-W3'], ['Hiragino Sans W6', 'HiraginoSans-W6']],
  ['Microsoft YaHei UI', ['Yu Gothic UI', 'YuGothicUI-Regular'], ['Yu Gothic UI Bold', 'YuGothicUI-Bold']],
  ['Microsoft YaHei', ['Yu Gothic Medium', 'YuGothic-Medium', 'Meiryo'], ['Yu Gothic Bold', 'YuGothic-Bold', 'Meiryo Bold']],
];

const face = (family: string, names: string[], weight: string) =>
  `@font-face{font-family:"${family}";font-weight:${weight};src:${names.map((name) => `local("${name}")`).join(',')}}`;

function useJapaneseGlyphs(): void {
  const style = document.createElement('style');
  style.dataset.localeFonts = 'ja';
  style.textContent = FACES.map(([family, regular, bold]) => face(family, regular, '1 500') + face(family, bold, '600 1000')).join('');
  document.head.append(style);
}

let installed: UiLocale | null = null;

export function installUiLocale(): UiLocale {
  if (installed) return installed;
  installed = uiLocale();
  document.documentElement.lang = installed === 'ja' ? 'ja' : 'zh-CN';
  if (installed === 'ja') {
    useJapaneseGlyphs();
    active = createTranslator(ja as Record<string, string>);
    observeTranslations(document.documentElement, active);
  }
  return installed;
}
