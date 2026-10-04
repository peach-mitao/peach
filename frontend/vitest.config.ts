/* 测试配置和构建配置分开：`resolve.alias` 会同时作用于构建，
 * 把遗留模块的桩打进产物里——那正是 `build.rollupOptions.external` 要避免的。 */
import { fileURLToPath } from 'node:url';

import { defineConfig, mergeConfig } from 'vitest/config';

import base from './vite.config.ts';

const stub = (name: string) => fileURLToPath(new URL(`./test/stubs/${name}`, import.meta.url));
const source = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default mergeConfig(base, defineConfig({
  resolve: {
    alias: {
      // 入口包的模块在测试里直接落到 TS 源码，与 `/dist/peach-entry.js` 那条别名是同一个模块实例。
      '@peach/legacy/core': source('core/index.ts'),
      '@peach/legacy/jav-title': source('core/jav-title.ts'),
      '@peach/legacy/tags': source('core/tags.ts'),
      '@peach/legacy/ui-sounds': source('ui-kit/sounds.ts'),
      '@peach/legacy/ui': stub('legacy-ui.ts'),
      // `/js/*.js` 垫片与 `/js/ui-components.js` 从入口包原名转出；测试里那条绝对路径落到入口包的源码。
      '/dist/peach-entry.js': source('entry/index.ts'),
      // 测试里 island 直接拿到 React 子树的源码入口，不经过 web/dist 产物。
      '@peach/react': source('react/entry.tsx'),
      // React 子树按 `@peach/card-art` 取卡片图片助手，产物里是 peach-ui.js；测试里两边都落到同一份源码。
      '@peach/card-art': source('card-art/index.ts'),
      '@peach/appearance': source('appearance/index.ts'),
      '@peach/query': source('query/index.ts'),
      '@peach/history': source('history/index.ts'),
      '@/registry': source('react/evilcharts/registry'),
      '@/lib/utils': source('react/charts/cn.ts'),
      '@': source('react/boardui'),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx'],
    // 受限 runner 与本机资源守卫都给整棵测试进程树留固定预算；默认按 CPU 数扩张会耗尽进程槽。
    maxWorkers: 4,
    restoreMocks: true,
  },
}));
