import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  titleMr = this.page.locator("#id_gender1");
  password = this.page.locator("#password");
  day = this.page.locator("#days");
  month = this.page.locator("#months");
  year = this.page.locator("#years");

  firstName = this.page.locator("#first_name");
  lastName = this.page.locator("#last_name");
  address = this.page.locator("#address1");
  state = this.page.locator("#state");
  city = this.page.locator("#city");
  zipcode = this.page.locator("#zipcode");
  mobile = this.page.locator("#mobile_number");

  createAccountBtn = this.page.locator("button[data-qa='create-account']");
  accountCreatedText = this.page.locator("h2").filter({ hasText: "Account Created!" });
  continueBtn = this.page.locator("a[data-qa='continue-button']");

  async fillAccountInfo(password: string) {
    await expect(this.password).toBeVisible();

    await this.titleMr.check();
    await this.password.fill(password);

    await this.day.selectOption("10");
    await this.month.selectOption("5");
    await this.year.selectOption("1998");

    await this.firstName.fill("Prashanth");
    await this.lastName.fill("S");
    await this.address.fill("Hyderabad");
    await this.state.fill("Telangana");
    await this.city.fill("Hyd");
    await this.zipcode.fill("500001");
    await this.mobile.fill("9999999999");
  }

  async createAccount() {
    await this.createAccountBtn.click();
    await expect(this.accountCreatedText).toBeVisible();
    await this.continueBtn.click();
  }
}
