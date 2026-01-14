import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  title = this.page.locator("h2").filter({ hasText: "All Products" });

  searchBox = this.page.locator("#search_product");
  searchBtn = this.page.locator("#submit_search");

  firstAddToCartBtn = this.page.locator(".productinfo.text-center a.add-to-cart").first();

  // ✅ Modal locators
  addedModal = this.page.locator("#cartModal");
  modalViewCart = this.page.locator("#cartModal a").filter({ hasText: "View Cart" });
  modalContinueShopping = this.page.locator("#cartModal button").filter({ hasText: "Continue Shopping" });

  async open() {
    await this.page.goto("https://automationexercise.com/products", { waitUntil: "domcontentloaded" });
    await expect(this.title).toBeVisible();
  }

  async search(keyword: string) {
    await this.searchBox.fill(keyword);
    await this.searchBtn.click();
    await expect(this.page.locator("h2").filter({ hasText: "Searched Products" })).toBeVisible();
  }

  async addFirstProductToCart(openCart = false) {
    await this.firstAddToCartBtn.click();

    // ✅ wait for modal to open (fix flakiness)
    await expect(this.addedModal).toBeVisible({ timeout: 15000 });

    if (openCart) {
      await this.modalViewCart.click();
    } else {
      await this.modalContinueShopping.click();
      await expect(this.addedModal).toBeHidden({ timeout: 15000 });
    }
  }
}
