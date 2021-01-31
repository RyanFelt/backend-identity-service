/* eslint-disable no-undef */
const refresh = require('./');
const database = require('../utils/database');
const jwt = require('../utils/jwt');

jest.mock('../utils/database');
jest.mock('../utils/jwt');

const req = {
  headers: {
    authorization: 'TEST_REFRESH_TOKEN',
  },
};

describe('Refresh Handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should return new authorization token', async () => {
    database.getRefresh.mockImplementation(() => ({
      userId: 'TEST_USER_ID',
    }));
    database.getUser.mockImplementation(() => ({
      userId: 'TEST_USER_ID',
    }));

    jwt.authenticateRefresh.mockImplementation(() => ({
      userId: 'TEST_USER_ID',
    }));
    jwt.generateToken.mockImplementation(() => 'TEST_AUTH_TOKEN');

    const res = await refresh(req);

    expect(res).toEqual(
      expect.objectContaining({
        authorization: expect.any(String),
        refresh: expect.any(String),
      }),
    );
  });

  test('Should throw unauthorized error', async () => {
    jwt.authenticateRefresh.mockImplementation(() => ({}));

    try {
      await refresh(req);
    } catch (err) {
      expect(err.statusCode).toBe(401);
      expect(err.message).toBe('unauthorized');
    }
  });

  test('Should throw invalid refresh token error - black listed or expired refresh token(not in table)', async () => {
    jwt.authenticateRefresh.mockImplementation(() => ({
      userId: 'TEST_USER_ID',
    }));

    database.getRefresh.mockImplementation(() => ({}));

    try {
      await refresh(req);
    } catch (err) {
      expect(err.statusCode).toBe(409);
      expect(err.message).toBe('invalid refresh token');
    }
  });
});
