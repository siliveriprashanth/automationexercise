import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../utils/constants";

export class ContactUsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  name = this.page.locator("input[data-qa='name']");
  email = this.page.locator("input[data-qa='email']");
  subject = this.page.locator("input[data-qa='subject']");
  message = this.page.locator("textarea[data-qa='message']");
  upload = this.page.locator("input[name='upload_file']");
  submitBtn = this.page.locator("input[data-qa='submit-button']");
  successMsg = this.page.locator(".status.alert.alert-success");

  async open() {
    await this.goto(ROUTES.CONTACT);
    await expect(this.submitBtn).toBeVisible();
  }

  async submitForm(payload: { name: string; email: string; subject: string; message: string; filePath?: string }) {
    await this.name.fill(payload.name);
    await this.email.fill(payload.email);
    await this.subject.fill(payload.subject);
    await this.message.fill(payload.message);

    if (payload.filePath) {
      await this.upload.setInputFiles(payload.filePath);
    }

    // alert appears after submit in this site
    this.page.once("dialog", async (d) => d.accept());
    await this.submitBtn.click();
  }

  async verifySuccess() {
    await expect(this.successMsg).toBeVisible();
  }
}
