// vitest.config.ts
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['.storybook/vitest.setup.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
});