/* 入口包的构建配置：`web/dist/peach-entry.js`。
 *
 * 这份产物是遗留层原生模块与共用控件的唯一主人（`src/entry/index.ts`），不带 React。`/js/core.js`、`/js/tags.js`、
 * `/js/jav-title.js`、`/js/ui-sounds.js`、`/js/middle-truncate.js` 与 `/js/ui-components.js` 从这里原名转出，
 * 全站只有一份实现、一份模块实例。
 *
 * 产物没有任何外部 import：`/js/*.js` 反过来 import 它，这里再外置回去就成环。`peach-ui.js` 与 `peach-react.js`
 * 仍按 `LEGACY_MODULES` 外置成 `/js/*.js`，经垫片读到这一份。
 * `npm run build` 里排在最后：第一段 `vite build` 会清空 web/dist。不加内容哈希，理由同 `vite.config.ts`。 */
import { defineConfig } from 'vite';

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
      output: {
        codeSplitting: false,
        assetFileNames: 'peach-entry.[ext]',
      },
    },
  },
});
