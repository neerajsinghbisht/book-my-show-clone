import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:51063',
        changeOrigin: true,
        secure: false, // if using HTTPS locally, set to false
      },
    },
  },
});