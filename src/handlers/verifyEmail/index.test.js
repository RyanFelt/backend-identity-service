/* eslint-disable no-undef */
const verifyEmail = require('./');
const database = require('../utils/database');
const crypto = require('../utils/crypto');

jest.mock('../utils/database');
jest.mock('../utils/crypto');

const req = {
  query: {
    emailHash: 'TEST_EMAIL_HASH',
  },
};

describe('VerifyEmail Handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should verify email and update user record', async () => {
    crypto.decrypt.mockImplementation(() => 'DECRYPTED_EMAIL@TEST.COM');

    database.queryUserByEmail.mockImplementation(() => ({ userId: 'TEST_USER_ID' }));
    database.userEmailVerified.mockImplementation(() => {});

    const res = await verifyEmail(req);
    expect(res.message).toBe('done');
  });

  test('Should throw error for invalid email hash', async () => {
    try {
      crypto.decrypt.mockImplementation(() => {});

      await verifyEmail(req);
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('invalid email hash');
    }
  });

  test('Should throw error for invalid user email hash', async () => {
    try {
      crypto.decrypt.mockImplementation(() => 'DECRYPTED_EMAIL@TEST.COM');

      database.queryUserByEmail.mockImplementation(() => ({}));

      await verifyEmail(req);
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('invalid user email hash');
    }
  });
});
