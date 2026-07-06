import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward API calls to the Express server during local dev so the
    // frontend can just fetch('/api/...') same-origin.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
