/* eslint-disable no-undef */
const passwordResetInit = require('./');
const database = require('../../utils/database');
const crypto = require('../../utils/crypto');
const sendGrid = require('../../utils/sendGrid');

jest.mock('../../utils/database');
jest.mock('../../utils/crypto');
jest.mock('../../utils/sendGrid');

const req = {
  body: {
    email: 'registerTest@test.com',
  },
};

describe('Password Reset Init Handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should send a password reset email', async () => {
    database.queryUserByEmail.mockImplementation(() => ({ userId: 'TEST_USER_ID' }));

    crypto.encrypt.mockImplementation(() => 'TEST_PASSWORD_RESET_HASH');

    sendGrid.sendPasswordReset.mockImplementation(() => {});

    const res = await passwordResetInit(req);
    expect(res.message).toBe('done');
  });

  test('Should throw invalid user email error', async () => {
    try {
      database.queryUserByEmail.mockImplementation(() => ({}));

      await passwordResetInit(req);
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('invalid user email');
    }
  });

  test('Should throw email not sent error', async () => {
    try {
      database.queryUserByEmail.mockImplementation(() => ({
        userId: 'TEST_USER_ID',
      }));

      crypto.encrypt.mockImplementation(() => 'TEST_PASSWORD_RESET_HASH');

      sendGrid.sendPasswordReset.mockImplementation(() => 'ERROR');

      await passwordResetInit(req);
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('email not sent');
    }
  });
});
