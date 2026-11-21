# Member 2 Handover

**Project:** StudentTrack – Student Attendance Management System  
**Assigned work:** EC4206 Section 3.4 White-Box Testing and the Unit Testing/TDD part of Section 3.5.  
**Boundary:** Member 3 owns BDD/Cucumber and CI/CD; this package does not implement those tasks.

## Deliverables

- `White-Box-Testing/Selected-Function/Selected_Function_Analysis.md` – source function, inputs, outputs, and decisions.
- `White-Box-Testing/Control-Flow-Graph/authorizeRoles-CFG.png` – flow graph.
- `White-Box-Testing/Cyclomatic-Complexity/Cyclomatic_Complexity.md` – complexity calculation.
- `White-Box-Testing/Statement-Coverage/` and `Branch-Coverage/` – test design tables.
- `Unit-Testing/tests/authMiddleware.test.js` – Jest suite using Jest mocks and assertions.
- `Unit-Testing/reports/Unit_Testing_Report.md` – framework, test cases, TDD/source-change record, results status, and limits.
- `Reports/White_Box_Testing_Report.md` – analysis and coverage case design.
- `Evidence/` – preparation record and screenshot instructions. Jest execution evidence is pending.

## Install and run

Open a terminal in `StudentTrack/Backend` (the backend folder inside this package). Run:

```powershell
npm install
npm run test:member2
npm run coverage:member2
```

The package config pins Jest to the current 30.x line. The commands use the Jest config at `StudentTrack/Backend/jest.config.js`. Jest coverage reports are configured to write under `Testing/Member-2/Unit-Testing/reports/coverage/`.

**Execution status:** Jest could not be installed in the preparation workspace because npm registry DNS failed (`ENOTFOUND registry.npmjs.org`). Therefore tests and coverage remain pending; no pass count or coverage percentage is claimed. Install and run the commands above where npm registry access is available, then replace the pending result labels with the observed output and retain the terminal evidence.

## Source and TDD change

The supplied original `auth.js` accessed `req.user.role` without first checking `req.user`. The final project copy adds a guard that returns 403 when the user context is absent. The Jest suite includes that regression case. This proposed source modification is in `StudentTrack/Backend/middleware/auth.js`; it does not alter the original prepared submission folder.

## Local configuration and secrets

No `.env` file or production secret is included. `.env.example` uses placeholders. The middleware unit tests use a test-only JWT secret and do not contact MongoDB. The MongoDB credential previously shared in this chat should be rotated and kept out of GitHub.

## GitHub handover

Follow `GITHUB_HANDOVER.md` from the package root. No repository URL or invitation was provided, so this package has not been pushed.

For the original-source comparison and proposed guard, see `Unit-Testing/reports/Source_Change_Record.md`. The existing package lock could not be updated because npm registry access failed; after network access is available, run `npm install` from `StudentTrack/Backend` before `npm run test:member2` or `npm run coverage:member2`.
