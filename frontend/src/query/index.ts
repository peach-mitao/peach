/* 取数与缓存（`@peach/query`）：全站那一个 `QueryClient`。
 *
 * 壳从 `peach-ui.js` 取，React 岛按 `@peach/query` 写，React 包构建时改写成 `/dist/peach-ui.js`，
 * 实例全站只有一个。 */
export { queryClient } from './client';
export * from '@tanstack/query-core';
