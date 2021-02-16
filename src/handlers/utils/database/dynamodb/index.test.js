/* eslint-disable no-undef */
const db_funcs = require('./');
const dynamodbConfig = require('./config');

// jest.mock('./config');

describe('DynamoDB Functions', () => {
  describe('queryUserByEmail_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should query user by email and return valid user', async () => {
      const returnUser = {
        userId: 'TEST_USER_ID',
        email: 'test@testEmail.com',
      };

      dynamodbConfig.docClient.query = () => {
        return {
          promise: jest.fn().mockResolvedValue({
            Items: [returnUser],
          }),
        };
      };

      const res = await db_funcs.queryUserByEmail_dynamodb('test@testEmail.com');

      expect(res).toEqual(returnUser);
    });

    test('Should query user by email and return empty object for no user found', async () => {
      dynamodbConfig.docClient.query = () => {
        return {
          promise: jest.fn().mockResolvedValue({
            Items: [],
          }),
        };
      };

      const res = await db_funcs.queryUserByEmail_dynamodb('test@testEmail.com');

      expect(res).toEqual({});
    });
  });

  describe('getUser_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should get user record', async () => {
      const returnUser = {
        userId: 'TEST_USER_ID',
        email: 'test@testEmail.com',
      };

      dynamodbConfig.docClient.get = () => {
        return {
          promise: jest.fn().mockResolvedValue({
            Item: returnUser,
          }),
        };
      };

      const res = await db_funcs.getUser_dynamodb('test@testEmail.com');

      expect(res).toEqual(returnUser);
    });

    test('Should get user record and return empty object for no user found', async () => {
      dynamodbConfig.docClient.get = () => {
        return {
          promise: jest.fn().mockResolvedValue({
            Item: {},
          }),
        };
      };

      const res = await db_funcs.getUser_dynamodb('test@testEmail.com');

      expect(res).toEqual({});
    });
  });

  describe('putUser_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should put user record', async () => {
      dynamodbConfig.docClient.put = () => {
        return {
          promise: jest.fn().mockResolvedValue({}),
        };
      };

      await db_funcs.putUser_dynamodb({ test: 'TEST_USER_RECORD' });
    });
  });

  describe('userEmailVerified_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should set emailVerified user record field to true', async () => {
      dynamodbConfig.docClient.update = () => {
        return {
          promise: jest.fn().mockResolvedValue({}),
        };
      };

      await db_funcs.userEmailVerified_dynamodb('TEST_USER_ID');
    });
  });

  describe('updatePassword_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should update password user record field', async () => {
      dynamodbConfig.docClient.update = () => {
        return {
          promise: jest.fn().mockResolvedValue({}),
        };
      };

      await db_funcs.updatePassword_dynamodb('TEST_USER_ID');
    });
  });

  describe('updateEmail_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should update email user record field', async () => {
      dynamodbConfig.docClient.update = () => {
        return {
          promise: jest.fn().mockResolvedValue({}),
        };
      };

      await db_funcs.updateEmail_dynamodb('TEST_USER_ID');
    });
  });

  describe('putRefresh_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should put refresh record', async () => {
      dynamodbConfig.docClient.put = () => {
        return {
          promise: jest.fn().mockResolvedValue({}),
        };
      };

      await db_funcs.putRefresh_dynamodb({ test: 'TEST_REFRESH_RECORD' });
    });
  });

  describe('getRefresh_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should get refresh record', async () => {
      const returnUser = {
        userId: 'TEST_USER_ID',
        email: 'test@testEmail.com',
      };

      dynamodbConfig.docClient.get = () => {
        return {
          promise: jest.fn().mockResolvedValue({
            Item: returnUser,
          }),
        };
      };

      const res = await db_funcs.getRefresh_dynamodb('TEST_REFRESH_TOKEN');

      expect(res).toEqual(returnUser);
    });

    test('Should get refresh record and return empty object for no record found', async () => {
      dynamodbConfig.docClient.get = () => {
        return {
          promise: jest.fn().mockResolvedValue({
            Item: {},
          }),
        };
      };

      const res = await db_funcs.getRefresh_dynamodb('TEST_REFRESH_TOKEN');

      expect(res).toEqual({});
    });
  });

  describe('deleteRefreshRecord_dynamodb', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should delete refresh record', async () => {
      dynamodbConfig.docClient.delete = () => {
        return {
          promise: jest.fn().mockResolvedValue({}),
        };
      };

      await db_funcs.deleteRefreshRecord_dynamodb('TEST_REFRESH_TOKEN');
    });
  });
});
