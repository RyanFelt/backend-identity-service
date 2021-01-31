/* eslint-disable no-undef */
const passwordResetConfirm = require('./');
const database = require('../../utils/database');
const crypto = require('../../utils/crypto');

jest.mock('../../utils/database');
jest.mock('../../utils/crypto');

const req = {
  body: {
    passwordResetHash: 'TEST_PASSWORD_RESET_HASH',
  },
};

describe('Password Reset Confirm Handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should update new user password', async () => {
    crypto.encrypt.mockImplementation(() => 'TEST_ENCRYPTED_USER_PASSWORD');
    crypto.decrypt.mockImplementation(() => 'TEST_USER_EMAIL@TEST.COM');

    database.queryUserByEmail.mockImplementation(() => ({ userId: 'TEST_USER_ID' }));
    database.updatePassword.mockImplementation(() => ({}));

    const res = await passwordResetConfirm(req);
    expect(res.message).toBe('done');
  });

  test('Should throw invalid user error', async () => {
    try {
      crypto.encrypt.mockImplementation(() => 'TEST_ENCRYPTED_USER_PASSWORD');
      crypto.decrypt.mockImplementation(() => 'TEST_USER_EMAIL@TEST.COM');

      database.queryUserByEmail.mockImplementation(() => ({}));

      await passwordResetConfirm(req);
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('invalid user');
    }
  });
});
