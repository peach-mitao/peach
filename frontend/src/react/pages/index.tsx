/* 独立页面包的构建入口（`web/dist/peach-pages.js`）。
 *
 * 服务端给的薄壳里只有一个挂载点 `#peach-page`，`data-page` 说是哪一页。这份产物不依赖主界面的
 * 任何模块：不读 `/js/` 下的遗留层，不带 Query 缓存，共用控件（折叠、整页滚动条、来源站标）由
 * `vite.pages.config.ts` 直接打进来。弹出层落在 body 上，body 本身就是 `.peach-react` 容器。 */
import './pages.css';

import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

import { attachOverlayScrollbar } from '../../ui-kit/overlay-scrollbar';
import { SetupPage } from './setup/setup-page';

const PAGES: Readonly<Record<string, ComponentType>> = { setup: SetupPage };

const mount = document.getElementById('peach-page');
const Page = mount ? PAGES[mount.dataset.page ?? ''] : undefined;
if (mount && Page) {
  attachOverlayScrollbar(document.documentElement, { variant: 'page' });
  createRoot(mount).render(<Page />);
}
