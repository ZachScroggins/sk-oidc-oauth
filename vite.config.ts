import { sveltekit } from '@sveltejs/kit/vite';
import { FontaineTransform } from 'fontaine';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({ compiler: 'svelte' }),
    FontaineTransform.vite({
      fallbacks: ['BlinkMacSystemFont', 'Helvetica Neue', 'Arial'],
    }),
    purgeCss(),
  ],
  test: {
    include: ['src/lib/**/*.spec.{js,ts}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: 'test/setup.vitest.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'json-summary'],
      // lines: 80,
      // statements: 80,
      // functions: 80,
      // branches: 80,
      perFile: true,
      all: true,
      include: ['src/lib/**/*.{js,ts}'],
      exclude: [
        '**/types/**',
        '**/hooks.server.ts',
        '**/index.ts',
        '**/constants/**',
        '**/icons/**',
        '**/*.d.ts',
        '**/*.spec.{js,ts}',
      ],
    },
  },
});
