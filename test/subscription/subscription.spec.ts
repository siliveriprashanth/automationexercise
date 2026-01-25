import { test, expect } from "@playwright/test";

test("TC-SUB-001 Verify subscription works", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await page.locator("#susbscribe_email").scrollIntoViewIfNeeded();
  await page.locator("#susbscribe_email").fill("user@test.com");
  await page.locator("#subscribe").click();

  await expect(page.locator(".alert-success")).toBeVisible();
});
