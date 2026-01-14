import { expect, Locator } from "@playwright/test";

export async function expectVisible(locator: Locator) {
  await expect(locator).toBeVisible();
}

export async function expectContainsText(locator: Locator, text: string) {
  await expect(locator).toContainText(text);
}
