import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, settle, visit, VIEWPORTS } from './harness.ts';

describe('Library folder range', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });

  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}: switching libraries and returning to all keep catalog and filters in the same scope`, async () => {
      const requests: string[] = [];
      const opened = await visit(browser, '/', viewport, async page => {
        await page.route('**/api/libraries', route => route.fulfill({ json: {
          libraries: [{ id: 'first', name: 'Library Alpha' }, { id: 'second', name: 'Library Beta' }],
        } }));
        await page.route(/\/api\/(items|facets)(\?|$)/, async route => {
          requests.push(route.request().url());
          await route.continue();
        });
      });
      const { page } = opened;
      try {
        for (const [library, label] of [['first', 'Library Alpha'], ['second', 'Library Beta'], ['', 'All libraries']]) {
          if (viewport.mobile && !await page.locator('#drawer').evaluate(node => node.classList.contains('open'))) {
            await page.locator('#filterBtn').click();
          }
          await page.locator('#brandHome').click();
          const choice = page.locator('#boardLibraryMenu').getByRole('button', { name: label, exact: true });
          await choice.waitFor({ state: 'visible' });
          const start = requests.length;
          await Promise.all([page.waitForEvent('load'), choice.click()]);
          await page.locator('#brandHome h1').filter({ hasText: label }).waitFor();
          await page.waitForFunction(() => document.querySelector('#main [aria-busy="true"]') === null);
          await settle(page);
          const current = requests.slice(start).map(url => new URL(url));
          assert.ok(current.some(url => url.pathname === '/api/items'));
          assert.ok(current.some(url => url.pathname === '/api/facets'));
          assert.ok(current.every(url => (url.searchParams.get('library') || '') === library), requests.slice(start).join('\n'));
        }
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
