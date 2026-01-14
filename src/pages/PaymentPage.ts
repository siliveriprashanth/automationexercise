import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PaymentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  nameOnCard = this.page.locator("input[data-qa='name-on-card']");
  cardNumber = this.page.locator("input[data-qa='card-number']");
  cvc = this.page.locator("input[data-qa='cvc']");
  expiryMonth = this.page.locator("input[data-qa='expiry-month']");
  expiryYear = this.page.locator("input[data-qa='expiry-year']");
  payBtn = this.page.locator("button[data-qa='pay-button']");

  successMsg = this.page.locator("p").filter({ hasText: "Congratulations! Your order has been confirmed!" });

  async pay(details: { nameOnCard: string; cardNumber: string; cvc: string; expiryMonth: string; expiryYear: string }) {
    await expect(this.payBtn).toBeVisible();

    await this.nameOnCard.fill(details.nameOnCard);
    await this.cardNumber.fill(details.cardNumber);
    await this.cvc.fill(details.cvc);
    await this.expiryMonth.fill(details.expiryMonth);
    await this.expiryYear.fill(details.expiryYear);

    await this.payBtn.click();
  }

  async verifySuccess() {
    await expect(this.successMsg).toBeVisible();
  }
}
