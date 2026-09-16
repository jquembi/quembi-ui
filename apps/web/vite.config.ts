import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Project Pages are served under /quembi-ui/; keep local dev and other hosts at /.
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/quembi-ui/' : '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
});
