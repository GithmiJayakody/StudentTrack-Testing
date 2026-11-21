const { createRequire } = require('node:module');

const backendRequire = createRequire(require.resolve('../../../../StudentTrack/Backend/package.json'));
const jwt = backendRequire('jsonwebtoken');
const { protect, authorizeRoles } = backendRequire('./middleware/auth');

const TEST_SECRET = 'member2-unit-test-secret-only';
process.env.JWT_SECRET = TEST_SECRET;

function responseMock() {
  return {
    statusCode: 200,
    body: undefined,
    status: jest.fn(function status(code) {
      this.statusCode = code;
      return this;
    }),
    json: jest.fn(function json(body) {
      this.body = body;
      return this;
    }),
  };
}

describe('authorizeRoles middleware', () => {
  test('calls next for a permitted administrator', () => {
    const req = { user: { id: 'admin-1', role: 'admin' } };
    const res = responseMock();
    const next = jest.fn();

    authorizeRoles('admin')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('denies a role outside the allowlist', () => {
    const res = responseMock();
    const next = jest.fn();

    authorizeRoles('admin')({ user: { id: 'student-1', role: 'student' } }, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
    expect(next).not.toHaveBeenCalled();
  });

  test('denies a request without an authenticated user', () => {
    const res = responseMock();
    const next = jest.fn();

    authorizeRoles('admin')({}, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
    expect(next).not.toHaveBeenCalled();
  });
});

describe('protect middleware', () => {
  test('rejects a request without a bearer token', () => {
    const res = responseMock();
    const next = jest.fn();

    protect({ headers: {} }, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejects an invalid bearer token', () => {
    const res = responseMock();
    const next = jest.fn();

    protect({ headers: { authorization: 'Bearer invalid-token' } }, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is not valid' });
    expect(next).not.toHaveBeenCalled();
  });

  test('attaches verified claims and calls next for a valid token', () => {
    const claims = { id: 'user-1', role: 'lecturer' };
    const req = { headers: { authorization: `Bearer ${jwt.sign(claims, TEST_SECRET)}` } };
    const res = responseMock();
    const next = jest.fn();

    protect(req, res, next);

    expect(req.user).toMatchObject(claims);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
