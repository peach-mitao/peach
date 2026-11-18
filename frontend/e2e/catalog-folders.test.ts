import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, VIEWPORTS, visit } from './harness.ts';

describe('首页文件夹浏览', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });

  for (const viewport of VIEWPORTS) {
    it(`${viewport.name} 实际文件浏览独立于馆藏导航且不改变侧栏`, { timeout: 90_000 }, async () => {
      const longName = 'a-very-long-media-filename-'.repeat(8) + '.mp4';
      const roots = [{ id: 'local', name: 'Local library', mount: '/media/local', location: 'local' }];
      let itemReads = 0;
      const opened = await visit(browser, '/', viewport, async page => {
        page.on('request', request => { if (new URL(request.url()).pathname === '/api/items') itemReads++ });
        await page.route('**/api/media-directory?*', route => {
          const root = new URL(route.request().url()).searchParams.get('root');
          return route.fulfill({ json: { roots, root, relative: '', state: root ? 'ready' : 'roots',
            directories: [], files: root ? [{ name: longName, asset_id: null }] : [],
            path: root ? '/media/local' : undefined, next_offset: null, read_only: true } });
        });
      });
      const { page } = opened;
      try {
        await page.locator('#grid [data-media-card]').first().waitFor();
        await settle(page);
        if (await page.locator('#filterBtn').getAttribute('aria-expanded') !== 'true') await page.locator('#filterBtn').click();
        const toggle = page.locator('[data-sidebar-kind="src"] > [data-sidebar-toggle]');
        if (await toggle.getAttribute('aria-expanded') === 'true') await toggle.click();
        const before = await page.evaluate(() => ({ url: location.href,
          sidebar: document.querySelector('#drawer')!.getBoundingClientRect().width,
          card: document.querySelector('#grid [data-media-card]')!.textContent }));
        const reads = itemReads;
        await page.getByRole('button', { name: '浏览文件', exact: true }).click();
        const dialog = page.getByRole('dialog', { name: '浏览文件', exact: true });
        await dialog.getByRole('button', { name: 'local', exact: true }).click();
        await dialog.getByText(longName, { exact: true }).waitFor();
        const geometry = await dialog.evaluate(node => ({
          width: node.getBoundingClientRect().width, scroll: node.scrollWidth,
          left: node.getBoundingClientRect().left, right: node.getBoundingClientRect().right,
          top: node.getBoundingClientRect().top, bottom: node.getBoundingClientRect().bottom,
          viewport: innerWidth, height: innerHeight,
        }));
        assert.ok(geometry.scroll <= geometry.width + 1, JSON.stringify(geometry));
        assert.ok(geometry.left >= 0 && geometry.right <= geometry.viewport && geometry.top >= 0 && geometry.bottom <= geometry.height, JSON.stringify(geometry));
        await dialog.getByRole('button', { name: '返回上级目录', exact: true }).click();
        await dialog.getByRole('button', { name: 'local', exact: true }).waitFor();
        await dialog.getByRole('button', { name: '关闭', exact: true }).click();
        await dialog.waitFor({ state: 'hidden' });
        assert.equal(page.url(), before.url);
        assert.equal(itemReads, reads, '文件浏览不应重新请求馆藏');
        assert.equal(await page.locator('#filterBtn').getAttribute('aria-expanded'), 'true');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        assert.equal(await page.locator('#drawer').evaluate(node => node.getBoundingClientRect().width), before.sidebar);
        assert.equal(await page.locator('#grid [data-media-card]').first().textContent(), before.card);
        assert.deepEqual(opened.problems.filter(line => !line.includes('VIDEOJS')), []);
      } finally { await opened.close() }
    });

    it(`${viewport.name} 目录范围、首页控件、用途预览和返回导航共用馆藏`, { timeout: 90_000 }, async () => {
      const opened = await visit(browser, '/?browse=folders&loc=local', viewport);
      const { page } = opened;
      try {
        const response = await page.request.get(new URL('/api/folders?loc=local', page.url()).toString());
        assert.equal(response.status(), 200);
        const tree = await response.json();
        const root = tree.roots[0];
        assert.ok(root, '演示库应有一个本地目录根');
        await page.locator('#catalogFolderHeader').getByRole('button', { name: root.name, exact: true }).click();
        await page.waitForFunction(key => new URLSearchParams(location.search).get('folder') === key, root.id);
        await page.locator('#grid [data-media-card]').first().waitFor();
        await page.getByRole('navigation', { name: '文件夹路径' }).getByText(root.name, { exact: true }).waitFor();
        await page.locator('[data-catalog-filter] [data-catalog-views]').waitFor();
        assert.ok(await page.locator('[data-catalog-filter] [data-entity-sorts]').isVisible());
        assert.equal(await page.locator('#grid [data-mix-card]').count(), 0);
        const screenshots = join('..', 'build', 'agent-verification', 'folders');
        mkdirSync(screenshots, { recursive: true });
        await page.screenshot({ path: join(screenshots, `${viewport.name}.png`), fullPage: false });
        if (viewport.mobile) {
          await page.getByRole('button', { name: '打开文件夹目录', exact: true }).click();
          const dialog = page.getByRole('dialog', { name: '文件夹目录', exact: true });
          await dialog.getByRole('treegrid', { name: '媒体目录' }).waitFor();
          await page.screenshot({ path: join(screenshots, 'mobile-tree.png'), fullPage: false });
          await dialog.getByRole('button', { name: '关闭文件夹目录' }).click();
        } else {
          await page.locator('#catalogFoldersTree').getByRole('treegrid', { name: '媒体目录' }).waitFor();
          for (const width of [1280, 1120]) {
            await page.setViewportSize({ width, height: 800 });
            await page.evaluate(async () => {
              window.scrollTo(0, 450);
              await new Promise(requestAnimationFrame);
              await new Promise(requestAnimationFrame);
            });
            const bounds = await page.evaluate(() => {
              const filter = document.querySelector('[data-catalog-frame]')!.getBoundingClientRect();
              const tree = document.getElementById('catalogFoldersTree')!.getBoundingClientRect();
              return { filterBottom: filter.bottom, treeTop: tree.top, treeBottom: tree.bottom, viewport: innerHeight };
            });
            await page.screenshot({ path: join(screenshots, `desktop-scrolled-${width}.png`), fullPage: false });
            assert.ok(bounds.treeTop >= bounds.filterBottom + 8, JSON.stringify(bounds));
            assert.ok(bounds.treeBottom <= bounds.viewport - 8, JSON.stringify(bounds));
          }
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.evaluate(() => window.scrollTo(0, 0));
          const rootPage = await (await page.request.get(new URL(`/api/folders?loc=local&folder=${root.id}`, page.url()).toString())).json();
          const child = rootPage.children[0];
          if (child) {
            await page.locator('#catalogFoldersTree').getByRole('row', { name: child.name, exact: true }).click();
            await page.waitForFunction(key => new URLSearchParams(location.search).get('folder') === key, child.id);
            await page.goBack();
            await page.waitForFunction(key => new URLSearchParams(location.search).get('folder') === key, root.id);
          }
        }
        await page.getByRole('button', { name: '设置目录用途', exact: true }).click();
        const rule = page.getByRole('dialog', { name: '设置目录用途', exact: true });
        await rule.getByRole('button', { name: '预览影响', exact: true }).click();
        await rule.getByRole('region', { name: '目录用途影响范围' }).waitFor();
        await page.screenshot({ path: join(screenshots, `${viewport.name}-rule.png`), fullPage: false });
        await rule.getByRole('button', { name: '保存目录用途', exact: true }).click();
        await rule.waitFor({ state: 'hidden' });
        const saved = await (await page.request.get(new URL(`/api/folders?loc=local&folder=${root.id}`, page.url()).toString())).json();
        assert.equal(saved.rule.purpose, 'category');
        await page.getByRole('button', { name: '设置目录用途', exact: true }).click();
        await page.getByRole('dialog', { name: '设置目录用途', exact: true }).getByRole('button', { name: '移除规则', exact: true }).click();
        await page.getByRole('button', { name: '按住移除目录规则', exact: true }).press('Enter', { delay: 2100 });
        await page.getByRole('dialog', { name: '移除目录规则', exact: true }).waitFor({ state: 'hidden' });
        await page.getByRole('dialog', { name: '设置目录用途', exact: true }).waitFor({ state: 'hidden' });
        await settle(page);
        await page.getByRole('button', { name: '文件夹模式', exact: true }).click();
        await page.waitForFunction(() => !new URLSearchParams(location.search).has('browse'));
        assert.equal(await page.locator('#catalogFolderHeader').isVisible(), false);
        await page.goBack();
        await page.getByRole('navigation', { name: '文件夹路径' }).waitFor();
        assert.equal(new URL(page.url()).searchParams.get('folder'), root.id);
        await settle(page, '#catalogFolderHeader');
        const geometry = await layout(page);
        assert.ok(geometry.scrollWidth <= geometry.viewportWidth + 1, JSON.stringify(geometry));
        assert.deepEqual(opened.problems.filter(line => !line.includes('VIDEOJS')), []);
      } finally { await opened.close() }
    });
  }
});
