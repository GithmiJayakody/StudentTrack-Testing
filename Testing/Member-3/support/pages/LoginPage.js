// Page Object for StudentTrack's /login page (Frontend/src/pages/Login.jsx).
// Keeping selectors here means BDD steps and UI tests share one definition,
// and if the page changes you fix it in one place.
const { By, until } = require('selenium-webdriver');

const TIMEOUT = 15000;

class LoginPage {
  constructor(driver, frontendUrl) {
    this.driver = driver;
    this.url = `${frontendUrl}/login`;

    // Login.jsx has no ids/test ids, so we use stable attributes from the JSX:
    this.emailInput = By.css('input[placeholder="Enter your email"]');
    this.passwordInput = By.css('input[placeholder="Enter your password"]');
    // The navbar "Login" is an <a>; the form submit is the only <button> with this text.
    this.loginButton = By.xpath("//button[normalize-space()='Login']");
    // The eye icon button sits right after the password input.
    this.showPasswordButton = By.xpath(
      "//input[@placeholder='Enter your password']/following-sibling::button"
    );
    // Errors are rendered in <div role="alert">.
    this.errorAlert = By.css('[role="alert"]');
  }

  async open() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.emailInput), TIMEOUT);
  }

  async enterEmail(email) {
    const input = await this.driver.findElement(this.emailInput);
    await input.clear();
    if (email) await input.sendKeys(email);
  }

  async enterPassword(password) {
    const input = await this.driver.findElement(this.passwordInput);
    await input.clear();
    if (password) await input.sendKeys(password);
  }

  async submit() {
    await this.driver.findElement(this.loginButton).click();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.submit();
  }

  async getErrorText() {
    const alert = await this.driver.wait(until.elementLocated(this.errorAlert), TIMEOUT);
    await this.driver.wait(until.elementIsVisible(alert), TIMEOUT);
    return alert.getText();
  }

  async getPasswordFieldType() {
    return this.driver.findElement(this.passwordInput).getAttribute('type');
  }

  async togglePasswordVisibility() {
    await this.driver.findElement(this.showPasswordButton).click();
  }
}

// Helpers for the page the student lands on after login (StudentDashboard.jsx).
const StudentDashboard = {
  heading: By.xpath("//h1[contains(normalize-space(.), 'Student Dashboard')]"),
  // XPath reads DOM text, so the CSS `uppercase` style does not affect this match.
  greeting: (name) => By.xpath(`//p[contains(., 'Welcome back, ${name}')]`),
  async waitUntilLoaded(driver) {
    await driver.wait(until.urlMatches(/\/student\/?$/), TIMEOUT);
    await driver.wait(until.elementLocated(StudentDashboard.heading), TIMEOUT);
  },
};

module.exports = { LoginPage, StudentDashboard, TIMEOUT };