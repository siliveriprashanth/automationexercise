import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  timeout: 45_000,
  expect: { timeout: 10_000 },

  fullyParallel: true,
  retries: 1,
  reporter: [["html"], ["list"]],

  use: {
    baseURL: "https://automationexercise.com",
    headless: true,
    viewport: { width: 1366, height: 768 },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    { name: "Chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "Firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "WebKit", use: { ...devices["Desktop Safari"] } },
  ],
});
