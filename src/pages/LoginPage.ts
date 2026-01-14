import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../utils/constants";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  loginEmail = this.page.locator("input[data-qa='login-email']");
  loginPassword = this.page.locator("input[data-qa='login-password']");
  loginBtn = this.page.locator("button[data-qa='login-button']");
  loginError = this.page.locator("p").filter({ hasText: "Your email or password is incorrect!" });

  signupName = this.page.locator("input[data-qa='signup-name']");
  signupEmail = this.page.locator("input[data-qa='signup-email']");
  signupBtn = this.page.locator("button[data-qa='signup-button']");
  signupErrorEmailExists = this.page.locator("p").filter({ hasText: "Email Address already exist!" });

  async open() {
    await this.goto(ROUTES.LOGIN);
    await expect(this.loginBtn).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginBtn.click();
  }

  async startSignup(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupBtn.click();
  }
}
