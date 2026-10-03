/* 页面包里 `@peach/legacy/ui` 的落点（`vite.pages.config.ts` 的别名）。
 *
 * 主界面里这个名字是 `/js/ui-components.js`，它从入口包原名转出 `src/ui-kit/` 的共用控件。独立页面
 * 不加载遗留层，共用件读到的这几样直接取同一份源码；少导出一个，构建就会报缺名。 */
export { setCollapseOpen } from '../../ui-kit/collapse';
export { MEDIA_SOURCE_ICONS } from '../../ui-kit/media-source-icons';
