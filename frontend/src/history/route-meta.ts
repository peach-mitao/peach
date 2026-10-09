/* 路由树那一侧的路由元数据（ADR-0031「React Router 外壳阶段接管」）：标题、侧栏键、管理区身份与「换一批」的
 * 行为，按精确路径登记。壳的读者（标题、侧栏高亮与跳转、管理区身份、换一批）先查这里，没有再回落到壳的
 * `ROUTES` 表；一条路径只在一边登记。
 *
 * 放在 `@peach/history` 而不随 `managed-routes.tsx` 进 React 包：壳启动时就要读（冷启动的管理区页头、
 * 第一次派发的标题），那时 React 包可能还没到。路由树经 `@peach/history` 读的也是这一份。
 *
 * 字段同壳的 `ROUTES` 表：`title` 是 document.title 用的标签；`nav` 是侧栏 `data-nav` 的键；`section` 是管理区
 * 身份，同一身份按登记顺序取第一条作入口（数据管理排在重复文件与来源和凭证前面）；`refresh` 是列表栏
 * 「换一批」在这一页的行为，`reopen` 重开自己、`skip` 不参与，不写则回统计页；`reload` 是批量写回之后的就地
 * 重取，`reopen` 让这一页按当前地址从头重开（索引页与资料页）。
 *
 * 资料页按模式登记（`/performers/*`，同 `ENTITY_ROUTES`），标题是地址上的名字。`routeMetaOf` 先查精确路径，
 * 没有再按去掉空段之后的各段找：只剩一段查那一段的精确路径（`/performers/`），多于一段按第一段找模式，名字是
 * 剩下各段连起来的那一串（读者交进来的是解码过的路径），同壳的 `matchPath`。 */

export interface RouteMeta {
  readonly title?: string;
  readonly nav?: string;
  readonly section?: string;
  readonly refresh?: 'reopen' | 'skip';
  readonly reload?: 'reopen';
}

export const ROUTE_META: Readonly<Record<string, RouteMeta>> = {
  '/stats': { section: 'stats', title: '统计' },
  '/taste': { section: 'taste', title: '口味', refresh: 'reopen' },
  '/review': { section: 'review', title: '人工复核', refresh: 'reopen' },
  '/data-cleanup': { section: 'cleanup', title: '数据管理' },
  '/duplicates': { section: 'cleanup', title: '重复文件', refresh: 'reopen' },
  '/quality-goals': { section: 'quality', title: '高清版', refresh: 'reopen' },
  '/scraping': { section: 'cleanup', title: '来源和凭证', refresh: 'reopen' },
  '/follow-manage': { section: 'follow', title: '关注管理', refresh: 'skip' },
  '/configuration': { section: 'configuration', title: '配置', refresh: 'reopen' },
  '/activity': { section: 'activity', title: '活动', refresh: 'reopen' },
  '/diagnostics': { section: 'configuration', title: '系统诊断', refresh: 'reopen' },
  // 旧直达地址，改写到数据管理页的锚点，没有自己的管理身份。
  '/resource-sync': { title: '数据管理' },
  '/performers': { nav: 'performers', title: '艺人', reload: 'reopen' },
  '/creators': { title: '卖家', reload: 'reopen' },
  '/studios': { nav: 'studios', title: '厂牌', reload: 'reopen' },
  '/agencies': { title: '事务所', reload: 'reopen' },
  '/tags': { nav: 'tags', title: '标签', reload: 'reopen' },
  '/performers/*': { reload: 'reopen' },
  '/studios/*': { reload: 'reopen' },
  '/creators/*': { reload: 'reopen' },
  '/series/*': { reload: 'reopen' },
  '/agencies/*': { reload: 'reopen' },
  '/playlists': { nav: 'playlists', title: '播放列表', refresh: 'reopen' },
  // 关注页重画要联网取一遍卡面，「换一批」只由页面自己的按钮触发。
  '/follow': { nav: 'follow', title: '关注', refresh: 'skip' },
  // 目录：首页与回收站没有自己的标签，三个筛选态与垃圾文件的侧栏键与标签同 `STATE_ROUTES`、`STATE_LABELS`。
  '/': {},
  '/unseen': { nav: 'fresh', title: '没看过' },
  '/watch-later': { nav: 'later', title: '稍后看' },
  '/flagged': { nav: 'flagged', title: '已标记' },
  '/junk-files': { nav: 'ads', title: '垃圾文件' },
  '/trash': { section: 'trash' },
};

/** 这条路径在路由树一侧登记的元数据；没登记是 `null`，由壳回落到自己的表。 */
export function routeMetaOf(path: string): RouteMeta | null {
  if (Object.hasOwn(ROUTE_META, path)) return ROUTE_META[path]!;
  const [segment, ...rest] = path.split('/').filter(Boolean);
  if (!segment) return null;
  if (!rest.length) return Object.hasOwn(ROUTE_META, `/${segment}`) ? ROUTE_META[`/${segment}`]! : null;
  const pattern = `/${segment}/*`;
  return Object.hasOwn(ROUTE_META, pattern) ? { ...ROUTE_META[pattern], title: rest.join('/') } : null;
}
