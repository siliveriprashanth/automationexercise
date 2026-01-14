import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ✅ stable - header exists always
  header = this.page.locator("header");
  navProducts = this.page.locator("a[href='/products']").first();
  navCart = this.page.locator("a[href='/view_cart']").first();
  navSignupLogin = this.page.locator("a[href='/login']").first();
  navContact = this.page.locator("a[href='/contact_us']").first();
  logo = this.page.locator("header img").first();


  async open() {
    // ✅ Use full URL to avoid baseURL config issues
    await this.page.goto("https://automationexercise.com/", { waitUntil: "domcontentloaded" });

    // ✅ wait for header and main nav
    await expect(this.header).toBeVisible();
    await expect(this.navProducts).toBeVisible();
  }
  

  async goToProducts() {
    await this.navProducts.click();
    await this.page.waitForURL("**/products");
  }

  async goToCart() {
    await this.navCart.click();
    await this.page.waitForURL("**/view_cart");
  }

  async goToLogin() {
    await expect(this.navSignupLogin).toBeVisible();
    await this.navSignupLogin.click();
    await this.page.waitForURL("**/login");
  }

  async goToContact() {
    await this.navContact.click();
    await this.page.waitForURL("**/contact_us");
  }
}
