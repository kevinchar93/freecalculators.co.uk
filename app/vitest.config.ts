import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${import.meta.dirname}/inertia/`,
      '@generated': `${import.meta.dirname}/.adonisjs/client/`,
    },
  },
  test: {
    include: ['inertia/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./inertia/test/setup.ts'],
    globals: true,
  },
});
