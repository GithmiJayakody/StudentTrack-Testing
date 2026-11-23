# 3.10 Case Study and Best Practices

## Application of Agile and DevOps Practices in StudentTrack

### Introduction

The StudentTrack Student Attendance Management System was used as the software under test for this Software Testing and Quality Assurance assignment. The project provided an opportunity to apply software testing techniques together with Agile and DevOps practices.

The group divided the testing activities among four members, with each member responsible for specific testing areas. This division helped organize the work and allowed different testing techniques to be applied systematically.

### Application of Agile Practices

The group applied several Agile principles throughout the assignment.

**1. Task Distribution and Collaboration**

The project activities were divided among four members. Each member was assigned specific responsibilities, including test planning, black-box testing, white-box testing, test automation, performance testing, security testing, and quality analysis. This helped distribute the workload and encouraged collaboration.

**2. Iterative Testing and Improvement**

Testing was performed iteratively. When defects and weaknesses were identified, the team investigated their causes, implemented improvements, and performed retesting to verify the fixes.

For example, security testing identified a user enumeration vulnerability and weak password validation. These issues were addressed through backend improvements and subsequently retested.

**3. Continuous Communication and Integration**

GitHub was used to coordinate development and testing activities. Separate branches were maintained for individual contributions, and pull requests were used to review and integrate changes into the main branch.

This helped the team identify integration issues and maintain a shared version of the project.

### Application of DevOps Practices

The project also demonstrated important DevOps practices.

**1. Version Control Using Git and GitHub**

Git and GitHub were used to manage source code and testing documentation. Branches and pull requests supported collaborative development and controlled integration of individual contributions.

**2. Continuous Integration Using GitHub Actions**

A GitHub Actions workflow was configured to execute automated tests when changes were pushed or pull requests were created.

The workflow included:
- Backend unit testing using Jest.
- BDD testing using Cucumber and Selenium.
- UI automation using Selenium.
- API automation using Postman and Newman.

This automated process helped identify testing failures during integration.

**3. Automated Quality Analysis**

SonarQube was used to analyze the codebase and evaluate software quality metrics, including code coverage, code smells, duplication, and technical debt. The analysis helped identify areas requiring improvement.

**4. Continuous Improvement**

The team used testing results, defect reports, and code quality analysis to guide improvements. After implementing changes, relevant tests and analyses were performed again to evaluate the results.

### Challenges and Lessons Learned

During the project, the team encountered integration issues involving different branches, package dependencies, and automated test expectations.

One important example was the difference between the expected login error messages in some automated tests and the improved generic error message introduced to address the user enumeration vulnerability.

This highlighted the importance of keeping automated tests aligned with changes in application requirements and security behaviour.

The team also learned the importance of maintaining proper documentation, recording testing evidence, reviewing code changes, and using automated workflows to detect problems early.

### Conclusion

The StudentTrack project demonstrated how Agile collaboration and DevOps practices can support software testing and quality assurance.

Task distribution, iterative testing, GitHub-based collaboration, automated testing, continuous integration, and SonarQube analysis helped the team systematically evaluate and improve the application.

Overall, this assignment provided practical experience in applying software testing techniques within a collaborative software development environment.