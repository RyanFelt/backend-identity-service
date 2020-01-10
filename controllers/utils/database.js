const { docClient } = require('./dynamoSetup');

exports.queryUserByEmail = async email => {
  try {
    const params = {
      TableName: process.env.IS_USER_TABLE,
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
    return false;
  }
};

exports.getUser = async userId => {
  try {
    const params = {
      TableName: process.env.IS_USER_TABLE,
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
    return false;
  }
};

exports.putUser = async Item => {
  const params = {
    TableName: process.env.IS_USER_TABLE,
    Item,
  };
  return docClient.put(params).promise();
};

exports.userEmailVerified = async userId => {
  const params = {
    TableName: process.env.IS_USER_TABLE,
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

exports.updatePassword = async (userId, encryptPasword) => {
  const params = {
    TableName: process.env.IS_USER_TABLE,
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

exports.updateEmail = async (userId, email) => {
  const params = {
    TableName: process.env.IS_USER_TABLE,
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

exports.putRefresh = async Item => {
  const params = {
    TableName: process.env.IS_REFRESH_TABLE,
    Item,
  };
  return docClient.put(params).promise();
};

exports.getRefresh = async refreshToken => {
  try {
    const params = {
      TableName: process.env.IS_REFRESH_TABLE,
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
    return false;
  }
};

exports.deleteRefreshRecord = async refreshToken => {
  const params = {
    TableName: process.env.IS_REFRESH_TABLE,
    Key: {
      refreshToken,
    },
  };
  return docClient.delete(params).promise();
};
