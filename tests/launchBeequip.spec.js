import { test, expect } from "@playwright/test";
import { SlidingCurtainTruck } from "../page-objects/matching-equipment-ad.js";
import loginData from "../fixtures/login.json";
import rateData from "../fixtures/monthlyRate.json";
import { FindTruckPage } from "../page-objects/findTruckPage";
import { CompanyForm } from "../page-objects/companyForm.js";
import { ChangeRate } from "../page-objects/changeRate.js";
import { RequestQuote } from "../page-objects/requestQuote.js";
import { ThankYou } from "../page-objects/thankYou.js";

test.describe("I can navigate to the Website", () => {
  test.beforeEach(async ({ page }) => {
    // use Basic authentication
    await page.setExtraHTTPHeaders({
      Authorization: `Basic ${btoa(
        `${loginData.username}:${loginData.password}`
      )}`,
    });
    await page.goto("/marktplaats/vrachtwagen/subcategorie:schuifzeilen/");
  });

  test("Find the Truck by filtering", async ({ page }) => {
    const findTruckPage = new FindTruckPage(page);
    await findTruckPage.setYearOfConstruction("2018", "2023");
    await findTruckPage.setUsageInKilometersTo("300000");
    await findTruckPage.setNumberOfCylinders("6");
    await findTruckPage.selectFirstResult();

    const slidingCurtainTruck = new SlidingCurtainTruck(page);
    await slidingCurtainTruck.navigateToTruck();
    await expect(page).toHaveURL(
      /marktplaats\/financial-lease\/maandprijs-berekenen/
    );

    const companyForm = new CompanyForm(page);
    await companyForm.submitForm();

    const changeRate = new ChangeRate(page);
    await changeRate.waitForSuggestionContainer();
    await changeRate.calculateNewRate(
        rateData.downPayment,
        rateData.installments,
        rateData.expectedRate
      );

    const requestQuote = new RequestQuote(page);
    await requestQuote.quoteRequest();
    await requestQuote.waitForQuote();

    const thankYou = new ThankYou(page);
    await thankYou.verifyThanks();

  });

});
