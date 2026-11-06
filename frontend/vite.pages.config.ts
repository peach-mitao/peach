/* Build configuration for the standalone pages bundle: `web/dist/peach-pages.js` and `web/dist/peach-pages.css`.
 *
 * The first-run, login and error pages are served by the server as the same thin shell that loads only these two files; they
 * are fetchable without a session (ADR-0094). They are self-contained: React, BoardUI controls and the `src/ui-kit/` shared
 * pieces they use are all bundled in, the output has no external imports, the pages do not load the main bundle
 * `peach-app.js`, and one module never has a second instance on these pages. `@peach/legacy/ui` resolves to
 * `src/react/pages/legacy-ui.ts`, exporting only the pieces the shared controls actually read.
 *
 * Ordered after the first stage in `npm run build` (that stage empties web/dist). No splitting, no content hashes: the
 * no-login gate allowlists these two fixed names. Tailwind, the `@` alias, NODE_ENV replacement and the CSS target match
 * `vite.config.ts`. */
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { browserArtifacts, browserSymbols } from './scripts/sentry-build.ts';

export default defineConfig({
  plugins: [tailwindcss(), ...browserSymbols('peach-pages')],
  resolve: {
    alias: {
      '@peach/legacy/ui': fileURLToPath(new URL('./src/react/pages/legacy-ui.ts', import.meta.url)),
      '@': fileURLToPath(new URL('./src/react/boardui', import.meta.url)),
    },
  },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: browserArtifacts,
    emptyOutDir: false,
    target: 'es2022',
    cssTarget: ['chrome111', 'edge111', 'firefox128', 'safari16.4', 'ios16.4'],
    minify: 'oxc',
    sourcemap: 'hidden',
    cssCodeSplit: false,
    lib: {
      entry: 'src/react/pages/index.tsx',
      formats: ['es'],
      fileName: () => 'peach-pages.js',
    },
    rollupOptions: {
      output: {
        codeSplitting: false,
        assetFileNames: 'peach-pages.[ext]',
      },
    },
  },
});
