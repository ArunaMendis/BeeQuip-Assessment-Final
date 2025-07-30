import { test, expect } from "@playwright/test";

export class FindTruckPage {
  constructor(page) {
    this.page = page;
    this.yearConstruction = page.locator('[id="radix-:R33lql6:"]');
    this.yearConstructionLabel = page.locator('[id="radix-:Rb3lql6:"]');
    this.inputStartYear = page.locator(
      '[data-hook="aggregation-yearOfConstruction-from"]'
    );
    this.inputEndYear = page.locator(
      '[data-hook="aggregation-yearOfConstruction-to"]'
    );
    this.kilometerStand = page.locator('[id="radix-:R53lql6:"]');
    this.kilometerStandLabel = page.locator('[id="radix-:Rd3lql6:"]');
    this.usageInKilometersTo = page.locator(
      '[data-hook="aggregation-usageInKilometers-to"]'
    );
    this.numberOfCylinders = page.getByText("Aantal cilinders");
    this.NumberOfCylindersCheckbox = page.locator(
      '[data-hook="aggregation-label"]'
    );
    this.selectFirstSearchResultOption = page.locator(
      '[data-hook="object-card"]'
    );
  }

  async setYearOfConstruction(startYear, endYear) {
    await this.yearConstruction.evaluate((el) =>
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    );
    await this.yearConstruction.waitFor({ state: "visible" });
    await this.yearConstruction.click();
    await this.inputStartYear.fill(startYear);
    await this.inputEndYear.fill(endYear);
    const submitButton = this.yearConstructionLabel.locator(
      'button[type="submit"]'
    );
    await submitButton.click();
  }

  async setUsageInKilometersTo(kilometers) {
    await this.kilometerStand.evaluate((el) =>
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    );
    await this.kilometerStand.waitFor({ state: "visible" });
    await this.kilometerStand.click();
    await this.usageInKilometersTo.fill(kilometers);
    const submitButton = this.kilometerStandLabel.locator(
      'button[type="submit"]'
    );
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/marktplaats/_next/data") &&
          response.status() === 200
      ),
      submitButton.click(),
    ]);
  }

  async setNumberOfCylinders(numberOfCylinders) {
    await this.numberOfCylinders.evaluate((el) => el.scrollIntoView());
    await this.numberOfCylinders.waitFor({ state: "visible" });
    await this.numberOfCylinders.click();
    const checkbox = this.NumberOfCylindersCheckbox.filter({
      hasText: numberOfCylinders,
    });
    await checkbox.click();
  }

  async selectFirstResult() {
    const firstResult = this.selectFirstSearchResultOption.first();
    await expect(firstResult).toHaveText(/Kuijpers Trading BV/);
    await firstResult.click();
  }
}
