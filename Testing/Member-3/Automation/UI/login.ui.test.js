// Selenium UI automation for the StudentTrack login page.
// Runs with Node's built-in test runner (node:test) - no Mocha/Jest needed.
//
// These cover login rules NOT already covered by the BDD scenarios
// (BDD-01 valid login, BDD-02 wrong password), so nothing is duplicated.
// [..] = matching ID in Member 1's StudentTrack_Test_Cases.xlsx / decision table (DT-Rx).
// "Additional" = extra check not in Member 1's list.
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const config = require('../../support/config');
const { buildDriver } = require('../../support/driver');
const { LoginPage } = require('../../support/pages/LoginPage');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'reports', 'screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

// Opens a fresh browser for one test, saves a screenshot (pass or fail), always closes it.
async function withBrowser(testId, testBody) {
  const driver = await buildDriver();
  let status = 'PASS';
  try {
    const loginPage = new LoginPage(driver, config.frontendUrl);
    await loginPage.open();
    await testBody(driver, loginPage);
  } catch (err) {
    status = 'FAIL';
    throw err;
  } finally {
    try {
      const png = await driver.takeScreenshot();
      fs.writeFileSync(path.join(SCREENSHOT_DIR, `${testId}-${status}.png`), png, 'base64');
    } catch {
      /* screenshot is evidence only - never hide the real result */
    }
    await driver.quit();
  }
}

describe('StudentTrack login page (Selenium UI)', () => {
  it('UI-01 [Additional] empty email and password shows a validation error', async () => {
    await withBrowser('UI-01', async (driver, loginPage) => {
      await loginPage.login('', '');
      assert.equal(await loginPage.getErrorText(), 'Email and password are required');
      assert.match(await driver.getCurrentUrl(), /\/login\/?$/);
    });
  });

  it('UI-02 [TC014, DT-R6] account awaiting admin approval cannot log in', async () => {
    await withBrowser('UI-02', async (driver, loginPage) => {
      await loginPage.login(config.pendingStudent.email, config.password);
      assert.equal(await loginPage.getErrorText(), 'Your account is awaiting admin approval.');
      assert.match(await driver.getCurrentUrl(), /\/login\/?$/);
    });
  });

  it('UI-03 [TC013, DT-R1] unregistered email is rejected', async () => {
    await withBrowser('UI-03', async (driver, loginPage) => {
      await loginPage.login('not.registered@studenttrack.test', config.password);
      assert.equal(await loginPage.getErrorText(), 'Invalid credentials');
      assert.match(await driver.getCurrentUrl(), /\/login\/?$/);
    });
  });

  it('UI-04 [Additional] eye button shows and hides the password', async () => {
    await withBrowser('UI-04', async (driver, loginPage) => {
      await loginPage.enterPassword('SomePassword1');
      assert.equal(await loginPage.getPasswordFieldType(), 'password');

      await loginPage.togglePasswordVisibility();
      assert.equal(await loginPage.getPasswordFieldType(), 'text');

      await loginPage.togglePasswordVisibility();
      assert.equal(await loginPage.getPasswordFieldType(), 'password');
    });
  });
});