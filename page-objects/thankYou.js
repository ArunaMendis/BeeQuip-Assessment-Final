import { test, expect } from "@playwright/test";

export class ThankYou {
  constructor(page) {
    this.page = page;
    this.thanksElement = page.locator('a[data-hook="request-advice-back-to-beezaar"]');
 
  }

  async verifyThanks() {
    // Wait for the element to appear in the DOM and be visible
    await this.thanksElement.waitFor({ state: 'visible', timeout: 10000 }); // waits up to 10s
    await expect(this.thanksElement).toBeVisible();
  }

}

