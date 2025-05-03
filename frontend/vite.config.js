import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://earn-stores-ministry-simple.trycloudflare.com',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ['certified-collectibles-confident-translated.trycloudflare.com'],
  },
});
