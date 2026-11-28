import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, requiredEnv, settle, visit, VIEWPORTS } from './harness.ts';

describe('标签管理的完整操作', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  it('同一在线标签规则入口支持隐藏标签和按范围屏蔽内容', async () => {
    const opened = await visit(browser, '/tags?scope=online', VIEWPORTS[0]);
    const { page } = opened;
    const origin = requiredEnv('PEACH_E2E_ORIGIN');
    const name = `scope-${randomUUID().slice(0, 8)}`;
    try {
      const dialog = page.locator('dialog[open]');
      const enterName = async () => {
        await page.getByRole('button', { name: '添加标签规则', exact: true }).click();
        const tagName = dialog.getByRole('combobox', { name: '标签名称' });
        await tagName.fill(name);
        await tagName.press('Tab');
      };
      const fetchRules = async (state: 'hidden' | 'blocked') => (await page.request.get(
        `${origin}/api/tag-management?scope=online&state=${state}&limit=10&q=${name}`)).json();
      await enterName();
      await dialog.getByText('隐藏标签', { exact: true }).click();
      assert.equal(await dialog.getByRole('checkbox', { name: 'JAV 新作' }).count(), 0);
      await dialog.getByRole('button', { name: '预览影响范围' }).click();
      await dialog.getByText(new RegExp(`隐藏.*${name}.*相关作品仍会显示`)).waitFor();
      await dialog.getByRole('button', { name: '隐藏标签', exact: true }).click();
      await dialog.waitFor({ state: 'detached' });
      assert.equal((await fetchRules('hidden')).total, 1);
      assert.equal((await fetchRules('blocked')).total, 0);
      await page.getByRole('button', { name: '撤销', exact: true }).click();
      await page.getByText('已撤销', { exact: true }).waitFor();
      assert.equal((await fetchRules('hidden')).total, 0);

      await enterName();
      await dialog.getByText('隐藏标签', { exact: true }).click();
      await dialog.getByText('屏蔽带此标签的内容', { exact: true }).click();
      await dialog.getByText('关注动态', { exact: true }).click();
      assert.equal(await dialog.getByRole('button', { name: '预览影响范围' }).isDisabled(), true);
      await dialog.getByText('JAV 新作', { exact: true }).click();
      await dialog.getByRole('button', { name: '预览影响范围' }).click();
      await dialog.getByText(new RegExp(`隐藏.*${name}.*在JAV 新作中屏蔽`)).waitFor();
      await dialog.getByRole('button', { name: '隐藏标签并屏蔽内容', exact: true }).click();
      await dialog.waitFor({ state: 'detached' });
      const beforeUndo = await fetchRules('blocked');
      assert.deepEqual(beforeUndo.items.map((tag: { block_scopes: string[] }) => tag.block_scopes), [['jav_releases']]);
      assert.equal((await fetchRules('hidden')).total, 1);
      const undoResponse = page.waitForResponse(response => response.url() === `${origin}/api/tag-management`
        && response.request().method() === 'POST' && response.request().postDataJSON()?.operation === 'unblock');
      await page.getByRole('button', { name: '撤销', exact: true }).click();
      assert.ok((await undoResponse).ok());
      assert.equal((await fetchRules('blocked')).total, 0);
      assert.equal((await fetchRules('hidden')).total, 0);
    } finally {
      await opened.close();
    }
  });
  for (const viewport of VIEWPORTS) it(viewport.name, async () => {
    const { page } = await visit(browser, '/tags?view=cloud', viewport);
    try {
      const origin = requiredEnv('PEACH_E2E_ORIGIN');
      const items = await (await page.request.get(`${origin}/api/items?limit=1`)).json();
      const id = items.items[0].id;
      const suffix = randomUUID().slice(0, 8);
      const first = `管理甲${suffix}`, second = `管理乙${suffix}`, renamed = `我的标签${suffix}`;
      for (const tag of [first, second]) {
        assert.equal((await page.request.post(`${origin}/api/item-tag`, { data: { id, operation: 'add', tag } })).status(), 200);
      }
      await page.reload();
      await page.locator('[data-filter-search] input').fill(suffix);
      await page.locator('[data-filter-search] input').press('Enter');
      await page.getByRole('button', { name: '管理标签', exact: true }).click();
      assert.equal(await page.locator('[data-index-head] input[type="search"]').count(), 0);
      assert.equal(await page.locator('[data-tag-manager] [data-filter-search] input').count(), 1);
      assert.equal(await page.locator('[data-tag-manager] [data-filter-search] input').inputValue(), suffix);
      assert.equal(await page.getByRole('heading', { name: '标签管理', exact: true }).count(), 0);
      await page.getByRole('button', { name: '返回标签浏览', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: `编辑标签 ${first}`, exact: true }).count(), 0);
      await page.getByRole('button', { name: '管理标签', exact: true }).click();
      await page.getByRole('button', { name: `编辑标签 ${first}`, exact: true }).click();
      const editorClass = await page.locator('dialog[open]').getAttribute('class');
      await page.getByRole('button', { name: '取消', exact: true }).click();
      const chip = (name: string) => page.locator(`[data-tag-manager] [data-tag-chip][data-k="${name}"]`);
      await page.getByRole('button', { name: '重命名', exact: true }).click();
      await page.getByRole('textbox', { name: '标签名称', exact: true }).fill(renamed);
      await page.getByRole('button', { name: '预览影响范围', exact: true }).click();
      assert.equal(await page.locator('dialog[open]').getAttribute('class'), editorClass);
      await page.getByRole('button', { name: '重命名标签', exact: true }).click({ timeout: 5000 });
      await page.getByRole('group', { name: '标签管理操作', exact: true }).waitFor({ state: 'detached' });
      await chip(renamed).waitFor();
      assert.equal(await chip(first).count(), 0);
      await chip(renamed).click();
      await chip(second).click();
      await page.getByRole('button', { name: '合并', exact: true }).click();
      await page.getByRole('button', { name: '预览影响范围', exact: true }).click();
      await page.getByRole('button', { name: '合并标签', exact: true }).click();
      await page.getByRole('group', { name: '标签管理操作', exact: true }).waitFor({ state: 'detached' });
      const inventory = await (await page.request.get(`${origin}/api/tag-management`)).json();
      const survivor = inventory.items.find((row: { aliases: string[] }) => row.aliases.includes(first));
      assert.ok(survivor);
      await chip(survivor.k).click();
      await page.getByRole('button', { name: '隐藏', exact: true }).click();
      await page.getByRole('button', { name: '隐藏标签', exact: true }).click();
      await chip(survivor.k).waitFor({ state: 'detached' });
      await page.getByRole('group', { name: '标签管理操作', exact: true }).waitFor({ state: 'detached' });
      // 状态药丸带着数量（「已隐藏 3」），按开头的档名找。
      await page.getByRole('button', { name: /^已隐藏/ }).click();
      await chip(survivor.k).click();
      await page.getByRole('button', { name: '恢复', exact: true }).click();
      await page.getByRole('button', { name: '恢复标签', exact: true }).click();
      await chip(survivor.k).waitFor({ state: 'detached' });
      await page.getByRole('group', { name: '标签管理操作', exact: true }).waitFor({ state: 'detached' });
      await page.getByRole('button', { name: '使用中', exact: true }).click();
      await chip(survivor.k).waitFor();
      const edit = page.getByRole('button', { name: `编辑标签 ${survivor.k}`, exact: true });
      assert.ok(await edit.evaluate(node => !!node.closest('[data-tag-token]')));
      assert.equal(await edit.textContent(), '');
      await page.getByRole('button', { name: '返回标签浏览', exact: true }).click();
      assert.equal(await page.getByRole('radio', { name: '标签云', exact: true }).isChecked(), true);
      const token = page.locator('[data-tag-token]').filter({has: page.locator(`[data-tag-chip][data-k="${survivor.k}"]`)});
      const iconGeometry = await token.evaluate(node => {
        const outer = node.getBoundingClientRect();
        return [...node.querySelectorAll('[data-entity-action]')].map(icon => {
          const box = icon.getBoundingClientRect();
          return { size: [box.width, box.height], top: box.top - outer.top, bottom: outer.bottom - box.bottom,
            right: outer.right - box.right };
        });
      });
      assert.equal(iconGeometry.length, 1);
      for (const icon of iconGeometry) {
        assert.deepEqual(icon.size, [24, 24]);
        assert.ok(icon.top >= 4 && icon.bottom >= 4 && icon.right >= 4);
      }
      assert.equal(await token.getByRole('button', { name: `编辑标签 ${survivor.k}`, exact: true }).count(), 0);
      const favorite = token.locator('[data-entity-action]').first();
      await page.mouse.move(0, 0);
      const resting = await favorite.evaluate(node => getComputedStyle(node).backgroundColor);
      await favorite.hover();
      assert.notEqual(await favorite.evaluate(node => getComputedStyle(node).backgroundColor), resting);
      await settle(page);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    } finally { await page.context().close() }
  });
});
