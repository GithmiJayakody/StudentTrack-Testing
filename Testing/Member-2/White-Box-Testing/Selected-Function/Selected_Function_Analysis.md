# Selected Function Analysis

## Function

- **Name:** `authorizeRoles`
- **Location:** `StudentTrack/Backend/middleware/auth.js`, lines 19-29 in this submission.
- **Purpose:** Return Express middleware that allows a request to continue only when an authenticated user's role is present in the supplied allowlist.
- **Input:** Allowed-role strings captured by the middleware factory; an Express request whose `user` property is set by `protect`; response and `next` callbacks.
- **Observable outputs:** Calls `next()` for an allowed role; responds with HTTP 403 and `{ "message": "Access denied" }` for a missing user or disallowed role.

## Source under analysis

```js
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

## Why this function was selected

It is a small core authorization function used by protected backend routes. It has clear inputs and observable outcomes, and does not require a live database. The original archive dereferenced `req.user.role` without a prior null check. The final submission copy adds a missing-user guard as a proposed TDD change. The Jest red/green execution is pending and is not claimed as completed.

## Assumptions and limits

Routes are expected to place `protect` before `authorizeRoles`. The explicit missing-user check still makes the middleware fail closed if it is called out of order. Tests stub the Express response methods and do not start the HTTP server or MongoDB.

