import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: ['tests/**/*.{test,spec}.js'],
    exclude: ['node_modules/**', 'dist/**'],
  },
});
