/* 入口包的构建配置：`web/dist/peach-entry.js`。
 *
 * 首启页、完成页与错误页是服务端拼的独立页面，不加载 `peach-ui.js` 与 React 子树；这份产物只带
 * 它们要的共用控件（`src/entry/index.ts`），不带 React。主界面的 `/js/ui-components.js` 从这里原名
 * 转出同一批控件，全站只有一份实现、一份模块实例。
 *
 * 字形、转义与界面音效仍是遗留层那一份，外置成 `/js/core.js`、`/js/ui-sounds.js`，与主界面同一个 URL。
 * `npm run build` 里排在最后：第一段 `vite build` 会清空 web/dist。不加内容哈希，理由同 `vite.config.ts`。 */
import { defineConfig } from 'vite';

import { LEGACY_MODULES } from './vite.config.ts';

const ENTRY_EXTERNALS = {
  '@peach/legacy/core': LEGACY_MODULES['@peach/legacy/core'],
  '@peach/legacy/ui-sounds': LEGACY_MODULES['@peach/legacy/ui-sounds'],
} as const;

export default defineConfig({
  build: {
    outDir: '../web/dist',
    emptyOutDir: false,
    target: 'es2022',
    minify: 'oxc',
    sourcemap: false,
    cssCodeSplit: false,
    lib: {
      entry: 'src/entry/index.ts',
      formats: ['es'],
      fileName: () => 'peach-entry.js',
    },
    rollupOptions: {
      external: Object.keys(ENTRY_EXTERNALS),
      output: {
        paths: ENTRY_EXTERNALS,
        codeSplitting: false,
        assetFileNames: 'peach-entry.[ext]',
      },
    },
  },
});
