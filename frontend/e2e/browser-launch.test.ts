/* 真实浏览器启动契约：Windows 回环规避项与 Playwright 默认特性必须同时生效。 */
import assert from 'node:assert/strict';
import { it } from 'node:test';
import { chromium, type Browser } from 'playwright-core';
import { launch, requiredEnv } from './harness.ts';

async function disabledFeatures(browser: Browser): Promise<Set<string>> {
  const page = await browser.newPage();
  try {
    await page.goto('chrome://version');
    const command = await page.locator('#command_line').innerText();
    const value = [...command.matchAll(/--disable-features=(\S+)/g)].at(-1);
    assert.ok(value, 'Chrome 必须公开实际启动的禁用特性');
    return new Set(value[1].replaceAll('"', '').split(','));
  } finally { await page.close(); }
}

it('回环网络规避只用于 Windows，且保留当前 Playwright 的全部默认特性', async () => {
  const baseline = await chromium.launch({ headless: true, executablePath: requiredEnv('PEACH_E2E_CHROME') });
  let expected: Set<string>;
  try { expected = await disabledFeatures(baseline); }
  finally { await baseline.close(); }
  if (process.platform === 'win32') expected.add('TcpPortRandomizationWin');
  const browser = await launch();
  try { assert.deepEqual(await disabledFeatures(browser), expected); }
  finally { await browser.close(); }
});

it('测试页关闭系统继承的减少透明度，同时保留用例要求的减少动效', async () => {
  const browser = await launch();
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    assert.deepEqual(await page.evaluate(() => ({
      transparency: matchMedia('(prefers-reduced-transparency: no-preference)').matches,
      motion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    })), { transparency: true, motion: true });
  } finally {
    await context.close();
    await browser.close();
  }
});
