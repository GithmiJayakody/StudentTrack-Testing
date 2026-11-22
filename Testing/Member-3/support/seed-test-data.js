// Creates (or resets) the three synthetic accounts the tests log in with.
//   - BDD Test Student      -> approvalStatus "approved"  (can log in)
//   - Pending Test Student  -> approvalStatus "pending"   (login must be blocked)
//   - Rejected Test Student -> approvalStatus "rejected"  (login must be blocked)
//
// Safe to run again and again: it only upserts these three test emails and
// never deletes anything. It writes to the SAME database the backend uses
// (MONGO_URI from the environment, or StudentTrack/Backend/.env locally),
// so point that at a test database, not your real data.
//
// It reuses the backend's own User model and packages, so the test users are
// stored exactly the way the real register/approve flow stores them.
const path = require('path');
const { createRequire } = require('module');
const config = require('./config');

const BACKEND_DIR = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  process.env.BACKEND_DIR || path.join('StudentTrack', 'Backend')
);

try {
  process.loadEnvFile(path.join(BACKEND_DIR, '.env'));
} catch {
  // In CI there is no backend .env; MONGO_URI comes from the workflow.
}

const backendRequire = createRequire(path.join(BACKEND_DIR, 'package.json'));
const mongoose = backendRequire('mongoose');
const bcrypt = backendRequire('bcryptjs');
const User = require(path.join(BACKEND_DIR, 'models', 'User.js'));

async function upsertStudent({ name, email, studentId }, approvalStatus, hashedPassword) {
  await User.findOneAndUpdate(
    { email },
    {
      $set: { name, email, studentId, role: 'student', approvalStatus, password: hashedPassword },
    },
    { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true }
  );
  console.log(`  ✔ ${email} (${approvalStatus})`);
}

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error(`MONGO_URI is not set (looked in the environment and ${BACKEND_DIR}/.env)`);
  }

  // Atlas "mongodb+srv://" addresses need a DNS SRV lookup, which fails on some
  // Windows/network setups (querySrv ECONNREFUSED). The backend's server.js uses
  // the same workaround, so the seed connects the same way the app does.
  if (process.env.MONGO_URI.startsWith('mongodb+srv://')) {
    require('dns').setServers(['8.8.8.8', '1.1.1.1']);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to database "${mongoose.connection.name}". Seeding test accounts:`);

  const hashedPassword = await bcrypt.hash(config.password, 10);
  await upsertStudent(config.student, 'approved', hashedPassword);
  await upsertStudent(config.pendingStudent, 'pending', hashedPassword);
  await upsertStudent(config.rejectedStudent, 'rejected', hashedPassword);

  console.log('Test data ready.');
}

main()
  .catch((err) => {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect().catch(() => {}));