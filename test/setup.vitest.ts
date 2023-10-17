import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  // needed to use $env/dynamic/public in test context
  vi.mock('$env/dynamic/public', () => {
    return {
      env: {
        PUBLIC_ENVIRONMENT: 'dev',
      },
    };
  });
});
