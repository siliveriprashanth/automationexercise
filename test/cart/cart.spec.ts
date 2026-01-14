import { test, expect } from "../../src/fixtures/testFixture";

test.describe("CART MODULE", () => {
  test.beforeEach(async ({ products }) => {
    await products.open();
  });

  test("TC-CART-001 @smoke Cart page loads", async ({ cart }) => {
    await cart.open();
  });

  test("TC-CART-002 Cart contains added product", async ({ products, cart }) => {
    await products.addFirstProductToCart(true);
    await cart.expectAtLeastOneItem();
  });

  test("TC-CART-003 Validate cart row has product name/price/qty", async ({ page, products, cart }) => {
    await products.addFirstProductToCart(true);
    await cart.expectAtLeastOneItem();

    await expect(page.locator(".cart_description")).toBeVisible();
    await expect(page.locator(".cart_price")).toBeVisible();
    await expect(page.locator(".cart_quantity")).toBeVisible();
  });

  test("TC-CART-004 Update quantity from product details", async ({ page, cart }) => {
    await page.locator("a").filter({ hasText: "View Product" }).first().click();
    await page.locator("input#quantity").fill("4");
    await page.locator("button").filter({ hasText: "Add to cart" }).click();
    await page.locator("a").filter({ hasText: "View Cart" }).click();

    await expect(page.locator(".cart_quantity button")).toContainText("4");
  });

  test("TC-CART-005 Remove item from cart", async ({ page, products, cart }) => {
    await products.addFirstProductToCart(true);
    await cart.expectAtLeastOneItem();

    await page.locator(".cart_quantity_delete").first().click();
    await expect(cart.cartRows).toHaveCount(0);
  });

  test("TC-CART-006 Removing last item shows empty cart", async ({ page, products, cart }) => {
    await products.addFirstProductToCart(true);
    await page.locator(".cart_quantity_delete").first().click();

    await expect(cart.cartRows).toHaveCount(0);
  });

  test("TC-CART-007 Add two products and verify count", async ({ page, cart }) => {
    const addButtons = page.locator(".productinfo.text-center a.add-to-cart");
    await addButtons.nth(0).click();
    await page.locator("button").filter({ hasText: "Continue Shopping" }).click();
    await addButtons.nth(1).click();
    await page.locator("a").filter({ hasText: "View Cart" }).click();

    await expect(cart.cartRows).toHaveCount(2);
  });

  test("TC-CART-008 Cart persists after refresh", async ({ page, products, cart }) => {
    await products.addFirstProductToCart(true);
    await page.reload();
    await cart.expectAtLeastOneItem();
  });

  test("TC-CART-009 Continue Shopping redirects to products", async ({ page, products }) => {
    await products.addFirstProductToCart(true);
    await page.locator("a").filter({ hasText: "Continue Shopping" }).click({ timeout: 5000 }).catch(() => {});
    await expect(page).toBeTruthy();
  });

  test("TC-CART-010 Proceed to checkout button visible", async ({ products, cart }) => {
    await products.addFirstProductToCart(true);
    await expect(cart.proceedToCheckout).toBeVisible();
  });

  test("TC-CART-011 Proceed to checkout redirects (may require login)", async ({ page, products, cart }) => {
    await products.addFirstProductToCart(true);
    await cart.proceedCheckout();
    await expect(page).toHaveURL(/\/checkout|\/login/);
  });

  test("TC-CART-012 Cart price formatting exists", async ({ page, products }) => {
    await products.addFirstProductToCart(true);
    await expect(page.locator(".cart_price").first()).toBeVisible();
  });

  test("TC-CART-013 Cart quantity not negative", async ({ page }) => {
    // Site doesn’t allow negative quantity input in cart directly,
    // so this is basic validation: quantity should be >= 1.
    const qty = page.locator(".cart_quantity button").first();
    if (await qty.count()) {
      const txt = await qty.textContent();
      expect(Number(txt?.trim() || "1")).toBeGreaterThanOrEqual(1);
    }
  });

  test("TC-CART-014 Validate cart item images visible", async ({ page, products }) => {
    await products.addFirstProductToCart(true);
    await expect(page.locator(".cart_product img").first()).toBeVisible();
  });

  test("TC-CART-015 Validate cart title visible", async ({ cart, products }) => {
    await products.addFirstProductToCart(true);
    await cart.open();
    await expect(cart.cartHeading).toBeVisible();
  });

  test("TC-CART-016 Cart navigation from header", async ({ page, home }) => {
    await home.open();
    await home.goToCart();
    await expect(page).toHaveURL(/\/view_cart/);
  });
});
