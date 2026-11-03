/* Video.js 10 官方控件与媒体引擎在演示短片上的播放链。 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import type { Browser } from 'playwright-core';
import { launch, layout, requiredEnv, visit, VIEWPORTS } from './harness.ts';
import { DETAIL, openFollowFeed } from './follow-fixture.ts';

describe('Video.js 10 播放链', () => {
  let browser: Browser;
  let fixture: string;
  let files: Map<string, Buffer>;
  before(async () => {
    fixture = realpathSync(mkdtempSync(join(tmpdir(), 'peach-v10-hls-')));
    execFileSync(requiredEnv('PEACH_E2E_FFMPEG'), ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi',
      '-i', 'testsrc2=size=160x90:rate=15', '-t', '3', '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
      '-f', 'hls', '-hls_time', '1', '-hls_list_size', '0', '-hls_segment_filename', join(fixture, 'part-%d.ts'), join(fixture, 'video.m3u8')]);
    execFileSync(requiredEnv('PEACH_E2E_FFMPEG'), ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi',
      '-i', 'testsrc2=size=160x90:rate=15', '-t', '3', '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
      '-f', 'dash', 'video.mpd'], { cwd: fixture });
    files = new Map(readdirSync(fixture).map(name => [name, readFileSync(join(fixture, name))]));
    assert.ok(files.has('init-stream0.m4s'), [...files.keys()].join(', '));
    browser = await launch();
  });
  after(async () => { await browser?.close(); if (fixture) rmSync(fixture, { recursive: true, force: true }) });

  it('详情自动播放请求读取 MP4 并解码', { timeout: 60_000 }, async () => {
    const opened = await visit(browser, `/assets/${requiredEnv('PEACH_E2E_ITEM')}`, VIEWPORTS[0]!);
    const { page, problems } = opened;
    try {
      await page.addInitScript(() => {
        localStorage.setItem('peach.settings.v1', JSON.stringify({ detailAutoplay: true }));
        const play = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function () { this.muted = true; return play.call(this) };
      });
      const stream = page.waitForResponse(reply => new URL(reply.url()).pathname === '/stream');
      await page.reload();
      await page.waitForFunction(() => {
        const video = document.querySelector<HTMLVideoElement>('#stage video.vjs-tech');
        return !!video && video.currentTime > .15 && video.videoWidth > 0;
      }, undefined, { timeout: 15_000 });
      assert.ok([200, 206].includes((await stream).status()));
      assert.deepEqual(problems, []);
    } finally { await opened.close() }
  });

  it('默认音量作用于新片，单片音量在详情与沉浸模式之间分别记忆', { timeout: 60_000 }, async () => {
    const opened = await visit(browser, '/', VIEWPORTS[0]!, async page => {
      await page.addInitScript(() => localStorage.setItem('peach.settings.v1',
        JSON.stringify({ detailAutoplay: false, defaultVolume: 35 })));
    });
    const { page, problems } = opened;
    try {
      const items: { id: number; cost?: string; duration?: number }[] = await page.evaluate(async () =>
        (await (await fetch('/api/items?limit=60&offset=0&thumb=')).json()).items
          .filter((item: { cost?: string; duration?: number }) => item.duration && item.cost !== 'metered'));
      const primary = Number(requiredEnv('PEACH_E2E_ITEM'));
      const [first, second] = items.filter(item => item.id !== primary);
      assert.ok(first && second, '演示库要另有两部可播放作品');

      const tech = '#stage video.vjs-tech';
      const open = async (id: number) => {
        await page.goto(new URL(`/assets/${id}`, page.url()).href, { waitUntil: 'load' });
        await page.locator(tech).waitFor();
      };
      const volumeIs = (want: number) => page.waitForFunction(({ selector, want }) => {
        const video = document.querySelector<HTMLVideoElement>(selector);
        return !!video && Math.abs(video.volume - want) < .001;
      }, { selector: tech, want });

      await open(first.id);
      await volumeIs(.35);
      const saved = page.waitForResponse(response => new URL(response.url()).pathname === '/api/player/memory'
        && response.request().method() === 'PUT'
        && Math.abs(Number(response.request().postDataJSON().volume) - .62) < .001);
      await page.locator(tech).evaluate((video: HTMLVideoElement) => { video.volume = .62 });
      assert.equal((await saved).status(), 200);

      await open(second.id);
      await volumeIs(.35);
      await open(first.id);
      await volumeIs(.62);

      await page.goto(new URL(`/immerse?id=${first.id}`, page.url()).href, { waitUntil: 'load' });
      const immersive = '[data-immerse-track] video.vjs-tech';
      await page.locator(immersive).waitFor();
      await page.waitForFunction(selector => {
        const video = document.querySelector<HTMLVideoElement>(selector);
        return !!video && Math.abs(video.volume - .62) < .001;
      }, immersive);
      assert.deepEqual(problems, []);
    } finally { await opened.close() }
  });

  it('媒体解码失败保存本机浏览器上下文与原生错误', { timeout: 60_000 }, async () => {
    const opened = await visit(browser, `/assets/${requiredEnv('PEACH_E2E_ITEM')}`, VIEWPORTS[0]!);
    const { page } = opened;
    try {
      await page.route('**/stream?**', route => route.fulfill({ body: 'invalid video', contentType: 'video/mp4' }));
      const recorded = page.waitForResponse(reply => new URL(reply.url()).pathname === '/api/diagnostics/client-error'
        && reply.request().postDataJSON()?.kind === 'media');
      await page.reload();
      const response = await recorded;
      assert.equal(response.status(), 200);
      const evidence = response.request().postDataJSON();
      assert.ok([3, 4].includes(evidence.playback.code));
      assert.equal(evidence.playback.source_route, '/stream');
      assert.ok('h264' in evidence.browser.native_codecs);
      assert.match(evidence.browser.user_agent, /Chrome/);
      assert.equal(JSON.stringify(evidence).includes('session='), false);
    } finally { await opened.close() }
  });

  it('关注片源的 DASH MIME 挂载官方引擎并解码', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, `/posts/${DETAIL.collection}`, VIEWPORTS[0]!, { ready: '#stage [data-follow-detail-side]' });
    const { page, problems } = opened;
    try {
      const response = page.waitForResponse(reply => {
        const url = new URL(reply.url()); return url.pathname === '/api/follow' && url.searchParams.get('item') === String(DETAIL.collection);
      });
      await page.reload();
      const payload = await (await response).json();
      payload.groups[0].primary.media_type = 'application/dash+xml'; payload.groups[0].primary.duration = 3;
      await page.route(url => url.pathname === '/api/follow' && url.searchParams.has('item'), route => route.fulfill({ json: payload }));
      await page.route('**/api/follow/play', route => route.fulfill({ json: { ok: true } }));
      await page.route('**/api/follow/activity', route => {
        assert.equal(route.request().postDataJSON().item, DETAIL.collection);
        return route.fulfill({ json: { ok: true, item: DETAIL.collection } });
      });
      await page.route('**/follow-stream**', route => route.fulfill({ body: files.get('video.mpd')!, contentType: 'application/dash+xml' }));
      await page.route(/\/(?:init|chunk)-stream\d+(?:-\d+)?\.m4s(?:\?|$)/, route =>
        route.fulfill({ body: files.get(basename(new URL(route.request().url()).pathname))!, contentType: 'video/mp4' }));
      await page.reload();
      await page.locator('#stage dash-video > video.vjs-tech').waitFor();
      await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => { node.muted = true });
      const activity = page.waitForResponse(reply => new URL(reply.url()).pathname === '/api/follow/activity');
      await page.locator('#stage media-play-button').click();
      await page.waitForFunction(() => {
        const video = document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!;
        return video.currentTime > .8 && video.videoWidth === 160;
      }, undefined, { timeout: 15_000 }).catch(async error => {
        const state = await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => ({
          paused: node.paused, time: node.currentTime, width: node.videoWidth, ready: node.readyState, src: node.currentSrc,
          error: node.error && { code: node.error.code, message: node.error.message },
        }));
        throw new Error(`${String(error)} ${JSON.stringify({ state, problems })}`);
      });
      await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => node.pause());
      assert.equal((await activity).status(), 200);
      await page.locator('#closeStage').click();
      await page.locator('.video-js').waitFor({ state: 'detached' });
      assert.deepEqual(problems, []);
    } finally { await opened.close() }
  });

  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：播放、暂停、倍速、进度、字幕与卸载`, { timeout: 60_000 }, async () => {
      const opened = await visit(browser, `/assets/${requiredEnv('PEACH_E2E_ITEM')}`, viewport);
      const { page, problems } = opened;
      try {
        await page.locator('#stage .video-js .vjs-peach-bezel').waitFor({ state: 'attached' });
        const media = page.locator('#stage hlsjs-video');
        assert.equal(await media.count(), 1);
        if (!viewport.mobile) {
          await page.locator('#stage .vjs-volume-panel').hover();
          assert.match(await page.locator('#stage media-slider-value').textContent() || '', /\d+%/);
        }
        await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => { node.muted = true });
        await page.locator('#stage media-play-button').click();
        await page.waitForFunction(() => {
          const video = document.querySelector<HTMLVideoElement>('#stage video.vjs-tech');
          return !!video && video.currentTime > .15 && video.videoWidth > 0;
        }, undefined, { timeout: 15_000 });
        await page.locator('#stage media-play-button').click();
        assert.equal(await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => node.paused), true);
        await page.locator('#stage [data-player-quality] > button').click();
        await page.locator('#stage [data-player-speed]').click();
        await page.locator('#stage [data-player-speed-option="1.5"]').click();
        assert.equal(await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => node.playbackRate), 1.5);
        await page.locator('#stage [data-player-quality] > button').click();
        await page.locator('#stage media-time-slider media-slider-thumb').focus();
        await page.keyboard.press('Home');
        await page.waitForFunction(() => document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.currentTime < .1);
        await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => {
          const track = node.addTextTrack('subtitles', '测试字幕', 'zh'); track.mode = 'disabled';
          track.addCue(new VTTCue(0, 2, '字幕回归'));
        });
        await page.locator('#stage [data-player-quality] > button').click();
        await page.locator('#stage [data-player-subtitles]').click();
        await page.getByRole('menuitemradio', { name: '测试字幕', exact: true }).click();
        assert.equal(await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) =>
          [...node.textTracks].find(track => track.label === '测试字幕')?.mode), 'showing');
        await page.route('**/v10-hls/**', async route => {
          const name = basename(new URL(route.request().url()).pathname);
          assert.match(name, /^(video\.m3u8|part-\d+\.ts)$/);
          await route.fulfill({ body: files.get(name)!,
            contentType: name.endsWith('.m3u8') ? 'application/vnd.apple.mpegurl' : 'video/mp2t' });
        });
        await media.evaluate(node => {
          (node as unknown as { source: { src: string; type: string } }).source = {
            src: '/v10-hls/video.m3u8', type: 'application/vnd.apple.mpegurl',
          };
        });
        await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => { node.currentTime = 0; return node.play() });
        await page.waitForFunction(() => {
          const video = document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!;
          return video.currentTime > .2 && video.videoWidth === 160;
        }, undefined, { timeout: 15_000 });
        await page.locator('#stage video.vjs-tech').evaluate((node: HTMLVideoElement) => node.pause());
        const geometry = await layout(page);
        assert.ok(geometry.scrollWidth <= geometry.viewportWidth);
        assert.deepEqual(geometry.offenders, []);
        await page.locator('#closeStage').click();
        await page.locator('.video-js').waitFor({ state: 'detached' });
        assert.deepEqual(problems, []);
      } finally { await opened.close() }
    });
  }
});
