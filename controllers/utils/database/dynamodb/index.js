const { docClient } = require('./config');
const constants = require('../../../../constants');

const { IS_USER_TABLE, IS_REFRESH_TABLE } = constants;

exports.queryUserByEmail_dynamodb = async email => {
  const params = {
    TableName: IS_USER_TABLE,
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
    ReturnConsumedCapacity: 'TOTAL',
  };
  const users = await docClient.query(params).promise();
  return users.Items[0] ? users.Items[0] : {};
};

exports.getUser_dynamodb = async userId => {
  const params = {
    TableName: IS_USER_TABLE,
    Key: {
      userId,
    },
    ReturnConsumedCapacity: 'TOTAL',
  };
  const user = await docClient.get(params).promise();
  return user.Item ? user.Item : {};
};

exports.putUser_dynamodb = async Item => {
  const params = {
    TableName: IS_USER_TABLE,
    Item,
  };
  return docClient.put(params).promise();
};

exports.userEmailVerified_dynamodb = async userId => {
  const params = {
    TableName: IS_USER_TABLE,
    Key: {
      userId,
    },
    UpdateExpression: 'set #emailVerified = :emailVerified',
    ExpressionAttributeNames: {
      '#emailVerified': 'emailVerified',
    },
    ExpressionAttributeValues: {
      ':emailVerified': true,
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'UPDATED_NEW',
  };
  return docClient.update(params).promise();
};

exports.updatePassword_dynamodb = async (userId, encryptPasword) => {
  const params = {
    TableName: IS_USER_TABLE,
    Key: {
      userId,
    },
    UpdateExpression: 'set #password = :password, #updateDate = :updateDate',
    ExpressionAttributeNames: {
      '#password': 'password',
      '#updateDate': 'updateDate',
    },
    ExpressionAttributeValues: {
      ':password': encryptPasword,
      ':updateDate': new Date().toISOString(),
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'UPDATED_NEW',
  };
  return docClient.update(params).promise();
};

exports.updateEmail_dynamodb = async (userId, email) => {
  const params = {
    TableName: IS_USER_TABLE,
    Key: {
      userId,
    },
    UpdateExpression:
      'set #email = :email, #emailVerified = :emailVerified, #updateDate = :updateDate',
    ExpressionAttributeNames: {
      '#email': 'email',
      '#emailVerified': 'emailVerified',
      '#updateDate': 'updateDate',
    },
    ExpressionAttributeValues: {
      ':email': email,
      ':emailVerified': false,
      ':updateDate': new Date().toISOString(),
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'UPDATED_NEW',
  };
  return docClient.update(params).promise();
};

exports.putRefresh_dynamodb = async Item => {
  const params = {
    TableName: IS_REFRESH_TABLE,
    Item,
  };
  return docClient.put(params).promise();
};

exports.getRefresh_dynamodb = async refreshToken => {
  const params = {
    TableName: IS_REFRESH_TABLE,
    Key: {
      refreshToken,
    },
    ReturnConsumedCapacity: 'TOTAL',
  };
  const token = await docClient.get(params).promise();
  return token.Item ? token.Item : {};
};

exports.deleteRefreshRecord_dynamodb = async refreshToken => {
  const params = {
    TableName: IS_REFRESH_TABLE,
    Key: {
      refreshToken,
    },
  };
  return docClient.delete(params).promise();
};
