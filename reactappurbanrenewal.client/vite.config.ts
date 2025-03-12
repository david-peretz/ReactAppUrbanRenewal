import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    https: true,
    proxy: {
      '/api': {
        target: 'https://localhost:7238',
        changeOrigin: true,
        secure: false,
      }
    }
  },
});
