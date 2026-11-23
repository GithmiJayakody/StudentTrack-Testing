# StudentTrack – SonarQube Final Metrics

## 1. Overview

This document records the final code quality metrics obtained from the SonarQube analysis of the StudentTrack project.

**Project Name:** StudentTrack  
**Analysis Branch:** `member-4-quality`  
**Tool:** SonarQube Community Edition

## 2. Final SonarQube Metrics

The following metrics were collected from the final SonarQube analysis.

| Metric | Final Result |
|---|---:|
| Lines of Code (LOC) | 8,655 |
| Code Smells | 46 |
| Technical Debt | 295 minutes (4 hours 55 minutes) |
| Defect Density | 0.231 defects/KLOC |
| Overall Code Coverage | 7.5% |
| New Code Coverage | 87.9% |
| Code Duplication | 6.4% |
| New Code Duplication | 0.0% |
| Security Issues | 2 |
| Reliability Issues | 70 |
| Maintainability Issues | 3 |
| Security Hotspots | 0 |
| New Code Issues | 0 |
| Total Issues | 72 |
| Quality Gate | Passed |

## 3. Defect Density Calculation

Defect density was calculated using the two significant defects recorded in the GitHub Issues section and the total lines of code reported by SonarQube.

**Number of Recorded Defects:** 2

**Total Lines of Code:** 8,655

**Lines of Code in KLOC:**

KLOC = 8,655 / 1,000 = 8.655

**Defect Density Formula:**

Defect Density = Number of Defects / KLOC

Defect Density = 2 / 8.655

**Final Defect Density = 0.231 defects/KLOC**

*Note: This is an approximate project-recorded defect density based on the two significant defects documented by Member 4. It does not represent every possible defect in the entire application.*

## 4. Proposed Improvements Based on SonarQube Findings

The following improvements were implemented based on the security and code quality findings:

1. **Improve CORS Configuration:** Restricted cross-origin requests to the authorized frontend origin to improve API security.

2. **Prevent Framework Information Disclosure:** Disabled the Express `X-Powered-By` response header to avoid exposing framework information in HTTP responses.

3. **Improve Input Validation and Authentication Security:** Added backend password length validation and implemented generic login error messages to prevent weak passwords and user enumeration.

Additional Jest tests were implemented to verify API responses, CORS behaviour, and security-related response headers.

## 5. Final Evaluation

The final SonarQube analysis achieved a **Passed Quality Gate** with zero new code issues.

The overall code coverage was 7.5%, while new code coverage reached 87.9%. Code duplication remained at 6.4%.

The analysis identified 46 code smells and 295 minutes of technical debt. These results indicate areas where further refactoring and code quality improvements can be considered.

The final analysis also reported zero security hotspots and no new code issues.

## 6. Conclusion

SonarQube was used to evaluate the code quality, maintainability, security, and reliability of the StudentTrack application. Several improvements were implemented based on the analysis findings.

The final Quality Gate passed, and the results provide a baseline for future code quality improvements.