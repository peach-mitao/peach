/* Junk files queue: the fetch query string, address and category links, the count row skeleton and per-item waiting states, what a card draws,
 * what the three buttons hand to the shell, what remains on failure or when empty, and section-by-section reveal. */
import { act, useState } from 'react';
import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanJunkKind, junkCountSkeletonHtml, junkPath, junkRoute } from '../../src/junk-queue';
import { JunkQueuePage } from '../../src/react/junk-queue/junk-queue-page';
import {
  junkQueryString, type JunkItem, type JunkPage, type JunkQueueActions, type JunkQueueProps,
} from '../../src/react/junk-queue/junk-queue';
import { queryClient } from '../../src/react/query';
import { click, fetchMock, mount, pending, settle } from './render';

afterEach(() => { queryClient.clear() });
notifyManager.setScheduler((notify) => notify());

const junk = (id: number, extra: Partial<JunkItem> = {}): JunkItem =>
  ({ id, name: `Ad ${id}.mp4`, junk_kind: 'video', why: 'Filename looks like promo', size: 2 * 1048576, location: 'local', ...extra });

const answer = (items: JunkItem[], extra: Partial<JunkPage> = {}): JunkPage =>
  ({ items, total: items.length, all_total: items.length, dismissed_total: 0, counts: { video: items.length }, ...extra });

function actions(patch: Partial<JunkQueueActions> = {}): JunkQueueActions {
  return {
    navigate: vi.fn(), toggleSelection: vi.fn(), open: vi.fn(),
    reveal: vi.fn(async () => ''), operate: vi.fn(async () => {}), ...patch,
  };
}

function props(patch: Partial<JunkQueueProps> = {}): JunkQueueProps {
  const countRow = document.createElement('div');
  countRow.id = 'count';
  document.body.append(countRow);
  return {
    kind: '', view: 'pending', helpers: { badgeHtml: () => '<span>Local</span>' }, actions: actions(),
    batchSize: 60, revision: 1, selectMode: false, selected: new Set(), countRow,
    skeletonHtml: () => '<div class="grid"><div class="skeletoncard"></div></div>',
    settled: vi.fn(), ...patch,
  };
}

/** Mounts the queue and leaves a props-writing hook: exactly what the shell uses to push new addresses, epochs and selections. */
async function open(initial: JunkQueueProps) {
  let push!: (next: Partial<JunkQueueProps>) => void;
  function Harness() {
    const [current, setCurrent] = useState(initial);
    push = (next) => setCurrent((before) => ({ ...before, ...next }));
    return <QueryClientProvider client={queryClient}><JunkQueuePage {...current} /></QueryClientProvider>;
  }
  const host = await mount(<Harness />);
  await settle();
  return { host, update: (next: Partial<JunkQueueProps>) => act(async () => push(next)) };
}

/** The visible structure of both count rows. Class names compare word by word; the overlay scrollbar attaches only after mount (the property plus two hidden tracks),
 *  so it is not part of the skeleton. */
function countShape(root: Element | null | undefined): string {
  const copy = root?.cloneNode(true) as Element | undefined;
  if (!copy) return '';
  copy.querySelectorAll('.ovtrack,.ui-ov-edges').forEach((track) => track.remove());
  copy.querySelectorAll('[data-overlay-scrollbar]').forEach((el) => {
    el.removeAttribute('data-overlay-scrollbar');el.removeAttribute('data-overlay-axes');
  });
  copy.querySelectorAll('[class]').forEach((el) => el.setAttribute('class', el.className.toString().trim().split(/\s+/).join(' ')));
  return copy.outerHTML;
}

const cards = (root: ParentNode) => [...root.querySelectorAll<HTMLElement>('[data-junk-card]')];
const actionButton = (card: Element, action: string) => card.querySelector<HTMLButtonElement>(`[data-junk-action="${action}"]`);

describe('Address and fetch', () => {
  it('Category and view are read from the URL; unrecognized categories fall back to all, and the default tier is never written into the URL', () => {
    expect(junkRoute('?type=image&view=dismissed')).toEqual({ kind: 'image', view: 'dismissed' });
    expect(junkRoute('?type=bogus')).toEqual({ kind: '', view: 'pending' });
    expect(cleanJunkKind(null)).toBe('');
    expect(junkPath()).toBe('/junk-files');
    expect(junkPath('video', 'dismissed')).toBe('/junk-files?type=video&view=dismissed');
  });

  it('Fetches 200 items at a time; the category is included only when one is selected', async () => {
    expect(junkQueryString({ kind: '', view: 'pending' })).toBe('limit=200&status=pending');
    expect(junkQueryString({ kind: 'archive', view: 'dismissed' })).toBe('limit=200&status=dismissed&kind=archive');
    const fetcher = fetchMock(200, answer([junk(1)]));
    vi.stubGlobal('fetch', fetcher);
    await open(props({ kind: 'video' }));
    expect(fetcher.mock.calls[0]![0]).toBe('/api/ads?limit=200&status=pending&kind=video');
  });
});

describe('Count row', () => {
  it('The shell\'s skeleton matches the island\'s data-waiting version item for item, so takeover does not jump', async () => {
    const route = { kind: 'image', view: 'pending' } as const;
    const staticRow = document.createElement('div');
    staticRow.innerHTML = junkCountSkeletonHtml(route);
    const waiting = pending<unknown>();
    vi.stubGlobal('fetch', vi.fn(() => waiting.answer));
    const p = props(route);
    p.countRow!.innerHTML = junkCountSkeletonHtml(route);
    await open(p);
    const live = p.countRow!.querySelector('[data-junk-count]');
    expect(p.countRow!.querySelector('[data-junk-count-skeleton]')).toBeNull();
    expect(countShape(live)).toBe(countShape(staticRow.querySelector('[data-junk-count]')));
    expect(p.countRow!.getAttribute('aria-busy')).toBe('true');
    // While waiting for data the grid is a skeleton; no empty-state flash first.
    expect(document.querySelector('.skeletoncard')).not.toBeNull();
    expect(document.querySelector('[data-empty-state]')).toBeNull();
  });

  it('Data arrived: the summary shows this view\'s item count; categories with a count of 0 get no badge; the last item carries the excluded count', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([junk(1), junk(2)], {
      total: 2, all_total: 5, dismissed_total: 3, counts: { video: 2, image: 3 },
    })));
    const p = props();
    await open(p);
    const row = p.countRow!;
    expect(row.hasAttribute('aria-busy')).toBe(false);
    expect(row.querySelector('[data-collection-summary] strong')?.textContent).toBe('2 items');
    const badge = (key: string) => row.querySelector(`[data-count-badge="junk:${key}"]`)?.textContent ?? null;
    expect([badge(''), badge('video'), badge('image'), badge('archive'), badge('dismissed')]).toEqual(['5', '2', '3', null, '3']);
    // Badge counting goes through the legacy layer's `popBadges`: the changed ones pop, the untouched ones stay put.
    expect(row.querySelector('[data-count-badge="junk:video"]')?.classList.contains('countbadge')).toBe(true);
  });

  it('The category bar is navigation, not a tablist, with one file-type glyph per category', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([])));
    const p = props();
    await open(p);
    const nav = p.countRow!.querySelector('nav[data-junk-filters]');
    expect(nav?.getAttribute('aria-label')).toBe('Junk file categories');
    expect(nav?.getAttribute('role')).toBeNull();
    expect([...nav!.querySelectorAll('a use')].map((use) => use.getAttribute('href'))).toEqual([
      '#i-layout-grid', '#i-play', '#i-pics', '#i-file-archive', '#i-file-audio', '#i-globe', '#i-hard-drive', '#i-eye-off',
    ]);
  });

  it('Categories are deep-linkable links: a plain left click hands navigation to the shell, and modifier clicks follow browser defaults', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([])));
    const navigate = vi.fn();
    const p = props({ view: 'dismissed', actions: actions({ navigate }) });
    await open(p);
    const links = [...p.countRow!.querySelectorAll<HTMLAnchorElement>('[data-junk-filters] a')];
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/junk-files?view=dismissed', '/junk-files?type=video&view=dismissed', '/junk-files?type=image&view=dismissed',
      '/junk-files?type=archive&view=dismissed', '/junk-files?type=audio&view=dismissed',
      '/junk-files?type=url&view=dismissed', '/junk-files?type=other&view=dismissed', '/junk-files',
    ]);
    expect(links.at(-1)?.textContent).toBe('Back to pending');
    expect(links.at(-1)?.getAttribute('aria-current')).toBe('page');
    await click(links[2]);
    expect(navigate).toHaveBeenCalledWith('/junk-files?type=image&view=dismissed');
    const modified = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
    await act(async () => { links[3]!.dispatchEvent(modified) });
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(modified.defaultPrevented).toBe(false);
  });

  it('On read failure the summary stops spinning and the grid cell offers retry', async () => {
    vi.stubGlobal('fetch', fetchMock(500, { error: 'Server error' }));
    const p = props();
    const { host } = await open(p);
    expect(p.countRow!.querySelector('[data-skeleton]')).toBeNull();
    expect(p.countRow!.querySelector('[data-collection-summary] strong')?.textContent).toBe('—');
    expect(host.querySelector('[data-media-error] [data-note-action]')?.textContent).toBe('Retry now');
    expect(cards(host)).toHaveLength(0);
  });
});

describe('One card', () => {
  it('Titles of videos and images open on click and the rest are plain text; with no size it reads "Size unknown"', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([
      junk(1), junk(2, { junk_kind: 'archive', name: 'Promo.zip', size: 0, why: '' }),
      junk(3, { junk_kind: 'image', name: 'banner.jpg' }), junk(4, { junk_kind: 'audio', name: 'Ad.mp3' }),
    ])));
    const open_ = vi.fn();
    const { host } = await open(props({ actions: actions({ open: open_ }) }));
    const [video, archive, image, audio] = cards(host);
    expect(video!.dataset.junkKind).toBe('video');
    expect(video!.querySelector('[data-media-art] img')?.getAttribute('src')).toBe('/thumb?id=1&c=4');
    expect(image!.querySelector('[data-media-art] img')?.getAttribute('src')).toBe('/photo-thumb?id=3');
    expect(image!.querySelector('[data-junk-title]')?.tagName).toBe('BUTTON');
    // The file-type tag marks files: archives and audio each get their own glyph, and audio does not borrow the volume icon.
    expect(archive!.querySelector('[data-media-glyph] use')?.getAttribute('href')).toBe('#i-file-archive');
    expect(audio!.querySelector('[data-media-glyph] use')?.getAttribute('href')).toBe('#i-file-audio');
    // File names truncate in the middle, keeping both ends; the check matches the video card's, and junk cards have no watch-later.
    expect(cards(host).every((card) => card.querySelector('[data-junk-title]')!.hasAttribute('data-middle-truncate'))).toBe(true);
    expect(video!.querySelector('[data-media-check]')).not.toBeNull();
    expect(host.querySelector('[data-later]')).toBeNull();
    expect(video!.querySelector('[data-junk-facts]')?.textContent).toBe('VideosFilename looks like promo2 MB');
    expect(archive!.querySelector('[data-junk-title]')?.tagName).toBe('SPAN');
    expect(archive!.querySelector('[data-media-art]')).toBeNull();
    expect(archive!.querySelector('[data-media-glyph]')?.textContent).toBe('Archives');
    expect(archive!.querySelector('[data-junk-size]')?.textContent).toBe('Unknown size');
    await click(video!.querySelector('button[data-junk-title]'));
    expect(open_).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }), video);
  });

  it('The middle button changes with the view: pending shows "Not junk", excluded shows "Re-judge"', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([junk(1)])));
    const { host, update } = await open(props());
    const labels = () => [...cards(host)[0]!.querySelectorAll('[data-junk-action] [data-junk-label]')].map((el) => el.textContent);
    expect(labels()).toEqual(['Locate', 'Not junk', 'Move to trash']);
    await update({ view: 'dismissed' });
    await settle();
    expect(labels()).toEqual(['Locate', 'Judge again', 'Move to trash']);
  });

  it('Disposal hands over to the shell: the key goes busy during the request and recovers to clickable on failure', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([junk(1)])));
    const reply = pending<void>();
    let fail!: (error: Error) => void;
    const operate = vi.fn()
      .mockImplementationOnce(() => reply.answer)
      .mockImplementationOnce(() => new Promise<void>((_, reject) => { fail = reject }));
    const { host } = await open(props({ actions: actions({ operate }) }));
    const dispose = () => actionButton(cards(host)[0]!, 'dispose')!;
    await click(dispose());
    expect(operate).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }), 'dispose');
    expect(dispose().getAttribute('aria-busy')).toBe('true');
    await reply.release();
    await settle();
    expect(dispose().hasAttribute('aria-busy')).toBe(false);

    await click(actionButton(cards(host)[0]!, 'dismiss-junk'));
    expect(operate).toHaveBeenLastCalledWith(expect.objectContaining({ id: 1 }), 'dismiss-junk');
    await act(async () => { fail(new Error('Write failed')) });
    await settle();
    expect(actionButton(cards(host)[0]!, 'dismiss-junk')!.hasAttribute('aria-busy')).toBe(false);
  });

  it('A failed locate writes its reason on the card\'s status line, and success leaves no text', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([junk(1)])));
    const reveal = vi.fn().mockResolvedValueOnce('Source offline').mockResolvedValueOnce('');
    const { host } = await open(props({ actions: actions({ reveal }) }));
    const state = () => cards(host)[0]!.querySelector('[data-junk-state]')!.textContent;
    await click(actionButton(cards(host)[0]!, 'reveal'));
    await settle();
    expect(state()).toBe('Source offline');
    await click(actionButton(cards(host)[0]!, 'reveal'));
    await settle();
    expect(state()).toBe('');
  });

  it('In multi-select clicking anywhere on a card toggles selection, with selection written on the card', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([junk(1), junk(2)])));
    const toggleSelection = vi.fn();
    const open_ = vi.fn();
    const { host, update } = await open(props({ actions: actions({ toggleSelection, open: open_ }) }));
    await update({ selectMode: true, selected: new Set([2]) });
    expect(cards(host).map((card) => card.hasAttribute('data-selected'))).toEqual([false, true]);
    expect(host.querySelector('[data-junk-grid]')?.hasAttribute('data-select-mode')).toBe(true);
    await click(cards(host)[0]!.querySelector('button[data-junk-title]'));
    await click(cards(host)[0]!.querySelector('[data-junk-meta]'));
    expect(toggleSelection.mock.calls).toEqual([[1, false], [1, false]]);
    expect(open_).not.toHaveBeenCalled();
  });
});

describe('One screen of cards', () => {
  it('When empty, each view explains why it is empty', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([])));
    const { host, update } = await open(props());
    expect(host.querySelector('h3')?.textContent).toBe('No junk files awaiting review');
    await update({ view: 'dismissed' });
    await settle();
    expect(host.querySelector('h3')?.textContent).toBe('No excluded files');
  });

  it('With the whole batch in hand, reveal it in segments of the batch size, leaving no sentinel at the end', async () => {
    vi.stubGlobal('fetch', fetchMock(200, answer([1, 2, 3, 4, 5].map((id) => junk(id)))));
    const { host } = await open(props({ batchSize: 2 }));
    expect(cards(host)).toHaveLength(2);
    await click(host.querySelector('[data-load-more]'));
    expect(cards(host)).toHaveLength(4);
    await click(host.querySelector('[data-load-more]'));
    expect(cards(host)).toHaveLength(5);
    expect(host.querySelector('[data-load-more]')).toBeNull();
  });

  it('The shell advances the generation after disposal: during refetch the old copy stays on screen, and already-visible sections are not withdrawn', async () => {
    const first = answer([1, 2, 3].map((id) => junk(id)));
    const reread = pending<unknown>();
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => first })
      .mockImplementationOnce(() => reread.answer);
    vi.stubGlobal('fetch', fetcher);
    const settled = vi.fn();
    const { host, update } = await open(props({ batchSize: 1, settled }));
    await click(host.querySelector('[data-load-more]'));
    expect(cards(host)).toHaveLength(2);
    // The first-screen skeleton's fade layer is removed only when the animation ends; test environments have no animation, so it waits out the 1-second fallback.
    await act(() => new Promise((done) => { setTimeout(done, 1050) }));
    expect(host.querySelector('.skeletoncard')).toBeNull();
    await update({ revision: 2 });
    expect(cards(host)).toHaveLength(2);
    expect(host.querySelector('.skeletoncard')).toBeNull();
    await reread.release({ ok: true, status: 200, json: async () => answer([2, 3].map((id) => junk(id))) });
    await settle();
    expect(cards(host).map((card) => card.dataset.id)).toEqual(['2', '3']);
    expect(settled).toHaveBeenLastCalledWith(2);
  });
});
