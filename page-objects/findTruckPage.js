import { test, expect } from "@playwright/test";

export class FindTruckPage {
  constructor(page) {
    this.page = page;
    this.seeMoreButton = page.getByText('Bekijk meer');
    this.schuifzeilenLabel = page.getByText('Schuifzeilen', { exact: true }).nth(0);
    this.filterSubCategory =  page.getByRole('button', { name: 'Schuifzeilen' });

    this.yearConstruction = page.locator('legend', { hasText: 'Bouwjaar' });
    this.filterYearRange = page.getByRole('button', { name: 'Van 2018 tot 2023' });

    this.yearConstructionLabel = page.locator('button', { hasText: 'Ok' }).nth(0);

    this.inputStartYear = page.locator(
      '[data-hook="aggregation-yearOfConstruction-from"]'
    );
    this.inputEndYear = page.locator(
      '[data-hook="aggregation-yearOfConstruction-to"]'
    );
    this.kilometerStand = page.locator('legend', { hasText: 'Kilometerstand' });
    this.kilometerStandLabel = page.locator('button', { hasText: 'Ok' }).nth(1);
    this.filterMilageKm = page.getByRole('button', { name: 'Tot 300.000 km' });

    this.usageInKilometersTo = page.locator(
      '[data-hook="aggregation-usageInKilometers-to"]'
    );
    this.numberOfCylinders = page.getByText("Aantal cilinders");
    this.filterCylinderNum = page.getByRole('button', { name: '6' });

    this.NumberOfCylindersCheckbox = page.locator(
      '[data-hook="aggregation-label"]'
    );
    this.selectFirstSearchResultOption = page.locator(
      '[data-hook="object-card"]'
    );
  }

  async navigateToSubcategory(){
    await this.seeMoreButton.evaluate((el) =>
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    );
    await this.seeMoreButton.waitFor({ state: "visible" });
    await this.seeMoreButton.click();
    await expect(this.schuifzeilenLabel).toBeVisible();
    await this.schuifzeilenLabel.click();
    await expect(this.page).toHaveURL(/subcategorie:schuifzeilen/);
    await expect(this.filterSubCategory).toBeVisible();
  }

  async setYearOfConstruction(startYear, endYear) {
    await this.yearConstruction.evaluate((el) =>
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    );
    await this.yearConstruction.waitFor({ state: "visible" });
    await this.yearConstruction.click();
    await this.inputStartYear.fill(startYear);
    await this.inputEndYear.fill(endYear);
    await this.yearConstructionLabel.click();
    await expect(this.filterYearRange).toBeVisible();
  }

  async setUsageInKilometersTo(kilometers) {
    await this.kilometerStand.evaluate((el) =>
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    );
    await this.kilometerStand.waitFor({ state: "visible" });
    await this.kilometerStand.click();
    await this.usageInKilometersTo.fill(kilometers);
    await this.kilometerStandLabel.click();
    await expect(this.filterMilageKm).toBeVisible();
  //   await Promise.all([
  //     this.page.waitForResponse(
  //       (response) =>
  //         response.url().includes("/marktplaats/_next/data") &&
  //         response.status() === 200
  //     ),
  //     submitButton.click(),
  //   ]);
   }

  async setNumberOfCylinders(numberOfCylinders) {
    await this.numberOfCylinders.evaluate((el) => el.scrollIntoView());
    await this.numberOfCylinders.waitFor({ state: "visible" });
    await this.numberOfCylinders.click();
    const checkbox = this.NumberOfCylindersCheckbox.filter({
      hasText: numberOfCylinders,
    });
    await checkbox.click();
    await expect(this.filterCylinderNum).toBeVisible();
  }

  async selectFirstResult() {
    const firstResult = this.selectFirstSearchResultOption.first();
    await expect(firstResult).toHaveText(/Kuijpers Trading BV/);
    await firstResult.click();
  }
}
