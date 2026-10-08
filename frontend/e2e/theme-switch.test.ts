/* 换主题那一刻，控件上的颜色过渡不播。
 *
 * 夹具默认按「减少动态效果」开页面，全局规则会把过渡一并关掉，这里要的正是过渡开着的样子，
 * 所以页面级改回 `no-preference`。同一页先绕过 `applyTheme` 直接写属性换一次，确认这枚按钮
 * 在这种换法下确实会起过渡，后面那句「为空」才说明是 `applyTheme` 关掉的。 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, settle, visit, VIEWPORTS } from './harness.ts';

const desktop = VIEWPORTS.find((viewport) => !viewport.mobile)!;

describe('切换主题', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser.close() });

  it('切换瞬间带颜色过渡的控件没有动画，明暗键滑块照常位移，下一帧过渡恢复', { timeout: 60_000 }, async () => {
    const opened = await visit(browser, '/resource-sync', desktop);
    try {
      const { page } = opened;
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const button = page.locator('#stats section#resource-sync .resourceaction').first();
      await button.waitFor({ state: 'visible', timeout: 15_000 });
      await page.locator('.board-theme-thumb').waitFor({ state: 'attached' });
      await settle(page);

      const result = await button.evaluate(async (node) => {
        const entry = '/dist/peach-ui.js', ui = await import(entry);
        const root = document.documentElement;
        const thumb = document.querySelector<HTMLElement>('.board-theme-thumb')!;
        const frame = () => new Promise((done) => requestAnimationFrame(() => setTimeout(done, 150)));
        const finish = () => document.getAnimations().forEach((animation) => animation.finish());
        const transitions = (element: Element) => element.getAnimations()
          .map((animation) => (animation as CSSTransition).transitionProperty);

        ui.applyTheme('light');
        await frame();
        finish();
        const declared = getComputedStyle(node).transitionProperty;

        root.dataset.theme = 'dark';
        root.classList.add('dark');
        const raw = transitions(node);
        finish();
        ui.applyTheme('light');
        await frame();
        finish();

        ui.applyTheme('dark');
        const switched = transitions(node);
        const slid = transitions(thumb);
        const blocked = document.head.querySelectorAll('style').length;
        await frame();
        const restored = getComputedStyle(node).transitionProperty;
        const released = document.head.querySelectorAll('style').length;
        return { declared, raw, switched, slid, restored, blocked, released };
      });

      assert.match(result.declared, /background-color/, `这枚按钮没有声明颜色过渡：${result.declared}`);
      assert.ok(result.raw.length > 0, '直接写主题属性时按钮没有起过渡，对照不成立');
      assert.deepEqual(result.switched, [], `applyTheme 之后按钮仍在过渡：${result.switched.join(', ')}`);
      assert.deepEqual(result.slid, ['transform'], `明暗键滑块没有跟着位移：${result.slid.join(', ')}`);
      assert.equal(result.restored, result.declared, '下一帧之后按钮的过渡没有恢复');
      assert.equal(result.released, result.blocked - 1, '关过渡的临时样式没有摘掉');
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
  });
});
