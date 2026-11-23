// Cucumber.js configuration - read automatically by `cucumber-js` (npm run test:bdd).
module.exports = {
  default: {
    paths: ['BDD/features/**/*.feature'],
    require: ['BDD/support/**/*.js', 'BDD/step-definitions/**/*.js'],
    format: [
      'progress',
      'html:BDD/reports/cucumber-report.html',
      'json:BDD/reports/cucumber-report.json',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    strict: true, // undefined or pending steps make the run fail
  },
};