// Creates a Chrome browser controlled by Selenium WebDriver.
// Selenium Manager (built into selenium-webdriver 4.x) downloads the matching
// chromedriver automatically, so you do not install a driver by hand.
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('./config');

async function buildDriver() {
  const options = new chrome.Options();
  if (config.headless) {
    options.addArguments('--headless=new'); // no visible window (required in CI)
  }
  options.addArguments(
    '--window-size=1366,900',
    '--no-sandbox', // needed on Linux CI runners
    '--disable-dev-shm-usage'
  );

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  await driver.manage().setTimeouts({ implicit: 0, pageLoad: 30000 });
  return driver;
}

module.exports = { buildDriver };