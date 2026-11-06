/* The test config provides UI stubs separately; every alias in the production build points at real sources. */
import { fileURLToPath } from 'node:url';

import { defineConfig, mergeConfig } from 'vitest/config';

import base from './vite.config.ts';

const stub = (name: string) => fileURLToPath(new URL(`./test/stubs/${name}`, import.meta.url));
const source = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default mergeConfig(base, defineConfig({
  resolve: {
    alias: {
      // The shared capabilities of the controller and the React components point at the same TS source.
      '@peach/legacy/core': source('core/index.ts'),
      '@peach/legacy/jav-title': source('core/jav-title.ts'),
      '@peach/legacy/tags': source('core/tags.ts'),
      '@peach/legacy/ui-sounds': source('ui-kit/sounds.ts'),
      '@peach/legacy/middle-truncate': source('ui-kit/middle-truncate.ts'),
      '@peach/legacy/ui': stub('legacy-ui.ts'),
      // Images, appearance, queries, history and shell state keep module identity between the controller and the page.
      '@peach/card-art': source('card-art/index.ts'),
      '@peach/appearance': source('appearance/index.ts'),
      '@peach/query': source('query/index.ts'),
      '@peach/history': source('history/index.ts'),
      '@peach/shell': source('shell/index.ts'),
      '@/registry': source('react/evilcharts/registry'),
      '@/lib/utils': source('react/charts/cn.ts'),
      '@': source('react/boardui'),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx'],
    // Both the restricted runner and the local resource guard reserve a fixed budget for the whole test process tree; scaling by CPU count by default would exhaust the process slots.
    maxWorkers: 4,
    restoreMocks: true,
  },
}));
