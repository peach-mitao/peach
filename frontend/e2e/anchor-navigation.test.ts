import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, VIEWPORTS } from './harness.ts';
import { openItemPage } from './item-fixture.ts';
import { openFollowFeed } from './follow-fixture.ts';

describe('页面滚动定位', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    for (const reduced of [false, true]) {
      it(`${viewport.name}：首次进入关注页时短骨架不截断回顶，减少动态效果=${reduced}`, { timeout: 60_000 }, async () => {
        const opened = await openFollowFeed(browser, '/', viewport, { ready: '#catalogFilter [data-filter-frame]' });
        const { page } = opened;
        let release!: () => void;
        const waiting = new Promise<void>(resolve => { release = resolve });
        try {
          await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
          await page.route(url => url.pathname === '/api/follow', async route => {
            await waiting;
            await route.fallback();
          });
          const previousHeight = await page.evaluate(() => {
            // 长度只放在离开的列表内，导航清空列表时会一起移除。
            const tail = document.createElement('div');
            tail.style.height = '3000px';
            document.getElementById('grid')!.append(tail);
            window.scrollTo({ top: 500, behavior: 'instant' });
            const frames: number[] = [];
            const tracking = { frames, running: true };
            Object.assign(window, { coldFollowScroll: tracking });
            const record = () => {
              frames.push(scrollY);
              if (tracking.running) requestAnimationFrame(record);
            };
            requestAnimationFrame(record);
            return document.documentElement.style.minHeight;
          });
          if (viewport.mobile) await page.locator('header button[aria-label="展开侧栏"]').click();
          await page.locator('#drawer [data-nav="follow"]').click();
          await page.waitForURL('**/follow');
          await page.waitForFunction(() => scrollY === 0);
          const frames = await page.evaluate(() => {
            const tracking = (window as unknown as { coldFollowScroll: { frames: number[]; running: boolean } }).coldFollowScroll;
            tracking.running = false;
            return tracking.frames;
          });
          if (!reduced) assert.ok(frames.some(y => y > 2 && y < 490), '首次切换应经过中间位置，不能先被短骨架夹到顶部');
          release();
          await page.locator('[data-follow-list] > [data-follow-item]').first().waitFor();
          await page.waitForFunction(height => document.documentElement.style.minHeight === height
            && !document.documentElement.hasAttribute('data-page-navigation-pending'), previousHeight);
          assert.equal(await page.evaluate(() => scrollY), 0);
          assert.deepEqual(opened.problems, []);
        } finally { release(); await opened.close() }
      });
      it(`${viewport.name}：内容就绪后定位，减少动态效果=${reduced}`, { timeout: 60_000 }, async () => {
        const opened = await openItemPage(browser, '/', viewport, { ready: '#grid [data-media-card]' });
        const { page } = opened;
        let release!: () => void;
        const waiting = new Promise<void>(resolve => { release = resolve });
        try {
          await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
          await page.route('**/api/orphan-records', async route => {
            await waiting;
            await route.fulfill({ json: { total: 1, items: [{ id: 100001, name: '示例影片.mp4', code: '',
              location: 'local', duration: 1, size: 100, vanished_at: 1, has_thumb: false,
              records: { play_count: 1 }, candidates: [] }] } });
          });
          await page.route('**/api/sources', route => route.fulfill({ json: { sources: [{
            location: 'local', online: true, roots: ['D:\\Media'], label: '本地',
          }] } }));
          await page.route('**/api/resource-sync/scan', route => route.fulfill({ json: { status: 'idle' } }));
          await page.route('**/api/resource-sync/apply', route => route.fulfill({ json: { status: 'idle' } }));
          await page.evaluate(() => {
            const scroll = Element.prototype.scrollIntoView;
            const calls: { id: string; behavior: string | undefined }[] = [];
            Object.assign(window, { anchorScrolls: calls });
            Element.prototype.scrollIntoView = function(options) {
              calls.push({ id: this.id, behavior: typeof options === 'object' ? options.behavior : undefined });
              return scroll.call(this, options);
            };
            const link = document.createElement('a');
            link.href = '/data-cleanup#resource-sync'; link.textContent = '打开资源同步';
            document.querySelector('#main')!.prepend(link);
          });
          const navigations: string[] = [];
          page.on('request', request => { if (request.isNavigationRequest()) navigations.push(request.url()) });
          await page.getByRole('link', { name: '打开资源同步', exact: true }).click();
          await page.waitForURL('**/data-cleanup#resource-sync');
          assert.deepEqual(navigations, [], '跨页锚点复用站内导航');
          await page.waitForTimeout(150);
          assert.equal(await page.locator('#resource-sync').count(), 0, '依赖内容就绪后再绘制和定位');
          release();
          await page.locator('#resource-sync').waitFor();
          await page.waitForFunction(expected => {
            const calls = (window as unknown as { anchorScrolls: { id: string; behavior: string }[] }).anchorScrolls;
            return calls.some(call => call.id === 'resource-sync' && call.behavior === expected);
          }, reduced ? 'instant' : 'smooth');
          await page.waitForFunction(() => {
            const target = document.getElementById('resource-sync')!;
            const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
            const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
            const desired = Math.min(target.getBoundingClientRect().top + scrollY - margin - padding,
              document.documentElement.scrollHeight - innerHeight);
            return Math.abs(scrollY - desired) < 2;
          });
          const before = await page.locator('#resource-sync').evaluate(node => node.getBoundingClientRect().top);
          await page.waitForTimeout(200);
          assert.ok(Math.abs(await page.locator('#resource-sync').evaluate(node => node.getBoundingClientRect().top) - before) < 2);
          await page.evaluate(() => {
            Object.assign(window, { cleanupNode: document.getElementById('libraryProcessing') });
            const link = document.createElement('a');
            link.href = '#libraryProcessing'; link.textContent = '定位扫描与采集';
            document.getElementById('resource-sync')!.prepend(link);
          });
          await page.getByRole('link', { name: '定位扫描与采集', exact: true }).click();
          await page.waitForFunction(expected => {
            const state = window as unknown as { anchorScrolls: { id: string; behavior: string }[]; cleanupNode: Element };
            return state.anchorScrolls.some(call => call.id === 'libraryProcessing' && call.behavior === expected)
              && state.cleanupNode === document.getElementById('libraryProcessing');
          }, reduced ? 'instant' : 'smooth');
          assert.deepEqual(navigations, []);
          assert.deepEqual(opened.problems, []);
        } finally { release(); await opened.close() }
      });
      it(`${viewport.name}：栏目位置平滑往返，双击导航回顶，减少动态效果=${reduced}`, { timeout: 60_000 }, async () => {
        const opened = await openItemPage(browser, '/', viewport, { ready: '#grid [data-media-card]' });
        const { page } = opened;
        try {
          await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
          await page.evaluate(() => {
            document.getElementById('main')!.style.minHeight = '6000px';
            const scroll = window.scrollTo.bind(window);
            const calls: ScrollToOptions[] = [];
            Object.assign(window, { pageScrolls: calls });
            window.scrollTo = (options: ScrollToOptions | number, y?: number) => {
              if (typeof options === 'number') scroll(options, y ?? 0);
              else { calls.push(options); scroll(options) }
            };
          });
          const move = async (name: string, path: string, top: number, double = false) => {
            await page.evaluate(() => { (window as unknown as { pageScrolls: ScrollToOptions[] }).pageScrolls.length = 0 });
            if (viewport.mobile) await page.locator('header button[aria-label="展开侧栏"]').click();
            const nav = page.locator('#drawer [data-nav]').getByText(name, { exact: true });
            if (double) await nav.dblclick(); else await nav.click();
            await page.waitForURL(url => url.pathname + url.search === path);
            await page.waitForFunction(({ behavior, top }) => {
              const calls = (window as unknown as { pageScrolls: ScrollToOptions[] }).pageScrolls;
              return calls.some(call => call.top === top && call.behavior === behavior) && scrollY === top;
            }, { top, behavior: reduced ? 'instant' : 'smooth' });
          };
          await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
          await move('JAV', '/?jav=1', 0);
          await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
          await move('首页', '/', 700);
          await move('首页', '/', 0, true);
          await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
          await move('JAV', '/?jav=1', 1000);
          await move('首页', '/', 700);
          await move('艺人', '/performers', 0);
          assert.deepEqual(opened.problems, []);
        } finally { await opened.close() }
      });
    }
  }
});
