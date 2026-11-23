# Original Source and Proposed Member 2 Change

## 1. Original Source from the Supplied StudentTrack Archive

The original file is:

`StudentTrack/Backend/middleware/auth.js`

In the supplied StudentTrack archive, the `authorizeRoles` middleware was implemented as follows:

```javascript
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
```

### Identified Problem

The original implementation directly accesses `req.user.role` without first checking whether `req.user` exists.

If `req.user` is undefined, attempting to access `req.user.role` causes a JavaScript `TypeError`.

This can result in an unexpected server error instead of returning the intended access-denied response.

## 2. Proposed Change in the Member 2 Submission Copy

To address this issue, an additional guard was introduced before the existing role check.

The updated implementation is:

```javascript
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};
```

### Explanation of the Change

The additional condition:

```javascript
if (!req.user) {
  return res.status(403).json({ message: 'Access denied' });
}
```

checks whether an authenticated user object exists before accessing its role.

- If `req.user` is missing, the middleware returns HTTP 403.
- If the user exists but their role is not permitted, the middleware returns HTTP 403.
- If the user's role is permitted, the middleware calls `next()`.

The original role-checking behavior is preserved.

This is a small fail-closed improvement intended to prevent an undefined-user access error.

## 3. Test-Driven Development (TDD) Demonstration

The missing-user authorization scenario was used to demonstrate the Red-Green approach of Test-Driven Development.

### 3.1 Red Phase – Test Failure

The missing-user guard was temporarily removed from the `authorizeRoles` middleware.

The following focused Jest command was executed:

```powershell
npm run test:member2 -- --runTestsByPath ../../Testing/Member-2/Unit-Testing/tests/authMiddleware.test.js -t "denies a request without an authenticated user"
```

**Observed result:**

- The test failed.
- Jest reported a `TypeError`.
- The error occurred because the middleware attempted to read the `role` property of an undefined user.

This demonstrated the defect in the original implementation.

### 3.2 Green Phase – Test Passed

The missing-user guard was restored in `StudentTrack/Backend/middleware/auth.js`.

The same focused Jest test was executed again.

**Observed result:**

- The focused test passed.
- The middleware returned HTTP 403.
- The `next()` callback was not called.

This confirmed that the additional guard resolved the identified issue.

### 3.3 Final Verification

After restoring the guard, the complete Jest test suite and coverage command were executed.

```powershell
npm run test:member2
npm run coverage:member2
```

Both commands completed successfully.

## 4. Final Test Results

| Metric | Actual Result |
|---|---:|
| Test suites passed | 1 |
| Total test suites | 1 |
| Tests passed | 6 |
| Total tests | 6 |
| Statement coverage | 100% |
| Branch coverage | 100% |
| Function coverage | 100% |
| Line coverage | 100% |

**Important:** These coverage percentages apply only to the tested `auth.js` middleware. They do not represent the coverage of the entire StudentTrack application.

## 5. Files Involved

The following files are involved in this Member 2 implementation:

| File | Purpose |
|---|---|
| `StudentTrack/Backend/middleware/auth.js` | Updated authorization middleware |
| `StudentTrack/Backend/jest.config.js` | Jest configuration |
| `StudentTrack/Backend/package.json` | Jest dependency and test scripts |
| `StudentTrack/Backend/package-lock.json` | Locked dependency versions |
| `Testing/Member-2/Unit-Testing/tests/authMiddleware.test.js` | Six Jest unit tests |
| `Testing/Member-2/Unit-Testing/reports/Unit_Testing_Report.md` | Unit testing report |
| `Testing/Member-2/Unit-Testing/reports/Source_Change_Record.md` | Source change and TDD record |

## 6. Conclusion

The original `authorizeRoles` middleware contained a missing-user handling issue.

The Member 2 submission copy introduces an explicit guard to handle missing authenticated user information safely.

The change was demonstrated using Jest and the Red-Green TDD approach. After restoring the guard, all six unit tests passed, and the tested `auth.js` file achieved 100% statement, branch, function, and line coverage.

The original supplied StudentTrack archive remains unchanged. The proposed source-code improvement is included in the prepared Member 2 submission copy.