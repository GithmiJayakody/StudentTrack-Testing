# Unit Testing Report

## 1. Framework and Configuration

The StudentTrack backend uses CommonJS. Member 2's unit testing suite uses Jest, including `describe`, `test`, `expect`, and Jest mock functions.

The Jest configuration is located in `StudentTrack/Backend/jest.config.js`. The tests import the actual StudentTrack middleware from `StudentTrack/Backend/middleware/auth.js`.

Jest was added as a development dependency. The following scripts are configured:

- `npm run test:member2`
- `npm run coverage:member2`

## 2. Test Target and Test Cases

The tests cover the actual `protect` and `authorizeRoles` middleware. Express request and response objects and the `next` callback are simulated using Jest mocks. A test-only JWT secret is used to test token verification.

The six test cases are:

1. Permitted administrator role calls `next()`.
2. Disallowed role returns HTTP 403 without calling `next()`.
3. Missing authenticated user returns HTTP 403 without calling `next()`.
4. Missing bearer token returns HTTP 401.
5. Invalid bearer token returns HTTP 401.
6. Valid bearer token attaches verified claims and calls `next()`.

## 3. Test-Driven Development (TDD)

A TDD demonstration was performed using the missing-user authorization test.

**Red phase:** The missing-user guard was temporarily removed from `authorizeRoles`. The focused Jest test failed with a TypeError because the middleware attempted to read `role` from an undefined user.

**Green phase:** The missing-user guard was restored. The same focused test passed, returning HTTP 403 as expected.

The complete Jest test suite was then executed successfully after restoring the correct source code.

## 4. Test Execution Results

The following commands were executed successfully from `StudentTrack/Backend`:

- `npm install`
- `npm run test:member2`
- `npm run coverage:member2`

**Test results:**

| Metric | Actual result |
|---|---:|
| Test suites passed | 1 |
| Total test suites | 1 |
| Tests passed | 6 |
| Total tests | 6 |
| Statement coverage | 100% |
| Branch coverage | 100% |
| Function coverage | 100% |
| Line coverage | 100% |

The coverage results apply to the tested `auth.js` middleware file, not the entire StudentTrack application.

## 5. Evidence

The following evidence is included:

- Jest test execution screenshot.
- Jest coverage summary screenshot.
- TDD red-phase failure screenshot.
- TDD green-phase success screenshot.
- Source code and test case files.
- White-box testing documentation and CSV test case tables.

Jest also generates coverage reports under `Testing/Member-2/Unit-Testing/reports/coverage/`.

## 6. Limitations

These tests focus on the `protect` and `authorizeRoles` middleware. They do not represent full integration testing of Express routes, MongoDB operations, browser workflows, or the deployed application.

The reported 100% coverage is limited to the tested `auth.js` file.

See `Source_Change_Record.md` for details of the source-code change and the distinction between the original application and the prepared submission copy.