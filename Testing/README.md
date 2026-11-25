# StudentTrack – Software Testing Documentation

## 1. Introduction

This folder contains the testing documentation, test cases, execution results, reports, and supporting evidence prepared for the **StudentTrack – Student Attendance Management System** as part of the EC4206 – Software Testing and Quality Assurance group assignment.

The purpose of this documentation is to demonstrate the software testing activities carried out to evaluate the functionality, reliability, security, performance, and overall quality of the StudentTrack application.

## 2. Testing Scope

The testing activities cover the following areas:

- Introduction and Test Planning
- Software Testing Life Cycle (STLC)
- Black-Box Testing
- White-Box Testing
- Test-Driven Development (TDD)
- Behaviour-Driven Development (BDD)
- Test Automation
- Continuous Integration and Continuous Deployment (CI/CD)
- Performance Testing
- Security Testing
- Defect Tracking and Root Cause Analysis
- Software Quality Metrics and SonarQube Analysis
- Agile and DevOps Best Practices

## 3. Testing Activities and Tools

| Testing Activity | Tools / Techniques |
|---|---|
| Test Planning | Test Plan, STLC |
| Black-Box Testing | Equivalence Partitioning, Boundary Value Analysis, Decision Tables |
| White-Box Testing | Control Flow Graphs, Cyclomatic Complexity, Statement and Branch Coverage |
| Unit Testing | Jest |
| TDD | Red-Green Testing Approach |
| BDD | Gherkin, Cucumber |
| UI Automation | Selenium |
| API Automation | Postman, Newman |
| CI/CD | GitHub Actions |
| Performance Testing | Apache JMeter |
| Security Testing | Manual OWASP-based security checks |
| Defect Tracking | GitHub Issues |
| Code Quality Analysis | SonarQube |


## 4. Folder Structure

```text
Testing/
│
├── Case-Study/
│   └── Agile_DevOps_Case_Study.md
│
├── Member-1/
│   ├── Black-Box-Testing/
│   ├── Evidence/
│   ├── STLC/
│   ├── Test-Cases/
│   ├── Test Environment/
│   └── Test-Plan/
│
├── Member-2/
│   ├── Evidence/
│   ├── Reports/
│   ├── Unit-Testing/
│   ├── White-Box-Testing/
│   └── README.md
│
├── Member-3/
│   ├── Automation/
│   ├── BDD/
│   ├── Evidence/
│   ├── support/
│   ├── .env.example
│   ├── .gitignore
│   ├── cucumber.js
│   ├── package-lock.json
│   └── package.json
│
└── Member-4/
    ├── Defects/
    ├── Performance/
    ├── Report/
    ├── Security/
    ├── SonarQube/
    └── README.md
```

## 5. Test Execution and Evidence

Each member's folder contains the relevant documentation and supporting evidence for their assigned testing activities.

Evidence may include:

- Test case documents and execution results
- Unit testing and coverage reports
- Screenshots of automated test execution
- Selenium and Newman test reports
- GitHub Actions workflow results
- JMeter performance test results
- Security testing screenshots
- GitHub defect reports and Root Cause Analysis documents
- SonarQube quality analysis screenshots and metrics

## 6. Test Results and Reporting

The test results are documented in the respective member folders.

For accurate interpretation, coverage percentages and performance metrics should be considered within the scope of the specific tests performed. For example, the 100% coverage reported for the Member 2 authentication middleware applies only to the tested `auth.js` middleware, not the entire application.

SonarQube results are documented separately under Member 4's quality analysis evidence.

## 7. Defect Management

Identified defects are documented using GitHub Issues.

The defect management process follows these stages:

**New → Assigned → Fixed → Verified → Closed**

Root Cause Analysis documents describe the causes, corrections, and retesting activities for significant defects.

## 8. Conclusion

The testing activities documented in this folder demonstrate the application of different software testing techniques and quality assurance practices throughout the development of StudentTrack.

The collected reports, test results, and evidence provide supporting documentation for evaluating the quality and reliability of the application in accordance with the EC4206 assignment requirements.
