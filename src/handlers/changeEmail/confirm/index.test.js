/* eslint-disable no-undef */
const changeEmailConfirm = require('./');
const crypto = require('../../utils/crypto');
const database = require('../../utils/database');
const sendGrid = require('../../utils/sendGrid');

jest.mock('../../utils/crypto');
jest.mock('../../utils/database');
jest.mock('../../utils/sendGrid');

const req = {
  body: {
    changeEmailHash: 'TEST_CHANGE_EMAIL_HASH',
    email: 'TEST_USER_EMAIL@TEST.COM',
    emailBool: true,
  },
};

describe('Change Email Confirm Handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should update new user email', async () => {
    crypto.decrypt.mockImplementation(() => ({ userId: 'TEST_USER_ID' }));
    crypto.encrypt.mockImplementation(() => 'TEST_ENCRYPTED_DATA');

    database.queryUserByEmail.mockImplementation(() => ({}));
    database.updateEmail.mockImplementation(() => {});

    sendGrid.sendEmailVerification.mockImplementation(() => 'ERROR');

    const res = await changeEmailConfirm(req);
    expect(res.message).toBe('done');
  });

  test('Should throw invalid email hash error', async () => {
    try {
      crypto.decrypt.mockImplementation(() => {});

      await changeEmailConfirm(req);
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('invalid email hash');
    }
  });

  test('Should throw email already in use error', async () => {
    try {
      crypto.decrypt.mockImplementation(() => ({ userId: 'TEST_USER_ID' }));

      database.queryUserByEmail.mockImplementation(() => ({
        userId: 'TEST_USER_ID',
      }));

      await changeEmailConfirm(req);
    } catch (err) {
      expect(err.statusCode).toBe(409);
      expect(err.message).toBe('email already in use');
    }
  });
});
