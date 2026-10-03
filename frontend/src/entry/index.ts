/* `web/dist/peach-entry.js` 的构建入口（`vite.entry.config.ts`），不带 React。
 *
 * 读者是主界面的 `/js/ui-components.js`：它把这里的全部导出原名转出，壳与 React 子树经 `@peach/legacy/ui`
 * 读到的也是这一份。锚定菜单的「同一时刻只开一张」、折叠的开合代际都是模块级状态，只能有一份。
 *
 * 字形、转义与界面音效仍是 `/js/core.js`、`/js/ui-sounds.js` 那一份，构建时外置。 */
export { attachOverlayScrollbar } from '../ui-kit/overlay-scrollbar';
export { growCollapse, setCollapseOpen, wireCollapse } from '../ui-kit/collapse';
export {
  closeAnchoredMenu, dismissMenu, presentMenu, scrollMovesAnchor, wireAnchoredMenu,
} from '../ui-kit/anchored-menu';
export { selectFieldHtml, selectOptionIconHtml, wireSelectField } from '../ui-kit/select-field';
export type { SelectField, SelectOption } from '../ui-kit/select-field';
export { MEDIA_SOURCE_ICONS } from '../ui-kit/media-source-icons';
