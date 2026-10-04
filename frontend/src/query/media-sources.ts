/* 来源可达性（`/api/sources`）：地址、查询键与取数函数全站只在这里声明一次，随 `peach-ui.js` 发出。
 *
 * 读者有四个：壳的脱盘判据（`web/app.js` 的 `loadSourceStatus`）、数据管理页、资源同步与重复文件页。
 * 壳从 `peach-ui.js` 取，React 包按 `@peach/query` 引用，两边读写同一个 `queryKey`。键不设 `staleTime`：
 * 壳的「刷新状态」与页面进入时都按服务端最新的探测快照重取。壳只在自己调用时读返回值，不订阅这个键，
 * 页面重取不会改动目录默认来源与脱盘提示。 */
import { isCancelledError } from '@tanstack/query-core';

import { apiGet } from '../api';
import { queryClient } from './client';

export const MEDIA_SOURCES_URL = '/api/sources';
export const MEDIA_SOURCES_KEY = ['media-sources'] as const;

/** `/api/sources` 的一行。字段与 `routes_api.source_health` 对齐。 */
export interface MediaSourceStatus {
  location: string;
  online: boolean | null;
  state?: string;
  message?: string;
  roots?: unknown[];
}

export interface MediaSourcesData {
  sources: MediaSourceStatus[];
}

export const fetchMediaSources = (signal?: AbortSignal) =>
  apiGet<MediaSourcesData>(MEDIA_SOURCES_URL, signal);

const stopped = (error: unknown) => (error as { name?: unknown } | null)?.name === 'AbortError' || isCancelledError(error);

/** 壳的来源检测：启动、详情里的「刷新状态」与播放器报错时各调一次，每次都向服务端问一遍。
 *
 *  查询函数不读 Query 交给它的 `signal`：读了它，页面上最后一个观察者卸载时 Query 会撤回这一趟，
 *  壳拿到的是上一份旧数据。同时在途的同一请求由 Query 合并成一次；合并上的若是页面那一趟，
 *  它带着页面自己的 `signal`，页面中止时这一趟以中止收场，壳就自己再发一次。 */
export async function loadMediaSources(): Promise<MediaSourcesData> {
  const fetchOnce = () => queryClient.fetchQuery({ queryKey: MEDIA_SOURCES_KEY, queryFn: () => fetchMediaSources() });
  try {
    return await fetchOnce();
  } catch (error) {
    if (!stopped(error)) throw error;
    return await fetchOnce();
  }
}
