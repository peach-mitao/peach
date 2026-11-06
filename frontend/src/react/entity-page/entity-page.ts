/* The entity profile page (rendered by the route tree into `#index`, see `ENTITY_ROUTES` in `router/managed-routes.tsx`):
 * data shapes, query keys and first-screen fetching.
 *
 * Profile card, filter overlay, the new-releases row and the body are four blocks of one page reading the same in-page state
 * (this page's filters, current view, where the photo wall has paged to), so they are one component; the shell lays out the
 * four hosts inside `#index`, the page renders into the profile card's slot and portals into the other three. All fetching
 * lives here: `/api/entity`, new releases, videos and photos are fetched by the page per query key; the address bar is the
 * single source of truth for filters and view and the shell owns it: the page changes filters only via `actions.route`, the
 * shell writes the address and pushes the new `filters`/`media` back via `updateManagedRoute`, and the page refetches by the
 * new key.
 *
 * The first screen still lays the shell's skeleton (on deep-link cold start the React bundle has not arrived; only the shell
 * can render the skeleton); `prefetch` gathers the four pieces before rendering, and skeleton and full page swap in one step;
 * on in-page filter changes, the video section's skeleton belongs to the body's own slot (`useSkeletonReveal`). */
import { api } from '@peach/legacy/core';

import type { CatalogGridProps, MediaPage } from '../catalog-grid/types';
import type { EntityBodyActions, EntityBodyHelpers, EntityCodeSet, EntityLocalPhoto, PhotoLayout, PhotoSize } from '../entity-body/entity-body';
import type { EntityComboItem, EntitySortKey, EntityView, SegmentOption } from '../entity-filter/entity-filter';
import type { FollowFeedActions, FollowFeedHelpers } from '../follow-feed/follow-feed';
import type { EntityHeroData, HeroCostar } from '../entity-hero/entity-hero';
import { feedNewKey, feedNewOptions, type FeedRowHtml } from '../feed-new/feed-new';
import type { IndexPerson, PeopleLayout } from '../index/index-data';
import { queryClient } from '../query';

/** This page's filters on the address bar, keys same as the shell's `ENTITY_FILTER_KEYS`. */
export const ENTITY_FILTER_KEYS = ['loc', 'creator', 'tag', 'state', 'dur_min', 'dur_max', 'orient', 'year', 'sort', 'dir', 'browse', 'folder', 'folder_recursive'] as const;
export type EntityFilters = Readonly<Record<string, string>>;

/** The media views in the URL: `media=photos`, `media=online` and catalog sets as `set=<id>`. The roster never enters the URL; see `rosterView`. */
export interface EntityMedia { media: 'videos' | 'photos' | 'online'; set: number }
export const EMPTY_MEDIA: EntityMedia = { media: 'videos', set: 0 };

/** The fields this page reads from `/api/entity`: the profile card's share plus tag counts and the roster. Returns `{error}` when the name does not match. */
export interface EntityPageData extends EntityHeroData {
  error?: string;
  redirect?: { kind: string; name: string; id?: number };
  tags?: { k: string; n: number }[];
  related_performers?: (HeroCostar & IndexPerson)[];
  labels?: IndexPerson[];
  has_image?: boolean;
  image_version?: string;
  has_avatar?: boolean;
  avatar_stand_in?: boolean;
  has_logo?: boolean;
  representative_asset_id?: number | null;
  avatar_focus?: unknown;
  mark_link_id?: number | null;
}

/** One page of `/api/photos` and `/api/photo-set`. Entries in `sets` with `kind` of `code` are official samples of owned videos. */
export interface PhotoPage {
  error?: string;
  id?: number | string;
  title?: string;
  total?: number;
  sample_total?: number;
  sets?: (EntityCodeSet & { kind?: string })[];
  items?: EntityLocalPhoto[];
  has_more?: boolean;
  seed?: string;
}

/** What stays with the shell for writes and in-app navigation: the address, the confirm popover's form, site-wide receipts, and the single landing point for filters. */
export interface EntityPageActions {
  /** Switching views and watch states: the shell writes the address, then pushes the new `filters`/`media` back. */
  route(filters: EntityFilters, media: EntityMedia): void;
  /** Tags, a chip on the intersection bar, and "Clear all": they all go through the shell's single filter sink (`commitContextFilter`). */
  toggleTag(tag: string): void;
  clearFilter(key: string): void;
  clearAll(): void;
  /** Sort keys: clicking an unselected one changes the column, clicking the selected one flips direction, same rules as the home page's row. */
  setSort(key: string): void;
  /** The video view's new batch: the seed is the site-wide one (`state.seed`); the shell swaps it, writes the URL and pushes back; the response carries the new seed,
   *  and the page uses it to fetch that page first; the key's spinner waits for exactly this round trip. */
  reshuffleVideos(): string;
  setJavLayout(layout: string): void;
  setPhotoLayout(layout: string): void;
  /** On-site navigation goes through the legacy router's single entry. */
  openEntity(kind: string, name: string, replace?: boolean): void;
  /** Whether this page is in JAV context (inferred from the first page of videos' `is_jav`): the shell's sort options, the sidebar fetch, and the card layouts all read it. */
  javContext(on: boolean): void;
  /** View changed or a new batch of content: the shell recomputes the sticky top, and the top bar's large/small image buttons swap to the matching set based on whether it is a photo wall (`wall`: the photo view, or the online
   *  view showing images). */
  painted(view: EntityView, wall: boolean): void;
  /** The name matches no one (`/api/entity` returns `{error}`): the shell swaps the whole block for an empty state. */
  missing(): void;
  /** After an avatar change: the shell drops its cached avatar rows (the top three) and refetches by the new version number on next paint. */
  avatarChanged(): void;
  /** Go to the follows page showing updates only from this person's sources (the same entry as the roster's online cell). */
  openFollowAuthor(key: string): void;
}

/** The HTML and wiring still assembled by the legacy layer. */
export interface EntityPageHelpers {
  /** The big-slot image (`entityFaceImg`): an empty string when unavailable, with the initial letter underneath. */
  portraitImg(kind: string, entity: EntityPageData): string;
  /** The horizontal scroll row wires up drag and mouse wheel (`wireDrag`). */
  wireDrag(row: Element | null): void;
  /** Wires up only the wheel and the fade at both ends (`wireHorizontalScroller`). */
  wireScroller(row: Element | null): void;
  /** The new releases row: drag and wheel, with auto scroll wired per settings. */
  wireFeedRow(row: Element | null): void;
  /** The whole HTML for the new releases row: the Note for when the image host is unreachable and a row of cards (`feedNewCardHtml`). */
  feedRowHtml: FeedRowHtml;
  /** An action receipt (`actionReceipt`); with `undo` given it carries an undo button. */
  receipt(message: string, options?: { undo?: () => Promise<void> }): void;
  /** The failure receipt (`actionFailure`). */
  failure(label: string, error: unknown): void;
  /** The "Add alias" popover: the shell owns the form and the receipt; writing goes through `write` (the page's mutation, which refetches profile and videos on success). */
  aliasForm(mine: string[], write: (payload: { alias: string; remove?: boolean }) => Promise<{ added?: boolean; alias?: string }>): Promise<void>;
  /** The gallery's two source file keys; `done` refetches the set after reconciliation has changed it. */
  sourceToolsHtml(setId: number): string;
  wireSourceTools(root: Element, done: () => void): void;
  /** The chips on the intersection bar, same list as the home page's bar (`comboItems`). */
  comboItems(filters: EntityFilters): EntityComboItem[];
  /** Sort keys: in the JAV context there is one extra, the release date. */
  sortKeys(sort: string, dir: string, jav: boolean): EntitySortKey[];
}

/** Exactly what the card grid asks for, the same copy as the shell's: layout, selection state, and display settings pushed fresh by `updateManagedRoute`. */
type SharedGridProps = Pick<CatalogGridProps,
  'layout' | 'selectMode' | 'selected' | 'seekSeconds' | 'wireDrag' | 'skeletonHtml'
  | 'groupCollapse' | 'canLoadMore'>;

/** The four hosts the shell lays out inside `#index` (the page renders into the profile card cell). The filter overlay and the body each carry a
 *  `.peach-react` layer; the new releases row is a legacy-layer card, and the host sits outside the React subtree's style scope. */
export interface EntityPageHosts { filter: Element; feed: HTMLElement; body: Element }

export interface EntityPageProps extends SharedGridProps {
  kind: string;
  resolvedEntity?: EntityPageData;
  restoreNavigation?: boolean;
  /** 路由通过实体 ID 取得的规范名。 */
  name: string;
  filters: EntityFilters;
  media: EntityMedia;
  /** The site-wide JAV toggle (`state.jav==='1'`): profile pages inherit it. */
  jav: boolean;
  /** The site-wide random seed (`state.seed`), attached to video requests whenever sorting is `seed`. */
  seed: string;
  /** The epoch that demands a video re-read after batch operations: bumping it changes the key and refetches. */
  revision: number;
  /** Changing the compilation switch bumps the epoch so new releases are refetched. */
  feedRevision: number;
  photoSize: PhotoSize;
  photoLayout: PhotoLayout;
  /** The follows image wall's "images only" (`followImagesOnly`), one setting shared by the online view and the follows page. */
  followImagesOnly: boolean;
  /** Current value and options for the JAV card layout. */
  javLayout: string;
  javLayouts: readonly SegmentOption[];
  photoLayouts: readonly SegmentOption[];
  /** The four watch states, same list as the home page's row (`VIEW_PILLS`). */
  states: readonly { k: string; label: string }[];
  /** The layout of one roster cell, reading the same settings value as the index page. */
  peopleLayout: PeopleLayout;
  hosts: EntityPageHosts;
  /** The card's helpers and actions are the catalog's set; the photo wall adds one more for locating the source file. */
  card: { helpers: EntityBodyHelpers; actions: Omit<EntityBodyActions, 'loadMorePhotos'> };
  /** Follow cards in the online view: skeleton, dragging and progress as on the follows page; actions are the profile-page-context set, and filter changes, sidebar,
   *  multi-select and image preferences are not wired (this page does not draw the follows page's sidebar, and multi-select addresses local videos). */
  follow: { helpers: FollowFeedHelpers; actions: FollowFeedActions };
  helpers: EntityPageHelpers;
  actions: EntityPageActions;
}

export const entityKey = (kind: string, name: string) => ['entity', kind, name] as const;
export const entityItemsKey = (kind: string, name: string, query: string, revision: number) =>
  ['entity-items', kind, name, query, revision] as const;
export const entityPhotosKey = (kind: string, name: string, set: number, seed: string) =>
  ['entity-photos', kind, name, set, seed] as const;

const tagList = (value: string | undefined) => String(value || '').split(',').filter(Boolean);
export const tagPressed = (value: string | undefined, tag: string) => tagList(value).includes(tag);
export { tagList };

/** Parameters of the video request, same terms for the first page and next pages (besides `offset`). Profile pages inherit the JAV switch: performer pages and label pages
 *  are likewise code-browsing contexts. */
export function itemsParams(kind: string, name: string, filters: EntityFilters, opts: { jav: boolean; seed: string },
  offset = 0): URLSearchParams {
  const p = new URLSearchParams();
  p.set(kind, name);
  if (kind === 'tag') {
    p.set('tag', [...new Set([name, ...tagList(filters.tag)])].join(','));
    p.set('tag_match', 'all');
  }
  p.set('limit', '48');
  p.set('offset', String(offset));
  p.set('sort', filters.sort || 'new');
  if (filters.dir) p.set('dir', filters.dir);
  if (filters.sort === 'seed') p.set('seed', opts.seed);
  if (offset) p.set('count', '0');
  for (const key of ENTITY_FILTER_KEYS) {
    if (filters[key] && key !== kind && key !== 'sort') p.set(key, filters[key]!);
  }
  if (opts.jav) p.set('jav', '1');
  return p;
}

export async function fetchItems(kind: string, name: string, filters: EntityFilters, opts: { jav: boolean; seed: string },
  offset: number, signal?: AbortSignal, options?: { limit: number; sort?: string; dir?: string }): Promise<MediaPage> {
  const params = itemsParams(kind, name, filters, opts, offset);
  if (options) {
    params.set('limit', String(options.limit));
    params.delete('count');
    if (options.sort) params.set('sort', options.sort);
    if (options.dir) params.set('dir', options.dir);
  }
  return await api(`/api/items?${params}`, signal ? { signal } : {}) as MediaPage;
}

/** Switching back to a filter already viewed on this page does not request again: on each page entry, first clear the cache under that key (`prefetch`); within the page
 *  each filter is fetched once; after batch operations, refetch under a new generation. */
export const itemsOptions = (props: Pick<EntityPageProps, 'kind' | 'name' | 'filters' | 'jav' | 'seed' | 'revision'>) => {
  const opts = { jav: props.jav, seed: props.seed };
  const query = itemsParams(props.kind, props.name, props.filters, opts).toString();
  return {
    queryKey: entityItemsKey(props.kind, props.name, query, props.revision),
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchItems(props.kind, props.name, props.filters, opts, 0, signal),
    staleTime: Infinity,
  };
};

export const entityOptions = (kind: string, name: string) => ({
  queryKey: entityKey(kind, name),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    api(`/api/entity?kind=${encodeURIComponent(kind)}&name=${encodeURIComponent(name)}`, { signal }) as Promise<EntityPageData>,
  staleTime: Infinity,
});

/** The URL for one page of photos. The first page of the whole photo set follows the shell's convention (no limit, the seed only with "another batch"); albums and continuation pages take 120 each. */
function photoUrl(kind: string, name: string, set: number, seed: string, offset: number, pageSeed: string) {
  const who = `kind=${encodeURIComponent(kind)}&name=${encodeURIComponent(name)}`;
  if (offset) {
    const tail = `&limit=120&offset=${offset}${pageSeed ? `&seed=${encodeURIComponent(pageSeed)}` : ''}`;
    return set ? `/api/photo-set?id=${set}${tail}` : `/api/photos?${who}${tail}`;
  }
  const shuffled = seed ? `&seed=${encodeURIComponent(seed)}` : '';
  if (set) return `/api/photo-set?id=${set}&limit=120${shuffled}`;
  return seed ? `/api/photos?${who}&limit=120${shuffled}` : `/api/photos?${who}`;
}

type PhotoParam = { offset: number; seed: string } | null;

/** The photo wall: one screen is one infinite query, and paging counts local images only (samples load in one go). A new batch is a new seed, which is a new key.
 *  On failure (`{error}`) the page acts as if there are no photos instead of staying on the skeleton. */
export const photosOptions = (kind: string, name: string, set: number, seed: string) => ({
  queryKey: entityPhotosKey(kind, name, set, seed),
  queryFn: async ({ pageParam }: { pageParam: PhotoParam }): Promise<PhotoPage> => {
    const page = await (api(photoUrl(kind, name, set, seed, pageParam?.offset || 0, pageParam?.seed || '')) as Promise<PhotoPage>)
      .catch((error: unknown) => {
        if (pageParam) throw error;
        return { error: String(error) } as PhotoPage;
      });
    if (pageParam && page.error) throw new Error(page.error);
    return page;
  },
  initialPageParam: null as PhotoParam,
  getNextPageParam: (last: PhotoPage, pages: PhotoPage[]): PhotoParam | undefined => (last.has_more && !last.error
    ? { offset: pages.reduce((sum, page) => sum + (page.items || []).length, 0), seed: pages[0]?.seed || '' }
    : undefined),
  staleTime: Infinity,
});

export const codeSetsOf = (page: PhotoPage | null | undefined): EntityCodeSet[] =>
  page && !page.error ? (page.sets || []).filter((set) => set.kind === 'code') : [];

/** 首次进入先清掉这一位名下的缓存；历史返回复用原查询。再把资料（连同新作）、作品第一页与照片
 *  并行取齐，深链落在一个图集上时连那一组一起取。四样齐了路由树（`openManagedRoute`）一次换掉骨架。 */
export async function prefetchEntityPage(props: EntityPageProps): Promise<void> {
  const { kind, name } = props;
  if (!props.restoreNavigation) for (const head of ['entity', 'entity-items', 'entity-photos'] as const) {
    queryClient.removeQueries({ queryKey: [head, kind, name] });
  }
  if (props.resolvedEntity?.id) queryClient.setQueryData(entityKey(kind, name), props.resolvedEntity);
  await Promise.all([
    queryClient.fetchQuery(entityOptions(kind, name)).then((entity) => {
      if (!entity || entity.error || !entity.id) return null;
      if (!props.restoreNavigation) queryClient.removeQueries({ queryKey: feedNewKey(Number(entity.id)) });
      return queryClient.fetchQuery(feedNewOptions(Number(entity.id), props.helpers.feedRowHtml, true));
    }),
    queryClient.fetchQuery(itemsOptions(props)),
    queryClient.fetchInfiniteQuery(photosOptions(kind, name, 0, '')),
    props.media.media === 'photos' && props.media.set
      ? queryClient.fetchInfiniteQuery(photosOptions(kind, name, props.media.set, '')) : null,
  ]);
}
