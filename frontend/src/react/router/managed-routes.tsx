/* 由路由画的那几页：路径到首屏取数与整页的对照表，五张。
 *
 * `MANAGED_ROUTES` 是管理区那几页（画进 `#stats`），键是精确路径；`BROWSE_ROUTES` 是同样画进 `#stats`
 * 的播放列表页与关注页；`INDEX_ROUTES` 是索引页、`ENTITY_ROUTES` 是资料页（都画进 `#index`），资料页按模式登记
 * （`/performers/*`），种类与名字跟着打开走；`CATALOG_ROUTES` 是画进 `#grid` 的目录网格与垃圾队列，按页面
 * 分键。壳每次打开一页时交进来的 `open` 只带那一次才算得出的值（地址上的分类与页签、只读状态、引导标记、
 * 一次性预填、刷新代次），`#grid` 那两页是壳那一整份 props；回执与换到还归壳的那几屏走 `ShellActions`。
 * 管理区几页之间的跳转走 `go`：落在 `MANAGED_ROUTES` 上的交给 React Router 的 `navigate`，其余交壳。另外
 * 四张表的页面不走 `go`：它们在页内写地址一律由壳认领（`routeIndex`、资料页与关注页的 `actions.route`、
 * 目录的换筛选、垃圾队列的换分类），跨页也交壳，派发次数同壳自己打开。 */
import type { ReactElement } from 'react';

import { javDisplayName, javTitleHtml } from '@peach/legacy/jav-title';
import { tagLabel } from '@peach/legacy/tags';

import { ActivityPage } from '../activity/activity-page';
import { prefetchTasks } from '../activity/tasks';
import type { DataCleanupSection } from '../bundle';
import { prefetchCatalogGrid } from '../catalog-grid/catalog-grid';
import { CatalogGridPage } from '../catalog-grid/catalog-grid-page';
import { prefetchDataCleanup } from '../data-cleanup/data-cleanup';
import { DataCleanupPage } from '../data-cleanup/data-cleanup-page';
import { prefetchEntityPage, type EntityPageProps } from '../entity-page/entity-page';
import { EntityPage } from '../entity-page/entity-page-view';
import { prefetchDuplicates } from '../duplicates/duplicates';
import { DuplicatesPage } from '../duplicates/duplicates-page';
import { prefetchDiagnostics } from '../diagnostics/diagnostics';
import { DiagnosticsPage } from '../diagnostics/diagnostics-page';
import { prefetchFollowFeed } from '../follow-feed/follow-feed';
import { FollowFeedPage } from '../follow-feed/follow-feed-page';
import { prefetchFollowManage } from '../follow-manage/follow-manage';
import { FollowManagePage } from '../follow-manage/follow-manage-page';
import { prefetchIndex } from '../index/index-data';
import { IndexPage } from '../index/index-page';
import { JunkQueuePage } from '../junk-queue/junk-queue-page';
import { prefetchPlaylists } from '../playlists/playlists';
import { PlaylistsPage } from '../playlists/playlists-page';
import { prefetchQualityGoals } from '../quality-goals/quality-goals';
import { QualityGoalsPage } from '../quality-goals/quality-goals-page';
import { prefetchReview } from '../review/review';
import { ReviewPage } from '../review/review-page';
import { prefetchScraping } from '../scraping/scraping';
import { ScrapingPage } from '../scraping/scraping-page';
import { prefetchConfiguration } from '../settings/configuration';
import { ConfigurationPage } from '../settings/configuration-page';
import { prefetchStats } from '../stats/stats';
import { StatsPage } from '../stats/stats-page';
import { DEFAULT_WINDOW, prefetchTaste } from '../taste/taste';
import { TastePage } from '../taste/taste-page';
import type {
  BrowseOpenProps, BrowseRoutePath, CatalogOpenProps, CatalogPagePath, EntityRoutePath, IndexOpenProps,
  IndexOpenPropsTable, IndexRoutePath, ManagedOpenProps, ManagedPath, ShellActions,
} from './shell-actions';

interface ManagedRoute<P> {
  prefetch(open: P, signal: AbortSignal): Promise<void>;
  page(open: P, actions: ShellActions, go: (path: string) => void): ReactElement;
}

type ManagedRouteTable = { [Path in ManagedPath]: ManagedRoute<ManagedOpenProps[Path]> };
type BrowseRouteTable = { [Path in BrowseRoutePath]: ManagedRoute<BrowseOpenProps[Path]> };
type IndexRouteTable = { [Path in IndexRoutePath]: ManagedRoute<IndexOpenPropsTable[Path]> };
type EntityRouteTable = { [Path in EntityRoutePath]: ManagedRoute<EntityPageProps> };
type CatalogRouteTable = { [Path in CatalogPagePath]: ManagedRoute<CatalogOpenProps[Path]> };
/** 路由树画的全部页面：管理区那几页、播放列表页与关注页、索引页与资料页、目录网格。 */
export type RoutedPath = ManagedPath | BrowseRoutePath | IndexRoutePath | EntityRoutePath | CatalogPagePath;

/* 数据管理页读数卡的去处里，只有重复文件不按管理区身份找：它报的是数据管理的身份。 */
function openCleanupSection(section: DataCleanupSection, actions: ShellActions, go: (path: string) => void) {
  if (section === 'duplicates') { go('/duplicates'); return }
  const path = actions.managePath(section);
  if (isManagedPath(path)) go(path);
  else actions.openManage(section);
}

/* 第一帧在宿主放进 `#stats` 的同一个任务里同步画完（`router.tsx` 的 `ManagedSurface`）：壳画完这一页
 * 紧接着就读它画出来的结构（配置页按 `.configgroup` 小标题切页签，再按地址里的 `#peachProxy` 滚过去）。 */
export const MANAGED_ROUTES: ManagedRouteTable = {
  '/stats': {
    prefetch: (_open, signal) => prefetchStats(signal),
    /* 点一个内容标签是「回目录并按它筛选」，整页换成目录仍归壳。 */
    page: (open, actions, go) => (
      <StatsPage tagLabel={tagLabel} onTag={actions.openTag} configurable={open.configurable}
        openMediaSettings={() => { actions.requestConfigurationSection('媒体'); go('/configuration') }} />
    ),
  },
  '/taste': {
    /* 首屏取的是「全部时间」那一份：分析范围是组件状态，每次进这一页都从它开始。 */
    prefetch: (_open, signal) => prefetchTaste(DEFAULT_WINDOW, signal),
    /* 总结里的下一步动作按路径走（`taste_history.py` 给的），路由树里没有的交壳的路由表。 */
    page: (open, actions, go) => (
      <TastePage onSignal={actions.openTasteSignal} navigate={go} toast={(message) => actions.receipt(message)}
        onboarding={open.onboarding} />
    ),
  },
  /* ADR-0018 的确定项已由扫描与资料处理任务落库；复核页只读取剩下的判断题。 */
  '/review': {
    prefetch: (_open, signal) => prefetchReview(signal),
    page: (open, actions) => (
      <ReviewPage {...open} route={actions.routeReview} openItem={actions.openItem} openEntity={actions.openEntity}
        revealSource={actions.revealSource} toast={(message) => actions.receipt(message)} />
    ),
  },
  /* 首屏等顶上那排读数里自己的几份、两张后台任务卡与整理卡；复核、高清版与链接各读各的。 */
  '/data-cleanup': {
    prefetch: (_open, signal) => prefetchDataCleanup(signal),
    page: (_open, actions, go) => (
      <DataCleanupPage failure={actions.failure} open={(section) => openCleanupSection(section, actions, go)}
        toast={(message, { warning = false } = {}) => (
          warning ? actions.toast({ text: message }, { sound: 'warning' }) : actions.receipt(message))} />
    ),
  },
  '/duplicates': {
    prefetch: (_open, signal) => prefetchDuplicates(signal),
    page: (_open, actions) => (
      <DuplicatesPage openItem={actions.openItem} failure={actions.failure}
        toast={(message, { undo } = {}) => actions.receipt(message, undo ? { undo } : {})} />
    ),
  },
  '/quality-goals': {
    prefetch: (_open, signal) => prefetchQualityGoals(signal),
    page: (_open, actions, go) => (
      <QualityGoalsPage openItem={actions.openItem} javTitleHtml={javTitleHtml} javDisplayName={javDisplayName}
        searchResources={(prefill) => { actions.requestCloudDownload(prefill); go('/activity') }}
        srcBadge={actions.srcBadge} />
    ),
  },
  '/scraping': {
    prefetch: (_open, signal) => prefetchScraping(signal),
    page: (_open, actions) => <ScrapingPage toast={(message) => actions.toast(message)} />,
  },
  '/configuration': {
    prefetch: (_open, signal) => prefetchConfiguration(signal),
    page: (_open, actions) => (
      <ConfigurationPage receipt={(message) => actions.receipt(message)} reopenTutorial={actions.reopenTutorial} />
    ),
  },
  '/diagnostics': {
    prefetch: (_open, signal) => prefetchDiagnostics(signal),
    page: (_open, actions, go) => <DiagnosticsPage navigate={go} openItem={actions.openItem}
      receipt={message => actions.receipt(message)}
      configure={section => { actions.requestConfigurationSection(section); go('/configuration') }} />,
  },
  '/activity': {
    prefetch: (_open, signal) => prefetchTasks(signal),
    page: (open) => <ActivityPage {...(open.prefill ? { prefill: open.prefill } : {})} />,
  },
  /* 首屏只取来源清单与凭据状态，地址栏指着「订阅源」时连它一起取。检查更新与查找那两趟
     后台任务的快照不在首屏里：它们常年躺着上一趟的回执，等它们只会让首屏多一个往返。 */
  '/follow-manage': {
    prefetch: (open, signal) => prefetchFollowManage(signal, open.tab),
    page: (open, actions, go) => (
      <FollowManagePage {...open} route={actions.routeFollowManage} savePreference={actions.saveFollowPreference}
        toast={(message) => actions.receipt(message)} openFollow={actions.openFollow}
        cloudDownload={(prefill) => { actions.requestCloudDownload(prefill); go('/activity') }} />
    ),
  },
};

/** 管理区那几页之间的跳转判据：只认 `MANAGED_ROUTES` 的精确路径。索引页不算：它们换 search 要由壳
 *  认领，跨进来也是壳写地址再自己打开。 */
export const isManagedPath = (path: string): path is ManagedPath => Object.hasOwn(MANAGED_ROUTES, path);

/* 播放列表页：首屏每次都向服务端重取（首页刚存的 Mix 进来就要看得到）。停在这一页时壳要求重读，
   经 `updateManagedRoute` 把 `revision` 加一，页面只重取、不重挂。点开一份进舞台、翻页门槛与回执都归壳。
   关注页：首屏是列表第一页与凭据两趟并行，挂上就是最终样子；之后换筛选、换一批、选择模式与照片版式都由
   壳经 `updateManagedRoute` 推进来，页面按新键只重取列表、不重挂。 */
export const BROWSE_ROUTES: BrowseRouteTable = {
  '/playlists': {
    prefetch: (_open, signal) => prefetchPlaylists(signal),
    page: (open, actions) => (
      <PlaylistsPage revision={open.revision} openPlaylist={actions.openPlaylist} openEntity={actions.openEntity}
        canFlip={actions.canFlip} toast={(message, { undo } = {}) => actions.receipt(message, undo ? { undo } : {})} />
    ),
  },
  '/follow': {
    prefetch: (open, signal) => prefetchFollowFeed(open, signal),
    page: (open) => <FollowFeedPage {...open} />,
  },
};
const isBrowsePath = (path: string): path is BrowseRoutePath => Object.hasOwn(BROWSE_ROUTES, path);

/* 索引页：地址栏上的四项由壳从地址读出、跟着这一次打开交进来；页内换档经 `routeIndex` 由壳写地址并认领，
   不重挂（后退前进到同一页的另一份 search 时，壳照旧按地址重开一次）。首屏只取第一页。 */
const indexRoute: ManagedRoute<IndexOpenProps> = {
  prefetch: (open, signal) => prefetchIndex(open, signal),
  page: (open, actions) => (
    <IndexPage {...open} route={actions.routeIndex} savePreference={actions.savePeopleLayout}
      exitSelectMode={actions.exitSelectMode} personAvatar={actions.personAvatar} authorAvatar={actions.authorAvatar}
      tagLabel={tagLabel} openEntity={actions.openEntity} showTags={actions.showIndexTags}
      openFollowAuthor={actions.openFollowAuthor} openFollowTag={actions.openFollowTag} />
  ),
};
export const INDEX_ROUTES: IndexRouteTable = {
  '/performers': indexRoute, '/creators': indexRoute, '/studios': indexRoute, '/agencies': indexRoute, '/tags': indexRoute,
};

/* 资料页：资料卡、筛选浮层、新作那一行与正文是同一页的四块。框架由壳排好（`openManagedRoute` 的
   `place`），页面画进资料卡那一格，再经 portal 画进另外三块。首屏把资料（连同新作与头几张封面）、
   作品第一页与照片取齐再画；换头像的候选不在首屏里，资料页每进一次就打一遍图库的话，多数时候没人
   点开它。壳交进来的筛选、视图与展示设置之后经 `updateManagedRoute` 推进来，页面按新键重取、不重挂。卡片与
   遗留层拼的 HTML（头像、新作那一行、源文件键）都是壳的那一份，跟着打开走。 */
const entityRoute: ManagedRoute<EntityPageProps> = {
  prefetch: (open) => prefetchEntityPage(open),
  page: (open) => <EntityPage {...open} />,
};
export const ENTITY_ROUTES: EntityRouteTable = {
  '/performers/*': entityRoute, '/studios/*': entityRoute, '/creators/*': entityRoute, '/series/*': entityRoute,
  '/agencies/*': entityRoute,
};

/* 画进 `#grid` 的两页。目录网格：首页、四个筛选态里除垃圾文件外的三个，和回收站，画的都是这一张网格，
   筛选是壳那一份 `state`；垃圾队列：垃圾文件那一屏，分类与视图只从地址读。表按页面分键：壳用 `/` 打开
   网格、用 `/junk-files` 打开队列，槽里记的路径说的是画着哪一页、不是地址。按地址分键会在三处出错：网格在
   `/trash` 打开之后去 `/` 是就地推，槽里的路径不跟着变；`?state=ads` 落在 `/` 上，画的是垃圾队列；冷启动
   落在详情地址上时，网格在 `/item/:id` 底下补画。
   网格首屏取第一页再画；队列不在打开前等，画上就铺自己那份骨架（`junk-queue-page.tsx` 开头）。之后换
   筛选或分类、换版式、选择模式与刷新代次都由壳经 `updateManagedRoute` 推进来，页面按新键重取、自己铺
   骨架，不重挂。 */
export const CATALOG_ROUTES: CatalogRouteTable = {
  '/': {
    prefetch: (open, signal) => prefetchCatalogGrid(open, signal),
    page: (open) => <CatalogGridPage {...open} />,
  },
  '/junk-files': {
    prefetch: async () => {},
    page: (open) => <JunkQueuePage {...open} />,
  },
};
const isCatalogPage = (path: string): path is CatalogPagePath => Object.hasOwn(CATALOG_ROUTES, path);
/** 画着 `#grid` 那两页时地址可能落在的路径：首页、三个筛选态、回收站与垃圾文件。只进 `<Routes>` 的声明，
 *  不当槽里的键。 */
export const CATALOG_PATHS = ['/', '/unseen', '/watch-later', '/flagged', '/trash', '/junk-files'] as const;

/** `<Routes>` 声明的路径：前四张表的键，加上 `#grid` 那两页画着时地址可能落在的路径。 */
export const ROUTED_PATHS: readonly string[] = [
  ...Object.keys(MANAGED_ROUTES), ...Object.keys(BROWSE_ROUTES), ...Object.keys(INDEX_ROUTES),
  ...Object.keys(ENTITY_ROUTES), ...CATALOG_PATHS,
];
/** 路由树画得了这一页吗：首屏取数与画页按槽里记的路径查，`#grid` 那两页只认页面键。 */
export const isRoutedPath = (path: string): path is RoutedPath => (
  isManagedPath(path) || isBrowsePath(path) || Object.hasOwn(INDEX_ROUTES, path) || Object.hasOwn(ENTITY_ROUTES, path)
  || isCatalogPage(path));

function routeOf(path: RoutedPath): ManagedRoute<object> {
  if (isManagedPath(path)) return MANAGED_ROUTES[path] as ManagedRoute<object>;
  if (isBrowsePath(path)) return BROWSE_ROUTES[path] as ManagedRoute<object>;
  if (isCatalogPage(path)) return CATALOG_ROUTES[path] as ManagedRoute<object>;
  if (Object.hasOwn(INDEX_ROUTES, path)) return INDEX_ROUTES[path as IndexRoutePath] as ManagedRoute<object>;
  return ENTITY_ROUTES[path as EntityRoutePath] as ManagedRoute<object>;
}

/** 首屏取数（`openManagedRoute` 经 `connectManagedRoutes` 调它）。 */
export function prefetchManagedRoute(path: string, open: object, signal: AbortSignal): Promise<void> {
  if (!isRoutedPath(path)) return Promise.reject(new Error(`路由树里没有这一页：${path}`));
  return routeOf(path).prefetch(open, signal);
}

/** 画这一页。 */
export function managedPage(path: RoutedPath, open: object, actions: ShellActions, go: (path: string) => void) {
  return routeOf(path).page(open, actions, go);
}
