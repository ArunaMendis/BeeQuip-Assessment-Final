import { test, expect } from "@playwright/test";

export class RequestQuote {
  constructor(page) {
    this.page = page;
    this.headerForm = page.locator('h4[role="heading"]');
    this.contactName = page.locator('input[name="name"]');
    this.contactNumber = page.locator('input[name="phone"]');
    this.contactTime = page.locator('label[for="Ochtend"]');
    this.contactEmail = page.locator('[data-hook="request-deal-email-input"]');
    this.submitButton = page.locator('button[type="submit"]');

    this.thanksElement = page.locator('[data-hook="request-advice-thank-you"]');
  }

  async quoteRequest() {
    await expect(this.headerForm).toBeVisible();
    await expect(this.contactName).toBeVisible();
    await this.contactName.fill("Aruna Mendis");
    await expect(this.contactNumber).toBeVisible();
    await this.contactNumber.fill("+310102400844");
    await expect(this.contactEmail).toBeVisible();
    await expect(this.contactEmail).toHaveValue("beequip@test.com");
    await expect(this.contactTime).toBeVisible();
    await this.contactTime.click();

    await this.submitButton.click();
  }

    async waitForQuote() {
        await expect(this.thanksElement).toBeVisible({ timeout: 20000 });
  }
}