# Member 4 – Performance, Security & Quality Testing

## 1. Overview

This directory contains the testing activities and supporting evidence completed by Member 4 for the StudentTrack Student Attendance Management System.

The testing activities cover:

- Performance Testing using Apache JMeter.
- Manual Security Testing based on selected OWASP security concerns.
- Defect Tracking and Root Cause Analysis.
- Code Quality Analysis using SonarQube.
- Backend automated testing and coverage analysis using Jest and Supertest.

## 2. Performance Testing

### 2.1 Testing Tool

**Tool:** Apache JMeter 5.6.3

**Target:** StudentTrack Backend Root API

**Endpoint:** `GET http://localhost:5000/`

### 2.2 Test Configuration

| Parameter | Value |
|---|---|
| Number of Threads (Users) | 5 |
| Ramp-up Period | 5 seconds |
| Loop Count | 5 |
| Total Requests | 25 |
| HTTP Method | GET |

### 2.3 Test Results

| Metric | Result |
|---|---:|
| Total Samples | 25 |
| Average Response Time | 2 ms |
| Minimum Response Time | 0 ms |
| Maximum Response Time | 34 ms |
| Standard Deviation | 6.49 ms |
| Error Percentage | 0.00% |
| Throughput | 6.3 requests/sec |

### 2.4 Result Analysis

The JMeter test completed 25 requests successfully with an error percentage of 0%.

The average response time was 2 ms, while the maximum response time was 34 ms. These results provide a baseline performance measurement for the tested backend root API under a small load of five concurrent virtual users.

**Limitation:** This was a basic local load test of the root API endpoint. It does not represent the performance or capacity of the entire StudentTrack application under heavy production traffic.

### 2.5 Evidence

Performance testing configuration, results, and screenshots are available in the `Performance/` directory.

## 3. Security Testing

### 3.1 Testing Approach

Manual security testing was performed on selected authentication and authorization mechanisms of the StudentTrack backend.

### 3.2 Security Test Results

| No. | Test Scenario | Expected HTTP Status | Actual HTTP Status | Result |
|---|---|---:|---:|---|
| 1 | Access without token | 401 | 401 | Pass |
| 2 | Student accessing admin endpoint | 403 | 403 | Pass |
| 3 | Admin accessing admin endpoint | 200 | 200 | Pass |
| 4 | Invalid JWT token | 401 | 401 | Pass |
| 5 | Expired JWT token | 401 | 401 | Pass |
| 6 | Lecturer accessing admin endpoint | 403 | 403 | Pass |
| 7 | Empty login fields | 400 | 400 | Pass |
| 8 | Invalid login credentials | 400 | 400 | Pass |
| 9 | Email only login attempt | 400 | 400 | Pass |
| 10 | Password only login attempt | 400 | 400 | Pass |
| 11 | User enumeration test | Same generic error expected | Different error messages initially returned | Fixed and verified |

### 3.3 Security Finding

**Finding: User Enumeration Through Login Error Messages**

During testing, different error messages were initially returned for two login scenarios:

- Non-existing email: `Invalid credentials`
- Existing email with an incorrect password: `Invalid login credentials`

This difference could allow an attacker to identify registered email addresses.

**Improvement Implemented:** Both login failure conditions were updated to return the same generic error message:

`Invalid email or password`

**Status:** Fixed, retested, and verified.

### 3.4 Evidence

Security testing screenshots are available in the `Security/` directory.

Sensitive information such as JWT tokens and personal email addresses should be masked in submitted screenshots.

## 4. Defect Tracking

### 4.1 Defect Tracking Tool

**Tool:** GitHub Issues

GitHub Issues was used to record, assign, track, and manage defects identified during the security testing of the StudentTrack application.

### 4.2 Identified Defect 1

**Issue #2: User Enumeration Through Different Login Error Messages**

The login API initially returned different error messages for non-existing email addresses and existing email addresses with incorrect passwords.

This could allow attackers to identify registered user email addresses.

#### Root Cause Analysis

The root cause was identified in the login route (`Backend/routes/auth.js`).

Two different error messages were returned:

- Non-existing email: `Invalid credentials`
- Existing email with incorrect password: `Invalid login credentials`

The different responses created a potential user enumeration vulnerability.

#### Fix Implemented

Both login failure conditions were updated to return the same generic error message:

`Invalid email or password`

#### Retesting Results

The fix was verified using Postman.

| Test Case | Scenario | HTTP Status | Result |
|---|---|---:|---|
| TC01 | Non-existing email | 400 | Pass |
| TC02 | Existing email with incorrect password | 400 | Pass |

Both scenarios returned the same generic error message.

#### Defect Lifecycle

`New → Assigned → Fixed → Verified → Closed`

| Lifecycle Stage | Activity |
|---|---|
| New | Defect reported as GitHub Issue #2 |
| Assigned | Issue assigned to Member 4 |
| Fixed | Login API error messages updated |
| Verified | Both retesting scenarios passed |
| Closed | GitHub Issue #2 closed after successful verification |

#### Supporting Evidence

The following supporting documents and screenshots are available in the `Defects/Issue-2-User-Enumeration/` directory:

- Root Cause Analysis document
- Postman retesting screenshot – Non-existing email
- Postman retesting screenshot – Existing email with incorrect password

**GitHub Issue:** [Issue #2 – User Enumeration Through Different Login Error Messages](https://github.com/GithmiJayakody/StudentTrack-Testing/issues/2)

**Status:** Fixed, verified, and closed.

### 4.3 Identified Defect 2

**Issue #3: Backend Registration Accepts Passwords Shorter Than 8 Characters**

The backend registration API accepted passwords shorter than 8 characters when requests were sent directly to the API.

Although the frontend registration form enforced a minimum password length of 8 characters, the backend did not independently validate the password length.

This allowed users to bypass frontend validation by sending direct API requests.

#### Root Cause Analysis

The root cause was identified in the registration route (`Backend/routes/auth.js`).

The backend registration route only checked whether the password field was empty. It did not check whether the password contained at least 8 characters.

As a result, a registration request containing a 3-character password (`123`) was accepted by the backend and returned HTTP 201 Created.

#### Fix Implemented

Backend password-length validation was added to the registration route.

The backend now checks whether the password contains at least 8 characters.

If the password is shorter than 8 characters, the API returns HTTP 400 Bad Request with the following error message:

`Password must be at least 8 characters long`

#### Retesting Results

The fix was verified using Postman.

| Test Case | Scenario | HTTP Status | Result |
|---|---|---:|---|
| TC01 | Registration with a 3-character password | 400 | Pass |
| TC02 | Registration with a valid password | 201 | Pass |

The backend successfully rejected the short password while accepting the valid password.

#### Defect Lifecycle

`New → Assigned → Fixed → Verified → Closed`

| Lifecycle Stage | Activity |
|---|---|
| New | Defect reported as GitHub Issue #3 |
| Assigned | Issue assigned to Member 4 |
| Fixed | Minimum 8-character password validation added to the registration API |
| Verified | Short and valid passwords tested successfully using Postman |
| Closed | GitHub Issue #3 closed after successful verification |

#### Supporting Evidence

The following supporting documents and screenshots are available in the `Defects/Issue-3-Weak-Password/` directory:

- Root Cause Analysis document
- Postman retesting screenshot – Short password rejected
- Postman retesting screenshot – Valid password accepted

**GitHub Issue:** [Issue #3 – Backend Registration Accepts Passwords Shorter Than 8 Characters](https://github.com/GithmiJayakody/StudentTrack-Testing/issues/3)

**Status:** Fixed, verified, and closed.

## 5. SonarQube Analysis & Quality Metrics

### 5.1 Testing Tool and Approach

**Tool:** SonarQube Community Build

SonarQube was used to analyse the StudentTrack backend and frontend codebase to identify security, reliability, and maintainability issues.

Jest and Supertest were also integrated to generate backend automated test coverage information. The generated LCOV report was imported into SonarQube.

### 5.2 Initial Analysis Results

| Metric | Initial Result |
|---|---:|
| Security Issues | 4 |
| Reliability Issues | 70 |
| Maintainability Issues | 3 |
| Total Issues | 74 |
| Overall Code Coverage | 0.0% |
| Code Duplication | 6.4% |
| Technical Debt | 1 day 3 hours |

### 5.3 Final Analysis Results

| Metric | Final Result |
|---|---:|
| Lines of Code (LOC) | 8,655 |
| Code Coverage | 7.5% |
| New Code Coverage | 87.9% |
| Defect Density | 0.231 defects/KLOC |
| Code Smells | 46 |
| Technical Debt | 295 minutes (4 hours 55 minutes) |
| Security Issues | 2 |
| Reliability Issues | 70 |
| Maintainability Issues | 3 |
| Total Issues | 72 |
| Code Duplication | 6.4% |
| New Code Duplication | 0.0% |
| New Code Issues | 0 |
| Security Hotspots | 0 |
| Quality Gate | Passed |

The final analysis showed that overall code coverage increased from 7.0% in the subsequent analysis to 7.5%. The number of overall issues decreased from 74 to 72. No new issues were identified in the final New Code analysis.

#### Defect Density Calculation

Defect density was calculated using the two significant defects recorded in GitHub Issues and the total lines of code reported by SonarQube.

- Number of recorded defects: 2
- Total lines of code: 8,655
- KLOC = 8,655 / 1,000 = 8.655

**Formula:**

Defect Density = Number of Defects / KLOC

Defect Density = 2 / 8.655

**Final Defect Density = 0.231 defects/KLOC**

*Note: This is an approximate project-recorded defect density based on the two significant defects documented by Member 4. It does not represent every possible defect in the entire application.*

### 5.4 Jest Test Execution and Coverage

A separate Jest test suite was created using Jest and Supertest.

The tests covered:

- StudentTrack API root endpoint response.
- CORS access for the authorized frontend origin.
- CORS handling for an unauthorized origin.
- Absence of the Express `X-Powered-By` response header.

**Test Execution Results**

| Metric | Result |
|---|---:|
| Test Suites Passed | 1 |
| Tests Passed | 4 |
| Tests Failed | 0 |

**Jest Coverage Results**

| Coverage Metric | Result |
|---|---:|
| Statement Coverage | 27.33% |
| Branch Coverage | 2.51% |
| Function Coverage | 6.97% |
| Line Coverage | 27.54% |

### 5.5 Improvements Based on SonarQube Findings

The following security improvements were implemented and verified.

**Improvement 1 – Restrict CORS Configuration**

The backend CORS configuration was updated to allow requests from the intended StudentTrack frontend origin instead of allowing all origins.

**Verification:** Jest tests checked the authorized and unauthorized origin responses.

**Improvement 2 – Disable Express Version Disclosure**

The following configuration was added:

```javascript
app.disable('x-powered-by');
```

This prevents the Express framework information from being unnecessarily exposed through the `X-Powered-By` response header.

**Verification:** A Jest test confirmed that the response did not contain the `X-Powered-By` header.

**Additional Security Improvement – Backend Password Validation**

Backend password-length validation was added to ensure that passwords contain at least 8 characters. This prevents users from bypassing frontend validation by sending direct API requests.

**Verification:** Postman retesting confirmed that short passwords were rejected and valid passwords were accepted.

### 5.6 SonarQube Analysis Warning

During the final analysis, SonarQube reported missing Git blame information for:

- `Backend/server.js`
- `Backend/app.js`

This warning indicates that Git blame information could not be retrieved for these files. However, the analysis completed successfully and the final Quality Gate passed.

### 5.7 Recommendations

The following additional improvements are recommended:

1. Improve promise error handling to prevent unhandled promise rejections.
2. Associate form labels with their corresponding input elements to improve accessibility.
3. Use semantic HTML elements such as `<button>` and `<a>` for interactive components.
4. Review hardcoded IP address configurations and other security-related findings.
5. Expand automated tests to improve overall backend and frontend code coverage.

### 5.8 Evidence

SonarQube configuration, analysis logs, improvement records, coverage reports, and screenshots are available in the following directories:

- `SonarQube/screenshots/`
- `SonarQube/coverage-reports/`
- `SonarQube/SonarQube Metrics/`

The `SonarQube Metrics/` directory contains the final metrics documentation and supporting API screenshots.

## 6. Evidence Directory Structure

```text
Member-4/
├── Defects/
│   ├── Issue-2-User-Enumeration/
│   └── Issue-3-Weak-Password/
├── Performance/
├── Report/
├── Security/
├── SonarQube/
│   ├── coverage-reports/
│   ├── screenshots/
│   │   ├── 01-Initial/
│   │   ├── 02-Jest/
│   │   ├── 03-After Jest Coverage Integration/
│   │   ├── 04-After Improvements/
│   │   └── 05-Final Analysis/
│   ├── SonarQube Metrics/
│   │   ├── 05_Final_LOC_API.png
│   │   ├── 06_Final_CodeSmells_TechnicalDebt_API.png
│   │   └── SonarQube-Metrics.md
│   └── SonarQube-Improvement-Log.md
└── README.md
```

## 7. Conclusion

Performance testing, selected security testing, defect tracking, and SonarQube quality analysis were performed for the StudentTrack application.

The JMeter test completed 25 requests with an error percentage of 0%, providing a baseline performance measurement for the backend root API.

Two security-related defects were identified, documented, fixed, and verified through retesting. Jest and Supertest were integrated to provide automated backend testing, with all four tests passing.

SonarQube was used to evaluate the codebase and identify security, reliability, and maintainability issues. Security improvements were implemented and verified.

The final analysis reported:

- 7.5% overall code coverage.
- 87.9% new code coverage.
- 0.231 defects/KLOC defect density.
- 46 code smells.
- 295 minutes of technical debt.
- Zero new code issues.
- A passed Quality Gate.

The remaining findings and recommendations provide opportunities for further improvements to the StudentTrack application.