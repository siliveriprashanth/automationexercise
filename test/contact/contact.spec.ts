import { test, expect } from "@playwright/test";

test("TC-CON-001 Submit Contact Us form", async ({ page }) => {
  await page.goto("https://automationexercise.com/contact_us");

  await page.locator("input[name='name']").fill("Prashanth");
  await page.locator("input[name='email']").fill("test@mail.com");
  await page.locator("input[name='subject']").fill("Automation");
  await page.locator("textarea[name='message']").fill("Testing contact form");

  await page.locator("input[name='upload_file']").setInputFiles({
    name: "test.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Hello"),
  });

  await page.locator("input[data-qa='submit-button']").click();
});
