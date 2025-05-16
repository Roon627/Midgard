import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const backendUrl = env.VITE_BACKEND_URL;
  const isTunnel = backendUrl?.startsWith("https://");

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: [
        'localhost',
        'observed-relief-metals-diagram.trycloudflare.com'
      ],
      proxy: !isTunnel
        ? {
            '/api': {
              target: backendUrl,
              changeOrigin: true,
            },
          }
        : undefined,
    },
    define: {
      'process.env': env,
    },
  };
});
