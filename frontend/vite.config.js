import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 👈 allows access from LAN (other devices)
    port: 5173,      // 👈 optional: ensure consistent port

    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 👈 point to local backend now
        changeOrigin: true,
        secure: false,
      },
    },

    allowedHosts: 'all', // 👈 allow all LAN IPs, remove cloudflare host restriction
  },
});
