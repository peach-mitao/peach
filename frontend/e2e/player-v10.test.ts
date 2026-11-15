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
    execFileSync(requiredEnv('PEACH_E2E_FFMPEG'), ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi',
      '-i', 'testsrc2=size=160x90:rate=15', '-t', '30', '-an', '-c:v', 'libx264', '-g', '15', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', join(fixture, 'gesture.mp4')]);
    execFileSync(requiredEnv('PEACH_E2E_FFMPEG'), ['-hide_banner', '-loglevel', 'error', '-i', join(fixture, 'gesture.mp4'),
      '-c', 'copy', '-f', 'hls', '-hls_time', '1', '-hls_list_size', '0',
      '-hls_segment_filename', join(fixture, 'gesture-part-%d.ts'), join(fixture, 'gesture.m3u8')]);
    files = new Map(readdirSync(fixture).map(name => [name, readFileSync(join(fixture, name))]));
    assert.ok(files.has('init-stream0.m4s'), [...files.keys()].join(', '));
    browser = await launch();
  });
  after(async () => { await browser?.close(); if (fixture) rmSync(fixture, { recursive: true, force: true }) });

  for (const viewport of [VIEWPORTS[1]!, { name: 'tablet-landscape', width: 1024, height: 768, mobile: true }]) {
    for (const format of ['mp4', 'm3u8']) {
      it(`${viewport.name} ${format}：触摸滑动定位、长按加速与回退`, { timeout: 60_000 }, async () => {
        const opened = await visit(browser, `/assets/${requiredEnv('PEACH_E2E_ITEM')}`, viewport);
        const { page, problems } = opened;
        const cdp = await page.context().newCDPSession(page);
        const touch = (type: 'touchStart' | 'touchMove' | 'touchEnd', x = 0, y = 0) =>
          cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
        try {
          await page.route('**/gesture-media/**', route => {
            const name = basename(new URL(route.request().url()).pathname);
            const body = files.get(name); assert.ok(body, name);
            return route.fulfill({ body, contentType: name.endsWith('.m3u8') ? 'application/vnd.apple.mpegurl'
              : name.endsWith('.ts') ? 'video/mp2t' : 'video/mp4' });
          });
          const video = page.locator('#stage video.vjs-tech');
          await video.waitFor();
          await page.waitForFunction(() => document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.readyState >= 2);
          await page.locator('#stage hlsjs-video').evaluate((node, extension) => {
            (node as unknown as { source: { src: string; type: string } }).source = {
              src: `/gesture-media/gesture.${extension}`, type: extension === 'mp4' ? 'video/mp4' : 'application/vnd.apple.mpegurl',
            };
          }, format);
          await page.waitForFunction(() => {
            const node = document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!;
            return node.readyState >= 2 && Math.abs(node.duration - 30) < 1;
          });
          await video.evaluate((node: HTMLVideoElement) => { node.pause(); node.muted = true; node.currentTime = 10 });
          await page.waitForFunction(() => !document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.seeking);
          if (viewport.name === 'tablet-landscape') {
            const expand = page.locator('#stage [data-player-expand]');
            if (await expand.isVisible()) await expand.click();
            await page.locator('#stage media-fullscreen-button').click();
            await page.waitForFunction(() => !!document.fullscreenElement);
          }
          const box = await video.boundingBox(); assert.ok(box);
          const y = box.y + box.height * .4;
          const swipe = async (from: number, to: number) => {
            await touch('touchStart', box.x + box.width * from, y);
            for (let step = 1; step <= 8; step++) await touch('touchMove', box.x + box.width * (from + (to - from) * step / 8), y);
          };
          await swipe(.3, .5);
          assert.ok(Math.abs(await video.evaluate((node: HTMLVideoElement) => node.currentTime) - 10) < .2);
          await touch('touchEnd');
          await page.waitForFunction(() => Math.abs(document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.currentTime - 16) < .3);
          assert.equal(await video.evaluate((node: HTMLVideoElement) => node.paused), true);
          await swipe(.6, .5); await touch('touchEnd');
          await page.waitForFunction(() => Math.abs(document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.currentTime - 13) < .3);

          await video.evaluate(async (node: HTMLVideoElement) => { node.playbackRate = 1.5; await node.play() });
          await touch('touchStart', box.x + box.width * .75, y);
          await page.waitForFunction(() => document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.playbackRate === 2);
          assert.equal(await page.locator('#stage [data-player-gesture-feedback]').isVisible(), true);
          await touch('touchEnd');
          assert.equal(await video.evaluate((node: HTMLVideoElement) => node.playbackRate), 1.5);
          assert.equal(await video.evaluate((node: HTMLVideoElement) => node.paused), false);

          await touch('touchStart', box.x + box.width * .25, y);
          await page.waitForFunction(() => document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.paused);
          const frozen = await video.evaluate((node: HTMLVideoElement) => node.currentTime);
          await page.waitForTimeout(600); // 保持按住，验证预览期间不会反复请求媒体跳转。
          assert.equal(await video.evaluate((node: HTMLVideoElement) => node.currentTime), frozen);
          await touch('touchEnd');
          assert.ok(await video.evaluate((node: HTMLVideoElement) => node.currentTime) < frozen - .5);
          await page.waitForFunction(() => !document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.paused);
          assert.equal(await page.locator('#stage [data-player-gesture-feedback]').isVisible(), false);
          assert.deepEqual(problems, []);
        } finally { await cdp.detach(); await opened.close() }
      });
    }
  }

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
