/* 代表作表：女优、厂牌名 → 一部取得到头像的作品 id。卡片署名、Mix 叠放头像、沉浸作者那一格
 * 在没有实体图时，回落到这部作品的接触印相中心格（`/avatar?id=`），不另造图。
 *
 * 表由壳在顶栏取回 `/api/tops` 时写，各岛拼头像时读。放在模块里而不是 Query 缓存：`/api/tops`
 * 还是壳自己取的，壳不碰 QueryClient；等目录数据流整体归 React，这张表随 `/api/tops` 一起进
 * Query。模块在 `peach-ui.js` 里只有一份，React 包按 `@peach/card-art` 引用同一份产物，
 * 两边读写的是同一张表。
 *
 * 只收真能取到头像的代表作：卡片署名圈回落时读的就是它，取不到的进了表就是一个必然 404 的
 * `<img>`。`has_avatar` 说的是「已经裁好或印相还在」，不是「目录里有没有那张 jpg」——
 * `/avatar` 按需生成，还没抓过的那条路留着。 */

/** `/api/tops` 里一枚圆头像：`k` 是名字，`rep` 是代表作 id。 */
export interface RepresentativeRow { k: string; rep?: number | null; has_avatar?: boolean }

const representatives = new Map<string, number>();

/** 记下一批代表作。只增不减：换一批之后，屏幕上旧卡片的回落照样找得到。 */
export function rememberRepresentatives(rows: readonly RepresentativeRow[] | null | undefined): void {
  (rows || []).forEach(row => { if (row.rep && row.has_avatar) representatives.set(row.k, row.rep); });
}

/** 这个名字的代表作 id，表里没有就是 `undefined`。 */
export function representativeOf(name: string): number | undefined {
  return representatives.get(name);
}
