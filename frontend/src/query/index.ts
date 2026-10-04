/* 取数与缓存（`@peach/query`）：全站那一个 `QueryClient`，加上壳与 React 页面共读的查询（来源可达性）。
 *
 * 壳从 `peach-ui.js` 取，React 岛按 `@peach/query` 写，React 包构建时改写成 `/dist/peach-ui.js`，
 * 实例、查询键与取数函数全站只有一份。 */
export { queryClient } from './client';
export * from './media-sources';
export * from '@tanstack/query-core';
