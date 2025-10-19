import path from 'path';

/* eslint-disable import/default */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
 resolve: {
    alias: {
      '@assets': path.resolve('src/assets'),
      '@components': path.resolve('src/components'),
      '@context': path.resolve('src/context'),
      '@constants': path.resolve('src/constants'),
      '@forms': path.resolve('src/forms'),
      '@hooks': path.resolve('src/hooks'),
      '@pages': path.resolve('src/pages'),
      '@providers': path.resolve('src/providers')
    },
  },
});
