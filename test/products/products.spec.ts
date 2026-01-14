import { test, expect } from "../../src/fixtures/testFixture";

test.describe("PRODUCTS MODULE", () => {
  test("TC-PROD-001 @smoke Verify Products page loads", async ({ products }) => {
    await products.open();
  });

  test("TC-PROD-002 Validate product cards exist", async ({ page, products }) => {
    await products.open();
    await expect(page.locator(".productinfo.text-center")).toHaveCount(34, { timeout: 15000 }); // site may change count
  });

  test("TC-PROD-003 Search product with valid keyword", async ({ page, products }) => {
    await products.open();
    await products.search("Dress");
    await expect(page.locator("h2").filter({ hasText: "Searched Products" })).toBeVisible();
  });

  test("TC-PROD-004 Search product with random keyword", async ({ page, products }) => {
    await products.open();
    await products.search("zzzzzzzz");
    await expect(page.locator("h2").filter({ hasText: "Searched Products" })).toBeVisible();
  });

  test("TC-PROD-005 Open first product details", async ({ page, products }) => {
    await products.open();
    await page.locator("a").filter({ hasText: "View Product" }).first().click();
    await expect(page).toHaveURL(/\/product_details\//);
  });

  test("TC-PROD-006 Verify product details page elements", async ({ page, products }) => {
    await products.open();
    await page.locator("a").filter({ hasText: "View Product" }).first().click();

    await expect(page.locator(".product-information h2")).toBeVisible();
    await expect(page.locator(".product-information span span")).toBeVisible(); // price
  });

  test("TC-PROD-007 Add first product to cart and continue shopping", async ({ products, cart }) => {
    await products.open();
    await products.addFirstProductToCart(false);
    await cart.open();
    await cart.expectAtLeastOneItem();
  });

  test("TC-PROD-008 Add first product to cart and view cart from modal", async ({ products, cart }) => {
    await products.open();
    await products.addFirstProductToCart(true);
    await cart.expectAtLeastOneItem();
  });

  test("TC-PROD-009 Add multiple products", async ({ page, products, cart }) => {
    await products.open();

    const addButtons = page.locator(".productinfo.text-center a.add-to-cart");
    const count = await addButtons.count();

    // add first 2 items
    await addButtons.nth(0).click();
    await page.locator("button").filter({ hasText: "Continue Shopping" }).click();
    await addButtons.nth(1).click();
    await page.locator("a").filter({ hasText: "View Cart" }).click();

    await cart.open();
    await expect(cart.cartRows).toHaveCount(2);
  });

  test("TC-PROD-010 Category filter works (Women)", async ({ page, products }) => {
    await products.open();

    await page.locator("a").filter({ hasText: "Women" }).click();
    await page.locator("a").filter({ hasText: "Dress" }).click();

    await expect(page.locator(".title")).toContainText("Women");
  });

  test("TC-PROD-011 Brand filter works (Polo)", async ({ page, products }) => {
    await products.open();
    await page.locator(".brands-name a").first().click();
    await expect(page).toHaveURL(/\/brand_products\//);
  });

  test("TC-PROD-012 Verify product images displayed", async ({ page, products }) => {
    await products.open();
    await expect(page.locator(".productinfo.text-center img").first()).toBeVisible();
  });

  test("TC-PROD-013 Verify pagination/scroll loads", async ({ page, products }) => {
    await products.open();
    await page.mouse.wheel(0, 2000);
    await expect(page.locator("footer")).toBeVisible();
  });

  test("TC-PROD-014 Verify search is case-insensitive", async ({ page, products }) => {
    await products.open();
    await products.search("dress");
    const res1 = await page.locator(".productinfo.text-center").count();

    await products.search("DRESS");
    const res2 = await page.locator(".productinfo.text-center").count();

    expect(res2).toBe(res1);
  });

  test("TC-PROD-015 Add same product multiple times - cart updates", async ({ page, products, cart }) => {
    await products.open();

    await page.locator("a").filter({ hasText: "View Product" }).first().click();
    await page.locator("input#quantity").fill("3");
    await page.locator("button").filter({ hasText: "Add to cart" }).click();
    await page.locator("a").filter({ hasText: "View Cart" }).click();

    await cart.open();
    await cart.expectAtLeastOneItem();
    await expect(page.locator(".cart_quantity button")).toContainText("3");
  });

  test("TC-PROD-016 Verify product title contains text", async ({ page, products }) => {
    await products.open();
    await expect(page.locator(".title")).toContainText("All Products");
  });

  test("TC-PROD-017 Verify cart icon accessible from products", async ({ page, products }) => {
    await products.open();
    await page.locator("a[href='/view_cart']").click();
    await expect(page).toHaveURL(/\/view_cart/);
  });

  test("TC-PROD-018 Verify Continue Shopping works in modal", async ({ page, products }) => {
    await products.open();
    await products.addFirstProductToCart(false);

    await expect(page).toHaveURL(/\/products/);
  });

  test("TC-PROD-019 Verify recommended items section exists in home", async ({ page, home }) => {
    await home.open();
    await page.mouse.wheel(0, 2500);
    await expect(page.locator("h2").filter({ hasText: "recommended items" })).toBeVisible();
  });

  test("TC-PROD-020 Add recommended item to cart", async ({ page, home, cart }) => {
    await home.open();
    await page.mouse.wheel(0, 2500);

    const recAdd = page.locator("#recommended-item-carousel .add-to-cart").first();
    await recAdd.click();

    await page.locator("a").filter({ hasText: "View Cart" }).click();
    await cart.expectAtLeastOneItem();
  });
});
