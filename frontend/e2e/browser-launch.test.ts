/* Real browser launch contract: the Windows loopback workaround flags and Playwright's default features must take effect together. */
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
    assert.ok(value, 'Chrome must expose the disable-features actually used at launch');
    return new Set(value[1].replaceAll('"', '').split(','));
  } finally { await page.close(); }
}

it('Loopback network evasion applies only to Windows and keeps every current Playwright default feature', async () => {
  const baseline = await chromium.launch({ headless: true, executablePath: requiredEnv('PEACH_E2E_CHROME') });
  let expected: Set<string>;
  try { expected = await disabledFeatures(baseline); }
  finally { await baseline.close(); }
  if (process.platform === 'win32') expected.add('TcpPortRandomizationWin');
  const browser = await launch();
  try { assert.deepEqual(await disabledFeatures(browser), expected); }
  finally { await browser.close(); }
});
