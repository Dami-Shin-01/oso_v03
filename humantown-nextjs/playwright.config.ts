import { defineConfig } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const useWebServer = !process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL,
    headless: true,
  },
  ...(useWebServer
    ? {
        webServer: {
          command: 'npm run dev',
          url: baseURL,
          reuseExistingServer: true,
          stdout: 'pipe',
          stderr: 'pipe',
        },
      }
    : {}),
});
