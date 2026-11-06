/* The new-releases row not yet added to the library (ADR-0042): fetching, query keys and write operations shared by the home
 * row and the profile page row.
 *
 * Both rows read the same endpoint (`/api/feeds/discoveries`) with the profile page adding `entity`; the query keys are one
 * family (`['feed-new', entity id | 'home']`), so flipping the compilation switch in one place invalidates both rows in one
 * go by `['feed-new']`. Card HTML is still assembled by the shell (`feedRowHtml`): cover framing, the edition mark and the
 * connection-method Note are the legacy layer's copies, and the image-failure fallback chain mutates nodes directly. */
import { appSettingsStore } from '@peach/appearance';
import type { CoverState } from '@peach/card-art';
import { api } from '@peach/legacy/core';

import { queryClient } from '../query';

/** `/api/feeds/discoveries` 的回话：条目与最近一轮取封面断在连接上的部数。 */
export interface FeedDiscoveries { items?: FeedNewItem[]; cover_network?: number }

/** 一行里的一部：判有没有、哪几部的封面还在排队（这一行的一键插队只管这几部）。 */
export interface FeedNewItem { id: number; code?: string; has_cover?: boolean; cover_url?: string | null; cover_state?: CoverState | null }

/** 新作那一行取回来的样子：条目与壳拼好的整段 HTML。 */
export interface FeedNew {
  items: FeedNewItem[];
  html: string;
  fetching?: boolean;
}

/** 壳拼的整段 HTML：连不上图片主机时的 Note 与一排卡（`feedNewCardHtml`）。 */
export type FeedRowHtml = (data: FeedDiscoveries | null, allHref?: string) => string;

/** The profile page row keys by entity id; the home page row does not distinguish people. */
export const feedNewKey = (entityId: number | null) => ['feed-new', entityId ?? 'home'] as const;

const FEED_SKELETON_CARDS = 8;
const FEED_COVER_WAIT = 1500;

/** Preloads `count` images from a fragment of HTML into the cache, waiting at most `ms` milliseconds. By the time the fragment enters the page they are `complete`,
 *  so the legacy layer's waiting shimmer never attaches to them. */
export function preloadImages(html: string, count: number, ms: number): Promise<unknown> {
  const probe = document.createElement('template');
  probe.innerHTML = html;
  const loads = [...probe.content.querySelectorAll('img[src]')].slice(0, count).map((source) => {
    const img = new Image();
    img.referrerPolicy = source.getAttribute('referrerpolicy') || '';
    img.src = source.getAttribute('src') || '';
    return img.decode().catch(() => {});
  });
  return Promise.race([Promise.all(loads), new Promise((resolve) => { setTimeout(resolve, ms) })]);
}

/** Pulling is the timer's job and pages only read what has been discovered: firing a round of requests on entering the page
 *  would turn every refresh into a pull on someone else's server. While the skeleton still holds (first screen), the first
 *  few covers are fetched before the whole row swaps: otherwise the skeleton exits, real cards enter, and the cover cells
 *  shimmer a second time, the same row waited on twice. The slow few are not waited out to the end; at the deadline the row
 *  swaps anyway.
 *  How many videos a row takes follows the settings overlay's "new releases shown" (`feedLimit`); a change has the shell
 *  invalidate both rows' queries and refetch. */
export async function fetchFeedNew(entityId: number | null, rowHtml: FeedRowHtml, preload: boolean): Promise<FeedNew> {
  const query = new URLSearchParams({ limit: String(appSettingsStore().value.feedLimit) });
  if (entityId) query.set('entity', String(entityId));
  const data = await (api(`/api/feeds/discoveries?${query}`).catch(() => null) as Promise<FeedDiscoveries | null>);
  const ok = data && !(data as { error?: string }).error ? data : null;
  const items = ok?.items || [];
  // 首页那一行在行尾带「查看全部新作」，资料页那一行只列这个人的，不带。
  const html = rowHtml(ok, entityId ? '' : '/jav?tab=releases');
  if (preload && items.length) await preloadImages(html, FEED_SKELETON_CARDS, FEED_COVER_WAIT);
  return { items, html, fetching: items.some(item => item.cover_state === 'fetching') };
}

export const feedNewOptions = (entityId: number | null, rowHtml: FeedRowHtml, preload = false) => ({
  queryKey: feedNewKey(entityId),
  queryFn: () => fetchFeedNew(entityId, rowHtml, preload),
  staleTime: Infinity,
  refetchInterval: (query: { state: { data?: FeedNew } }) => query.state.data?.fetching ? 2000 : false,
});

/** The three buttons on the card (Want, Not interested, Mark watched). All are marks; on write failure the card still changes look, since this row re-sorts by the server's
 *  actual state at the next fetch. */
export const postFeedAction = (feedId: number, action: string): Promise<void> =>
  (api('/api/feeds/discovery', { method: 'POST', body: JSON.stringify({ action, ids: [feedId] }) }) as Promise<unknown>)
    .then(() => undefined, () => undefined);

/** The home row (`feed-new` island). The host is `index.html`'s resident `#feedNew`: the island's root hangs on its
 *  `.peach-react`, cards portal back to the host itself, landing outside Preflight's scope. */
export interface FeedNewProps {
  host: HTMLElement;
  /** Changing the compilation switch issues a new epoch; this row refetches with the new filter. */
  revision: number;
  helpers: {
    feedRowHtml: FeedRowHtml;
    /** Drag, wheel, and auto-scroll wired up per settings. */
    wireFeedRow(row: Element | null): void;
  };
  actions: {
    /** Whether this row stalled: reported once when fetched, or when the last card is collapsed; the shell uses it to decide whether the next home page entry lays a skeleton. */
    settled(hasItems: boolean): void;
  };
}

/** Every entry into the catalog page is a fresh fetch (the same rule as the profile page): the previous cache is cleared first, and while the skeleton still holds,
 *  the first few covers wait with it. */
export async function prefetchFeedNew(props: FeedNewProps): Promise<void> {
  queryClient.removeQueries({ queryKey: feedNewKey(null) });
  await queryClient.fetchQuery(feedNewOptions(null, props.helpers.feedRowHtml,
    props.host.getAttribute('aria-busy') === 'true'));
}
