module.exports = {
  rootDir: '../..',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/Testing/Member-2/Unit-Testing/tests/**/*.test.js'],
  collectCoverageFrom: ['<rootDir>/StudentTrack/Backend/middleware/auth.js'],
  coverageDirectory: '<rootDir>/Testing/Member-2/Unit-Testing/reports/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  clearMocks: true,
};
