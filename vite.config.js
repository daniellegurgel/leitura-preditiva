import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['recharts'] // Isso diz ao Rollup para não incluir 'recharts' no bundle
    }
  }
});
