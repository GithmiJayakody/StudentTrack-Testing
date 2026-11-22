// Step definitions: each Gherkin line in student_login.feature is matched to
// one of these functions, which performs a REAL action and a REAL check.
const assert = require('node:assert/strict');
const { Given, When, Then } = require('@cucumber/cucumber');
const { until } = require('selenium-webdriver');
const config = require('../../support/config');
const { LoginPage, StudentDashboard, TIMEOUT } = require('../../support/pages/LoginPage');

// ---------- Given (preconditions) ----------

Given('an approved student account exists', async function () {
  // Confirm the seeded account really is approved by calling the backend API.
  const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: config.student.email, password: config.password }),
  });
  const body = await response.json();

  assert.equal(
    response.status,
    200,
    `Test student cannot log in (HTTP ${response.status}: ${body.message}). Did you run "npm run seed"?`
  );
  assert.equal(body.user.role, 'student');
  this.studentName = body.user.name;
});

Given('the student is on the login page', async function () {
  this.loginPage = new LoginPage(this.driver, config.frontendUrl);
  await this.loginPage.open();
});

// ---------- When (actions) ----------

When('the student enters a valid email and password', async function () {
  await this.loginPage.enterEmail(config.student.email);
  await this.loginPage.enterPassword(config.password);
});

When('the student enters a valid email and an incorrect password', async function () {
  await this.loginPage.enterEmail(config.student.email);
  await this.loginPage.enterPassword(`${config.password}-wrong`);
});

When('submits the login form', async function () {
  await this.loginPage.submit();
});

// ---------- Then (expected results) ----------

Then('the student should be taken to the student dashboard', async function () {
  await StudentDashboard.waitUntilLoaded(this.driver);
  const url = await this.driver.getCurrentUrl();
  assert.match(url, /\/student\/?$/);
});

Then('the dashboard should greet the student by name', async function () {
  const greeting = await this.driver.wait(
    until.elementLocated(StudentDashboard.greeting(this.studentName)),
    TIMEOUT
  );
  assert.ok(await greeting.isDisplayed(), 'Greeting is not visible');
});

Then('the error message {string} should be displayed', async function (expectedMessage) {
  const actual = await this.loginPage.getErrorText();
  assert.equal(actual.trim(), expectedMessage);
});

Then('the student should remain on the login page', async function () {
  const url = await this.driver.getCurrentUrl();
  assert.match(url, /\/login\/?$/);
});
