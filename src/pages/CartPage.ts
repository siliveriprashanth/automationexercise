import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../utils/constants";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  cartHeading = this.page.locator("li").filter({ hasText: "Shopping Cart" });
  cartRows = this.page.locator("tr[id^='product-']");
  proceedToCheckout = this.page.locator("a").filter({ hasText: "Proceed To Checkout" });

  async open() {
    await this.goto(ROUTES.CART);
    await expect(this.cartHeading).toBeVisible();
  }

  async expectAtLeastOneItem() {
    await expect(this.cartRows).toHaveCount(1);
  }

  async proceedCheckout() {
    await this.proceedToCheckout.click();
  }
}
