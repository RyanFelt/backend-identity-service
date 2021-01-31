const { encrypt } = require('../../utils/crypto');
const { sendPasswordReset } = require('../../utils/sendGrid');
const { queryUserByEmail } = require('../../utils/database');
const { ValidationError } = require('../../utils/errors');

module.exports = async req => {
  const { email } = req.body;

  const user = await queryUserByEmail(email);
  if (!user.userId) {
    throw new ValidationError('invalid user email');
  }

  const passwordResetHash = encrypt(email);

  const emailError = await sendPasswordReset(email, passwordResetHash);
  if (emailError) {
    throw new ValidationError('email not sent');
  }

  return { message: 'done' };
};
