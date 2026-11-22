# Member 4 – Performance, Security & Quality Testing

## 1. Overview

This directory contains the testing activities and supporting evidence completed by Member 4 for the StudentTrack Student Attendance Management System.

The testing activities cover:

- Performance Testing using Apache JMeter.
- Manual Security Testing based on selected OWASP security concerns.
- Defect Tracking and Root Cause Analysis.
- Code Quality Analysis using SonarQube.

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
| 11 | User enumeration test | Same generic error expected | Different error messages returned | Finding |

### 3.3 Security Finding

**Finding: User Enumeration Through Login Error Messages**

During testing, different error messages were returned for two login scenarios:

- Non-existing email: `Invalid credentials`
- Existing email with an incorrect password: `Invalid login credentials`

This difference may allow an attacker to identify registered email addresses.

**Recommended Improvement:** Return the same generic error message, such as `Invalid email or password`, for both scenarios.

**Status:** Identified – Fix and verification pending.

### 3.4 Evidence

Security testing screenshots are available in the `Security/` directory.

Sensitive information such as JWT tokens and personal email addresses should be masked in submitted screenshots.

## 4. Defect Tracking

### 4.1 Defect Tracking Tool

**Tool:** GitHub Issues

GitHub Issues was used to record, assign, track, and manage defects identified during the security testing of the StudentTrack application.

### 4.2 Identified Defect 1

**Issue #2: User Enumeration Through Different Login Error Messages**

The login API returned different error messages for non-existing email addresses and existing email addresses with incorrect passwords.

This could allow attackers to identify registered user email addresses.

### Root Cause Analysis

The root cause was identified in the login route (`Backend/routes/auth.js`).

Two different error messages were returned:

- Non-existing email: `Invalid credentials`
- Existing email with incorrect password: `Invalid login credentials`

The different responses created a potential user enumeration vulnerability.

### Fix Implemented

Both login failure conditions were updated to return the same generic error message:

`Invalid email or password`

### Retesting Results

The fix was verified using Postman.

| Test Case | Scenario | HTTP Status | Result |
|---|---|---:|---|
| TC01 | Non-existing email | 400 | Pass |
| TC02 | Existing email with incorrect password | 400 | Pass |

Both scenarios returned the same generic error message.

### Defect Lifecycle

The complete defect lifecycle was followed for GitHub Issue #2.

`New → Assigned → Fixed → Verified → Closed`

| Lifecycle Stage | Activity |
|---|---|
| New | Defect reported as GitHub Issue #2 |
| Assigned | Issue assigned to Member 4 |
| Fixed | Login API error messages updated |
| Verified | Both retesting scenarios passed |
| Closed | GitHub Issue #2 closed after successful verification |

### Supporting Evidence

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

### Root Cause Analysis

The root cause was identified in the registration route (`Backend/routes/auth.js`).

The backend registration route only checked whether the password field was empty. It did not check whether the password contained at least 8 characters.

As a result, a registration request containing a 3-character password (`123`) was accepted by the backend and returned HTTP 201 Created.

### Fix Implemented

Backend password-length validation was added to the registration route.

The backend now checks whether the password contains at least 8 characters.

If the password is shorter than 8 characters, the API returns HTTP 400 Bad Request with the following error message:

`Password must be at least 8 characters long`

### Retesting Results

The fix was verified using Postman.

| Test Case | Scenario | HTTP Status | Result |
|---|---|---:|---|
| TC01 | Registration with a 3-character password | 400 | Pass |
| TC02 | Registration with a valid password | 201 | Pass |

The backend successfully rejected the short password while accepting the valid password.

### Defect Lifecycle

The complete defect lifecycle was followed for GitHub Issue #3.

`New → Assigned → Fixed → Verified → Closed`

| Lifecycle Stage | Activity |
|---|---|
| New | Defect reported as GitHub Issue #3 |
| Assigned | Issue assigned to Member 4 |
| Fixed | Minimum 8-character password validation added to the registration API |
| Verified | Short and valid passwords tested successfully using Postman |
| Closed | GitHub Issue #3 closed after successful verification |

### Supporting Evidence

The following supporting documents and screenshots are available in the `Defects/Issue-3-Weak-Password/` directory:

- Root Cause Analysis document
- Postman retesting screenshot – Short password rejected
- Postman retesting screenshot – Valid password accepted

**GitHub Issue:** [Issue #3 – Backend Registration Accepts Passwords Shorter Than 8 Characters](https://github.com/GithmiJayakody/StudentTrack-Testing/issues/3)

**Status:** Fixed, verified, and closed.

## 5. SonarQube Analysis & Quality Metrics

**Status:** Pending

SonarQube will be used to analyse the StudentTrack codebase.

The following quality metrics will be collected:

- Code Coverage (%)
- Defect Density
- Code Smells
- Technical Debt

Based on the analysis, 2–3 concrete code quality improvements will be proposed.

Screenshots and supporting evidence will be stored in the `SonarQube/` directory.

## 6. Evidence Directory Structure

```text
Member-4/
├── Defects/
├── Performance/
├── Report/
├── Security/
├── SonarQube/
└── README.md
```

## 7. Conclusion

Performance and selected security tests have been completed for the StudentTrack backend. The collected results and screenshots provide evidence of the testing activities performed.

Defect Tracking, Root Cause Analysis, and SonarQube quality analysis will be completed as the next stages of the assignment.