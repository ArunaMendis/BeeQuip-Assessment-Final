import { expect } from "@playwright/test";

export class ChangeRate {
  constructor(page) {
    this.page = page;
    this.suggestionContainer = page.locator(
      '[data-hook="suggestions-container"]'
    );
    this.downPayment = page.locator('input[name="downPayment"]');
    this.installments = page.locator('input[data-hook="tenor-input"]');
    this.monthlyRate = page.locator('h2[aria-level="2"]');
    this.companyEmail = page.locator('[data-hook="contact-person-email"]');
    this.submitButton = page.locator('button[kind="primary"]');
  }

async calculateNewRate(downPayment, installments, expectedRate) {
  await expect(this.downPayment).toBeVisible();
  await this.downPayment.click();
  await this.downPayment.fill(downPayment);

  await expect(this.installments).toBeVisible();
  await this.installments.click();
  await this.installments.fill(installments);

  await expect(this.monthlyRate).toBeVisible();
  await expect(this.monthlyRate).toContainText(expectedRate);

  await this.submitButton.click();
}

  async waitForSuggestionContainer() {
    await expect(this.suggestionContainer).toBeVisible({ timeout: 60000 });
  }
}
