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
      reporter: ['html', 'lcov', 'text'],
      exclude: [
        'src/**/*.svelte',
        'src/lib/types',
        'src/lib/hooks.server.ts',
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/lib/**/constants/*.ts',
        '*icons/**/*.svelte',
      ],
    },
  },
});
