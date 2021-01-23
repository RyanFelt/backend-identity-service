/* eslint-disable no-undef */
const changeEmailInit = require('./');
const crypto = require('../../utils/crypto');
const sendGrid = require('../../utils/sendGrid');

jest.mock('../../utils/crypto');
jest.mock('../../utils/sendGrid');

const req = {
  user: {
    userId: 'TEST_USER_ID',
    email: 'TEST_USER_EMAIL',
  },
};

describe('Change Email Init Controller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should send new email email to user', async () => {
    crypto.encrypt.mockImplementation(() => 'NEW_EMAIL_HASH');

    sendGrid.sendChangeEmail.mockImplementation(() => {});

    const res = await changeEmailInit(req);
    expect(res.message).toBe('done');
  });

  test('Should throw email not sent error', async () => {
    try {
      crypto.encrypt.mockImplementation(() => 'NEW_EMAIL_HASH');
      sendGrid.sendChangeEmail.mockImplementation(() => 'ERROR');

      await changeEmailInit(req);
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('email not sent');
    }
  });
});
