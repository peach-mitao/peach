import { emptyStateHtml } from '@peach/legacy/ui';
import { esc } from '@peach/legacy/core';

type Request = (url: string) => Promise<any>;
const FILTERS = ['loc', 'creator', 'performer', 'studio', 'series', 'agency', 'tag', 'tag_match', 'len', 'dur_min', 'dur_max', 'orient', 'region', 'year', 'state', 'jav', 'thumb'];

/** Clear the library conditions while keeping the current page, view and local or online scope. */
export function clearCatalogAddress(address = typeof location === 'undefined' ? '/' : location.href): string {
  const url = new URL(address, 'http://localhost');
  for (const key of [...FILTERS, 'q', 'category', 'cat']) url.searchParams.delete(key);
  url.searchParams.set('thumb', '0');
  return url.pathname + (url.search ? url.search : '') + url.hash;
}

/** Recommendations share filters with the current list and require an actual search hit to show. */
export async function catalogSuggestions(state: Record<string, string>, request: Request): Promise<string[]> {
  const params = new URLSearchParams();
  for (const key of FILTERS) if (state[key]) params.set(key, state[key]);
  const [facets, sample] = await Promise.all([
    request('/api/facets?' + params), request('/api/items?' + params + '&limit=5'),
  ]);
  const candidates: string[] = [...new Set<string>([
    ...(facets.creators || []), ...(facets.tagperformers || []), ...(facets.tags || []),
  ].map(row => String(row.k || '')).concat((sample.items || []).map((row: { code?: string; name?: string }) => row.code || row.name || '')))]
    .filter(value => value.length > 1).slice(0, 10);
  const hits = await Promise.all(candidates.map(async value => {
    const query = new URLSearchParams(params); query.set('q', value); query.set('limit', '1');
    const result = await request('/api/items?' + query);
    return result.total > 0 ? value : '';
  }));
  return hits.filter(Boolean);
}

/** Empty library, no filter results, and a profile not yet built each get an actionable entry point. */
export function catalogEmptyHtml({ kind = 'catalog', filtered = false, jav = false, configurable: _configurable = false, online = false } = {}): string {
  const add = '<a class="geist-button primary" href="/settings/library">Add media</a>';
  const follow = '<a class="geist-button' + (online ? ' primary' : '') + '" href="/subscriptions?tab=add">Add follows</a>';
  if (filtered || jav) return emptyStateHtml('search', jav ? 'No JAV videos match the conditions yet' : 'No matching content',
    jav ? 'Scanned videos without release details yet can be viewed under all content.' : 'Clear filters or search terms to see everything.',
    { actions: jav
      ? '<a class="geist-button primary" href="/?loc=&thumb=0">View all content</a><a class="geist-button" href="/data-cleanup#libraryProcessing">Complete video profiles</a>'
      : `<a class="geist-button primary" href="${filtered ? esc(clearCatalogAddress()) : '/?loc=&thumb=0'}">${filtered ? 'Clear filters' : 'View all content'}</a>` });
  if (kind !== 'catalog') {
    const labels: Record<string, string> = { tags: 'Tags', performers: 'Performers', creators: 'Sellers', studios: 'Labels', agencies: 'Agency', series: 'Series' };
    // The online bucket counts what lives on the sources, and naming follows the sources' own usage: a performer page's online tab shows creators from followed sources.
    const onlineLabels: Record<string, string> = { tags: 'Tags', performers: 'Creators' };
    const label = (online ? onlineLabels[kind] : '') || labels[kind] || 'Profile';
    return emptyStateHtml(kind === 'tags' ? 'tags' : 'user-round', 'No ' + label.toLowerCase() + ' yet',
      online ? 'After adding a follow source and fetching content, this will show the source\'s ' + label.toLowerCase() + '.' : 'After adding content and completing profiles, the corresponding information appears here.',
      { actions: online ? follow : add + follow });
  }
  return emptyStateHtml('play', 'No videos yet', 'Add media directories or follow sources to start building your library.', { actions: add + follow });
}
