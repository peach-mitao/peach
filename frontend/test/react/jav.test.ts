import { expect, it } from 'vitest';
import { discoveryArtwork, javLibraryPath, javPath, javTab, type Discovery } from '../../src/react/jav/jav';
import { discoveryKey, fetchDiscoveries } from '../../src/react/jav/jav';
import { discoveryScore, recommendationScore } from '../../src/react/jav/discovery-sorts';
import { vi } from 'vitest';
import { advanceImageFallback } from '../../src/card-art/image-fallback';

it('Taste scores keep zeros, decimals, and negative sort scores, and missing readings never pose as zero', () => {
  expect(discoveryScore(0)).toBe('0.000');
  expect(discoveryScore(0.004)).toBe('0.004');
  expect(discoveryScore(-0.125)).toBe('-0.125');
  for (const value of [undefined, null, NaN, Infinity]) expect(discoveryScore(value)).toBe('—');
});
it('Recommended tags use a fixed percent scale with tiers, and unknown or out-of-range values read clearly', () => {
  expect(recommendationScore(0.337)).toEqual({ score: '34', label: 'Worth a look', color: 'yellow' });
  for (const [input, score, label] of [[0, '0', 'Explore'], [-0.1, '0', 'Explore'], [0.5, '50', 'Recommended'], [0.75, '75', 'Strongly recommended'], [1.2, '100', 'Strongly recommended']] as const) {
    expect(recommendationScore(input)).toMatchObject({ score, label });
  }
  for (const value of [undefined, null, NaN, Infinity]) expect(recommendationScore(value)).toMatchObject({ score: '—', label: 'Profile not fetched' });
});
it('Discovery queries isolate the sort cache and poll, stop, and explicitly update on the same profile task', async () => {
  const requests: URL[] = [];
  vi.stubGlobal('fetch', vi.fn(async (input: string) => {
    requests.push(new URL(input, 'https://peach.test'));
    return { ok: true, status: 200, json: async () => ({ items: [], candidate_total: 0, limited: false }) };
  }));
  try {
    const signal = new AbortController().signal;
    await fetchDiscoveries('external', signal, { sort: 'source_score', direction: 'asc', jobId: 'current', cancelMetadata: true });
    expect(Object.fromEntries(requests[0]!.searchParams)).toEqual({ scope: 'external', limit: '100', sort: 'source_score', direction: 'asc', metadata_job_id: 'current', metadata_cancel: '1' });
    await fetchDiscoveries('external', signal, { refreshMetadata: true });
    expect(requests[1]!.searchParams.get('metadata_refresh')).toBe('1');
    expect(requests[1]!.searchParams.has('metadata_job_id')).toBe(false);
    expect(discoveryKey('external', 'taste')).not.toEqual(discoveryKey('external', 'duration'));
  } finally { vi.unstubAllGlobals() }
});

it('Discovery covers prefer the local cache; remote covers go through the Peach proxy and keep their original large-image framing identity', () => {
  const item = { id: 1, code: 'ABC-001', has_cover: true, cover_url: 'https://pics.dmm.co.jp/digital/video/abc00001/abc00001pl.jpg' } as Discovery;
  const local = document.createElement('div');
  local.innerHTML = discoveryArtwork(item, 'big', 'cover');
  expect(local.querySelector('img')?.getAttribute('src')).toContain('/cover?code=ABC-001');
  local.innerHTML = discoveryArtwork({ ...item, has_cover: false }, 'small', 'cover');
  const image = local.querySelector('img')!;
  expect(image.getAttribute('src')).toBe('/cover-image?code=ABC-001');
  expect(image.dataset.javImageLayout).toBe('small');
  expect(image.dataset.javCover).toBe('/cover-image?code=ABC-001');
  expect(local.innerHTML).not.toContain('dmm.co.jp');
  expect(advanceImageFallback(image)).toBe('drop');
  expect(local.querySelector('span.media-nopic')?.textContent).toBe('No cover available');
  expect(discoveryArtwork({ ...item, has_cover: false, code: '' }, 'small', 'cover')).toBe('');
});
it('JAV sections restore from deep links, and unknown sections land on the library', () => {
  expect(javTab('discover')).toBe('discover'); expect(javTab('wants')).toBe('wants'); expect(javTab('other')).toBe('library');
});
it('JAV library deep links keep search and filter conditions and use the catalog entry', () => {
  const url = new URL(javLibraryPath('?tab=library&q=ABC-123&studio=Demo label&loc=cloud&sort=new&jav=0'), 'https://peach.test');
  expect(url.pathname).toBe('/');
  expect(Object.fromEntries(url.searchParams)).toEqual({ q: 'ABC-123', studio: 'Demo label', loc: 'cloud', sort: 'new', jav: '1' });
  expect(javPath('library')).toBe('/?jav=1');
  expect(javPath('unknown')).toBe('/?jav=1');
  expect(javPath('discover')).toBe('/jav?tab=discover');
  expect(javPath('wants')).toBe('/jav?tab=wants');
});
