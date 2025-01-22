// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': require.resolve('react-router-dom'),
    },
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom'],
    },
  },
});
