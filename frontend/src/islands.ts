/* `web/dist/peach-ui.js` 的构建入口：遗留壳（`web/app.js`）从这里取它要用的一切（ADR-0031）。
 *
 * 页面与页面里的附属面由路由树画，壳经 `@peach/history` 的 `openManagedRoute`、`updateManagedRoute` 与
 * `releaseManagedRoute` 下令（`history/managed.ts`）；常驻层各有一个 `loadXxx(host)` 命令式入口，已收进
 * 常驻表的那几座由入口在路由树里打开（`openResidentSurface`）；其余导出是壳仍在用的助手。 */
export {
  defaultSortDir, JAV_RELEASE_SORT, nextSortState, preferredDirection, SORT_ALIASES, SORT_DIR_WORDS, SORT_KEYS, SORTS, sortDirWord,
} from './sort-preferences';
export * from './appearance';
export * from './query';
export * from './history';
export * from './shell';
export { registerDiagnosticsRoute } from './diagnostics-route';
export { initBoardControls, syncBoardRange } from './board-controls';
export { transitionTheme } from './theme-transition';
export { sidebarSkeletonHtml } from './sidebar-skeleton';
export { manageHeaderSkeletonHtml, manageHeaderView } from './manage-header';

import type * as ReactBundle from '@peach/react';
import { connectManagedRoutes, openResidentSurface, preloadManagedRoutes } from './history';

export { watchJob, followJobProgress, jobActivityHtml } from './jobs';
export { selectRange, selectionSummary, selectGroup, syncSelectionToolbar } from './selection';
export { paginationHtml, pageCount, clampPage } from './pagination';
export * from './card-art';
export { entitySkeletonHtml } from './entity-skeleton';
export { boardPageSkeleton, detailSkeletonHtml } from './board-skeleton';
export { catalogSuggestions, catalogEmptyHtml } from './catalog-onboarding';
export { catalogFilterSkeletonHtml } from './catalog-filter-skeleton';
export { dropBars, fetchBars, fetchTopsPage } from './catalog-bars';
export { DEFAULT_SIDEBAR_ORDER, normalizeSidebarOrder, sidebarTagCounts, sidebarHasCatalogContent } from './sidebar';
export { cleanupSkeletonHtml } from './management';
export { junkCountSkeletonHtml, junkPath, junkRoute } from './junk-queue';

/* 全站 Toast 的入口（Sonner，在 `@peach/react` 里）。第一条回执发出时才装载 React 包、挂上
 * Toaster：目录页本来就装载着它，别的页面不为一条还没发生的回执付首屏的代价。所有调用排在
 * 同一个 Promise 后面，按调用顺序执行，同一条回执的「发出」和「改写」不会颠倒。 */
let toaster: Promise<typeof ReactBundle> | null = null;
export function showToast(
  host: Element, icons: ReactBundle.ToastIcons, id: string, request: ReactBundle.ToastRequest,
): void {
  toaster ??= import('@peach/react').then((bundle) => { bundle.mountToaster(host, icons); return bundle });
  void toaster.then((bundle) => bundle.showToast(id, request));
}

export { javImageKind, normalizeJavImage, normalizeJavLayout, normalizeJavPreferences, panelFrame, relayoutJavImages, syncJavImages } from './jav-artwork';

/* 舞台岛（`react/stage/`）：详情浮窗、两座详情、播放器与小窗都在 `@peach/react` 里，壳只拿命令式
 * 入口。第一次打开详情时才装载 React 包、接上宿主；之后 `stageApi()` 同步可取，包还没装载时是
 * null——那时舞台必然没开，小窗也不在。 */
let stage: Promise<ReactBundle.StageApi> | null = null;
let stageReady: ReactBundle.StageApi | null = null;
export function loadStage(host: ReactBundle.StageHost): Promise<ReactBundle.StageApi> {
  stage ??= import('@peach/react').then((bundle) => { stageReady = bundle.configureStage(host); return stageReady });
  return stage;
}
export const stageApi = (): ReactBundle.StageApi | null => stageReady;

/* 设置面板（`react/settings-panel/`，常驻面 `settings-panel`）：只交命令式入口。第一次按齿轮时才装载 React 包，
 * 建宿主 `[data-settings-host]`，路由树打开这一面时由 `place` 把它放进 body 末尾、在同一个任务里画出收着的面板；
 * 画上之后句柄才交出去：从那一刻起 `settingsPanelApi()` 同步可取，`open` 返回时面板已经画好。句柄还没交出时
 * 它返回 null——那时面板必然没开过。 */
let settingsPanel: Promise<ReactBundle.SettingsPanelApi> | null = null;
let settingsPanelReady: ReactBundle.SettingsPanelApi | null = null;
export function loadSettingsPanel(host: ReactBundle.SettingsPanelHost): Promise<ReactBundle.SettingsPanelApi> {
  settingsPanel ??= import('@peach/react').then(async (bundle) => {
    const api = bundle.configureSettingsPanel(host);
    const root = document.createElement('div');
    root.dataset.settingsHost = '';
    await openResidentSurface('settings-panel', root, (node) => { document.body.append(node); return node });
    settingsPanelReady = api;
    return api;
  });
  return settingsPanel;
}
export const settingsPanelApi = (): ReactBundle.SettingsPanelApi | null => settingsPanelReady;

/* 沉浸模式（`react/immerse/`，常驻面 `immerse`）：全屏连播、每一格的播放器、手势与动作键都在 `@peach/react`
 * 里，壳只拿命令式入口。第一次打开沉浸模式时才装载 React 包，建好宿主 `[data-immerse-host]`、在路由树里打开
 * 这一面：宿主在画首帧（藏着的外框）的同一个任务里挂到 body 末尾，画上之后句柄才交出去。从那一刻起
 * `immerseApi()` 同步可取；包还没装载时是 null——那时沉浸模式必然没开。 */
let immerse: Promise<ReactBundle.ImmerseApi> | null = null;
let immerseReady: ReactBundle.ImmerseApi | null = null;
export function loadImmerse(host: ReactBundle.ImmerseHost): Promise<ReactBundle.ImmerseApi> {
  immerse ??= import('@peach/react').then(async (bundle) => {
    const api = bundle.configureImmerse(host);
    const container = document.createElement('div');
    container.dataset.immerseHost = '';
    await openResidentSurface('immerse', container, (node) => { document.body.append(node); return node });
    immerseReady = api;
    return api;
  });
  return immerse;
}
export const immerseApi = (): ReactBundle.ImmerseApi | null => immerseReady;

/* 侧栏岛（`react/sidebar/`）：导航那一列、它上面的玻璃与按语境出现的筛选分组都在 `@peach/react` 里，
 * 壳只拿命令式入口。壳启动时就装载、接上宿主——在那之前滚动层里是壳同步写进去的导航骨架
 * （`sidebarSkeletonHtml`）；之后 `sidebarApi()` 同步可取，包还没装载时是 null。 */
let sidebar: Promise<ReactBundle.SidebarApi> | null = null;
let sidebarReady: ReactBundle.SidebarApi | null = null;
export function loadSidebar(host: ReactBundle.SidebarHost): Promise<ReactBundle.SidebarApi> {
  sidebar ??= import('@peach/react').then((bundle) => { sidebarReady = bundle.configureSidebar(host); return sidebarReady });
  return sidebar;
}
export const sidebarApi = (): ReactBundle.SidebarApi | null => sidebarReady;

/* 管理区页头（`react/manage-header/`，常驻面 `manage-header`）：管理条、面包屑、页面标题与回收站说明行。
 * 壳启动时就装载——在那之前宿主里是壳同步写进去的骨架（`manageHeaderSkeletonHtml`），骨架上的点击由壳接。
 * 路由树打开这一面时在画首帧的同一个任务里清掉骨架，画上之后句柄才交出去：从那一刻起 `manageHeaderApi()` 同步可取、
 * `render` 返回时已经画好；句柄还没交出时它返回 null。 */
let manageHeader: Promise<ReactBundle.ManageHeaderApi> | null = null;
let manageHeaderReady: ReactBundle.ManageHeaderApi | null = null;
export function loadManageHeader(host: ReactBundle.ManageHeaderHost): Promise<ReactBundle.ManageHeaderApi> {
  manageHeader ??= import('@peach/react').then(async (bundle) => {
    const api = bundle.configureManageHeader(host);
    await openResidentSurface('manage-header', host.root, (root) => { root.replaceChildren(); return root });
    manageHeaderReady = api;
    return api;
  });
  return manageHeader;
}
export const manageHeaderApi = (): ReactBundle.ManageHeaderApi | null => manageHeaderReady;

/* 批量条（`react/batch-dock/`，常驻面 `batch-dock`）：多选时底部那块浮条。壳启动时就装载，路由树画上
 * 这一面之后句柄才交出去：之后 `batchDockApi()` 同步可取、`render` 返回时已经画好；包回来之前选中的，
 * 壳在接上时把手上那份 props 补推一次。 */
let batchDock: Promise<ReactBundle.BatchDockApi> | null = null;
let batchDockReady: ReactBundle.BatchDockApi | null = null;
export function loadBatchDock(host: ReactBundle.BatchDockHost): Promise<ReactBundle.BatchDockApi> {
  batchDock ??= import('@peach/react').then(async (bundle) => {
    const api = bundle.configureBatchDock(host);
    await openResidentSurface('batch-dock', host.root);
    batchDockReady = api;
    return api;
  });
  return batchDock;
}
export const batchDockApi = (): ReactBundle.BatchDockApi | null => batchDockReady;

/* 侧栏配色卡（`react/glow-picker/`，常驻面 `glow-picker`）：侧栏底部那枚配色钮点开的那张卡。卡的外壳由壳
 * 建、由壳锚定与开合，壳启动时装载、由路由树把内容画进去；钮上那两枚小圆壳当场就画（`wireGlowButton`），
 * 不等这一份。 */
let glowPicker: Promise<void> | null = null;
export function loadGlowPicker(host: ReactBundle.GlowPickerHost): Promise<void> {
  glowPicker ??= import('@peach/react').then(async (bundle) => {
    bundle.configureGlowPicker(host);
    await openResidentSurface('glow-picker', host.root);
  });
  return glowPicker;
}

/* 客户端导航（`react/router/`）：React Router 接管全站那一份历史，后退前进由它派发给壳；管理区、索引页与资料页由它画
 * （`openManagedRoute`）。壳启动时装载、交进自己的能力，跟侧栏共用同一次 `@peach/react` 请求；包到之前的
 * 后退前进等它挂上时补派，包到之前打开的那一页等它到了再取数。包取不回来时，等着的那一页跟着失败。
 * 壳在装载之前就打开的附属面（搜索下拉、首屏骨架里的筛选条）当场发出包的请求，跟这里是同一个模块。 */
let router: Promise<void> | null = null;
// 装载失败由 `loadRouter` 那一份报出，等着的打开跟着它失败；这里只管提早发出请求。
preloadManagedRoutes(() => { import('@peach/react').catch(() => {}) });
export function loadRouter(actions: ReactBundle.ShellActions): Promise<void> {
  if (!router) {
    const bundle = import('@peach/react').then((loaded) => { loaded.configureRouter(actions); return loaded });
    connectManagedRoutes(bundle.then((loaded) => loaded.prefetchManagedRoute));
    router = bundle.then(() => undefined);
  }
  return router;
}

/* 壳的播放快捷键用到的播放器件（`frontend/src/player/`）：控件点击、切换播放与快进快退都不带模块
 * 状态。详情播放器、宿主与右键菜单带状态，只在舞台岛那一份产物里用。 */
export { clickPlayerControl, seekVideoBy, toggleVideoPlayback } from './player';
