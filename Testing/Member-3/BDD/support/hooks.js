// Hooks run around every scenario: open a fresh browser before,
// attach a screenshot to the report and close the browser after.
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { buildDriver } = require('../../support/driver');

setDefaultTimeout(60 * 1000); // browser steps can take longer than Cucumber's 5 s default

Before({ tags: '@ui' }, async function () {
  this.driver = await buildDriver();
});

After(async function (scenario) {
  if (!this.driver) return;
  try {
    const png = await this.driver.takeScreenshot();
    // Shows up inside BDD/reports/cucumber-report.html under the scenario.
    this.attach(Buffer.from(png, 'base64'), 'image/png');
  } catch (err) {
    console.warn(`Could not take screenshot for "${scenario.pickle.name}": ${err.message}`);
  } finally {
    await this.driver.quit(); // always close Chrome, even when a step failed
  }
});