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
- `Evidence/` – preparation record, execution logs, and screenshots documenting the completed Jest tests, coverage results, and TDD red/green demonstration.

## Install and run

Open a terminal in `StudentTrack/Backend` (the backend folder inside this package). Run:

```powershell
npm install
npm run test:member2
npm run coverage:member2