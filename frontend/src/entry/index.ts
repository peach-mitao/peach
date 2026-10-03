/* `web/dist/peach-entry.js` 的构建入口（`vite.entry.config.ts`），不带 React，也没有外部 import。
 *
 * 浏览器里这些模块的唯一主人：`/js/core.js`、`/js/tags.js`、`/js/jav-title.js`、`/js/ui-sounds.js`、
 * `/js/middle-truncate.js` 是只从这里原名转出的垫片，`/js/ui-components.js` 转出共用控件；壳与 React 子树经
 * `@peach/legacy/*` 读到的也是这一份。锚定菜单的「同一时刻只开一张」、折叠的开合代际、音效开关与中段截断的
 * 全文档观察者都是模块级状态，`LOC`、`fmtDur` 是语义契约，都只能有一份。 */
export {
  $, seededRank, realDuration, icon, api, isAbort, mapLimit, STATE_ROUTES, ROUTE_STATES, STATE_LABELS, isCatalogPath,
  ENTITY_ROUTES, ROUTE_ENTITIES, entityPath, esc, brandIcon, siteName, linkMarkUrl, siteMarkUrl, foldName,
  officialLinkText, fmtDur, fmtClock, fmtSize, LOC, requestErrorMessage,
} from '../core';
export { TAG_DISPLAY_NAMES, tagLabel } from '../core/tags';
export {
  javFileDisplayName, hasJapaneseText, javPreferredTitle, javTitleParts, javDisplayName, javTitleHtml,
} from '../core/jav-title';
export type { JavTitleSource } from '../core/jav-title';
export { UI_SOUNDS, setUiSoundsEnabled, uiSoundsEnabled, playUiSound, wireUiSounds } from '../ui-kit/sounds';
export { initMiddleTruncate, middleTruncateText } from '../ui-kit/middle-truncate';
export { attachOverlayScrollbar } from '../ui-kit/overlay-scrollbar';
export { growCollapse, setCollapseOpen, wireCollapse } from '../ui-kit/collapse';
export {
  closeAnchoredMenu, dismissMenu, presentMenu, scrollMovesAnchor, wireAnchoredMenu,
} from '../ui-kit/anchored-menu';
export { selectFieldHtml, selectOptionIconHtml, wireSelectField } from '../ui-kit/select-field';
export type { SelectField, SelectOption } from '../ui-kit/select-field';
export { MEDIA_SOURCE_ICONS } from '../ui-kit/media-source-icons';
