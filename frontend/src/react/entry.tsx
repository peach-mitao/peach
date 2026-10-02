/* React 子树的构建入口（`web/dist/peach-react.js`），按 `bundle.d.ts` 的签名导出挂载函数。 */
import './styles.css';

import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

import type * as Bundle from './bundle';
import { prefetchCatalogGrid } from './catalog-grid/catalog-grid';
import { CatalogGridPage } from './catalog-grid/catalog-grid-page';
import { CatalogFilterPage } from './catalog-filter/catalog-filter-page';
import { SearchPage } from './search/search-page';
import { prefetchFeedNew } from './feed-new/feed-new';
import { FeedNewPage } from './feed-new/feed-new-page';
import { JunkQueuePage } from './junk-queue/junk-queue-page';
import { prefetchLibraryProcessing } from './library-processing/library-processing';
import { LibraryProcessingCard } from './library-processing/library-processing-card';
import { LibraryProcessingNotice } from './library-processing/library-processing-notice';
import { Providers } from './providers';

export { configureBatchDock } from './batch-dock/batch-dock-island';
export { configureGlowPicker } from './glow-picker/glow-picker-island';
export { configureImmerse } from './immerse/immerse-island';
export { configureManageHeader } from './manage-header/manage-header-island';
export { prefetchManagedRoute } from './router/managed-routes';
export { configureRouter } from './router/router';
export { configureSettingsPanel } from './settings-panel/settings-panel';
export { configureSidebar } from './sidebar/sidebar-island';
export { configureStage } from './stage/stage';
export { mountToaster, showToast } from './toaster';

/* 第一帧用 `flushSync` 同步落到 DOM 上：遗留壳挂完这一页紧接着就读它画出来的结构，而
 * `root.render` 自己是排进下一次渲染的；骨架已经清掉，晚一帧画就是一帧空白。往后的
 * `update` 照常异步。共享缓存、减弱动效与弹出层容器见 `providers.tsx`。 */
function mounter<P extends object>(Component: ComponentType<P>) {
  return (el: Element, props: P): Bundle.ReactMount<P> => {
    const root = createRoot(el);
    const paint = (next: P) => root.render(<Providers><Component {...next} /></Providers>);
    flushSync(() => paint(props));
    return { update: paint, unmount: () => root.unmount() };
  };
}

/* 扫描与采集一个名字两种形态：数据管理页那张卡片，和目录页顶上那条横幅。两边读同一个
 * `queryKey`，所以同时挂着时它们看的是同一份快照，Query 也只发一份轮询。 */
const LibraryProcessing = (props: Bundle.LibraryProcessingProps) => (
  props.mode === 'notice' ? <LibraryProcessingNotice {...props} /> : <LibraryProcessingCard {...props} />
);

/** 整页归 React 的那些页面，按名字给遗留层用。 */
export const pages: Bundle.ReactPages = {
  'catalog-grid': { prefetch: prefetchCatalogGrid, mount: mounter(CatalogGridPage) },
  'catalog-filter': { prefetch: async () => {}, mount: mounter(CatalogFilterPage) },
  /* 首页那一行新作：骨架还占着就连头几张封面一起等，再一次换掉。 */
  'feed-new': { prefetch: prefetchFeedNew, mount: mounter(FeedNewPage) },
  /* 分类条由地址决定、挂上就画得出最终样子，等的只有读数：首屏不在这里等，由页面自己的
     查询驱动等待态（`junk-queue-page.tsx` 开头）。 */
  'junk-queue': { prefetch: async () => {}, mount: mounter(JunkQueuePage) },
  'library-processing': {
    prefetch: (_props, signal) => prefetchLibraryProcessing(signal),
    mount: mounter(LibraryProcessing),
  },
  /* 输入框是壳的，岛只接它的事件、画下拉栏里的内容；记录与推荐聚焦时才取。 */
  search: { prefetch: async () => {}, mount: mounter(SearchPage) },
};
