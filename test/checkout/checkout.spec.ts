import { test, expect } from "@playwright/test";

test.describe("CHECKOUT MODULE", () => {
  test("TC-CHK-001 User can place order successfully", async ({ page }) => {
    await page.goto("https://automationexercise.com/");

    // Add product
    await page.locator("a[href='/products']").click();
    await page.locator(".productinfo.text-center a.add-to-cart").first().click();
    await page.locator("#cartModal a").filter({ hasText: "View Cart" }).click();

    // Checkout
    await page.locator("a").filter({ hasText: "Proceed To Checkout" }).click();
    await expect(page.locator("h2").filter({ hasText: "Address Details" })).toBeVisible();

    await page.locator("textarea[name='message']").fill("Checkout test");
    await page.locator("a").filter({ hasText: "Place Order" }).click();

    // Payment
    await page.locator("input[name='name_on_card']").fill("Prashanth QA");
    await page.locator("input[name='card_number']").fill("4111111111111111");
    await page.locator("input[name='cvc']").fill("123");
    await page.locator("input[name='expiry_month']").fill("12");
    await page.locator("input[name='expiry_year']").fill("2030");

    await page.locator("button[data-qa='pay-button']").click();
    await expect(page.locator("p").filter({ hasText: "successfully" })).toBeVisible();
  });
});
