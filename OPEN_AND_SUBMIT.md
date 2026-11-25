# Open, Install, Test, and Submit – Member 2

## 1. Open the Project

1. Extract the `StudentTrack_Member2_Final` folder.
2. Open the extracted folder in VS Code.
3. Open `Testing/Member-2/README.md` to view the Member 2 deliverables.

## 2. Install Backend Dependencies

Open a terminal in `StudentTrack/Backend` and run:

```powershell
npm install
```

## 3. Run Unit Tests

Run:

```powershell
npm run test:member2
```

Expected result from the completed test run:

- 1 test suite passed.
- 6 tests passed.

## 4. Generate Coverage Report

Run:

```powershell
npm run coverage:member2
```

The completed coverage report showed 100% statement, branch, function, and line coverage for `auth.js`.

This coverage result applies to the tested authentication middleware, not the entire application.

## 5. Present Testing Evidence

Useful files to show during the evaluation:

- `Testing/Member-2/Evidence/Screenshots/Jest_Test_Run.png`
- `Testing/Member-2/Evidence/Screenshots/Jest_Coverage_Summary.png`
- `Testing/Member-2/Evidence/Screenshots/TDD_Red_Test_Failure.png`
- `Testing/Member-2/Evidence/Screenshots/TDD_Green_Test_Pass.png`
- `Testing/Member-2/White-Box-Testing/Control-Flow-Graph/authorizeRoles-CFG.png`
- `Testing/Member-2/Reports/White_Box_Testing_Report.md`
- `Testing/Member-2/Unit-Testing/reports/Unit_Testing_Report.md`

## 6. GitHub Submission

- Repository: https://github.com/GithmiJayakody/StudentTrack-Testing
- Branch: `member2-tested-final`

