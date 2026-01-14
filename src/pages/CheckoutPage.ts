import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  checkoutHeader = this.page.locator("h2").filter({ hasText: "Address Details" });
  placeOrderBtn = this.page.locator("a").filter({ hasText: "Place Order" });

  async verifyLoaded() {
    await expect(this.checkoutHeader).toBeVisible();
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}
