const { encrypt } = require('../../utils/crypto');
const { sendChangeEmail } = require('../../utils/sendGrid');
const { ValidationError } = require('../../utils/errors');

module.exports = async req => {
  const newEmailHash = encrypt(req.user.userId);

  const emailError = await sendChangeEmail(req.user.email, newEmailHash);
  if (emailError) {
    throw new ValidationError('email not sent');
  }

  return { message: 'done' };
};
