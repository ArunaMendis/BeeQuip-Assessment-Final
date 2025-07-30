# BeeQuip E2E Test Automation – Playwright (JS)

## Tester Remarks

This project aims to simulate a realistic end-to-end user journey: starting from landing on the Beequip staging website, navigating to the marketplace, filtering inventory listings, and validating lease-related information.  
The automation is designed using a modular Page Object Model (POM) structure, with fixture-driven data, consistent selectors, and robust test coverage using Playwright.

## E2E Test Coverage

- All the test are running on **Beequip staging website** → https://staging.beequip.com/  
  - Site is protected by Basic Authentication  
  - Credentials are loaded via `fixtures/login.json` and applied in `tests/launchBeequip.spec.js`
  - Additionally I added - protection bypass header to the playwright.config.js file to authenticate - vercel

- Navigate to the **Marketplace**
- Locate a _Vrachtwagen_ with subtype _Schuifzeilen_, applying:
  - _Bouwjaar_ between **2018 – 2023**
  - _Kilometerstand_ under **300,000 km**
  - Vehicles with **6 cilinders**

- Select the first filtered result and:
  - Navigate into the ad details
  - Validate monthly lease rate is shown

- Simulate lease calculator flow:
  - Search for company: **Beequip** (_KVK: 63204258_)
  - Use email domain: `@example.com` or `@mailinator.com`  
  - Increase _aanbetaling_ and _looptijd_ to observe rate adjustment
  - Request a lease quote

**Stretch Goals:**
- Add assertion for confirmation page or email content
- Parameterize tests for _aanbetaling_ and _looptijd_ using fixture-driven approach

---

## Folder Structure

```bash
.
├── .github           # GitHub Actions workflow (CI)
├── fixtures          # Test data (login, form inputs)
├── page-objects      # Modular page interaction layers
├── tests             # Playwright spec files (E2E scenarios)
├── README.md

---

## E2E Test Coverage
Make sure Node.js and Yarn are installed.

```bash

git clone https://github.com/ArunaMendis/BeeQuip-Assessment-Final.git
cd BeeQuip-Assessment-Final
yarn install
yarn playwright install

## Run the test runner UI:

yarn playwright test --ui

## Sample Execution Report

