/* eslint-disable no-undef */
const signIn = require('./');
const database = require('../utils/database');
const crypto = require('../utils/crypto');
const jwt = require('../utils/jwt');

jest.mock('../utils/database');
jest.mock('../utils/crypto');
jest.mock('../utils/jwt');

const req = {
  headers: { 'user-agent': 'test' },
  body: {
    email: 'registerTest@test.com',
    password: 'test11',
  },
};

describe('SignIn Handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should sign in a user', async () => {
    database.queryUserByEmail.mockImplementation(() => ({
      email: 'test@test.com',
    }));

    crypto.checkPassword.mockImplementation(() => true);

    jwt.generateToken.mockImplementation(() => 'MOCK_AUTHORIZATION_TOKEN');
    jwt.generateRefreshToken.mockImplementation(() => 'MOCK_REFRESH_TOKEN');

    const res = await signIn(req);

    expect(res).toEqual(
      expect.objectContaining({
        authorization: expect.any(String),
        refresh: expect.any(String),
      }),
    );
  });

  test('Should throw invalid credentials error', async () => {
    const noUserRecord = {};
    database.queryUserByEmail.mockImplementation(() => noUserRecord);

    crypto.checkPassword.mockImplementation(() => false);

    try {
      await signIn(req);
    } catch (err) {
      expect(err.statusCode).toBe(401);
      expect(err.message).toBe('email or password incorrect');
    }
  });
});
