@ui @login
Feature: Student login
  As a registered student of StudentTrack
  I want to sign in with my email and password
  So that I can view my subjects and attendance

  # StudentTrack only lets an account log in after an admin approves it,
  # so the Background checks that the test student is already approved.
  Background:
    Given an approved student account exists
    And the student is on the login page

  # Member 1: TC009 / decision table rule R5
  @BDD-01 @TC009 @DT-R5
  Scenario: Approved student logs in with valid credentials
    When the student enters a valid email and password
    And submits the login form
    Then the student should be taken to the student dashboard
    And the dashboard should greet the student by name

  # Member 1: TC012 / decision table rule R2
  @BDD-02 @TC012 @DT-R2
  Scenario: Student enters an incorrect password
    When the student enters a valid email and an incorrect password
    And submits the login form
    Then the error message "Invalid login credentials" should be displayed
    And the student should remain on the login page