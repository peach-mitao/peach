/* `web/dist/peach-entry.js` 的构建入口（`vite.entry.config.ts`），不带 React，也没有外部 import。
 *
 * 浏览器里这些模块的唯一主人：`/js/core.js`、`/js/tags.js`、`/js/jav-title.js`、`/js/ui-sounds.js`、
 * `/js/middle-truncate.js`、`/js/ui-components.js` 是只从这里原名转出的垫片；壳与 React 子树经 `@peach/legacy/*`
 * 读到的也是这一份。锚定菜单的「同一时刻只开一张」、折叠的开合代际、确认框的标题序号、计数徽标的上一次读数、
 * 教程的请求代际、音效开关与中段截断的全文档观察者都是模块级状态，`LOC`、`fmtDur` 是语义契约，都只能有一份。 */
export {
  $, seededRank, newSeed, DURATION_TAGS, cleanTagFilter, realDuration, icon, api, isAbort, mapLimit, STATE_ROUTES, ROUTE_STATES, STATE_LABELS, isCatalogPath,
  ENTITY_ROUTES, ROUTE_ENTITIES, entityPath, esc, brandIcon, siteName, linkMarkUrl, siteMarkUrl, foldName,
  officialLinkText, fmtDur, fmtClock, fmtSize, firstGrapheme, leadingGraphemes, clipGraphemes, LOC, requestErrorMessage,
} from '../core';
export { TAG_DISPLAY_NAMES, tagLabel } from '../core/tags';
export {
  javFileDisplayName, hasJapaneseText, javPreferredTitle, javTitleParts, javDisplayName, javTitleHtml,
} from '../core/jav-title';
export type { JavTitleSource } from '../core/jav-title';
export { UI_SOUNDS, setUiSoundsEnabled, uiSoundsEnabled, playUiSound, wireUiSounds } from '../ui-kit/sounds';
export { initMiddleTruncate, middleTruncateText } from '../ui-kit/middle-truncate';
// `/js/ui-components.js` 那份清单整份转出，名字只在 `../ui-kit/index.ts` 列一次。
export * from '../ui-kit';
export type { SelectField, SelectOption } from '../ui-kit/select-field';
