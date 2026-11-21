# Cyclomatic Complexity

Selected function: `authorizeRoles` in `StudentTrack/Backend/middleware/auth.js`.

The inner middleware contains two independent decisions:

1. Does `req.user` exist?
2. Is `req.user.role` included in the allowed `roles` list?

There are no compound predicates in the selected inner middleware.

## Predicate-count method

`V(G) = D + 1 = 2 + 1 = 3`

## Control-flow graph method

For the graph in `Control-Flow-Graph/authorizeRoles-CFG.png`:

- Nodes `N = 7`: Entry, user decision, missing-user response, role decision, forbidden response, next middleware, Exit.
- Edges `E = 8`.
- Connected components `P = 1`.

`V(G) = E - N + 2P = 8 - 7 + 2(1) = 3`

Both methods agree. The three basis paths are: missing user; user present but role not allowed; user present and role allowed.
