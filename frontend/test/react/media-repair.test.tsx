/* The "Media repair" card on the data management page: library choice, confirmation, start and stop, and the run's outcome.
 *
 * The first screen lands in the shared cache exactly as in the real path (the legacy `prefetch` step), and the card reads it straight on mount. */
import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
import * as legacyUi from '@peach/legacy/ui';

import { MediaRepairCard } from '../../src/react/media-repair/media-repair-card';
import {
  IDLE_REPAIR, MEDIA_REPAIR_KEY, prefetchMediaRepair, REPAIR_LIBRARIES_KEY, statusLine,
  type MediaRepairState, type RepairLibrary,
} from '../../src/react/media-repair/media-repair';
import { queryClient } from '../../src/react/query';
import { buttonNamed, choose, click, fetchMock, mount, sentBody, settle } from './render';

afterEach(() => { queryClient.clear() });
notifyManager.setScheduler((notify) => notify());

const idle = IDLE_REPAIR;
const libraries: RepairLibrary[] = [
  { id: 'Cloud drive', name: 'Cloud drive', icon: '115', metered: false },
  { id: 'PikPak', name: 'PikPak', icon: 'heart', metered: true },
  { id: 'This machine', name: 'This machine', icon: 'local', metered: false },
];

const card = () => mount(<QueryClientProvider client={queryClient}><MediaRepairCard /></QueryClientProvider>);

async function open(state: MediaRepairState = idle) {
  queryClient.setQueryData(MEDIA_REPAIR_KEY, state);
  queryClient.setQueryData(REPAIR_LIBRARIES_KEY, libraries);
  return card();
}

it('The first screen fetches the task snapshot and libraries once, with no backfill after cards mount', async () => {
  const fetcher = vi.fn(async (path: string) => ({
    ok: true, status: 200,
    json: async () => (path === '/api/libraries' ? { libraries } : idle),
  }));
  vi.stubGlobal('fetch', fetcher);
  await prefetchMediaRepair(new AbortController().signal);
  const host = await card();
  expect(fetcher.mock.calls.map((call) => call[0]).sort()).toEqual(['/api/libraries', '/api/media-repair']);
  expect(host.querySelector('section[aria-label="Media repair"] h3')?.textContent).toBe('Media repair');
  expect(host.querySelector('[aria-haspopup="listbox"]')?.textContent).toBe('Media libraryCloud drive');
});

it('Every library in the dropdown carries its library icon, and the selected one shows its icon inside the box', async () => {
  vi.stubGlobal('fetch', fetchMock(200, idle));
  const host = await open();
  const trigger = host.querySelector('[aria-haspopup="listbox"]')!;
  expect(trigger.querySelector('use')?.getAttribute('href')).toBe('#i-fixture-115');
  await click(trigger);
  const options = [...document.querySelectorAll('[role="option"]')];
  expect(options.map((option) => option.querySelector('use')?.getAttribute('href')))
    .toEqual(['#i-fixture-115', '#i-heart', '#i-hard-drive']);
  await click(options[1]);
  expect(trigger.querySelector('use')?.getAttribute('href')).toBe('#i-heart');
  expect(trigger.textContent).toBe('Media libraryPikPak');
});

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

it('Repair starts with a confirmation; after confirming, the selected libraries are sent, and progress then reports which video the scan reached', async () => {
  vi.useFakeTimers();
  const seen = confirmEverything();
  const fetcher = fetchMock(200, { ...idle, status: 'running', library: 'PikPak', stage: 'Scan', checked: 3, total: 12 });
  vi.stubGlobal('fetch', fetcher);
  const host = await open();
  await choose(host.querySelector('[aria-haspopup="listbox"]'), 'PikPak');
  await click(buttonNamed('Start repair', host));
  await settle();
  expect(seen[0]?.title).toBe('Repair library "PikPak"');
  expect(seen[0]?.confirmLabel).toBe('Repair library');
  expect(seen[0]?.body).toContain('every repair pulls the whole video down again');
  expect(fetcher.mock.calls[0]?.[0]).toBe('/api/media-repair');
  expect(sentBody(fetcher)).toEqual({ library: 'PikPak', restart: true });
  const bar = host.querySelector('[role="progressbar"]');
  expect([bar?.getAttribute('aria-valuenow'), bar?.getAttribute('aria-valuemax')]).toEqual(['3', '12']);
  expect(host.querySelector('p[role="status"]')?.textContent).toBe('Scan 3 / 12');
  expect(buttonNamed('Stop', host)).not.toBeNull();
});

it('For libraries not on metered sources the confirm body never mentions traffic', async () => {
  const seen = confirmEverything();
  vi.stubGlobal('fetch', fetchMock(200, idle));
  const host = await open();
  await click(buttonNamed('Start repair', host));
  await settle();
  expect(seen[0]?.title).toBe('Repair library "Cloud drive"');
  expect(seen[0]?.body).toContain('Broken originals are renamed to a hidden file in the same directory');
  expect(seen[0]?.body).not.toContain('Pull once');
});

it('The repair phase names the current video, and stopping returns it to a startable state', async () => {
  vi.useFakeTimers();
  const fetcher = fetchMock(200, { ...idle, status: 'complete', library: 'Cloud drive', stage: 'Done', repaired: 2 });
  vi.stubGlobal('fetch', fetcher);
  const host = await open({
    ...idle, status: 'running', library: 'Cloud drive', stage: 'Repair', checked: 1, total: 2, found: 2, message: 'FC2-PPV-1.mp4',
  });
  expect(host.querySelector('p[role="status"]')?.textContent).toBe('Repairing 1 / 2 · FC2-PPV-1.mp4');
  await click(buttonNamed('Stop', host));
  await settle();
  expect(sentBody(fetcher)).toEqual({ stop: true });
  expect(host.querySelector('p[role="status"]')?.textContent).toBe('Repaired 2 videos');
  expect(buttonNamed('Start repair', host)).not.toBeNull();
});

it('Entering the page never replays completed repair notes', async () => {
  vi.useFakeTimers();
  const host = await open({ ...idle, status: 'complete', library: 'Cloud drive', stage: 'Done' });
  expect(host.textContent).not.toContain('Every title in this library plays directly');
  expect(host.querySelector('[role="status"]')).toBeNull();
});

it('When a video missing an index stalls because untrunc is not installed, point to the run info in the configuration page for the download', async () => {
  vi.useFakeTimers();
  confirmEverything();
  vi.stubGlobal('fetch', fetchMock(200, {
    ...idle, status: 'complete', library: 'Cloud drive', stage: 'Done', found: 2, failed: 2, missing_tool: 2,
  }));
  const host = await open();
  await click(buttonNamed('Start repair', host));
  await settle();
  expect(host.querySelector('p[role="status"]')?.textContent).toBe('Repaired 0, 2 could not be repaired');
  expect(host.textContent).toContain('2 videos missing the index need untrunc installed to be repaired; the download entry is under "Run info" on the configuration page.');
  await click(buttonNamed('Dismiss the note', host));
  expect(host.textContent).not.toContain('untrunc missing');
});

it('This check completion sends exactly one receipt', async () => {
  confirmEverything();
  vi.stubGlobal('fetch', fetchMock(200, { ...idle, status: 'complete', library: 'Cloud drive' }));
  queryClient.setQueryData(MEDIA_REPAIR_KEY, idle);
  queryClient.setQueryData(REPAIR_LIBRARIES_KEY, libraries);
  const toast = vi.fn();
  const host = await mount(<QueryClientProvider client={queryClient}><MediaRepairCard toast={toast} /></QueryClientProvider>);
  await click(buttonNamed('Start repair', host));
  await settle();
  expect(toast).toHaveBeenCalledExactlyOnceWith('Library checked; no videos need repair');
  expect(host.textContent).not.toContain('Nothing to fix');
});

it('Progress readout caps at the total: when the server reports more checked than the total it does not show 1,500 / 1,000', () => {
  expect(statusLine({ ...IDLE_REPAIR, status: 'running', stage: 'Repair', checked: 1500, total: 1000 }))
    .toBe('Repair 1,000 / 1,000');
});
