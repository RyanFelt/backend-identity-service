const { decrypt } = require('../utils/crypto');
const { queryUserByEmail, userEmailVerified } = require('../utils/database');
const { ValidationError } = require('../utils/errors');

module.exports = async req => {
  const { emailHash } = req.query;

  const email = decrypt(emailHash);
  if (!email) {
    throw new ValidationError('invalid email hash');
  }

  const user = await queryUserByEmail(email);
  if (!user.userId) {
    throw new ValidationError('invalid user email hash');
  }

  await userEmailVerified(user.userId);
  return { message: 'done' };
};
