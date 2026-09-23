import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

const brave = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  // Serves the last build (`npm run build` first); reuses a preview that is already running.
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: 'npm run preview', url: 'http://127.0.0.1:4331/', reuseExistingServer: true },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4331',
    javaScriptEnabled: false,
    launchOptions: existsSync(brave) ? { executablePath: brave } : {},
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
  ],
});
