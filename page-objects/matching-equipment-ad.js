import { test, expect } from "@playwright/test";

export class SlidingCurtainTruck {
  constructor(page) {
    this.page = page;
    this.schuifzeilenLink = page
      .getByRole("link", { name: "Schuifzeilen" })
      .first();
    this.leaseRent = page.locator('[data-hook="lease-price-container"]');
    this.leaseButton = page.locator('[data-hook="lease-offer-button"]');
  }

  async navigateToTruck() {
    await expect(this.schuifzeilenLink).toBeVisible();
    await this.schuifzeilenLink.click(); //

    // Verify navigation to the expected URL
    await expect(this.page).toHaveURL(/.*\/objecten\/.*/);
    await expect(this.leaseRent).toBeVisible();
    await expect(this.leaseRent).toHaveText("LeasenVanaf € 1.297/mnd");
    await this.leaseButton.click();
  }
}
