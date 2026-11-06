import { JAV_RELEASE_SORT } from '../../sort-preferences';

export const DISCOVERY_SORTS = [
  ['taste', 'Taste', 'Sort by taste match'],
  ['release_date', JAV_RELEASE_SORT[1], 'Sort by release date'],
  ['source_score', 'Source rating', 'Sort by source rating'],
  ['duration', 'Duration', 'Sort by duration'],
  ['code', 'Code', 'Sort by code'],
] as const;
export type DiscoverySort = typeof DISCOVERY_SORTS[number][0];
/** 新作分区的排序：发行时间打头（默认），其余同「发现」；`random` 是「换一批」，没有对应的排序键。 */
export const RELEASE_SORTS = [
  ['release_date', JAV_RELEASE_SORT[1], '按发行日期排序'],
  ['source_score', '来源评分', '按来源评分排序'],
  ['duration', '时长', '按时长排序'],
  ['code', '番号', '按番号排序'],
  ['taste', '口味', '按口味匹配排序'],
] as const;
export type ReleaseSort = typeof RELEASE_SORTS[number][0] | 'random';
export type DiscoveryDirection = 'asc' | 'desc';

export function discoveryScore(value: number | null | undefined): string {
  return typeof value === 'number' && Number.isFinite(value) ? value.toFixed(3) : '—';
}

/** Taste relevance uses a fixed 100-point scale; unknown readings keep an empty value. */
export function recommendationScore(value: number | null | undefined) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return { score: '—', label: 'Profile not fetched', color: 'neutral' as const };
  const score = Math.round(Math.max(0, Math.min(1, value)) * 100);
  const tier = score >= 75 ? { label: 'Strongly recommended', color: 'lime' as const }
    : score >= 50 ? { label: 'Recommended', color: 'blue' as const }
    : score >= 25 ? { label: 'Worth a look', color: 'yellow' as const }
    : { label: 'Explore', color: 'neutral' as const };
  return { score: String(score), ...tier };
}
