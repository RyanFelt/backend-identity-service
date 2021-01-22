/* eslint-disable no-undef */
const registration = require('./');
const database = require('../utils/database');
const sendGrid = require('../utils/sendGrid');

jest.mock('../utils/database');
jest.mock('../utils/sendGrid');

const req = {
  body: {
    email: 'registerTest@test.com',
    password: 'test11',
    emailBool: true,
  },
};

describe('Registration Controller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should register a new user', async () => {
    database.queryUserByEmail.mockImplementation(() => {});

    sendGrid.sendEmailVerification.mockImplementation(() => {});

    const res = await registration(req);
    expect(res.message).toBe('done');
  });

  test('Should throw email already exists error', async () => {
    try {
      database.queryUserByEmail.mockImplementation(() => ({
        email: 'test@test.com',
      }));

      await registration(req);
    } catch (err) {
      expect(err.statusCode).toBe(409);
      expect(err.message).toBe('email already in use');
    }
  });
});
