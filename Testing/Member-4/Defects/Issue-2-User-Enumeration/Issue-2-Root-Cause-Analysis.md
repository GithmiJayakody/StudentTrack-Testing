# Root Cause Analysis – Issue #2

## Bug Title

User Enumeration Through Different Login Error Messages

## Root Cause

The login API uses two different error messages for non-existing email addresses and incorrect passwords.

When a user does not exist, the API returns `Invalid credentials`. However, when a user exists but enters an incorrect password, it returns `Invalid login credentials`.

This difference in error responses creates a user enumeration vulnerability because an attacker may identify registered email addresses by comparing login responses.

## Affected Component

Backend Authentication – Login API

## Recommended Solution

Use the same generic error message, such as `Invalid email or password`, for both non-existing users and incorrect passwords.

## Fix Implemented

Both login failure conditions now return the same generic error message:

`Invalid email or password`

## Retesting Results

| Test Case | Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| TC01 | Non-existing email | HTTP 400 with generic error | HTTP 400 with generic error | Pass |
| TC02 | Existing email with incorrect password | HTTP 400 with generic error | HTTP 400 with generic error | Pass |

## Verification

The two login scenarios were retested using Postman. Both returned the same HTTP status code and generic error message.

The retesting screenshots are available in the `Retesting-Evidence/` directory.

## Git Information

- Branch: `member-4-quality`
- Commit: `28f9abb`
- Commit Message: Fix user enumeration vulnerability and add retesting evidence

## GitHub Issue

- Issue: #2 – User Enumeration Through Different Login Error Messages
- Status: Closed

## Current Status

**Fixed, retested, verified, and closed.**