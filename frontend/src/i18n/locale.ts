/* 界面语言：这台浏览器选的是哪一种（`peach.locale`）。
 *
 * 源码里的界面文字只写中文；选了日文时由 `translate.ts` 在渲染出来的 DOM 上换成译文。偏好只有三档：
 * `auto` 跟随浏览器的语言列表，取列表里最先出现的中文或日文；两样都没有时用中文。 */
export type UiLocale = 'zh' | 'ja';
export type LocalePreference = 'auto' | UiLocale;

export const LOCALE_KEY = 'peach.locale';

export function localePreference(): LocalePreference {
  try {
    const value = localStorage.getItem(LOCALE_KEY);
    return value === 'zh' || value === 'ja' ? value : 'auto';
  } catch {
    return 'auto';
  }
}

export function resolveLocale(preference: LocalePreference, languages: readonly string[] = navigator.languages ?? []): UiLocale {
  if (preference !== 'auto') return preference;
  const first = languages.map((language) => language.toLowerCase()).find((language) => /^(?:zh|ja)\b/.test(language));
  return first?.startsWith('ja') ? 'ja' : 'zh';
}

export const uiLocale = (): UiLocale => resolveLocale(localePreference());

/** 记下偏好。翻译层只在页面启动时接上，调用方随后整页重载。 */
export function setLocalePreference(preference: LocalePreference): void {
  try {
    if (preference === 'auto') localStorage.removeItem(LOCALE_KEY);
    else localStorage.setItem(LOCALE_KEY, preference);
  } catch { /* 存储不可用时本次会话仍按浏览器语言 */ }
}
