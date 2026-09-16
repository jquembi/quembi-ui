import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Cloudflare Pages hosts this project at https://ui.josequembi.com/ (domain root).
// Do not use the former GitHub Pages /quembi-ui/ subpath for assets.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
});
