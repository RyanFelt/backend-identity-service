const { getRefresh, getUser } = require('../utils/database');
const { authenticateRefresh, generateToken } = require('../utils/jwt');
const { InvalidCredentialsError, ResourceExistsError } = require('../utils/errors');

module.exports = async req => {
  const refreshToken = req.headers.authorization;
  const decryptToken = await authenticateRefresh(refreshToken);
  if (!decryptToken.userId) {
    throw new InvalidCredentialsError('unauthorized');
  }

  // TODO :: refresh table should have ttl so old refreshTokens get deleted
  const refreshRecord = await getRefresh(refreshToken);
  if (!refreshRecord.userId) {
    throw new ResourceExistsError('invalid refresh token');
  }

  const user = await getUser(refreshRecord.userId);
  const authorization = generateToken(user);

  return {
    authorization,
    refresh: refreshToken,
  };
};
