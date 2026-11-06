/* The site-wide single TanStack Query client (ADR-0031).
 * @peach/query resolves straight to shared source; Application's fetchQuery, page prefetch, and Providers use the same instance.
 * First-screen prefetch and components read the same cache, avoiding duplicate requests after mount or writes that only update some readers. */
import { QueryClient } from '@tanstack/query-core';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /* 同一浏览器标签页保留已访问内容；主动刷新和写操作失效仍会取新数据。 */
      gcTime: Infinity,
      /* 请求都打本机的 `/api/...`。浏览器的 online 标记说的是外网，断了外网它就翻 false，
         Query 默认会把本机请求也挂起成 paused——页面于是停在旧数据上，什么都不说。 */
      networkMode: 'always',
      /* No retry. The failure is the service not up, a read-only database, or a migration not yet run; asking three more times in the same second returns the same answer,
         so it is only deferred a few seconds before display; the real retry is the page's own polling, one round away. */
      retry: 0,
      /* Refocus does not auto-refetch: pages needing fresh data set their own polling rhythm by content (activity page: 2s/10s),
         and adding a focus trigger would give the same data two rhythms. Collection and update checks against external sources are always explicitly triggered,
         and must certainly not fire just because the tab was switched back to. Pages wanting instant refresh opt in themselves via `useQuery`. */
      refetchOnWindowFocus: false,
      /* 初次进入先预取，栏目往返复用缓存。挂载只重取被写操作失效的查询，不重复正常读取；
         失败保持错误回执，由页面自己的重试入口处理。 */
      refetchOnMount: query => query.state.isInvalidated,
      retryOnMount: false,
    },
  },
});
