# White-Box Testing Report

## 1. Introduction

This report documents the white-box testing work completed for Member 2 of the StudentTrack – Student Attendance Management System project.

The selected function is `authorizeRoles` in `StudentTrack/Backend/middleware/auth.js`.

## 2. Testing Scope

The work covers the selected function's control flow, cyclomatic complexity, statement coverage, and branch coverage.

The unit tests use Jest to test the authentication middleware behavior.

## 3. Control-Flow Graph

The control-flow graph for `authorizeRoles` is available at:

`Testing/Member-2/White-Box-Testing/Control-Flow-Graph/authorizeRoles-CFG.png`

The graph represents the function's control flow, including its decision points and exit.

## 4. Cyclomatic Complexity

The cyclomatic complexity calculation is documented in:

`Testing/Member-2/White-Box-Testing/Cyclomatic-Complexity/Cyclomatic_Complexity.md`

The calculation and path details are provided in that file.

## 5. Test Design and Coverage

The statement coverage test cases are documented in:

`Testing/Member-2/White-Box-Testing/Statement-Coverage/Statement_Coverage_Test_Cases.csv`

The branch coverage test cases are documented in:

`Testing/Member-2/White-Box-Testing/Branch-Coverage/Branch_Coverage_Test_Cases.csv`

## 6. Execution Results

The Jest test suite completed successfully:

- Test suites: 1 passed
- Tests: 6 passed

Coverage results for `StudentTrack/Backend/middleware/auth.js`:

| Coverage Type | Result |
|---|---:|
| Statement Coverage | 100% |
| Branch Coverage | 100% |
| Function Coverage | 100% |
| Line Coverage | 100% |

**These coverage results apply only to the tested `auth.js` middleware, not to the entire application.**

The Jest execution and coverage screenshots are available in:

`Testing/Member-2/Evidence/Screenshots/`

The generated coverage report is available in:

`Testing/Member-2/Unit-Testing/reports/coverage/`

## 7. TDD Evidence

The TDD demonstration included:

- **Red phase:** The focused test failed when the missing-user guard was temporarily removed.
- **Green phase:** The guard was restored and the focused test passed.

Evidence screenshots:

- `TDD_Red_Test_Failure.png`
- `TDD_Green_Test_Pass.png`

## 8. Limitations

The reported coverage is limited to the tested `auth.js` middleware. It does not indicate 100% coverage of the complete StudentTrack application.

The test results document the executed Jest suite and do not claim that unrelated application components were tested.