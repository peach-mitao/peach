import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { configurationBody, expectBody, launch, layout, requiredEnv, settle, visit, VIEWPORTS } from './harness.ts';

describe('普通 HTTP 的配置与播放', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });

  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：非安全来源打开配置、编辑索引器并挂载播放器`, { timeout: 60_000 }, async () => {
      const service = requiredEnv('PEACH_E2E_ORIGIN');
      const origin = 'http://peach-http.test';
      const opened = await visit(browser, '/', viewport, async page => {
        // 只将临时演示服务映射到普通 HTTP 来源；浏览器自行决定 Web Crypto 的可用性。
        await page.route(`${origin}/**`, async route => {
          const request = route.request();
          const url = new URL(request.url());
          const response = await route.fetch({ url: service + url.pathname + url.search,
            headers: { ...request.headers(), host: new URL(service).host, origin: service } });
          await route.fulfill({ response });
        });
      });
      const { page, problems } = opened;
      try {
        const response = await page.request.get(`${service}/api/configuration`);
        assert.equal(response.status(), 200);
        const configuration = await response.json();
        await page.route(`${origin}/api/configuration`, route => route.fulfill({ json: { ...configuration, editable: true } }));
        const writes: { indexers: { key: string; name: string; url: string }[] }[] = [];
        await page.route(`${origin}/api/configuration/indexers`, route => {
          if (route.request().method() === 'GET') return route.fulfill({ json: { indexers: [], max_indexers: 4 } });
          const sent = route.request().postDataJSON();
          writes.push(sent);
          return route.fulfill({ json: { ...sent, max_indexers: 4 } });
        });
        page.on('response', response => {
          if (response.url().startsWith(origin) && response.status() >= 400) problems.push(`${response.status()} ${response.url()}`);
        });
        for (const path of ['/settings/library', '/configuration']) {
          await page.goto(origin + path, { waitUntil: 'load' });
          assert.deepEqual(await page.evaluate(() => ({
            secure: isSecureContext, uuid: typeof crypto.randomUUID, random: typeof crypto.getRandomValues,
          })), { secure: false, uuid: 'undefined', random: 'function' });
          await expectBody(page, path, configurationBody(page));
          await page.getByRole('tab', { name: '来源与订阅', exact: true }).click();
          const section = page.getByRole('form', { name: '资源搜索', exact: true });
          await section.getByRole('button', { name: '添加索引器', exact: true }).click();
          await section.getByRole('button', { name: '添加索引器', exact: true }).click();
          await section.getByRole('textbox', { name: '索引器 2 名称', exact: true }).fill('HTTP 测试');
          await section.getByRole('textbox', { name: '索引器 2 Torznab 地址', exact: true }).fill('https://indexer.example/api');
          await section.getByRole('button', { name: '移除索引器 1', exact: true }).click();
          const saved = page.waitForResponse(response => response.url() === `${origin}/api/configuration/indexers`
            && response.request().method() === 'POST');
          await section.getByRole('button', { name: '保存配置', exact: true }).click();
          assert.equal((await saved).status(), 200);
          assert.equal(writes.at(-1)!.indexers.length, 1);
          assert.equal(writes.at(-1)!.indexers[0]!.name, 'HTTP 测试');
          await settle(page, '.ui-configpage');
          const bounds = await layout(page);
          assert.ok(bounds.scrollWidth <= bounds.viewportWidth);
          assert.deepEqual(bounds.offenders, []);
        }
        await page.goto(`${origin}/assets/${requiredEnv('PEACH_E2E_ITEM')}`, { waitUntil: 'load' });
        await page.locator('#stage .video-js video.vjs-tech').waitFor();
        assert.deepEqual(problems, []);
      } finally { await opened.close() }
    });
  }
});
