# Software Versions – Member 3 (BDD, Test Automation & CI/CD)

**Project:** StudentTrack – Student Attendance Management System
**Module:** EC4206 Software Testing and Quality Assurance
**Recorded on:** 23 November 2026

## Local test machine

| Item | Version / value |
|---|---|
| Operating system |  Windows 11 , Version 24H2 |
| Browser (Selenium) | Google Chrome 157.0.8103.80 (Official Build, 64-bit) |
| Node.js | v24.14.0 |
| npm | 11.9.0 |
| IDE | Visual Studio Code |

## Test tools (Testing/Member-3)

Output of `npm ls --depth=0`:

| Package | Version | Used for |
|---|---|---|
| @cucumber/cucumber | 11.3.0 | BDD – runs the Gherkin scenarios |
| selenium-webdriver | 4.51.0 | UI automation – controls Chrome |
| newman | 6.2.3 | API automation – runs the Postman collection |

Selenium Manager (built into selenium-webdriver) downloads the matching ChromeDriver automatically.

## Other tools in the pipeline

| Item | Version / value |
|---|---|
| Jest (Member 2 unit tests) | 30.x |
| GitHub Actions runner | ubuntu-latest |
| Node.js in GitHub Actions | 22 |
| MongoDB in GitHub Actions | mongo:7 (Docker service container) |

## Application under test

| Part | Technology |
|---|---|
| Frontend | React 19 + Vite 8 (runs on http://localhost:5173) |
| Backend | Node.js + Express 5 (runs on http://localhost:5000) |
| Database | MongoDB with Mongoose 9 |
| Authentication | JWT (jsonwebtoken) + bcryptjs password hashing |

## Database and test data (no credentials recorded)

| Environment | Database | How test data is created |
|---|---|---|
| Local | MongoDB Atlas, database `studenttrack_test` (separate from the real data) | `npm run seed` |
| GitHub Actions | Temporary MongoDB 7 container, database `studenttrack_ci` | `npm run seed` in the workflow |

Synthetic test accounts (password kept private, supplied through `TEST_STUDENT_PASSWORD`):

| Account | Approval status |
|---|---|
| bdd.student@studenttrack.test | approved |
| pending.student@studenttrack.test | pending |
| rejected.student@studenttrack.test | rejected |

## Commands used

| Purpose | Folder | Command |
|---|---|---|
| Start backend | StudentTrack/Backend | `npm run dev` |
| Start frontend | StudentTrack/Frontend | `npm run dev` |
| Create test data | Testing/Member-3 | `npm run seed` |
| BDD tests | Testing/Member-3 | `npm run test:bdd` |
| UI tests | Testing/Member-3 | `npm run test:ui` |
| API tests | Testing/Member-3 | `npm run test:api` |
| Unit tests (Member 2) | StudentTrack/Backend | `npm run coverage:member2` |
