const { checkPassword } = require('../utils/crypto');
const { queryUserByEmail, putRefresh } = require('../utils/database');
const { InvalidCredentialsError } = require('../utils/errors');
const { generateToken, generateRefreshToken } = require('../utils/jwt');

module.exports = async req => {
  const email = req.body.email.trim().toLowerCase();
  const user = await queryUserByEmail(email);
  const passwordBool = checkPassword(req.body.password, user.password);

  if (!user || !passwordBool) {
    throw new InvalidCredentialsError('email or password incorrect');
  }

  const authorizationToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  const refreshParams = {
    refreshToken,
    userId: user.userId,
    userAgent: req.headers['user-agent'],
    addedDate: new Date().toISOString(),
    // TODO: maybe add tll so old refreshtoken records do not pile up
    // ttl: REFRESH_TOKENTIME
  };
  putRefresh(refreshParams);

  return {
    authorization: authorizationToken,
    refresh: refreshToken,
  };
};
