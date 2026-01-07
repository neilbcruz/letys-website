import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8788',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
