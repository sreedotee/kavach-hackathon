import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';  // Import Tailwind as a Vite plugin
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // Add the Tailwind Vite plugin here
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
});
