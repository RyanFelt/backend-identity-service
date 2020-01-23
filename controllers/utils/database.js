const { docClient } = require('./dynamoSetup');
const { ServiceUnavailableError } = require('./errors');

const { IS_USER_TABLE, IS_REFRESH_TABLE } = process.env;

exports.queryUserByEmail = async email => {
  try {
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
    if (users.Items[0]) {
      return users.Items[0];
    }
    return false;
  } catch (e) {
    console.log(`ERROR :: queryUserByEmail: email=${email} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.getUser = async userId => {
  try {
    const params = {
      TableName: IS_USER_TABLE,
      Key: {
        userId,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };
    const user = await docClient.get(params).promise();
    if (user.Item) {
      return user.Item;
    }
    return false;
  } catch (e) {
    console.log(`ERROR :: getUser: userId=${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.putUser = async Item => {
  try {
    const params = {
      TableName: IS_USER_TABLE,
      Item,
    };
    return docClient.put(params).promise();
  } catch (e) {
    console.log(`ERROR :: putUser: Item=${Item} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.userEmailVerified = async userId => {
  try {
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
  } catch (e) {
    console.log(`ERROR :: userEmailVerified: userId=${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.updatePassword = async (userId, encryptPasword) => {
  try {
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
  } catch (e) {
    console.log(`ERROR :: updatePassword: userId=${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.updateEmail = async (userId, email) => {
  try {
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
  } catch (e) {
    console.log(`ERROR :: updateEmail: userId=${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.putRefresh = async Item => {
  try {
    const params = {
      TableName: IS_REFRESH_TABLE,
      Item,
    };
    return docClient.put(params).promise();
  } catch (e) {
    console.log(`ERROR :: putRefresh: Item=${Item} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.getRefresh = async refreshToken => {
  try {
    const params = {
      TableName: IS_REFRESH_TABLE,
      Key: {
        refreshToken,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };
    const token = await docClient.get(params).promise();
    if (token.Item) {
      return token.Item;
    }
    return false;
  } catch (e) {
    console.log(`ERROR :: getRefresh: refreshToken=${refreshToken} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.deleteRefreshRecord = async refreshToken => {
  try {
    const params = {
      TableName: IS_REFRESH_TABLE,
      Key: {
        refreshToken,
      },
    };
    return docClient.delete(params).promise();
  } catch (e) {
    console.log(
      `ERROR :: deleteRefreshRecord: refreshToken=${refreshToken} :: ${e}`,
    );
    throw new ServiceUnavailableError('db unavailable');
  }
};
