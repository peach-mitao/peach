/* Main UI build: Application, routing, resident components, first-screen pages and shared state are bundled into the entry
 * peach-app.js.
 * The entry uses a fixed file name referenced by index.html; the server validates content by ETag and requires revalidation
 * every time.
 * Low-frequency pages are dynamically imported by the router's `routeChunk`, split into `peach-app.<name>-<hash>.js` with
 * content hashes, cached by the server as long-lived immutable (ADR-0118). Modules the first screen needs stay in the entry,
 * chunks import them from the entry, and one module has one instance.
 * Module aliases point directly at the single source, and the browser requests the separate agentation module only when dev
 * instrumentation is enabled. */
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { browserArtifacts, browserSymbols } from './scripts/sentry-build.ts';

const source = (name: string) => fileURLToPath(new URL(`./src/${name}`, import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), ...browserSymbols('peach-app')],
  resolve: { alias: {
    'next/link': source('react/components/board-navigation-link.tsx'),
    '@peach/legacy/core': source('core/index.ts'), '@peach/legacy/ui': source('ui-kit/index.ts'),
    '@peach/legacy/jav-title': source('core/jav-title.ts'), '@peach/legacy/tags': source('core/tags.ts'),
    '@peach/legacy/ui-sounds': source('ui-kit/sounds.ts'), '@peach/legacy/middle-truncate': source('ui-kit/middle-truncate.ts'),
    '@peach/card-art': source('card-art/index.ts'), '@peach/appearance': source('appearance/index.ts'),
    '@peach/query': source('query/index.ts'), '@peach/history': source('history/index.ts'), '@peach/shell': source('shell/index.ts'),
    '@/registry': source('react/evilcharts/registry'), '@/lib/utils': source('react/charts/cn.ts'), '@': source('react/boardui'),
  } },
  // Library mode does not replace `process.env.NODE_ENV`. `QueryClient` (`@tanstack/query-core`) ships with this bundle, and its development
  // Warnings are decided by this value; without the replacement the browser reads a nonexistent `process` and the whole module fails to load.
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: browserArtifacts,
    // The private directory keeps JavaScript and source maps; the release plugin copies only JS and CSS into `web/dist/`.
    emptyOutDir: true,
    target: 'es2022',
    cssTarget: ['chrome111','edge111','firefox128','safari16.4','ios16.4'],
    // Vite 8 runs on rolldown and minifies through oxc; specifying 'esbuild' lands on the deprecated transform plugin.
    minify: 'oxc',
    sourcemap: 'hidden',
    // The styles are still one peach-app.css: the cascade order relative to the legacy stylesheet is decided by index.html and does not change with page loads.
    cssCodeSplit: false,
    lib: {
      entry: 'src/react/bootstrap.tsx',
      formats: ['es'],
      fileName: () => 'peach-app.js',
    },
    rollupOptions: {
      external: ['/dev/agentation.js'],
      // Library mode defaults to `strict`: the entry tolerates no extra exports, and modules shared between the entry and chunks can only be split off into dozens of common chunks,
      // The first screen becomes a cascade of requests. Once the extension is unlocked, the shared module stays in the entry point and chunks import from the entry.
      preserveEntrySignatures: 'allow-extension',
      output: {
        // Chunks share the entry's prefix and sit flat in `web/dist/`: the server only accepts this shape, with no path separators in names.
        chunkFileNames: 'peach-app.[name]-[hash].js',
        codeSplitting: { groups: [{ name: 'main', tags: ['$initial'] }] },
        // Entry re-exports of chunks use the source names: minified to single letters, any change in the entry would shift every export name,
        // Every chunk's content and hash change together, so one small edit swaps out every chunk in `web/dist/`.
        minifyInternalExports: false,
        assetFileNames: 'peach-app.[ext]',
      },
    },
  },
});
