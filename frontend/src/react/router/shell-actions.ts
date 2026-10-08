/* 壳交给路由树的能力（`configureRouter(actions)`），经 Context 下发给路由树画的那几页。
 *
 * 这里只放两类东西：换到还归壳的那一屏（目录、资料页、详情、关注、垃圾文件），和只有壳才有的
 * 状态或回执（Toast、偏好存储、一次性上下文）。纯查表的助手（`tagLabel`、`javTitleHtml`）由页面
 * 从 `@peach/legacy/*` 直接 import；每次打开才算得出的值（只读状态、地址上的分类与页签、引导标记）
 * 跟着那一次打开走，不在这里。 */

import type { LibraryProcessingProps } from '../bundle';
import type { CatalogFilterProps } from '../catalog-filter/catalog-filter';
import type { CatalogGridProps } from '../catalog-grid/types';
import type { FeedNewProps } from '../feed-new/feed-new';
import type { OnlineAuthor } from '../follow/online-vocab';
import type { FollowFeedProps } from '../follow-feed/follow-feed';
import type { IndexKind, IndexPerson, IndexRoute, PeopleLayout, PersonAvatar } from '../index/index-data';
import type { JunkQueueProps } from '../junk-queue/junk-queue';
import type { SearchProps } from '../search/search';

export interface ShellActions {
  /** 打开作品详情（舞台）。 */
  openItem(id: number): void;
  /** 打开实体资料页。`kind` 是 `creator`／`performer` 等。 */
  openEntity(kind: string, name: string): void;
  /** 回目录并按这个标签筛选。 */
  openTag(key: string): void;
  /** 口味页点一条名次：标签回目录筛选，人名进资料页。 */
  openTasteSignal(kind: string, name: string): void;
  /** 换到还归壳的一个路径：先写地址，再按路由表打开。 */
  navigate(path: string): void;
  /** 按管理区身份进一屏（路由表里 `section` 等于它的第一条；认不出的落到垃圾文件）。 */
  openManage(section: string): void;
  /** 管理区身份对应的路径；路由表里没有这个身份时是空串。 */
  managePath(section: string): string;
  /** 去「看更新」那一页（`/follow`）。 */
  openFollow(): void;
  /** 过去时回执（`actionReceipt`）；给了 `undo` 就带一颗撤销键。 */
  receipt(message: string, options?: { undo?: () => Promise<void> }): void;
  /** 全站 Toast 原样（`toast`）：`sound` 选提示音。 */
  toast(message: string | { text: string }, options?: { sound?: string }): void;
  /** 失败回执（`actionFailure`）：`action` 是没做成的那件事。 */
  failure(action: string, error: unknown): void;
  /** 在资源管理器里显示这个文件，失败回一句原因。 */
  revealSource(id: number): Promise<string>;
  /** 让安装教程重新出现。 */
  reopenTutorial(): Promise<void>;
  /** 下一次打开配置页时选中的页签，只交给那一次。 */
  requestConfigurationSection(section: string): void;
  /** 复核页把分类写回地址栏，不重开。 */
  routeReview(params: { category: string }): void;
  /** 关注管理页把页签、页码与排序写回地址栏，不重开。 */
  routeFollowManage(params: { tab: string; page: number; sort: string; dir: string }): void;
  /** 关注管理页的偏好改了，存储归壳。 */
  saveFollowPreference(patch: { pageSize?: number; layout?: string }): void;
  /** 来源徽标（含计费标记）的 HTML。 */
  srcBadge(location: string, cost: string): string;
  /** 索引页把过滤词、范围、视图与类型写回地址栏，不重开。`replace` 用在打字过滤那种一路改写的场合。 */
  routeIndex(params: IndexRoute, options?: { replace?: boolean }): void;
  /** 索引页的版式偏好改了，存储归壳（资料页的名册读的也是它）。 */
  savePeopleLayout(patch: { layout: PeopleLayout }): void;
  /** 退出顶栏的选择模式：键归壳。 */
  exitSelectMode(): void;
  /** 本地名册一格的头像（圆框里那段 HTML 与人脸取景），回落链在壳里只有一份。 */
  personAvatar(item: IndexPerson, entityKind: string, big: boolean): PersonAvatar;
  /** 在线创作者一格的头像 HTML：主页头像优先、归档兜底，都取不到落回首字母。 */
  authorAvatar(author: OnlineAuthor): string;
  /** 回目录，按这一枚或这几枚本地标签筛选。 */
  showIndexTags(tags: string[], match: 'any' | 'all'): void;
  /** 去关注页，只看这一位创作者或这一枚在线标签的更新。 */
  openFollowAuthor(key: string): void;
  openFollowTag(tag: string): void;
  /** 打开一份播放列表的播放队列（舞台），从 `resumeAssetId` 那一个接着播。 */
  openPlaylist(id: number, resumeAssetId: number): void;
  /** 此刻能不能悬停翻页：壳的多选、遮挡、减少动效与滚动中都回 false。 */
  canFlip(): boolean;
}

/** 壳每次打开时交进来的值，按页面分。管理区那几页画进 `#stats`。 */
export interface ManagedOpenProps {
  '/stats': { configurable: boolean };
  '/taste': { onboarding: boolean };
  '/review': { category: string; readOnly: boolean; readOnlyMessage: string; writerUrl: string };
  '/data-cleanup': Record<string, never>;
  '/duplicates': Record<string, never>;
  '/quality-goals': Record<string, never>;
  '/scraping': Record<string, never>;
  '/configuration': Record<string, never>;
  '/diagnostics': Record<string, never>;
  '/activity': Record<string, never>;
  '/follow-manage': {
    tab: string; page: number; sort: string; dir: string; pageSize: number; layout: string;
    readOnly: boolean; readOnlyMessage: string; writerUrl: string;
  };
}

export type ManagedPath = keyof ManagedOpenProps;

/** 播放列表页与关注页同样画进 `#stats`，但不是管理区：跨页进来一律由壳写地址再自己打开（关注页从
 *  侧栏进来还要重掷取样种子、回到干净的 `/follow`），所以不进 `ManagedPath`。每次打开交进来的值同样按
 *  页面分，之后的开关经 `updateManagedRoute` 推进来。关注页的助手与动作是壳里各一份、身份不变的对象
 *  （卡片按引用比较），跟着打开走：它们拼的 HTML、碰的 DOM 与写的地址都还在壳里。 */
export interface BrowseOpenProps {
  '/playlists': { revision: number };
  '/follow': FollowFeedProps;
}

export type BrowseRoutePath = keyof BrowseOpenProps;

/** 目录网格与垃圾队列画进 `#grid`，同样不算管理区：进目录要由壳按地址重建筛选（`openCatalog`，进首页
 *  还要重掷种子、作废顶部三层的缓存），回收站要把筛选钉成 `trash`，这些只有壳做得到。表按页面分键，不按
 *  地址：目录各路径与回收站画的都是 `/` 这一页，网格在 `/trash` 打开之后去 `/` 是就地推；`/junk-files`
 *  是垃圾队列那一页，`?state=ads` 落在 `/` 上时画的也是它。打开时交进来的是壳那一整份 props（筛选或
 *  分类、版式、选择态与卡片的助手和动作），之后的换筛选、换版式、选择模式与刷新代次经
 *  `updateManagedRoute` 推进来。卡片的助手与动作是壳里各一份、身份不变的对象（卡片按引用比较），
 *  目录网格那一份资料页的作品区与详情的接着看也在用，所以跟着打开走，不进 `ShellActions`。 */
export interface CatalogOpenProps {
  '/': CatalogGridProps;
  '/junk-files': JunkQueueProps;
}

export type CatalogPagePath = keyof CatalogOpenProps;

/** 索引页每次打开交进来的值：地址栏上的那几项（壳从地址读出）、这台浏览器的版式偏好、顶栏选择键的
 *  现值，和本机能不能改配置。选择键之后的开关经 `updateManagedRoute` 推进来。 */
export interface IndexOpenProps extends IndexRoute {
  layout: PeopleLayout;
  selectMode: boolean;
  configurable: boolean;
}

/** 索引五页画进 `#index`，一种名册一条路径。 */
export type IndexRoutePath = `/${IndexKind}`;
export type IndexOpenPropsTable = { [Path in IndexRoutePath]: IndexOpenProps };

/** 资料页画进 `#index`，每种实体一条模式（名字里可能带斜杠，吃掉剩下全部段）。种类与名字跟着打开走，
 *  名字是壳从地址解码出来的那一份。 */
export type EntityRoutePath = '/performers/*' | '/studios/*' | '/creators/*' | '/series/*' | '/agencies/*';

/** 页面里的附属面，按名字登记、各画进壳的一个容器：首页筛选条（`#catalogFilter`）、首页新作行（`#feedNew`）、
 *  目录页处理横幅（`#libraryProcessingNotice`）与顶栏搜索下拉（`#searchMenu`）。props 由壳算好、整份交进来，
 *  之后经 `updateManagedRoute` 推补丁。 */
export interface SurfaceOpenProps {
  'catalog-filter': CatalogFilterProps;
  'feed-new': FeedNewProps;
  'library-processing': LibraryProcessingProps;
  search: SearchProps;
}

export type SurfaceName = keyof SurfaceOpenProps;

/** 常驻面，按名字登记、宿主就是那个常驻节点：底部批量条（`[data-batch-dock]`）、侧栏配色卡（`#boardGlowMenu`）、
 *  管理区页头（`[data-manage-header]`）、沉浸模式（body 末尾的 `[data-immerse-host]`）与设置面板
 *  （`[data-settings-host]`，第一次打开时放进 body 末尾）。打开时不带 props（`openResidentSurface`），内容由壳经
 *  各自的命令式句柄推进组件自己的 store。 */
export interface ResidentOpenProps {
  'batch-dock': Record<string, never>;
  'glow-picker': Record<string, never>;
  'manage-header': Record<string, never>;
  immerse: Record<string, never>;
  'settings-panel': Record<string, never>;
}

export type ResidentName = keyof ResidentOpenProps;
