/* eslint-disable no-undef */
const signOut = require('./');
const database = require('../utils/database');

jest.mock('../utils/database');

const req = {
  headers: {
    authorization: 'TEST_REFRESH_TOKEN',
  },
};

describe('SignOut Controller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should register a new user', async () => {
    database.deleteRefreshRecord.mockImplementation(() => {});

    const res = await signOut(req);
    expect(res.message).toBe('done');
  });
});
