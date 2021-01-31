const { encrypt, decrypt } = require('../../utils/crypto');
const { sendEmailVerification } = require('../../utils/sendGrid');
const { queryUserByEmail, updateEmail } = require('../../utils/database');
const { ValidationError, ResourceExistsError } = require('../../utils/errors');

module.exports = async req => {
  const { emailBool } = req.body;

  const email = req.body.email.trim().toLowerCase();
  const userId = decrypt(req.body.changeEmailHash);
  if (!userId) {
    throw new ValidationError('invalid email hash');
  }

  const user = await queryUserByEmail(email);
  if (user.userId) {
    throw new ResourceExistsError('email already in use');
  }

  await updateEmail(userId, email);

  if (emailBool) {
    const emailHash = encrypt(email);
    const emailError = await sendEmailVerification(email, emailHash);
    if (emailError) {
      console.log('ERROR:: Email Not Sent.');
      // TODO: do something here to retry
    }
  }

  return { message: 'done' };
};
