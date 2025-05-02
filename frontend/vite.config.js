import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "picked-defects-scary-future.trycloudflare.com"
    ],
    proxy: {
      '/api': {
        target: 'https://domains-label-federal-relocation.trycloudflare.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
