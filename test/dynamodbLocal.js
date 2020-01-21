/* eslint-disable global-require */
const { dynamodb, docClient } = require('../controllers/utils/dynamoSetup');

const { IS_USER_TABLE, IS_REFRESH_TABLE } = process.env;

exports.checkTables = async () => dynamodb.listTables({}).promise();

exports.deleteTables = async tables => {
  for (let x = 0; x < tables.TableNames.length; x += 1) {
    // eslint-disable-next-line no-await-in-loop
    await dynamodb.deleteTable({ TableName: tables.TableNames[x] }).promise();
  }
};

exports.createTables = async () => {
  const paramsUserTable = {
    AttributeDefinitions: [
      {
        AttributeName: 'userId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'email',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'userId',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'email-index',
        KeySchema: [
          {
            AttributeName: 'email',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      },
    ],
    TableName: IS_USER_TABLE,
  };

  const paramsRefreshTable = {
    AttributeDefinitions: [
      {
        AttributeName: 'refreshToken',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'refreshToken',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
    TableName: IS_REFRESH_TABLE,
  };

  try {
    await dynamodb.createTable(paramsUserTable).promise();
    await dynamodb.createTable(paramsRefreshTable).promise();
    const tables = await dynamodb.listTables({}).promise();
    console.log('TABLES CREATED:', tables);
  } catch (e) {
    console.log(e);
  }
};

exports.createRecords = async () => {
  const { registerNewUserExistingEmail } = require('./registration/fixtures');
  const {
    signInUser,
    signInExistingUserGoogle,
    signInExistingFBUserWithGoogle,
  } = require('./signIn/fixtures');
  const { verifyEmail } = require('./verifyEmail/fixtures');
  const { changePassword } = require('./changePassword/fixtures');
  const { resetPasswordInit, resetPasswordConfirm } = require('./passwordReset/fixtures');
  const { changeEmailRecord, changeEmailInUseRecord } = require('./changeEmail/fixtures');
  const { refreshRecord } = require('./refresh/fixtures');
  const { signOutFixture } = require('./signOut/fixtures');

  const registerNewUserExistingEmailParams = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: registerNewUserExistingEmail.userId,
      email: registerNewUserExistingEmail.body.email,
      password: registerNewUserExistingEmail.body.password,
    },
  };

  const signInUserRecord = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: signInUser.userId,
      email: signInUser.body.email,
      password: signInUser.encrytPassword,
      salt: signInUser.salt,
    },
  };

  const signInUserGoogleRecord = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: signInExistingUserGoogle.userId,
      email: signInExistingUserGoogle.googleResponseExistingUser.email,
      provider: 'google',
    },
  };

  const signInUserFBUSerWithGoogleRecord = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: signInExistingFBUserWithGoogle.userId,
      email: signInExistingFBUserWithGoogle.googleResponseExistingUser.email,
      provider: 'facebook',
    },
  };

  const verifyEmailParams = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: verifyEmail.userId,
      email: verifyEmail.email,
      emailVerified: false,
    },
  };

  const changePasswordParams = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: changePassword.user.userId,
      password: changePassword.encryptPass,
      salt: changePassword.salt,
    },
  };

  const resetPasswordInitParams = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: resetPasswordInit.userId,
      email: resetPasswordInit.body.email,
    },
  };

  const resetPasswordConfirmParams = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: resetPasswordConfirm.userId,
      email: resetPasswordConfirm.email,
      password: resetPasswordConfirm.oldPassword,
    },
  };

  const changeEmailParams = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: changeEmailRecord.userId,
      email: changeEmailRecord.email,
    },
  };

  const changeEmailInUseParams = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: changeEmailInUseRecord.userId,
      email: changeEmailInUseRecord.email,
    },
  };

  const refreshParams = {
    TableName: IS_REFRESH_TABLE,
    Item: {
      refreshToken: refreshRecord.refreshToken,
      userId: refreshRecord.userId,
      userAgent: refreshRecord.userAgent,
      addedDate: new Date().toISOString(),
    },
  };

  const refreshUserParams = {
    TableName: IS_USER_TABLE,
    Item: {
      userId: refreshRecord.userId,
      email: refreshRecord.email,
      role: refreshRecord.role,
    },
  };

  const refreshSignOutParams = {
    TableName: IS_REFRESH_TABLE,
    Item: {
      userId: signOutFixture.userId,
      refreshToken: signOutFixture.headers.authorization,
    },
  };

  const fixtureArray = [
    registerNewUserExistingEmailParams,
    signInUserRecord,
    signInUserGoogleRecord,
    signInUserFBUSerWithGoogleRecord,
    verifyEmailParams,
    changePasswordParams,
    resetPasswordInitParams,
    resetPasswordConfirmParams,
    changeEmailParams,
    changeEmailInUseParams,
    refreshParams,
    refreshUserParams,
    refreshSignOutParams,
  ];
  await Promise.all(fixtureArray.map(param => docClient.put(param).promise()));
  console.log('TEST RECORDS CREATED');

  // let t = await docClient
  //   .scan({
  //     TableName: USER_TABLE
  //   })
  //   .promise();
  // console.log('HUR', t);
};

exports.userInDynamo = async userId => {
  const params = {
    TableName: IS_USER_TABLE,
    Key: { userId },
  };
  const result = await docClient.get(params).promise();
  if (result.Item && result.Item.userId) return true;
  return false;
};

exports.getUser = async userId => {
  const params = {
    TableName: IS_USER_TABLE,
    Key: { userId },
  };
  const result = await docClient.get(params).promise();
  if (result.Item && result.Item.userId) return result.Item;
  return false;
};

exports.getRefreshToken = async refreshToken => {
  const params = {
    TableName: IS_REFRESH_TABLE,
    Key: { refreshToken },
  };
  const result = await docClient.get(params).promise();
  if (result.Item && result.Item.refreshToken) return result.Item;
  return false;
};
