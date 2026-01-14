import { test, expect } from "@playwright/test";

test("sample test", async ({ page }) => {
  await page.goto("https://automationexercise.com");
  await expect(page).toHaveTitle(/Automation Exercise/);
});

