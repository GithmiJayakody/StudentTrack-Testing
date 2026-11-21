# White-Box Testing Report

## Objective and source

This report covers EC4206 Section 3.4 for the StudentTrack backend. The selected function is `authorizeRoles` in `StudentTrack/Backend/middleware/auth.js`. The source used in the final submission includes a proposed missing-user guard. The untouched original source from the supplied archive did not include that guard and would throw when `req.user` is absent. See `Unit-Testing/reports/Unit_Testing_Report.md` for the change and TDD status.

## Control flow and complexity

The function has two decisions: whether `req.user` exists, and whether its role is in the allowed roles. The CFG is `Control-Flow-Graph/authorizeRoles-CFG.png`.

`V(G) = D + 1 = 2 + 1 = 3`. By the graph formula, `V(G) = E - N + 2P = 8 - 7 + 2 = 3` (one connected component).

## Statement coverage test design

| ID | Input | Expected outcome | Statements covered | Execution result |
|---|---|---|---|---|
| WB-ST-01 | `req.user` absent | 403; no `next()` | missing-user guard, error response, return | Pending Jest run |
| WB-ST-02 | Student role; allowed role is admin | 403; no `next()` | first decision false; role-denial statements | Pending Jest run |
| WB-ST-03 | Admin role; allowed role is admin | `next()` once | both decisions false; continuation | Pending Jest run |

These cases are designed to execute every statement in the selected middleware. Coverage is a design expectation only until the configured Jest run confirms it.

## Branch coverage test design

| Decision | Outcome | Test ID | Expected | Execution result |
|---|---|---|---|---|
| `req.user` exists | Missing user path | WB-ST-01 | 403 | Pending Jest run |
| `req.user` exists | User present path | WB-ST-02, WB-ST-03 | Continue to role decision | Pending Jest run |
| Role allowed | Allowed | WB-ST-03 | Call `next()` | Pending Jest run |
| Role allowed | Not allowed | WB-ST-02 | 403 | Pending Jest run |

The test design covers all four decision outcomes. Actual Jest coverage is unverified; do not report a percentage until running `npm run coverage:member2`.

## Expected vs actual results

Expected behavior is recorded in the case tables and CSVs. Actual results are marked pending because Jest could not be installed here: `npm install` failed with `ENOTFOUND registry.npmjs.org`. No Jest execution output or coverage percentage is represented as actual evidence.

## Limitations

Tests invoke middleware directly using request/response mocks. They do not verify Express route ordering, database behavior, browser UI, or deployment configuration.
