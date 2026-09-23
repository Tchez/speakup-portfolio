import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

const brave = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4321',
    javaScriptEnabled: false,
    launchOptions: existsSync(brave) ? { executablePath: brave } : {},
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
  ],
});
