import { test, expect } from "@playwright/test";

export class SlidingCurtainTruck {
  constructor(page) {
    this.page = page;
    this.leaseRent = page.locator('[data-hook="lease-price-container"]');
    this.leaseButton = page.locator('[data-hook="lease-offer-button"]');
  }

  async navigateToTruck() {

    // Verify navigation to the expected URL
    await expect(this.page).toHaveURL(/.*\/objecten\/.*/);
    await expect(this.leaseRent).toBeVisible();
    await expect(this.leaseRent).toHaveText("LeasenVanaf € 1.297/mnd");
    await this.leaseButton.click();
  }
}
