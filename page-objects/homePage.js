import { test, expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.marketplaceLink = page.getByRole('link', { name: 'Marktplaats' }).nth(2);
    this.trackLink = page.getByRole('link', { name: 'Vrachtwagen' }).nth(0);
  }

  async navigateToMarketplace() {
    await expect(this.marketplaceLink).toBeVisible();

    // Use the instance variable correctly
    await this.page.goto('/marktplaats/');

    await expect(this.page).toHaveURL(/marktplaats/);
  }

  async navigateToTruckPage() {
    await this.trackLink.click();
    // verify navigation
    await expect(this.page).toHaveURL(/vrachtwagen/);
  }

  
}