/* Duplicate files page: who to keep per group, bulk keep, trashing, and undo.
 *
 * The first screen lands in the shared cache exactly like the real path (the legacy layer's `prefetch` step), and the page reads it directly on mount. */
import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as legacyUi from '@peach/legacy/ui';

import { DuplicatesPage } from '../../src/react/duplicates/duplicates-page';
import {
  cloudPreferenceLocations, distinctName, DUPLICATES_KEY, duplicateVictims, mixedCloudPreferences, prefetchDuplicates,
  sharedNamePrefix,
  type DuplicateFile, type DuplicateGroup, type DuplicatesData,
} from '../../src/react/duplicates/duplicates';
import { cloudLocations, MEDIA_SOURCES_KEY, type MediaSourcesData } from '../../src/react/media-sources';
import { queryClient } from '../../src/react/query';
import { buttonNamed, click, fetchMock, mount, sentBody, settle } from './render';

afterEach(() => { queryClient.clear() });
notifyManager.setScheduler((notify) => notify());

const GB = 1073741824;

const file = (id: number, patch: Partial<DuplicateFile> = {}): DuplicateFile => ({
  id, name: `ABC-${id}.mp4`, path: `R:\\media\\ABC-${id}.mp4`, location: 'local', drive: 'R:',
  size: GB, duration: 3600, is_largest: false, is_longest: false, ...patch,
});

const group = (code: string, files: DuplicateFile[], patch: Partial<DuplicateGroup> = {}): DuplicateGroup => ({
  code, files, count: files.length, identical: false, drives: ['R:'], cross_drive: false,
  reclaimable: GB, ...patch,
});

/** One group is all local; the other mixes local with 115. */
const groups = [
  group('ABC-001', [file(1, { size: 2 * GB, is_largest: true }), file(2, { is_longest: true })], { identical: true }),
  group('ABC-002', [file(3, { size: 3 * GB, is_largest: true, is_longest: true }), file(4, { location: '115', drive: 'B:' })],
    { cross_drive: true, drives: ['R:', 'B:'] }),
];
const data: DuplicatesData = { total: 2, files: 4, reclaimable: 2 * GB, groups };
const sources: MediaSourcesData = {
  sources: [{ location: 'local', online: true, roots: [{ online: true }] }, { location: '115', online: false, roots: [{ online: false }] },
    { location: 'pikpak', online: true, roots: [] }],
};

type Confirmation = Parameters<typeof legacyUi.confirmModal>[0];

/** Clicks confirm on the confirmation popover directly, and records what the popover says. */
function confirmEverything() {
  const seen: Confirmation[] = [];
  vi.spyOn(legacyUi, 'confirmModal').mockImplementation((async (options: Confirmation) => {
    seen.push(options);
    await options.onConfirm?.();
    return { confirmed: true };
  }) as typeof legacyUi.confirmModal);
  return seen;
}

async function open(payload: DuplicatesData = data) {
  queryClient.setQueryData(DUPLICATES_KEY, payload);
  queryClient.setQueryData(MEDIA_SOURCES_KEY, sources);
  const props = { openItem: vi.fn(), toast: vi.fn(), failure: vi.fn() };
  const host = await mount(<QueryClientProvider client={queryClient}><DuplicatesPage {...props} /></QueryClientProvider>);
  return { host, ...props };
}

const card = (host: ParentNode, code: string) => host.querySelector(`section[aria-label="${code}"]`)!;

describe('Drive keep options', () => {
  it('Local and online sources do not count as cloud drives; a configured but offline drive still counts, and one without a root does not', () => {
    expect(cloudLocations({ sources: [{ location: 'local', online: true }, { location: 'online', online: true }] })).toEqual([]);
    expect(cloudLocations(sources)).toEqual(['115']);
  });

  it('Only drives actually present in the group and configured qualify', () => {
    expect(cloudPreferenceLocations([{ location: 'local' }], ['115', 'pikpak'])).toEqual([]);
    expect(cloudPreferenceLocations([{ location: 'local' }, { location: '115' }], ['115', 'pikpak'])).toEqual(['115']);
    expect(cloudPreferenceLocations([{ location: '115' }], [])).toEqual([]);
  });

  it('"Keep on 115" is not offered when the whole group is on one drive: keeping it and keeping the largest are the same outcome', () => {
    expect(mixedCloudPreferences([{ location: '115' }, { location: '115' }], ['115'])).toEqual([]);
    expect(mixedCloudPreferences([{ location: '115' }, { location: 'local' }], ['115'])).toEqual(['115']);
  });
});

describe('Who each group keeps', () => {
  it('Keep largest and keep longest follow whichever the server marked; when a cloud drive is named and it is not there, fall back to the largest in the whole group; trashing the whole group keeps nothing', () => {
    expect(duplicateVictims(groups, 'largest')).toEqual([2, 4]);
    expect(duplicateVictims(groups, 'longest')).toEqual([1, 4]);
    expect(duplicateVictims(groups, '115')).toEqual([2, 3]);
    expect(duplicateVictims([groups[1]!], 'all')).toEqual([3, 4]);
  });
});

it('The first screen fetches grouping and source reachability once, with no backfill after the page mounts', async () => {
  const fetcher = vi.fn(async (path: string) => ({
    ok: true, status: 200, json: async () => (path === '/api/sources' ? sources : data),
  }));
  vi.stubGlobal('fetch', fetcher);
  await prefetchDuplicates(new AbortController().signal);
  const host = await mount(
    <QueryClientProvider client={queryClient}>
      <DuplicatesPage openItem={vi.fn()} toast={vi.fn()} failure={vi.fn()} />
    </QueryClientProvider>);
  expect(fetcher.mock.calls.map((call) => call[0]).sort()).toEqual(['/api/duplicates?limit=120', '/api/sources']);
  expect(host.textContent).toContain('2 groups');
  expect(host.textContent).toContain('4 files - 2.0 GB reclaimable');
});

it('Group headers state the criteria: "identical" only when sha1 is complete, otherwise it is a duration inference; cross-drive groups show drive letters', async () => {
  vi.stubGlobal('fetch', fetchMock(200, {}));
  const { host } = await open();
  expect(card(host, 'ABC-001').textContent).toContain('sha1 matches');
  expect(card(host, 'ABC-002').textContent).toContain('Duration inference');
  expect(card(host, 'ABC-002').textContent).toContain('Across drives R: B:');
  expect(card(host, 'ABC-001').textContent).not.toContain('Across drives');
});

it('"Keep 115" appears only in the group mixing files from 115 and elsewhere, and the same goes for "Prefer all 115" on the batch bar', async () => {
  vi.stubGlobal('fetch', fetchMock(200, {}));
  const { host } = await open();
  expect(buttonNamed('Keep 115', card(host, 'ABC-001'))).toBeNull();
  expect(buttonNamed('Keep 115', card(host, 'ABC-002'))).not.toBeNull();
  expect(buttonNamed('Prefer all from 115', host)).not.toBeNull();
  expect(buttonNamed('Keep 115', card(host, 'ABC-002'))?.querySelector('svg use')?.getAttribute('href'))
    .toBe(`#i-${legacyUi.MEDIA_SOURCE_ICONS['115']}`);
  expect(buttonNamed('Prefer all from 115', host)?.querySelector('svg use')?.getAttribute('href'))
    .toBe(`#i-${legacyUi.MEDIA_SOURCE_ICONS['115']}`);
  expect(buttonNamed('Prefer all from PikPak', host)).toBeNull();
});

it('Bulk keep-largest confirms first, with the dialog naming the counts and bytes; after confirming they go to trash and the receipt carries undo', async () => {
  const seen = confirmEverything();
  const fetcher = fetchMock(200, { ok: true });
  vi.stubGlobal('fetch', fetcher);
  const { host, toast } = await open();
  await click(buttonNamed('Keep all largest', host));
  await settle();
  expect(seen).toHaveLength(1);
  expect(seen[0]!.body).toContain('Will move the library records of 2 duplicate files to trash, keeping the largest one per group.');
  expect(seen[0]!.body).toContain('Files total 2.0 GB; records can be restored from trash.');
  const batch = fetcher.mock.calls.findIndex((call) => call[0] === '/api/batch');
  expect(sentBody(fetcher, batch)).toEqual({ ids: [2, 4], operation: 'dispose', disposal_reason: 'duplicate' });
  expect(toast).toHaveBeenCalledWith('Moved 2 items to trash', expect.objectContaining({ undo: expect.any(Function) }));
  const { undo } = toast.mock.calls[0]![1] as { undo(): Promise<void> };
  await undo();
  const batches = fetcher.mock.calls.flatMap((call, index) => (call[0] === '/api/batch' ? [index] : []));
  expect(sentBody(fetcher, batches.at(-1))).toEqual({ ids: [2, 4], operation: 'restore' });
});

it('At most 200 at once, with more sent in batches', async () => {
  confirmEverything();
  const fetcher = fetchMock(200, { ok: true });
  vi.stubGlobal('fetch', fetcher);
  const many = Array.from({ length: 251 }, (_, index) => file(index + 1, { is_largest: index === 0 }));
  const { host } = await open({ total: 1, files: 251, reclaimable: 250 * GB, groups: [group('BIG-001', many)] });
  await click(buttonNamed('Keep largest', card(host, 'BIG-001')));
  await settle();
  const batches = fetcher.mock.calls.flatMap((call, index) => (call[0] === '/api/batch' ? [sentBody(fetcher, index)] : []));
  expect(batches.map((body: { ids: number[] }) => body.ids.length)).toEqual([200, 50]);
});

it('Cancelling confirmation sends nothing', async () => {
  vi.spyOn(legacyUi, 'confirmModal').mockImplementation((async () => ({ confirmed: false })) as typeof legacyUi.confirmModal);
  const fetcher = fetchMock(200, { ok: true });
  vi.stubGlobal('fetch', fetcher);
  const { host } = await open();
  await click(buttonNamed('Recycle whole groups', card(host, 'ABC-001')));
  await settle();
  expect(fetcher.mock.calls.some((call) => call[0] === '/api/batch')).toBe(false);
});

it('「都保留」不进回收站也不弹确认，整组一条；回执撤销发回同一组', async () => {
  const confirm = vi.spyOn(legacyUi, 'confirmModal');
  const fetcher = fetchMock(200, { ok: true });
  vi.stubGlobal('fetch', fetcher);
  const { host, toast } = await open();
  await click(buttonNamed('都保留', card(host, 'ABC-002')));
  await settle();
  expect(confirm).not.toHaveBeenCalled();
  const batches = () => fetcher.mock.calls.flatMap((call, index) => (call[0] === '/api/batch' ? [sentBody(fetcher, index)] : []));
  expect(batches()).toEqual([{ ids: [3, 4], operation: 'keep-duplicates' }]);
  expect(toast).toHaveBeenCalledWith('ABC-002 这组都保留，不再列出', expect.objectContaining({ undo: expect.any(Function) }));
  const { undo } = toast.mock.calls[0]![1] as { undo(): Promise<void> };
  await undo();
  expect(batches().at(-1)).toEqual({ ids: [3, 4], operation: 'reconsider-duplicates' });
});

it('标过都保留的组数写在页尾，空态时也写', async () => {
  vi.stubGlobal('fetch', fetchMock(200, {}));
  const { host } = await open({ total: 0, files: 0, reclaimable: 0, groups: [], kept: 3 });
  expect(host.textContent).toContain('另有 3 组标记了都保留，不再列出；组里文件有增减时会重新列出。');
  const plain = await open();
  expect(plain.host.textContent).not.toContain('标记了都保留');
});

it('点封面或文件名打开那一项', async () => {
  vi.stubGlobal('fetch', fetchMock(200, {}));
  const { host, openItem } = await open();
  await click(host.querySelector('button[aria-label="Preview ABC-3.mp4"]'));
  await click(host.querySelector('button[title="ABC-4.mp4"]'));
  expect(openItem.mock.calls).toEqual([[3], [4]]);
});

it('Without duplicate groups it is one empty state and no bulk bar paints', async () => {
  vi.stubGlobal('fetch', fetchMock(200, {}));
  const { host } = await open({ total: 0, files: 0, reclaimable: 0, groups: [] });
  expect(host.textContent).toContain('No duplicates found');
  expect(buttonNamed('Keep all, max size', host)).toBeNull();
});

it('When copies in a group differ only in the middle, names drop the shared prefix back to a word boundary, keeping the difference in the displayed segment', () => {
  const names = ['ABC-123 [1080p] Mirror site Alpha.mp4', 'ABC-123 [720p] Mirror site Alpha.mp4', 'ABC-123 [480p] Mirror site Alpha.mp4'];
  const prefix = sharedNamePrefix(names);
  expect(prefix).toBe('ABC-123 [');
  expect(names.map((name) => distinctName(name, prefix)))
    .toEqual(['…1080p] Mirror site Alpha.mp4', '…720p] Mirror site Alpha.mp4', '…480p] Mirror site Alpha.mp4']);
  // When the common segment is too short, there is only one, or the whole name is the common segment, display as is.
  expect(sharedNamePrefix(['AB-1.mp4', 'AB-2.mp4'])).toBe('');
  expect(sharedNamePrefix(['ABC-123 copy.mp4'])).toBe('');
  expect(sharedNamePrefix(['ABC-123 part.mp4', 'ABC-123 part.mp4'])).toBe('ABC-123 part.');
  expect(distinctName('ABC-123 part.mp4', 'ABC-123 part.mp4')).toBe('ABC-123 part.mp4');
});
