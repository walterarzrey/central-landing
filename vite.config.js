import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5174,
    open: false,
    host: true
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: true,
    cssMinify: true
  }
});
