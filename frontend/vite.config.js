import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://plumbing-colony-dictionary-directly.trycloudflare.com',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ['photographers-requirement-indicators-invitation.trycloudflare.com'],
  },
});
