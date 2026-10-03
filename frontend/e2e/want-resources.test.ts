import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

describe('JAV 入库作品卡', () => {
  let browser: Browser;
  before(async () => { browser = await launch(); });
  after(async () => { await browser?.close(); });
  for (const viewport of VIEWPORTS) {
    it(`资源链接与操作完整可见（${viewport.name}）`, { timeout: 60_000 }, async () => {
      const opened = await visit(browser, '/follow-manage', viewport);
      const page = opened.page;
      try {
        await settle(page);
        await page.route('**/api/wants', route => route.fulfill({ json: { items: [{
          id: 9001, code: 'DEMO-001', title: '演示作品'.repeat(30), origin: 'code', phase: 'searching',
          link: 'https://example.test/work', release_date: '2025-01-01', studio: '演示厂牌', performers: '演示人物',
          fresh: false, search_count: 0, cover: null, scrape_error: null,
        }], counts: { searching: 1 }, scraping: false } }));
        await page.route('**/api/wants/magnets?*', route => route.fulfill({ json: {
          state: 'ready', error: '', checked_at: null, warnings: [], items: [{
            id: 'magnet:abc', protocol: 'magnet', info_hash: 'abc', uri: 'magnet:?xt=urn:btih:abc',
            name: 'DEMO-001'.repeat(24), size: '4 GB', files: '2 个文件', date: '2026-10-01',
            attributes: ['字幕', '高清'], source: 'JavDB', source_url: 'https://example.test/resources',
            origins: ['https://example.test/resources'],
          }, {
            id: 'ed2k:abc', protocol: 'ed2k', info_hash: '', uri: 'ed2k://|file|demo|1|abc|/', name: '评论补充文件',
            size: '1 B', files: '', date: '2026-10-02', attributes: [], source: 'JavDB 评论',
            source_url: 'https://example.test/comment', origins: ['https://example.test/comment'],
          }],
        } }));
        await page.route('**/api/downloads?*', route => route.fulfill({ json: { available: true,
          providers: [{ key: '115', label: '115', configured: true, target: '/下载' }], tasks: [] } }));
        await page.getByRole('tab', { name: 'JAV 入库', exact: true }).click();
        await page.locator('[data-want-magnets]').scrollIntoViewIfNeeded();
        await page.getByRole('heading', { name: '资源链接 · 2' }).waitFor();
        await settle(page);
        const card = page.locator('[data-want-id="9001"]');
        const source = card.getByRole('link', { name: '来源页', exact: true });
        const style = await card.evaluate(el => ({ radius: getComputedStyle(el).borderRadius,
          border: getComputedStyle(el).borderTopWidth }));
        assert.notEqual(style.radius, '0px');
        assert.equal(style.border, '1px');
        assert.equal(await source.evaluate(el => el.getBoundingClientRect().height), 32);
        assert.equal(await source.evaluate(el => getComputedStyle(el).borderTopWidth), '1px');
        assert.equal(await source.evaluate(el => getComputedStyle(el).paddingLeft), '8px');
        assert.equal(await card.getByRole('button', { name: '添加下载', exact: true }).count(), 1);
        assert.equal(await card.getByRole('button', { name: '复制链接', exact: true }).count(), 2);
        const geometry = await layout(page);
        assert.ok(geometry.scrollWidth <= geometry.viewportWidth + 1, JSON.stringify(geometry));
        assert.deepEqual(geometry.offenders, []);
        await card.screenshot({ path: `../build/want-resources-${viewport.name}.png` });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close(); }
    });
  }
});
