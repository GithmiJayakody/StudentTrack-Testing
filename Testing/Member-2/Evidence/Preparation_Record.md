# Preparation Record

## Purpose

This record documents the preparation and execution of Member 2's Jest unit testing and white-box testing work for the StudentTrack project.

## Test Environment

- Test framework: Jest
- Test target: `StudentTrack/Backend/middleware/auth.js`
- Test file: `Testing/Member-2/Unit-Testing/tests/authMiddleware.test.js`
- Jest configuration: `StudentTrack/Backend/jest.config.js`

## Preparation and Execution

The Jest dependencies were installed successfully in the project environment. The Member 2 test suite and coverage command were executed.

- Test suites: 1 passed
- Tests: 6 passed
- Statement coverage for `auth.js`: 100%
- Branch coverage for `auth.js`: 100%
- Function coverage for `auth.js`: 100%
- Line coverage for `auth.js`: 100%

The coverage percentages apply only to the tested `auth.js` middleware, not the entire application.

## TDD Evidence

A red/green TDD demonstration was completed:

- Red phase: the focused test failed when the missing-user guard was temporarily removed.
- Green phase: the guard was restored and the focused test passed.

The corresponding screenshots are stored in `Screenshots/`:

- `TDD_Red_Test_Failure.png`
- `TDD_Green_Test_Pass.png`

## Supporting Evidence

The following screenshots document the test execution and coverage results:

- `Jest_Test_Run.png`
- `Jest_Coverage_Summary.png`

The coverage report is available under `Testing/Member-2/Unit-Testing/reports/coverage/`.

## Notes

No test results or coverage percentages have been fabricated. The documented results reflect the completed test run and the available evidence.