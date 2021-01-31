const { checkPassword, encrypt } = require('../utils/crypto');
const { getUser, updatePassword } = require('../utils/database');
const { InvalidCredentialsError } = require('../utils/errors');

module.exports = async req => {
  const { userId } = req.user;
  const { password, newPassword } = req.body;

  const user = await getUser(userId);

  if (!checkPassword(password, user.password)) {
    throw new InvalidCredentialsError('password incorrect');
  }

  const encryptedPassword = encrypt(newPassword, true);
  await updatePassword(userId, encryptedPassword);
  return { message: 'done' };
};
