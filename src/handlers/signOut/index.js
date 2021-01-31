const { deleteRefreshRecord } = require('../utils/database');

module.exports = async req => {
  const refreshToken = req.headers.authorization;

  await deleteRefreshRecord(refreshToken);
  return { message: 'done' };
};
