import { test, expect } from "@playwright/test";

export class CompanyForm {
  constructor(page) {
    this.page = page;
    this.companyForm = page.locator("#CompanyForm");
    this.companyNumber = page.locator("#cocNumber");
    this.companySearchAutoComplete = page.locator(
      '[data-hook="company-search-autocomplete"]'
    );
    this.searchFirstResult = page.locator('[id="downshift-0-item-0"]');
    this.companyEmail = page.locator('[data-hook="contact-person-email"]');
    this.submitButton = page.locator("#submitCompanyForm");
  }

  async submitForm() {
    await expect(this.companyForm).toBeVisible();
    await expect(this.companyNumber).toBeVisible();
    await this.companyNumber.click();
    await this.companyNumber.fill("63204258");
    await expect(this.companySearchAutoComplete).toBeVisible();
    await expect(this.searchFirstResult).toBeVisible();
    await this.searchFirstResult.click();
    await expect(this.companyEmail).toBeVisible();
    await this.companyEmail.click();
    await this.companyEmail.fill("beequip@test.com");
    await this.submitButton.click();
  }
}
