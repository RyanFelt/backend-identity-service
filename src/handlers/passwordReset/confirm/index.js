const { decrypt, encrypt } = require('../../utils/crypto');
const { queryUserByEmail, updatePassword } = require('../../utils/database');
const { ValidationError } = require('../../utils/errors');

module.exports = async req => {
  const email = decrypt(req.body.passwordResetHash);

  const encryptedPassword = encrypt(req.body.password, true);

  const user = await queryUserByEmail(email);
  if (!user.userId) {
    throw new ValidationError('invalid user');
  }

  await updatePassword(user.userId, encryptedPassword);

  return { message: 'done' };
};
