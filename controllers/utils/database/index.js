const { ServiceUnavailableError } = require('../errors');
const {
  queryUserByEmail_dynamodb,
  getUser_dynamodb,
  putUser_dynamodb,
  userEmailVerified_dynamodb,
  updatePassword_dynamodb,
  updateEmail_dynamodb,
  putRefresh_dynamodb,
  getRefresh_dynamodb,
  deleteRefreshRecord_dynamodb,
} = require('./dynamodb');
const constants = require('../../../constants');

const { IS_DATABASE_TYPE } = constants;

exports.queryUserByEmail = async email => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return queryUserByEmail_dynamodb(email);
    }
  } catch (e) {
    console.log(`ERROR :: queryUserByEmail: email=${email} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.getUser = async userId => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return getUser_dynamodb(userId);
    }
  } catch (e) {
    console.log(`ERROR :: getUser: userId=${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.putUser = async Item => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return putUser_dynamodb(Item);
    }
  } catch (e) {
    console.log(`ERROR :: putUser: Item=${Item} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.userEmailVerified = async userId => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return userEmailVerified_dynamodb(userId);
    }
  } catch (e) {
    console.log(`ERROR :: userEmailVerified: userId=${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.updatePassword = async (userId, encryptPasword) => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return updatePassword_dynamodb(userId, encryptPasword);
    }
  } catch (e) {
    console.log(`ERROR :: updatePassword: userId=${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.updateEmail = async (userId, email) => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return updateEmail_dynamodb(userId, email);
    }
  } catch (e) {
    console.log(`ERROR :: updateEmail: userId=${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.putRefresh = async Item => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return putRefresh_dynamodb(Item);
    }
  } catch {
  v  console.log(`ERROR :: putRefresh: Item=${Item} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.getRefresh = async refreshToken => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return getRefresh_dynamodb(refreshToken);
    }
  } catch (e) {
    console.log(`ERROR :: getRefresh: refreshToken=${refreshToken} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.deleteRefreshRecord = async refreshToken => {
  try {
    switch (IS_DATABASE_TYPE) {
      case 'dynamodb':
        return deleteRefreshRecord_dynamodb(refreshToken);
    }
  } catch (e) {
    console.log(
      `ERROR :: deleteRefreshRecord: refreshToken=${refreshToken} :: ${e}`,
    );
    throw new ServiceUnavailableError('db unavailable');
  }
};
