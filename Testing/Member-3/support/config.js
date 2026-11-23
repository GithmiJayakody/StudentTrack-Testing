// Central place for every setting the Member 3 tests need.
// Values come from environment variables (GitHub Actions sets them in CI).
// Locally, put them in Testing/Member-3/.env (copy .env.example) - that file is git-ignored.
const path = require('path');

try {
  // Built into Node 20.12+ / 22 - no dotenv package needed.
  // Existing environment variables always win over the file.
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
} catch {
  // No .env file (normal in CI) - just use the real environment.
}

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. ` +
        'Locally: add it to Testing/Member-3/.env. In CI: add it as a GitHub Actions secret.'
    );
  }
  return value;
}

module.exports = {
  frontendUrl: (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, ''),
  apiBaseUrl: (process.env.API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, ''),
  headless: (process.env.HEADLESS || 'true').toLowerCase() !== 'false',

  // Synthetic test accounts created by `npm run seed` - never real students.
  student: {
    name: 'BDD Test Student',
    email: process.env.TEST_STUDENT_EMAIL || 'bdd.student@studenttrack.test',
    studentId: 'TEST-STU-001',
  },
  pendingStudent: {
    name: 'Pending Test Student',
    email: process.env.TEST_PENDING_EMAIL || 'pending.student@studenttrack.test',
    studentId: 'TEST-STU-002',
  },
  rejectedStudent: {
    name: 'Rejected Test Student',
    email: process.env.TEST_REJECTED_EMAIL || 'rejected.student@studenttrack.test',
    studentId: 'TEST-STU-003',
  },
  get password() {
    return required('TEST_STUDENT_PASSWORD');
  },
};