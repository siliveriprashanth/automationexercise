import { Page, expect } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async expectUrlContains(part: string | RegExp) {
    await expect(this.page).toHaveURL(part);
  }

  async safeClick(selectorOrLocator: any) {
    await selectorOrLocator.click();
  }
}
