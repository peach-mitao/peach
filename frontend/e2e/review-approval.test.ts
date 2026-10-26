import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { installDesignBrowser } from './design-fixture.ts';
import { layout, settle, visit, VIEWPORTS } from './harness.ts';

describe('元数据复核的来源选择', () => {
  let browser: Browser;
  installDesignBrowser(next => { browser = next; });
  for (const viewport of VIEWPORTS) {
    it(`明确选择来源后才能通过（${viewport.name}）`, { timeout: 60_000 }, async () => {
      const decisions: Record<string, unknown>[] = [];
      const opened = await visit(browser, '/review', viewport, async page => {
        await page.route('**/api/review', route => route.fulfill({ json: {
          sections: { metadata_fields: [{ item_key: 'test-title', field: 'title', field_label: '标题',
            query: 'DEMO-001', candidates: [
              { candidate_key: 'source-a', source: 'nfo', display_value: '演示标题甲' },
              { candidate_key: 'source-b', source: 'dmm', display_value: '演示标题乙' },
            ] }] }, counts: { metadata_fields: 1 },
        } }));
        await page.route('**/api/review/decision', async route => {
          decisions.push(route.request().postDataJSON());
          await route.fulfill({ json: { ok: true } });
        });
      });
      try {
        const { page, problems } = opened;
        const card = page.locator('[data-review-key="test-title"]');
        await card.waitFor();
        await settle(page);
        assert.equal(await card.getByRole('button', { name: '先选择来源', exact: true }).isDisabled(), true);
        assert.equal(decisions.length, 0);
        await card.getByText('演示标题乙', { exact: true }).click();
        assert.equal(await card.getByRole('radio').nth(1).isChecked(), true);
        const approve = card.getByRole('button', { name: '通过', exact: true });
        assert.equal(await approve.isEnabled(), true);
        const measured = await layout(page);
        assert.equal(measured.scrollWidth <= measured.viewportWidth + 1, true, JSON.stringify(measured));
        assert.deepEqual(measured.offenders, []);
        await approve.click();
        await card.waitFor({ state: 'detached' });
        assert.deepEqual(decisions, [{ category: 'metadata_fields', item_key: 'test-title',
          status: 'approved', candidate_key: 'source-b', selected_ids: [] }]);
        assert.deepEqual(problems, []);
      } finally {
        await opened.close();
      }
    });
  }
});
