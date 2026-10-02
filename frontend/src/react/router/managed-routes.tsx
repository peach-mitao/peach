/* 管理区由路由画的那几页：路径到首屏取数与整页的对照表。
 *
 * 壳每次打开一页时交进来的 `open` 只带那一次才算得出的值（地址上的分类与页签、只读状态、引导标记、
 * 一次性预填）；回执与换到还归壳的那几屏走 `ShellActions`。这几页之间的跳转走 `go`：路由树里有的
 * 路径交给 React Router 的 `navigate`，其余交壳。 */
import type { ReactElement } from 'react';

import { javDisplayName, javTitleHtml } from '@peach/legacy/jav-title';
import { tagLabel } from '@peach/legacy/tags';

import { ActivityPage } from '../activity/activity-page';
import { prefetchTasks } from '../activity/tasks';
import type { DataCleanupSection } from '../bundle';
import { prefetchDataCleanup } from '../data-cleanup/data-cleanup';
import { DataCleanupPage } from '../data-cleanup/data-cleanup-page';
import { prefetchDuplicates } from '../duplicates/duplicates';
import { DuplicatesPage } from '../duplicates/duplicates-page';
import { prefetchFollowManage } from '../follow-manage/follow-manage';
import { FollowManagePage } from '../follow-manage/follow-manage-page';
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
import type { ManagedOpenProps, ManagedPath, ShellActions } from './shell-actions';

interface ManagedRoute<P> {
  prefetch(open: P, signal: AbortSignal): Promise<void>;
  page(open: P, actions: ShellActions, go: (path: string) => void): ReactElement;
}

type ManagedRouteTable = { [Path in ManagedPath]: ManagedRoute<ManagedOpenProps[Path]> };

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
    page: (_open, actions) => (
      <QualityGoalsPage openItem={actions.openItem} javTitleHtml={javTitleHtml} javDisplayName={javDisplayName}
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

export const isManagedPath = (path: string): path is ManagedPath => Object.hasOwn(MANAGED_ROUTES, path);

/** 首屏取数（`openManagedRoute` 经 `connectManagedRoutes` 调它）。 */
export function prefetchManagedRoute(path: string, open: object, signal: AbortSignal): Promise<void> {
  if (!isManagedPath(path)) return Promise.reject(new Error(`路由树里没有这一页：${path}`));
  const route = MANAGED_ROUTES[path] as ManagedRoute<object>;
  return route.prefetch(open, signal);
}

/** 画这一页。 */
export function managedPage(path: ManagedPath, open: object, actions: ShellActions, go: (path: string) => void) {
  const route = MANAGED_ROUTES[path] as ManagedRoute<object>;
  return route.page(open, actions, go);
}
