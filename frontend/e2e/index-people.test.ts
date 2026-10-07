import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, requiredEnv, settle, visit, VIEWPORTS } from './harness.ts';

describe('本地与在线艺人共用名册布局', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    for (const [path, selected] of [['/performers', '艺人'], ['/creators', '卖家'],
      ['/performers?scope=online', '在线']] as const) {
      it(`加载占位页使用同级名册入口（${selected} · ${viewport.name}）`, { timeout: 60_000 }, async () => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.mobile,
        });
        const page = await context.newPage();
        let release!: () => void;
        const gate = new Promise<void>(resolve => { release = resolve });
        await page.route('**/dist/peach-react.js*', async route => {
          await gate;
          await route.continue();
        });
        try {
          await page.goto(requiredEnv('PEACH_E2E_ORIGIN') + path, { waitUntil: 'domcontentloaded' });
          await page.locator('#index [data-skeleton]').first().waitFor();
          assert.equal(await page.locator('#index [role="tablist"]').count(), 1);
          assert.deepEqual(await page.locator('#index [role="tab"]').allTextContents(), ['艺人', '卖家', '在线']);
          assert.deepEqual(await page.locator('#index [role="tab"][aria-selected="true"]').allTextContents(), [selected]);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
          release();
          await page.locator('#index [data-index-page]').waitFor();
          assert.deepEqual(await page.locator('#index [role="tab"]').allTextContents(), ['艺人', '卖家', '在线']);
        } finally { release(); await context.close() }
      });
    }
    it(`两种版式的卡片尺寸一致，长名字留在卡片内（${viewport.name}）`, { timeout: 60_000 }, async () => {
      const opened = await visit(browser, '/performers', viewport);
      try {
        const page = opened.page;
        const names = ['Jul3D', 'LazyProcrastinator', 'Suzutaru 3D (鈴太郎3D)', '很长的艺人名称'.repeat(6)];
        await page.route('**/api/index?**', route => route.fulfill({ json: {
          items: names.map(k => ({ k, n: 3 })), has_more: false,
        } }));
        await page.route('**/api/follow/authors?**', route => route.fulfill({ json: {
          items: names.map(k => ({ k, key: k, n: 3, avatar: '', avatar_fallback: '', providers: [] })), has_more: false,
        } }));
        await page.reload({ waitUntil: 'load' });
        const cell = page.locator('#index [data-index-cell]').first();
        await cell.waitFor({ timeout: 15_000 });
        const measure = () => page.locator('#index [data-index-cell]').evaluateAll(elements => elements.map(element => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          const name = element.querySelector('[data-index-name]')!.getBoundingClientRect();
          return { width: rect.width, padding: style.padding, radius: style.borderRadius,
            whiteSpace: style.whiteSpace, font: style.font, gap: style.gap,
            contained: name.left >= rect.left && name.right <= rect.right,
          };
        }));
        for (const label of ['紧凑 · 圆形头像', '大图 · 竖幅头像']) {
          await page.getByRole('tab', { name: '艺人', exact: true }).click();
          await page.getByRole('radio', { name: label, exact: true }).press('Space');
          const layout = label.startsWith('紧凑') ? 'compact' : 'big';
          await page.locator(`#index [data-index-grid][data-layout="${layout}"]`).waitFor();
          await settle(page);
          const local = await measure();
          await page.getByRole('tab', { name: '在线', exact: true }).click();
          await page.locator('#index [data-follow-author][data-index-cell]').first().waitFor();
          await settle(page);
          const online = await measure();
          assert.deepEqual(online, local, '在线卡片与本地卡片的布局不同');
          assert.ok(online.every(item => item.width >= 150 && item.contained && item.whiteSpace === 'normal'));
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
          assert.equal(await page.locator('#index [role="tablist"]').count(), 1);
          assert.deepEqual(await page.locator('#index [role="tab"]').allTextContents(), ['艺人', '卖家', '在线']);
          await page.getByRole('tab', { name: '卖家', exact: true }).click();
          await page.locator('#index [data-index-cell]').first().waitFor();
          await settle(page);
          assert.equal(await page.locator('#index [role="tablist"]').count(), 1);
          assert.equal(await page.locator('#index [aria-label="身份分类"]').count(), 0);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        }
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
