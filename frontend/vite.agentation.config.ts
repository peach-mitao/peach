/* Build configuration for the UI annotation tool: `build/agentation/peach-agentation.js`.
 *
 * Triggered only by `npm run build:agentation`, not part of `npm run build`: the output stays out of Git and out of the
 * standalone bundle, read by the server's `/dev/agentation.js` from the local `build/` directory (docs/FRONTEND.md, "UI
 * annotation").
 * React is bundled into the output rather than borrowed from the page: the main bundle `peach-app.js` does not export React,
 * nor should it change that contract for a dev tool. */
import { defineConfig } from 'vite';

export default defineConfig({
  // Library mode does not replace `process.env.NODE_ENV`, same as `vite.config.ts`.
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: '../build/agentation',
    emptyOutDir: true,
    target: 'es2022',
    minify: 'oxc',
    sourcemap: false,
    lib: {
      entry: 'src/dev/agentation.tsx',
      formats: ['es'],
      fileName: () => 'peach-agentation.js',
    },
    rollupOptions: { output: { codeSplitting: false } },
  },
});
