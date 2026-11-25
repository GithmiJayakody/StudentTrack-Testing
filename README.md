# StudentTrack – Software Testing and Quality Assurance

A comprehensive software testing and quality assurance project for the **StudentTrack – Student Attendance Management System**, developed as part of the EC4206 Software Testing and Quality Assurance module at the University of Ruhuna.

## About the Project

StudentTrack is a web-based Student Attendance Management System designed to simplify attendance management for administrators, lecturers, and students.

This repository contains the StudentTrack application source code and the testing documentation, test cases, execution results, reports, and supporting evidence prepared to evaluate the application's quality and reliability.

## Project Technologies

| Component | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Unit Testing | Jest |
| BDD | Cucumber, Gherkin |
| UI Automation | Selenium |
| API Testing | Postman, Newman |
| Performance Testing | Apache JMeter |
| Code Quality Analysis | SonarQube |
| Version Control | Git, GitHub |
| CI/CD | GitHub Actions |

## Testing Activities

The project covers the following software testing and quality assurance activities in accordance with the EC4206 assignment requirements.

### 1. Test Planning and STLC
- Test scope and objectives
- Software Testing Life Cycle (STLC)
- Test planning and test environment

### 2. Black-Box Testing
- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table Testing

### 3. White-Box Testing
- Control Flow Graphs (CFG)
- Cyclomatic Complexity
- Statement Coverage
- Branch Coverage

### 4. TDD and BDD
- Unit testing using Jest
- Test-Driven Development (TDD)
- Behaviour-Driven Development (BDD)
- Gherkin scenarios using Cucumber

### 5. Test Automation and CI/CD
- Selenium UI automation
- Postman API testing
- Newman test execution
- GitHub Actions automated workflows

### 6. Performance and Security Testing
- Apache JMeter load testing
- Manual security testing based on OWASP-related vulnerabilities

### 7. Defect Tracking
- Defect reporting using GitHub Issues
- Root Cause Analysis (RCA)
- Defect lifecycle management

### 8. Quality Metrics and SonarQube
- Code coverage analysis
- Defect density
- Code smells
- Technical debt
- Quality Gate evaluation

### 9. Agile and DevOps Practices
- Team collaboration
- Version control and integration
- Continuous testing and quality improvement

## Repository Structure

```text
StudentTrack-Testing/
│
├── .github/
│   └── workflows/
│
├── StudentTrack/
│   ├── Backend/
│   └── Frontend/
│
├── Testing/
│   ├── Member-1/
│   ├── Member-2/
│   ├── Member-3/
│   ├── Member-4/
│   ├── Case-Study/
│   └── README.md
│
├── .gitignore
├── GITHUB_HANDOVER.md
├── OPEN_AND_SUBMIT.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- Git
- Visual Studio Code (recommended)

### Clone the Repository

```bash
git clone https://github.com/GithmiJayakody/StudentTrack-Testing.git
```

```bash
cd StudentTrack-Testing
```

### Backend Setup

```bash
cd StudentTrack/Backend
npm install
```

Configure the required environment variables in the backend `.env` file before starting the application.

Run the backend using the start script defined in `Backend/package.json`.

### Frontend Setup

Open another terminal:

```bash
cd StudentTrack/Frontend
npm install
```

Run the frontend using the development script defined in `Frontend/package.json`.

## Running Tests

Refer to the individual member documentation for the exact commands and testing configurations.

The repository includes:
- Jest unit testing and coverage reports
- Cucumber BDD scenarios
- Selenium UI automation
- Postman and Newman API testing
- JMeter performance test results
- GitHub Actions workflow results
- SonarQube analysis reports

## Team Contributions

The assignment work is organized among four members:

| Member | Main Responsibilities |
|---|---|
| Member 1 | Test Planning and Black-Box Testing |
| Member 2 | White-Box Testing, Unit Testing and TDD |
| Member 3 | BDD, Test Automation and CI/CD |
| Member 4 | Performance Testing, Security Testing, Defect Tracking and SonarQube |

## Testing Documentation

For detailed testing documentation, reports, test cases, screenshots, and execution evidence, refer to the [`Testing`](./Testing/) directory.

Start with [`Testing/README.md`](./Testing/README.md) for an overview of the testing activities.

## Conclusion

This project demonstrates the application of software testing techniques and quality assurance practices throughout the evaluation of a web-based application.

It combines manual testing, automated testing, performance evaluation, security checks, defect management, and code quality analysis to support the development of a more reliable and maintainable software system.