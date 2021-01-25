/* eslint-disable no-undef */
const changePassword = require('./');
const database = require('../utils/database');
const crypto = require('../utils/crypto');

jest.mock('../utils/database');
jest.mock('../utils/crypto');

const req = {
  user: {
    userId: 'test_user_ID',
  },
  body: {
    password: 'test_password',
    newPassword: 'new_test_password',
  },
};

describe('Registration Controller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Should change user's password", async () => {
    database.getUser.mockImplementation(() => ({ password: 'test_password' }));
    database.updatePassword.mockImplementation(() => {});

    crypto.checkPassword.mockImplementation(() => true);
    crypto.encrypt.mockImplementation(() => 'encrypted_password');

    const res = await changePassword(req);
    expect(res.message).toBe('done');
  });

  test('Should throw password incorrect error', async () => {
    try {
      database.getUser.mockImplementation(() => ({ password: 'test_password' }));

      crypto.checkPassword.mockImplementation(() => false);

      await changePassword(req);
    } catch (err) {
      expect(err.statusCode).toBe(401);
      expect(err.message).toBe('password incorrect');
    }
  });
});
