# Root Cause Analysis – Issue #3

## Bug Title

Backend Registration Accepts Passwords Shorter Than 8 Characters

## Root Cause

The backend registration route checks whether the password field is empty but does not validate its minimum length.

Although the frontend registration form enforces a minimum password length of 8 characters, direct API requests can bypass this validation.

As a result, the backend accepts passwords shorter than 8 characters.

## Affected Component

Backend Authentication – Registration API

## Recommended Solution

Add server-side password validation to reject passwords shorter than 8 characters and return HTTP 400 Bad Request.

## Fix Implemented

Backend password validation was added to the registration route in `Backend/routes/auth.js`.

The backend now checks whether the password contains at least 8 characters. If the password is shorter than 8 characters, the API returns:

`Password must be at least 8 characters long`

## Retesting Results

| Test Case | Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| TC01 | Registration with a 3-character password | HTTP 400 – Reject registration | HTTP 400 – Password validation error | Pass |
| TC02 | Registration with a valid password | HTTP 201 – Accept registration | HTTP 201 – Registration successful | Pass |

## Verification

Both registration scenarios were retested using Postman.

- Short passwords are rejected by the backend.
- Valid passwords are accepted.
- The registration functionality continues to work correctly with valid passwords.

The retesting screenshots are available in the `Retesting-Evidence/` directory.

## Git Information

- Branch: `member-4-quality`
- Commit: To be updated after the final commit.
- Commit Message: To be updated after the final commit.

## GitHub Issue

- Issue: #3 – Backend Registration Accepts Passwords Shorter Than 8 Characters
- Status: Closed

## Current Status

**Fixed, retested, verified, and closed.**