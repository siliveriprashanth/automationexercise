import { test, expect } from "../../src/fixtures/testFixture";

test.describe("HOME MODULE", () => {
  test("TC-HOME-001 @smoke Verify homepage loads", async ({ page, home }) => {
    await home.open();
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("TC-HOME-002 Verify header visible", async ({ home }) => {
    await home.open();
    await expect(home.header).toBeVisible();
  });

  test("TC-HOME-003 Verify navigation menu items visible", async ({ home }) => {
    await home.open();

    await expect(home.navProducts).toBeVisible();
    await expect(home.navCart).toBeVisible();
    await expect(home.navSignupLogin).toBeVisible();
    await expect(home.navContact).toBeVisible();
  });

  test("TC-HOME-004 Verify Products link navigation", async ({ page, home }) => {
    await home.open();
    await home.goToProducts();

    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator("h2").filter({ hasText: "All Products" })).toBeVisible();
  });

  test("TC-HOME-005 Verify Cart link navigation", async ({ page, home }) => {
    await home.open();
    await home.goToCart();

    await expect(page).toHaveURL(/\/view_cart/);
    await expect(page.locator("li").filter({ hasText: "Shopping Cart" })).toBeVisible();
  });

  test("TC-HOME-006 Verify Signup/Login link navigation", async ({ page, home }) => {
    await home.open();
    await home.goToLogin();

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("button[data-qa='login-button']")).toBeVisible();
  });

  test("TC-HOME-007 Verify Contact Us link navigation", async ({ page, home }) => {
    await home.open();
    await home.goToContact();

    await expect(page).toHaveURL(/\/contact_us/);
    await expect(page.locator("h2").filter({ hasText: "Get In Touch" })).toBeVisible();
  });

  test("TC-HOME-008 Verify footer subscription section exists", async ({ page, home }) => {
    await home.open();
    const sub = page.locator("h2").filter({ hasText: "Subscription" });

    await sub.scrollIntoViewIfNeeded();
    await expect(sub).toBeVisible();
  });

  test("TC-HOME-009 Verify page scroll works", async ({ page, home }) => {
    await home.open();
    await page.mouse.wheel(0, 2500);

    await expect(page.locator("footer")).toBeVisible();
  });

  test("TC-HOME-010 Verify category section visible", async ({ page, home }) => {
    await home.open();
    await expect(page.locator("h2").filter({ hasText: "Category" })).toBeVisible();
  });

  test("TC-HOME-011 Verify recommended items section visible", async ({ page, home }) => {
    await home.open();
    await page.mouse.wheel(0, 2500);

    await expect(page.locator("h2").filter({ hasText: "recommended items" })).toBeVisible({
      timeout: 15000,
    });
  });

  test("TC-HOME-012 Verify scroll up button exists", async ({ page, home }) => {
    await home.open();
    await page.mouse.wheel(0, 2500);

    const scrollUp = page.locator("#scrollUp");
    await expect(scrollUp).toBeVisible({ timeout: 15000 });

    await scrollUp.click();
    await expect(home.header).toBeVisible();
  });
});
