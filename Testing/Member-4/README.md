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

**Status:** Pending

Identified defects will be recorded using GitHub Issues. Root Cause Analysis will be performed for significant defects, and the lifecycle of at least one defect will be documented.

The required defect lifecycle is:

`New → Assigned → Fixed → Verified → Closed`

Supporting documentation will be maintained in the `Defects/` directory.

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