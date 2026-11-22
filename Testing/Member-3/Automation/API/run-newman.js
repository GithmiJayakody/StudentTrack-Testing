// Runs the Postman collection from the command line with Newman (npm run test:api).
// Using Newman's Node API instead of a long CLI command means the same command
// works on Windows (your laptop) and Linux (GitHub Actions), and the password
// is passed in from the environment instead of being saved in the collection.
const path = require('path');
const newman = require('newman');
const config = require('../../support/config');

const reportsDir = path.join(__dirname, '..', 'reports');

newman.run(
  {
    collection: require('./StudentTrack_API_Tests.postman_collection.json'),
    envVar: [
      { key: 'baseUrl', value: config.apiBaseUrl },
      { key: 'studentEmail', value: config.student.email },
      { key: 'pendingEmail', value: config.pendingStudent.email },
      { key: 'rejectedEmail', value: config.rejectedStudent.email },
      { key: 'studentPassword', value: config.password },
    ],
    reporters: ['cli', 'junit'],
    reporter: { junit: { export: path.join(reportsDir, 'newman-junit.xml') } },
  },
  (err, summary) => {
    if (err) {
      console.error('Newman could not run:', err.message);
      process.exitCode = 1;
      return;
    }
    const failures = summary.run.failures.length;
    if (failures > 0 || summary.run.error) {
      console.error(`\n${failures} API assertion(s) failed.`);
      process.exitCode = 1;
    } else {
      console.log('\nAll API tests passed.');
    }
  }
);