/* 全屏画面适配不依赖资料库，直接用正式样式和浏览器全屏 API 验证。 */
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { build } from 'vite';
import { launch } from './harness.ts';

for (const stylesheet of ['../src/player/player.css', '../../web/dist/peach-app.css']) {
describe(`全屏画面比例：${stylesheet}`, () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });

  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 1280, height: 720 },
    { width: 390, height: 844 },
  ]) {
    it(`${viewport.width}×${viewport.height}：全屏与退出全屏均完整显示`, { timeout: 30_000 }, async () => {
      const page = await browser.newPage({ viewport });
      try {
        const css = readFileSync(new URL(stylesheet, import.meta.url), 'utf8');
        await page.setContent(`<style>${css}</style><div data-stage-media>
          <div class="video-js"><video-player><media-container>
            <video class="vjs-tech" width="1920" height="1080"></video>
            <button style="position:relative;z-index:1">全屏</button>
          </media-container></video-player></div></div>`);
        await page.locator('button').evaluate(button => {
          button.addEventListener('click', () => button.parentElement!.requestFullscreen());
        });
        const video = page.locator('video');
        assert.equal(await video.evaluate(node => getComputedStyle(node).objectFit), 'contain');
        await page.locator('button').click();
        await page.waitForFunction(() => !!document.fullscreenElement);
        const frame = await video.evaluate(node => {
          const rect = node.getBoundingClientRect();
          return { fit: getComputedStyle(node).objectFit,
            box: [rect.x, rect.y, rect.width, rect.height], viewport: [innerWidth, innerHeight] };
        });
        assert.equal(frame.fit, 'contain', '比例不同时保留完整画面和黑边');
        assert.deepEqual(frame.box, [0, 0, ...frame.viewport]);
        await page.evaluate(() => document.exitFullscreen());
        for (const state of ['class', 'attribute', 'full-window']) {
          await page.locator('.video-js').evaluate((root, state) => {
            root.classList.toggle('vjs-fullscreen', state === 'class');
            root.toggleAttribute('data-peach-fullscreen', state === 'attribute');
            document.body.classList.toggle('vjs-full-window', state === 'full-window');
          }, state);
          assert.equal(await video.evaluate(node => getComputedStyle(node).objectFit), 'contain', state);
        }
        await page.locator('.video-js').evaluate(root => {
          root.classList.remove('vjs-fullscreen');
          root.removeAttribute('data-peach-fullscreen');
          document.body.classList.remove('vjs-full-window');
        });
        assert.equal(await video.evaluate(node => getComputedStyle(node).objectFit), 'contain');
      } finally { await page.close() }
    });
  }
});
}

describe('独立媒体上的触摸手势', () => {
  let browser: Browser, script: string, clip: string, folder: string;
  before(async () => {
    folder = mkdtempSync(join(tmpdir(), 'peach-touch-'));
    const filename = join(folder, 'gesture.mp4');
    execFileSync(process.env.PEACH_E2E_FFMPEG || 'ffmpeg', ['-hide_banner', '-loglevel', 'error',
      '-f', 'lavfi', '-i', 'testsrc2=size=160x90:rate=15', '-t', '30', '-an', '-c:v', 'libx264',
      '-g', '15', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', filename]);
    clip = `data:video/mp4;base64,${readFileSync(filename).toString('base64')}`;
    const result = await build({ configFile: false, logLevel: 'error',
      resolve: { alias: { '@peach/legacy/core': fileURLToPath(new URL('../src/core/index.ts', import.meta.url)) } },
      build: { write: false, lib: { entry: fileURLToPath(new URL('../src/player/touch-gestures.ts', import.meta.url)),
        name: 'PeachTouch', formats: ['iife'] } } });
    const output = (Array.isArray(result) ? result[0]! : result) as { output: { type: string; code?: string }[] };
    script = output.output.find(chunk => chunk.type === 'chunk')!.code!;
    browser = await launch();
  });
  after(async () => { await browser?.close(); if (folder) rmSync(folder, { recursive: true, force: true }) });

  for (const viewport of [{ width: 390, height: 844 }, { width: 1024, height: 768 }]) {
    it(`${viewport.width}×${viewport.height}：滑动只在松手跳转，长按恢复倍速和播放状态`, { timeout: 30_000 }, async () => {
      const page = await browser.newPage({ viewport, hasTouch: true, isMobile: true });
      const cdp = await page.context().newCDPSession(page);
      const problems: string[] = [];
      page.on('pageerror', error => problems.push(error.message));
      try {
        await page.route('https://gesture.test/', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html>' }));
        await page.goto('https://gesture.test/');
        const css = readFileSync(new URL('../src/player/player.css', import.meta.url), 'utf8');
        await page.setContent(`<meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style>
          <div class="video-js" style="width:100%;aspect-ratio:16/9"><video-player><media-container>
          <video class="vjs-tech" playsinline muted src="${clip}"></video>
          <button style="position:absolute;z-index:1;bottom:0">全屏</button></media-container></video-player></div>`);
        await page.addScriptTag({ content: script });
        assert.deepEqual(problems, []);
        await page.evaluate(() => {
          const root = document.querySelector<HTMLElement>('.video-js')!, video = root.querySelector('video')!;
          (window as unknown as { PeachTouch: { mountVideoTouchGestures: (r: HTMLElement, v: HTMLVideoElement, s: AbortSignal) => void } })
            .PeachTouch.mountVideoTouchGestures(root, video, new AbortController().signal);
          video.addEventListener('click', () => { if (video.paused) void video.play(); else video.pause() });
          root.querySelector('button')!.onclick = () => { void root.querySelector('media-container')!.requestFullscreen() };
        });
        const video = page.locator('video');
        await page.waitForFunction(() => document.querySelector('video')!.readyState >= 2);
        if (viewport.width > 500) { await page.locator('button').click(); await page.waitForFunction(() => !!document.fullscreenElement) }
        await video.evaluate(node => { node.currentTime = 10 });
        await page.waitForFunction(() => !document.querySelector('video')!.seeking);
        const box = await video.boundingBox(); assert.ok(box);
        const touch = (type: 'touchStart' | 'touchMove' | 'touchEnd', part = .5) => cdp.send('Input.dispatchTouchEvent', {
          type, touchPoints: type === 'touchEnd' ? [] : [{ x: box.x + box.width * part, y: box.y + box.height * .4 }],
        });
        await touch('touchStart', .3);
        for (let i = 1; i <= 8; i++) await touch('touchMove', .3 + .2 * i / 8);
        assert.equal(await video.evaluate(node => node.currentTime), 10);
        await touch('touchEnd');
        await page.waitForFunction(() => Math.abs(document.querySelector('video')!.currentTime - 16) < .3);
        assert.equal(await video.evaluate(node => node.paused), true);
        await video.evaluate(async node => { node.playbackRate = 1.5; await node.play() });
        await touch('touchStart', .75);
        await page.waitForFunction(() => document.querySelector('video')!.playbackRate === 2);
        assert.equal(await page.locator('[data-player-gesture-feedback]').isVisible(), true);
        await touch('touchEnd');
        assert.equal(await video.evaluate(node => node.playbackRate), 1.5);
        assert.equal(await video.evaluate(node => node.paused), false);
        await touch('touchStart', .25);
        await page.waitForFunction(() => document.querySelector('video')!.paused);
        const frozen = await video.evaluate(node => node.currentTime);
        await page.waitForTimeout(600); // 保持手指不动，检查预览不会反复 seek。
        assert.equal(await video.evaluate(node => node.currentTime), frozen);
        await touch('touchEnd');
        assert.ok(await video.evaluate(node => node.currentTime) < frozen - .5);
        assert.equal(await video.evaluate(node => node.paused), false);
        assert.equal(await page.locator('[data-player-gesture-feedback]').isVisible(), false);
        assert.deepEqual(problems, []);
      } finally { await cdp.detach(); await page.close() }
    });
  }
});
