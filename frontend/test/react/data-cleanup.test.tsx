/* Data management page: the top row of readouts and entries, plus the three things to do on this page: links, resource sync
 * and organize.
 *
 * Every step that writes a real ledger or deletes things from disk (deleting dead links, resource sync cleanup, organize's
 * run and rollback) must pass a confirmation dialog first: this measures both "sent only after confirming" and "canceling
 * sends not one byte". Looks are asserted by `frontend/e2e/design-*.test.ts` reading `getComputedStyle`; this file covers only
 * structure, text and requests. */
import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { act, type ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as legacyUi from '@peach/legacy/ui';

import type { DataCleanupSection } from '../../src/react/bundle';
import { DataCleanupPage, DataCleanupToolPage } from '../../src/react/data-cleanup/data-cleanup-page';
import { prefetchDataCleanupTool } from '../../src/react/data-cleanup/data-cleanup';
import type { CleanupToolKey } from '../../src/cleanup-tools';
import { junkBreakdown, prefetchDataCleanup, reviewSummary } from '../../src/react/data-cleanup/data-cleanup';
import { LinkManager } from '../../src/react/data-cleanup/link-manager';
import type { LinkCheckState } from '../../src/react/data-cleanup/links';
import { OrganizeCard } from '../../src/react/data-cleanup/organize-card';
import type { OrganizeData } from '../../src/react/data-cleanup/organize';
import { OrphanRecordsCard } from '../../src/react/data-cleanup/orphan-records-card';
import type { OrphanRecordsData } from '../../src/react/data-cleanup/orphan-records';
import { ResourceSyncCard } from '../../src/react/data-cleanup/resource-sync-card';
import { hasResourceRoots, RESOURCE_SCAN_KEY, type ResourceScanState } from '../../src/react/data-cleanup/resource-sync';
import { IDLE_REPAIR } from '../../src/react/media-repair/media-repair';
import type { MediaSourcesData } from '../../src/react/media-sources';
import { queryClient } from '../../src/react/query';
import { actionOrder, buttonNamed, choose, click, mount, settle, type } from './render';

afterEach(() => {
  queryClient.clear();
  localStorage.clear();
  sessionStorage.clear();
});
notifyManager.setScheduler((notify) => notify());

const FAIL = Symbol('fail');
/** An endpoint returned a non-2xx. */
const failWith = (status: number, body: unknown = {}) => ({ [FAIL]: true, status, body });

type Route = unknown | ((body: unknown, method: string) => unknown);

/** Answers by path. Paths with no fabricated data return 404 and get logged, letting the test verify the page never asked endpoints it should not have. */
function serve(routes: Record<string, Route>) {
  const calls: { path: string; method: string; body: unknown }[] = [];
  const unknown: string[] = [];
  vi.stubGlobal('fetch', vi.fn(async (path: string, init?: RequestInit) => {
    const method = init?.method ?? 'GET';
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ path, method, body });
    if (path.startsWith('/api/organize/example?')) {
      const params = new URL(path, 'http://localhost').searchParams;
      return { ok: true, status: 200, json: async () => ({ ok: true, example: `${params.get('dir_template')}/${params.get('file_template')}.mp4` }) };
    }
    if (!(path in routes)) {
      unknown.push(path);
      return { ok: false, status: 404, json: async () => ({}) };
    }
    const route = routes[path];
    const answer = typeof route === 'function' ? (route as (b: unknown, m: string) => unknown)(body, method) : route;
    if (answer && typeof answer === 'object' && FAIL in answer) {
      const { status, body: payload } = answer as ReturnType<typeof failWith>;
      return { ok: false, status, json: async () => payload };
    }
    return { ok: true, status: 200, json: async () => answer };
  }));
  return {
    calls, unknown,
    posts: (path: string) => calls.filter((call) => call.path === path && call.method === 'POST').map((call) => call.body),
  };
}

type Confirmation = Parameters<typeof legacyUi.confirmModal>[0];

/** The confirm popover: with `answer` true it clicks confirm on the user's behalf. Both cases record what the popover said. */
function confirmWith(answer: boolean) {
  const seen: Confirmation[] = [];
  vi.spyOn(legacyUi, 'confirmModal').mockImplementation((async (options: Confirmation) => {
    seen.push(options);
    if (answer) await options.onConfirm?.();
    return { confirmed: answer };
  }) as typeof legacyUi.confirmModal);
  return seen;
}

const wrap = (element: ReactElement) => mount(<QueryClientProvider client={queryClient}>{element}</QueryClientProvider>);

const withRoots: MediaSourcesData = {
  sources: [{ location: 'local', online: true, roots: [{ online: true }] }, { location: '115', online: false, roots: [{ online: false }] },
    { location: 'online', online: true }],
};
const withoutRoots: MediaSourcesData = {
  sources: [{ location: 'local', online: true, roots: [] }, { location: 'online', online: true }],
};

const organizeIdle: OrganizeData = {
  status: 'idle', locations: [{ location: 'local', roots: ['R:\\media'] }],
  templates: { local: { file: '{code}', dir: '' } },
  presets: [{ label: 'Code + title', file: '{code}[ {title}]', dir: '{studio}' }],
  placeholders: [{ key: 'code', label: 'Code' }, { key: 'title', label: 'Title' }],
  last_batch: '',
};

/** Every endpoint the whole-page first screen needs. */
const pageRoutes = (sources: MediaSourcesData): Record<string, Route> => ({
  '/api/review?counts=1': { counts: { metadata_fields: 12, performer_avatars: 3, studio_logos: 2, creator_tags: 1 } },
  '/api/quality-goals?limit=200': { total: 7, items: [] },
  '/api/duplicates?limit=120': { total: 3, files: 8, reclaimable: 2 * 1073741824, groups: [] },
  '/api/ads?limit=1': { pending_total: 5, dismissed_total: 2, counts: { video: 4, url: 1 } },
  '/api/items?state=trash&limit=1': { total: 9, bytes: 3 * 1073741824 },
  '/api/sources': sources,
  '/api/library-processing': { status: 'idle' },
  '/api/media-repair': IDLE_REPAIR,
  '/api/libraries': { libraries: [] },
  '/api/organize': organizeIdle,
  '/api/links': { total: 0, entities: 0, by_kind: {}, top_hosts: [], top_host_link_ids: {} },
  '/api/links/check': { status: 'idle', check_id: '', checked: 0, total: 0, gone: [], unclear: [], scope: '' },
  '/api/links/prune': { status: 'idle' },
  '/api/orphan-records': { total: 0, items: [] },
  '/api/resource-sync/scan': { status: 'idle', scan_id: '' },
  '/api/resource-sync/apply': { status: 'idle' },
});

async function openPage(sources: MediaSourcesData = withRoots, patch: Record<string, Route> = {}) {
  const server = serve({ ...pageRoutes(sources), ...patch });
  await prefetchDataCleanup(new AbortController().signal);
  const open = vi.fn<(section: DataCleanupSection) => void>();
  const navigate = vi.fn<(path: string) => void>();
  const host = await wrap(<DataCleanupPage toast={vi.fn()} failure={vi.fn()} open={open} navigate={navigate} />);
  await settle();
  return { host, open, navigate, server };
}

async function openTool(tool: CleanupToolKey, sources: MediaSourcesData = withRoots, patch: Record<string, Route> = {}) {
  const server = serve({ ...pageRoutes(sources), ...patch });
  await prefetchDataCleanupTool(tool, new AbortController().signal);
  const host = await wrap(<DataCleanupToolPage tool={tool} toast={vi.fn()} failure={vi.fn()} />);
  await settle();
  return { host, server };
}

const entry = (host: ParentNode, section: DataCleanupSection) =>
  host.querySelector<HTMLButtonElement>(`[data-cleanup-go="${section}"]`);

describe('读数卡', () => {
  it('单面板分区的标题只在面板内显示', async () => {
    serve(pageRoutes(withRoots));
    const host = await wrap(<><DataCleanupToolPage tool="links" toast={vi.fn()} failure={vi.fn()} />
      <DataCleanupToolPage tool="resource-sync" toast={vi.fn()} failure={vi.fn()} /></>);
    await settle();
    for (const id of ['link-manager', 'resource-sync']) {
      const section = host.querySelector(`#${id}`)!;
      const title = section.querySelector(`#${id}-title`)!;
      expect(title.tagName).toBe('H3');
      expect(title.parentElement).not.toBe(section);
      expect(section.querySelector(':scope > h2, :scope > h3')).toBeNull();
    }
  });

  it('Review keeps its top three kinds and merges the rest into one; junk breakdowns list only categories with content', () => {
    expect(reviewSummary({ counts: { metadata_fields: 12, performer_avatars: 3, studio_logos: 2, creator_tags: 1 } }))
      .toEqual({ figure: '18 items to review', meta: 'Metadata fields 12 · Performer avatars 3 · Label logo 2 · 1 more' });
    expect(junkBreakdown({ pending_total: 5, dismissed_total: 2, counts: { video: 4, image: 0, url: 1 } }))
      .toBe('Videos 4 · URL 1 · Dismissed 2');
  });

  it('The five cards read independently; clicking one switches to that page', async () => {
    const { host, open, server } = await openPage();
    expect(entry(host, 'review')?.textContent).toContain('18 items to review');
    expect(entry(host, 'quality')?.textContent).toContain('7 pending upgrade');
    expect(entry(host, 'duplicates')?.textContent).toContain('3 groups - 8 files');
    expect(entry(host, 'duplicates')?.textContent).toContain('Reclaimable 2.0 GB');
    expect(entry(host, 'ads')?.textContent).toContain('5 awaiting review');
    expect(entry(host, 'trash')?.textContent).toContain('9 items in trash');
    expect(entry(host, 'trash')?.textContent).toContain('Using 3.0 GB');
    for (const section of ['review', 'quality', 'duplicates', 'ads', 'trash'] as const) await click(entry(host, section));
    expect(open.mock.calls.map(([section]) => section)).toEqual(['review', 'quality', 'duplicates', 'ads', 'trash']);
    expect(server.unknown).toEqual([]);
  });

  it('One unfetchable card marks only itself "Load failed"', async () => {
    const { host } = await openPage(withRoots, { '/api/review?counts=1': failWith(500) });
    expect(entry(host, 'review')?.textContent).toContain('Load failed');
    expect(entry(host, 'trash')?.textContent).toContain('9 items in trash');
  });

  it('Trash counts follow the library selected in the sidebar', async () => {
    sessionStorage.setItem('peach.library', 'Cloud drive');
    const { server } = await openPage(withRoots, { '/api/items?state=trash&limit=1&library=Cloud%20drive': { total: 1, bytes: 0 } });
    expect(server.calls.map((call) => call.path)).toContain('/api/items?state=trash&limit=1&library=Cloud%20drive');
    expect(server.calls.map((call) => call.path)).not.toContain('/api/items?state=trash&limit=1');
  });
});

describe('资源同步', () => {
  it('首页不读取资源扫描，进入二级页后才按已配置根目录读取', async () => {
    expect(hasResourceRoots(withRoots)).toBe(true);
    expect(hasResourceRoots(withoutRoots)).toBe(false);
    const server = serve(pageRoutes(withRoots));
    await prefetchDataCleanup(new AbortController().signal);
    expect(server.calls.some(call => call.path.startsWith('/api/resource-sync'))).toBe(false);
    queryClient.clear();
    const shown = await openTool('resource-sync', withRoots);
    expect(shown.host.querySelector('#resource-sync')).not.toBeNull();
    queryClient.clear();
    const hidden = await openTool('resource-sync', withoutRoots);
    expect(hidden.host.querySelector('#resource-sync')).toBeNull();
    expect(hidden.host.textContent).toContain('尚未配置可核对的媒体目录');
    expect(hidden.server.calls.some((call) => call.path.startsWith('/api/resource-sync'))).toBe(false);
  });

  const scanned: ResourceScanState = {
    status: 'complete', scan_id: 'scan-7', missing: 4, empty: 3, unreadable: 0,
    cache: { files: 2, bytes: 1048576 * 5 },
    sources: [
      { location: 'local', online: true, total: 120, missing: 4, empty: 3, unreadable: 0 },
      { location: '115', online: false, total: 30, missing: 0, empty: 0, unreadable: 0 },
    ],
  };

  /** The execute row: POST starts the task and later GETs return `finished`; before any start it reads idle. */
  const applyRoute = (finished: object) => {
    let started = false;
    return (_body: unknown, method: string) => {
      if (method === 'POST') {
        started = true;
        return { status: 'running', job_id: 'apply-1' };
      }
      return started ? { status: 'complete', job_id: 'apply-1', ...finished } : { status: 'idle' };
    };
  };

  it('One row for the scanned sources, one row for the three kinds to delete; cleanup is a danger confirmation whose body states permanent deletion, and apply is sent only after confirming', async () => {
    const seen = confirmWith(true);
    const toast = vi.fn();
    const server = serve({
      '/api/resource-sync/scan': scanned,
      '/api/resource-sync/apply': applyRoute({
        purged: 4, blocked: [], dirs_removed: 3, dir_errors: 0, cache_removed: 2, bytes_reclaimed: 1048576 * 5,
        cache_blocked: [],
      }),
      '/api/items?state=trash&limit=1': { total: 0, bytes: 0 },
    });
    const host = await wrap(<ResourceSyncCard toast={toast} />);
    await settle();
    expect(host.textContent).toContain('Local disk');
    expect(host.querySelector('[data-connection-tone="warning"]')?.textContent).toBe('Offline');
    expect(host.textContent).toContain('skipped this run');
    expect(host.textContent).toContain('30 items in the library');
    expect(host.textContent).toContain('Empty folders');
    expect(host.textContent).toContain('3 items');
    expect(host.textContent).toContain('Pending permanent deletion');
    expect(host.textContent).toContain('Keep source roots');
    expect(server.posts('/api/resource-sync/apply')).toEqual([]);
    await click(buttonNamed('Clean up stale entries', host));
    await settle();
    expect(seen).toHaveLength(1);
    expect(seen[0]!.title).toBe('Clean up stale entries');
    expect(seen[0]!.danger).toBe(true);
    expect(seen[0]!.body).toBe(
      'Will permanently delete 4 records whose files are no longer on disk (including those in trash) and 3 empty folders, Also cleans 2 idle caches. Source root directories are kept. This step cannot be undone.');
    expect(server.posts('/api/resource-sync/apply')).toEqual([
      { confirm: true, clean_cache: true, scan_id: 'scan-7', background: true },
    ]);
    await settle();
    expect(toast).toHaveBeenCalledWith('Cleaned dead entries');
    expect(host.textContent).toContain('Permanently deleted 4 stale records and 3 empty folders, Cleaned 2 caches, freeing 5 MB.');
  });

  it('Confirmed sources show while the remaining sources are still scanning, and these results survive a task failure', async () => {
    const state = { status: 'running', scan_id: 'scan-partial', completed_sources: 1, total_sources: 2,
      sources: [scanned.sources![0]!] };
    serve({ '/api/resource-sync/scan': state, '/api/resource-sync/apply': { status: 'idle' } });
    const host = await wrap(<ResourceSyncCard toast={vi.fn()} />);
    await settle();
    expect(host.textContent).toContain('Local disk');
    expect(host.textContent).toContain('3 empty folders');
    expect(buttonNamed('Clean up stale entries', host)).toBeNull();
    expect(host.textContent).not.toContain('Cleanable caches');
    await act(async () => { queryClient.setQueryData(RESOURCE_SCAN_KEY, {
      ...state, status: 'failed', error: 'Second source unreadable',
    }); });
    expect(host.textContent).toContain('Local disk');
    expect(host.textContent).toContain('Second source unreadable');
  });

  it('Items with personal records get their own tier: the stat card and confirm dialog report deletions and marked-vanished counts separately, and the result only reports reattachments', async () => {
    const seen = confirmWith(true);
    serve({
      '/api/resource-sync/scan': {
        ...scanned, purge: 3, vanish: 2,
        sources: [{ ...scanned.sources![0]!, vanish: 2 }, scanned.sources![1]!],
      },
      '/api/resource-sync/apply': applyRoute({
        purged: 3, vanished: 1, reattached: 1, blocked: [], dirs_removed: 3, dir_errors: 0, cache_removed: 2,
        bytes_reclaimed: 0, cache_blocked: [],
      }),
      '/api/items?state=trash&limit=1': { total: 0, bytes: 0 },
    });
    const host = await wrap(<ResourceSyncCard toast={vi.fn()} />);
    await settle();
    expect(host.textContent).toContain('Will be marked as vanished');
    expect(host.textContent).toContain('2 items carry personal records');
    await click(buttonNamed('Clean up stale entries', host));
    await settle();
    expect(seen[0]!.body).toBe(
      'Will permanently delete 3 records whose files are no longer on disk (including those in trash) and 3 empty folders, Also cleans 2 idle caches. Source root directories are kept. These cannot be undone.'
      + ' Files are lost for 2 video records; personal records are kept, and can be transferred or deleted under "Records with lost files".');
    await settle();
    expect(host.textContent).toContain(
      '1 video record was marked as missing files and can be handled under "Records with missing files". Records for 1 item were reattached to another edition in the library.');
  });

  it('Items where files remain and the directory cannot be deleted during review stay in place: raise the warning tier, and the result bar says partially complete', async () => {
    confirmWith(true);
    const toast = vi.fn();
    serve({
      '/api/resource-sync/scan': scanned,
      '/api/resource-sync/apply': applyRoute({
        purged: 3, blocked: [{ id: 9, name: 'Back Again.mp4', reason: 'present' }], dirs_removed: 2, dir_errors: 1,
        cache_removed: 2, bytes_reclaimed: 0, cache_blocked: [],
      }),
      '/api/items?state=trash&limit=1': { total: 0, bytes: 0 },
    });
    const host = await wrap(<ResourceSyncCard toast={toast} />);
    await settle();
    await click(buttonNamed('Clean up stale entries', host));
    await settle();
    await settle();
    expect(toast).toHaveBeenCalledWith('Completed 7 items, 2 items not processed', { warning: true });
    expect(host.textContent).toContain('Partially finished');
    expect(host.textContent).toContain('1 record was not deleted ("Back Again.mp4"), 1 folder was not deleted; retry after rechecking.');
  });

  it('Cancelling the confirm does not send apply', async () => {
    confirmWith(false);
    const server = serve({ '/api/resource-sync/scan': scanned, '/api/resource-sync/apply': { status: 'idle' } });
    const host = await wrap(<ResourceSyncCard toast={vi.fn()} />);
    await settle();
    await click(buttonNamed('Clean up stale entries', host));
    await settle();
    expect(server.posts('/api/resource-sync/apply')).toEqual([]);
  });

  it('With nothing to clean there is no clean key, just a line saying so', async () => {
    serve({
      '/api/resource-sync/scan': { ...scanned, missing: 0, empty: 0, cache: { files: 0, bytes: 0 } },
      '/api/resource-sync/apply': { status: 'idle' },
    });
    const host = await wrap(<ResourceSyncCard toast={vi.fn()} />);
    await settle();
    expect(buttonNamed('Clean up stale entries', host)).toBeNull();
    expect(host.textContent).toContain('Reachable sources checked; no records, empty folders, or caches waiting for cleanup.');
  });

  it('Even when only empty folders need deleting the clean key shows', async () => {
    serve({
      '/api/resource-sync/scan': { ...scanned, missing: 0, empty: 2, cache: { files: 0, bytes: 0 } },
      '/api/resource-sync/apply': { status: 'idle' },
    });
    const host = await wrap(<ResourceSyncCard toast={vi.fn()} />);
    await settle();
    expect(buttonNamed('Clean up stale entries', host)).not.toBeNull();
  });
});

describe('链接管理', () => {
  it('主要站点分别链接到主页并通过本站读取 favicon，图标失败时保留链接', async () => {
    const { host } = await openTool('links', withRoots, {
      '/api/links': { total: 8, entities: 3, by_kind: {}, top_hosts: [['example.com', 5], ['example.org', 3]], top_host_link_ids: { 'example.com': 8, 'example.org': 9 } },
    });
    const link = host.querySelector<HTMLAnchorElement>('#link-manager a[href="https://example.com"]')!;
    expect(link.textContent).toBe('example.com');
    expect(link.parentElement?.textContent).toBe('example.com5');
    expect(link.querySelector('svg')).not.toBeNull();
    expect(link.rel).toContain('noopener');
    const image = link.querySelector('img')!;
    expect(image.getAttribute('src')).toBe('/link-mark?id=8');
    await act(async () => { image.dispatchEvent(new Event('error')) });
    expect(link.querySelector('img')).toBeNull();
    expect(link.querySelector('svg')).not.toBeNull();
    expect(link.href).toBe('https://example.com/');
  });
  const row = (id: number, patch: Partial<LinkCheckState['gone'][number]> = {}) => ({
    id, entity: `Performer ${id}`, link_kind: 'official', label: 'Official site', url: `https://example.com/talent/${id}`, note: '404', ...patch,
  });
  const checked: LinkCheckState = {
    status: 'complete', check_id: 'check-3', checked: 3, total: 3, scope: 'all',
    gone: [row(1)], unclear: [row(2, { note: '403', link_kind: 'social' }), row(3, { note: '500' })],
  };
  const stats = {
    total: 719, entities: 210, by_kind: { official: 224, social: 373, catalog: 100, source_reference: 22 },
    top_hosts: [['x.com', 300], ['instagram.com', 70], ['linktr.ee', 3], ['tiktok.com', 1]],
    top_host_link_ids: { 'x.com': 1, 'instagram.com': 2, 'linktr.ee': 3, 'tiktok.com': 4 },
  };

  it('The results table identifies subjects by their avatar and link site favicon, with a readable fallback for link names', async () => {
    serve({ '/api/links': stats, '/api/links/check': { ...checked,
      gone: [row(1, { entity_id: 31, entity_kind: 'performer', face: { id: 31, name: 'Performer 1', has_image: true, image_version: 'v1' } })],
      unclear: [row(2, { label: '' })],
    }, '/api/links/prune': { status: 'idle' } });
    const host = await wrap(<LinkManager />);
    await settle();
    const gone = host.querySelector('[aria-label="Address expired"]')!;
    expect(gone.textContent).toContain('Link name');
    expect(gone.textContent).toContain('Peach profile');
    expect(gone.querySelector('[data-link-identity]')?.getAttribute('href')).toBe('/performers/31');
    expect(gone.querySelector('[data-link-identity] img')?.getAttribute('src')).toContain('/entity-image?kind=performer&id=31');
    expect(gone.querySelector('[data-link-address] img')?.getAttribute('src')).toBe('/link-mark?id=1');
    expect(gone.querySelector('[data-link-name] img')).toBeNull();
    const unclear = host.querySelector('[aria-label="This visit did not succeed"]')!;
    expect(unclear.querySelector('[data-link-name]')?.textContent).toBe('example.com');
    expect(unclear.querySelector('[data-link-identity]')?.textContent).toContain('Performer 2');
  });

  it('Each link kind gets its own cell, types use their UI names, and only the top three main sites are listed', async () => {
    serve({ '/api/links': stats, '/api/links/check': { ...checked, status: 'idle' }, '/api/links/prune': { status: 'idle' } });
    const host = await wrap(<LinkManager />);
    await settle();
    const cells = [...host.querySelectorAll('.link-stat-grid > div')].map((cell) => cell.textContent);
    expect(cells).toEqual([
      'Total links719Spread across 210 performers, studios, and series', 'Official site/agency224', 'Social accounts373', 'Video profile sites100', 'Details sources22',
    ]);
    expect([...host.querySelectorAll('#link-manager a')].map((link) => link.textContent))
      .toEqual(['x.com', 'instagram.com', 'linktr.ee']);
    expect(host.textContent).not.toContain('tiktok.com');
  });

  it('Expired and never-succeeded entries live in two tables; deleting is a guarded confirmation that sends this round\'s check number only after it', async () => {
    const seen = confirmWith(true);
    let started = false;
    const server = serve({
      '/api/links': stats, '/api/links/check': checked,
      '/api/links/prune': (_body: unknown, method: string) => {
        if (method === 'POST') started = true;
        return started ? { ok: true, status: 'running', job_id: 'prune-1' } : { status: 'idle' };
      },
    });
    const host = await wrap(<LinkManager />);
    await settle();
    expect(host.querySelector('[aria-label="Address expired"]')?.textContent).toContain('Performer 1');
    expect(host.querySelector('[aria-label="This visit did not succeed"]')?.textContent).toContain('Social accounts');
    await click(buttonNamed('Delete 1 dead link', host));
    await settle();
    expect(seen).toHaveLength(1);
    expect(seen[0]!.danger).toBe(true);
    expect(seen[0]!.body).toBe('This deletes 1 dead link. It is checked once more before deletion, and deletion cannot be undone.');
    expect(server.posts('/api/links/prune')).toEqual([{ confirm: true, check_id: 'check-3', background: true }]);
  });

  it('Cancelling confirmation sends no delete', async () => {
    confirmWith(false);
    const server = serve({ '/api/links': stats, '/api/links/check': checked, '/api/links/prune': { status: 'idle' } });
    const host = await wrap(<LinkManager />);
    await settle();
    await click(buttonNamed('Delete 1 dead link', host));
    await settle();
    expect(server.posts('/api/links/prune')).toEqual([]);
  });

  it('"Retry all now" revalidates only the entries that never verified successfully, carrying the check number of this run', async () => {
    const server = serve({
      '/api/links': stats,
      '/api/links/check': (body: { status_only?: boolean }) => (body.status_only
        ? checked
        : { ...checked, status: 'running', scope: 'retry', checked: 0, total: 2 }),
      '/api/links/prune': { status: 'idle' },
    });
    const host = await wrap(<LinkManager />);
    await settle();
    await click(buttonNamed('Retry all now (2)', host));
    await settle();
    expect(server.posts('/api/links/check').filter((body) => !(body as { status_only?: boolean }).status_only))
      .toEqual([{ retry: [2, 3], check_id: 'check-3' }]);
  });

  it('Server rejections return 200 with ok:false and are still reported as failures', async () => {
    serve({
      '/api/links': stats,
      '/api/links/check': (body: { status_only?: boolean }) => (body.status_only
        ? { ...checked, status: 'idle' }
        : { ok: false, error: 'The list went stale; check again' }),
      '/api/links/prune': { status: 'idle' },
    });
    const host = await wrap(<LinkManager />);
    await settle();
    await click(buttonNamed('Check dead links', host));
    await settle();
    expect(host.textContent).toContain('The list went stale; check again');
  });
});

describe('Orphan records', () => {
  const orphans: OrphanRecordsData = {
    total: 2,
    items: [
      {
        id: 7, name: 'ABC-123.mp4', code: 'ABC-123', location: 'local', duration: 3600, size: 10,
        vanished_at: 200, has_thumb: true, records: { asset_preference: 1, activity_event: 3, rating: 4, play_count: 2 },
        candidates: [
          { id: 9, location: 'local', name: 'ABC-123.mkv', duration: 3590, size: 20 },
          { id: 10, location: 'local', name: 'abc-123.mp4', duration: 1800, size: 5 },
        ],
      },
      {
        id: 12, name: 'seaside.mp4', code: '', location: 'local', duration: 600, size: 10,
        vanished_at: 100, has_thumb: false, records: { watch_queue: 1, last_played: 1 }, candidates: [],
      },
    ],
  };

  it('没有已消失的作品时二级页保留空表和零计数', async () => {
    const { host, server } = await openTool('orphan-records');
    expect(host.querySelector('#orphan-records')?.textContent).toContain('0 条作品');
    expect(host.querySelectorAll('#orphan-records tbody tr[data-row-id]')).toHaveLength(0);
    expect(server.calls.map((call) => call.path)).toContain('/api/orphan-records');
  });

  it('Each row lists personal records and candidate files; rows without candidates offer only delete-record', async () => {
    serve({ '/api/orphan-records': orphans });
    const host = await wrap(<OrphanRecordsCard toast={vi.fn()} />);
    await settle();
    const rows = [...host.querySelectorAll('[aria-label="Videos whose files disappeared"] tbody tr')];
    expect(rows).toHaveLength(2);
    expect(rows[0]!.textContent).toContain('Likes and reasons 1 · Watch history 3 · Rating 4 · Played 2 times');
    expect(rows[0]!.textContent).toContain('ABC-123.mkv · 60 min');
    expect(rows[0]!.querySelector('img')?.getAttribute('src')).toBe('/thumb?id=7&c=4');
    expect(rows[1]!.textContent).toContain('Watch later 1 · Played');
    expect(rows[1]!.querySelector('[role="combobox"]')).toBeNull();
    expect(buttonNamed('Move records', rows[1]!)).toBeFalsy();
    expect(buttonNamed('Delete records', rows[1]!)).toBeTruthy();
  });

  it('Delete-record sits leftmost, and move-records is the row\'s primary action placed rightmost', async () => {
    serve({ '/api/orphan-records': orphans });
    const host = await wrap(<OrphanRecordsCard toast={vi.fn()} />);
    await settle();
    const row = host.querySelector('[aria-label="Videos whose files disappeared"] tbody tr')!;
    const order = actionOrder(buttonNamed('Delete records', row)!.parentElement);
    expect(order[0]).toBe('Delete records');
    expect(order.at(-1)).toBe('Move records');
    expect(buttonNamed('Move records', row)!.className).toContain('bg-button-primary');
  });

  it('Transfer records are sent directly; the target defaults to the one with the closest duration', async () => {
    const server = serve({ '/api/orphan-records': orphans, '/api/orphan-records/attach': { ok: true, batch: 'user:reattach@1' } });
    const toast = vi.fn();
    const host = await wrap(<OrphanRecordsCard toast={toast} />);
    await settle();
    await click(buttonNamed('Move records', host));
    await settle();
    expect(server.posts('/api/orphan-records/attach')).toEqual([{ id: 7, target: 9 }]);
    expect(toast).toHaveBeenCalledWith('Moved the personal records of "ABC-123.mp4" to "ABC-123.mkv"');
  });

  /** Click 'Delete record' on the second entry and hand back what the popover wrote plus the batch request it sent. */
  async function purgeSecond(answer: boolean) {
    const seen = confirmWith(answer);
    const server = serve({ '/api/orphan-records': orphans, '/api/batch': { ok: true, purged: 1, blocked: [] } });
    const host = await wrap(<OrphanRecordsCard toast={vi.fn()} />);
    await settle();
    await click(buttonNamed('Delete records', host.querySelectorAll('[aria-label="Videos whose files disappeared"] tbody tr')[1]!));
    await settle();
    return { seen, posts: server.posts('/api/batch') };
  }

  it('Deleting records requires a danger confirmation whose body states it is irreversible; the batch delete fires only after confirming', async () => {
    const { seen, posts } = await purgeSecond(true);
    expect(seen[0]!.danger).toBe(true);
    expect(seen[0]!.body).toBe('Will delete the video records of "seaside.mp4" and their personal records (Watch later 1 · Played). This cannot be undone.');
    expect(posts).toEqual([{ ids: [12], operation: 'delete' }]);
  });

  it('Cancelling confirmation sends no delete', async () => {
    expect((await purgeSecond(false)).posts).toEqual([]);
  });

  it('Batch delete covers cross-page selection; canceling the confirmation sends no request, and file restore shows the kept count', async () => {
    const items = Array.from({ length: 23 }, (_, index) => ({ ...orphans.items[1]!, id: index + 30, name: `Video ${index}` }));
    const server = serve({ '/api/orphan-records': { total: items.length, items },
      '/api/batch': { ok: true, purged: 1, blocked: [50] } });
    const toast = vi.fn();
    const host = await wrap(<OrphanRecordsCard toast={toast} />);
    await settle();
    await click(host.querySelector('input[aria-label="Select Video 0"]'));
    await click(buttonNamed('Next page', host));
    await click(host.querySelector('input[aria-label="Select Video 20"]'));
    confirmWith(false);
    await click(buttonNamed('Delete selected records (2)', host));
    expect(server.posts('/api/batch')).toEqual([]);
    const seen = confirmWith(true);
    await click(buttonNamed('Delete selected records (2)', host));
    await settle();
    expect(seen[0]!.items).toEqual(['Video 0', 'Video 20']);
    expect(server.posts('/api/batch')).toEqual([{ ids: [30, 50], operation: 'delete' }]);
    expect(toast).toHaveBeenCalledWith('Deleted 1 video record and its personal records; 1 file was restored, records not deleted');
  });
});

describe('Organize', () => {
  it('Every parameter can be inserted into the template; by default it appends to the filename and leaves the cursor after the parameter', async () => {
    serve({ '/api/organize': organizeIdle });
    queryClient.setQueryData(['organize'], organizeIdle);
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    const file = host.querySelector<HTMLInputElement>('input[placeholder="{code}[ {title}]"]')!;
    for (const { key, label } of organizeIdle.placeholders) {
      const before = file.value;
      await click(host.querySelector(`button[aria-label="${label} {${key}}"]`));
      expect(file.value).toBe(`${before}{${key}}`);
      expect(document.activeElement).toBe(file);
      expect(file.selectionStart).toBe(file.value.length);
    }
  });

  it('Parameters replace the folder template\'s selection, consecutive inserts reuse the cursor, and file names stay untouched', async () => {
    serve({ '/api/organize': organizeIdle });
    queryClient.setQueryData(['organize'], organizeIdle);
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    const dir = host.querySelector<HTMLInputElement>('input[placeholder="Leave empty to rename in place"]')!;
    await type(dir, 'Label/video');
    await act(async () => { dir.focus(); dir.setSelectionRange(6, 11) });
    await click(host.querySelector('button[aria-label="Code {code}"]'));
    expect(dir.value).toBe('Label/{code}');
    await click(host.querySelector('button[aria-label="Title {title}"]'));
    expect(dir.value).toBe('Label/{code}{title}');
    expect(document.activeElement).toBe(dir);
    expect(host.querySelector<HTMLInputElement>('input[placeholder="{code}[ {title}]"]')!.value).toBe('{code}');
  });

  it('Applying a template replaces both inputs, and editing params requires previewing again', async () => {
    const server = organizeServer();
    queryClient.setQueryData(['organize'], organizeIdle);
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    await click(buttonNamed('Preview', host));
    await settle();
    expect(buttonNamed('Run organizing', host)).not.toBeNull();
    await click(buttonNamed('Code + title', host));
    expect(buttonNamed('Run organizing', host)).toBeNull();
    expect(host.querySelector<HTMLInputElement>('input[placeholder="{code}[ {title}]"]')!.value).toBe('{code}[ {title}]');
    expect(host.querySelector<HTMLInputElement>('input[placeholder="Leave empty to rename in place"]')!.value).toBe('{studio}');
    await click(host.querySelector('button[aria-label="Title {title}"]'));
    expect(host.querySelector<HTMLInputElement>('input[placeholder="{code}[ {title}]"]')!.value).toBe('{code}[ {title}]{title}');
    expect(server.posts('/api/organize/apply')).toEqual([]);
  });
  const plan = {
    counts: { change: 2, unchanged: 5 }, reasons: { 缺番号: 1 }, truncated: false,
    rows: [
      { current_path: 'R:\\media\\abc001.mp4', target_path: 'R:\\media\\S1\\ABC-001.mp4', action: 'move' },
      { current_path: 'R:\\media\\abc002.mp4', target_path: 'R:\\media\\S1\\ABC-002.mp4', action: 'move' },
    ],
  };

  function organizeServer(data: OrganizeData = organizeIdle) {
    return serve({
      '/api/organize': { ...data, status: 'running', job_id: 'org-1' },
      '/api/organize/preview': plan,
      '/api/organize/apply': { status: 'running', job_id: 'org-1' },
      '/api/organize/rollback': { status: 'running', job_id: 'org-2' },
      '/api/settings': { ok: true },
    });
  }

  it('The template box follows the stored template; preview sends this row\'s source and template, and preview never stores a template', async () => {
    const server = organizeServer();
    queryClient.setQueryData(['organize'], organizeIdle);
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    const file = host.querySelector<HTMLInputElement>('input[placeholder="{code}[ {title}]"]');
    expect(file?.value).toBe('{code}');
    await type(file, ' {code} {title} ');
    await click(buttonNamed('Preview', host));
    await settle();
    expect(server.posts('/api/organize/preview')).toEqual([
      { location: 'local', path: '', file_template: '{code} {title}', dir_template: '' },
    ]);
    expect(server.posts('/api/settings')).toEqual([]);
    expect(host.textContent).toContain('2 files will be renamed or moved, 5 already have the target name; skipped 1 missing code.');
    expect(host.textContent).toContain('ABC-001.mp4');
  });

  it('Run confirms first; only after confirmation does it send apply, and once running it stores the template for this run', async () => {
    const seen = confirmWith(true);
    const server = organizeServer();
    queryClient.setQueryData(['organize'], organizeIdle);
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    expect(buttonNamed('Run organizing', host)).toBeNull();
    await click(buttonNamed('Preview', host));
    await settle();
    await click(buttonNamed('Run organizing', host));
    await settle();
    expect(seen.map((options) => options.title)).toEqual(['Organize files']);
    expect(seen[0]!.body).toContain("Local's file names and directories");
    expect(server.posts('/api/organize/apply')).toEqual([
      { location: 'local', path: '', file_template: '{code}', dir_template: '', confirm: true },
    ]);
    expect(server.posts('/api/settings')).toEqual([
      { organizeTemplates: { local: { file: '{code}', dir: '' } } },
    ]);
  });

  it('Path picker and input share the preview range; editing the path requires previewing again', async () => {
    const seen = confirmWith(true);
    const server = serve({
      '/api/organize': { ...organizeIdle, status: 'running' },
      '/api/organize/preview': plan,
      '/api/organize/apply': { status: 'running', job_id: 'scoped-1' },
      '/api/pick-folder': { path: 'R:\\media\\compilations' },
      '/api/settings': { ok: true },
    });
    queryClient.setQueryData(['organize'], organizeIdle);
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    const path = host.querySelector<HTMLInputElement>('input[name="organize-path"]');
    await click(host.querySelector('[aria-label="Choose the organize path"]'));
    await settle();
    expect(server.posts('/api/pick-folder')).toEqual([{ initial: 'R:\\media' }]);
    expect(path?.value).toBe('R:\\media\\compilations');
    await click(buttonNamed('Preview', host));
    await settle();
    expect(server.posts('/api/organize/preview')[0]).toMatchObject({ path: 'R:\\media\\compilations' });
    await type(path, 'R:\\media\\misc');
    expect(buttonNamed('Run organizing', host)).toBeNull();
    await click(buttonNamed('Preview', host));
    await settle();
    await click(buttonNamed('Run organizing', host));
    await settle();
    expect(seen[0]?.body).toContain('R:\\media\\misc');
    expect(server.posts('/api/organize/apply')[0]).toMatchObject({ path: 'R:\\media\\misc', confirm: true });
  });

  it('Canceling directory selection keeps the input; switching sources clears the path and preview', async () => {
    const data = { ...organizeIdle, locations: [...organizeIdle.locations, { location: '115', roots: ['B:\\'] }] };
    serve({ '/api/organize': data, '/api/organize/preview': plan, '/api/pick-folder': { path: null } });
    queryClient.setQueryData(['organize'], data);
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    const path = host.querySelector<HTMLInputElement>('input[name="organize-path"]');
    await type(path, 'R:\\media\\compilations');
    await click(host.querySelector('[aria-label="Choose the organize path"]'));
    await settle();
    expect(path?.value).toBe('R:\\media\\compilations');
    await click(buttonNamed('Preview', host));
    await settle();
    await choose(host.querySelector('[aria-label="Which source to organize"]'), '115');
    expect(path?.value).toBe('');
    expect(buttonNamed('Run organizing', host)).toBeNull();
  });

  it('In the bottom bar rollback sits left, preview centered, and run organize rightmost; preview demotes to secondary only when run organize is present', async () => {
    organizeServer({ ...organizeIdle, last_batch: 'batch-9' });
    queryClient.setQueryData(['organize'], { ...organizeIdle, last_batch: 'batch-9' });
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    const footer = () => host.querySelector('[data-cleanup-organize] footer');
    expect(actionOrder(footer())).toEqual(['Roll back last batch', 'Preview']);
    expect(buttonNamed('Preview', host)!.className).toContain('bg-button-primary');
    await click(buttonNamed('Preview', host));
    await settle();
    expect(actionOrder(footer())).toEqual(['Roll back last batch', 'Preview', 'Run organizing']);
    expect(buttonNamed('Preview', host)!.className).not.toContain('bg-button-primary');
    expect(buttonNamed('Run organizing', host)!.className).toContain('bg-button-primary');
  });

  it('Rollback is only offered with a previous batch; rollback also confirms first, and cancel sends nothing', async () => {
    const seen = confirmWith(false);
    const server = organizeServer({ ...organizeIdle, last_batch: 'batch-9' });
    queryClient.setQueryData(['organize'], { ...organizeIdle, last_batch: 'batch-9' });
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    await click(buttonNamed('Roll back last batch', host));
    await settle();
    expect(seen.map((options) => options.title)).toEqual(['Roll back the previous organize batch']);
    expect(server.posts('/api/organize/rollback')).toEqual([]);
    expect(server.posts('/api/organize/apply')).toEqual([]);

    queryClient.clear();
    queryClient.setQueryData(['organize'], organizeIdle);
    const fresh = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    expect(buttonNamed('Roll back last batch', fresh)).toBeNull();
  });

  it('The rollback request is sent only after confirmation, and the body is confirm only', async () => {
    confirmWith(true);
    const server = organizeServer({ ...organizeIdle, last_batch: 'batch-9' });
    queryClient.setQueryData(['organize'], { ...organizeIdle, last_batch: 'batch-9' });
    const host = await wrap(<OrganizeCard toast={vi.fn()} failure={vi.fn()} />);
    await click(buttonNamed('Roll back last batch', host));
    await settle();
    expect(server.posts('/api/organize/rollback')).toEqual([{ confirm: true }]);
  });
});
