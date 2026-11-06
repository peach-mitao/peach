/* Data fetching and caching (@peach/query): the app-wide single QueryClient, plus the source queries shared by the Application and React pages.
 * The alias resolves directly to this directory; the instance, query keys, and fetch functions ship once with the main bundle. */
export { queryClient } from './client';
export * from './media-sources';
export * from '@tanstack/query-core';
