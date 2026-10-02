/* 壳交给路由树的能力（`configureRouter(actions)`），经 Context 下发给路由树画的那几页。
 *
 * 这里只放两类东西：换到还归壳的那一屏（目录、资料页、详情、关注、垃圾文件），和只有壳才有的
 * 状态或回执（Toast、偏好存储、一次性上下文）。纯查表的助手（`tagLabel`、`javTitleHtml`）由页面
 * 从 `@peach/legacy/*` 直接 import；每次打开才算得出的值（只读状态、地址上的分类与页签、引导标记）
 * 跟着那一次打开走，不在这里。 */

import type { OnlineAuthor } from '../follow/online-vocab';
import type { IndexKind, IndexPerson, IndexRoute, PeopleLayout, PersonAvatar } from '../index/index-data';

/** 云下载表单的预填：番号、标题与来处（`asset:12`、`follow:34`、`wishlist:5`）。 */
export interface CloudDownloadPrefill { code?: string; title?: string; origin?: string }

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
  /** 下一次打开活动页时云下载表单的预填，只交给那一次。 */
  requestCloudDownload(prefill: CloudDownloadPrefill): void;
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
  '/activity': { prefill?: CloudDownloadPrefill };
  '/follow-manage': {
    tab: string; page: number; sort: string; dir: string; pageSize: number; layout: string;
    readOnly: boolean; readOnlyMessage: string; writerUrl: string;
  };
}

export type ManagedPath = keyof ManagedOpenProps;

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
