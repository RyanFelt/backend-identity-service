const uuidv4 = require('uuid/v4');
const { encrypt } = require('../utils/crypto');
const { queryUserByEmail, putUser } = require('../utils/database');
const { ResourceExistsError } = require('../utils/errors');
const { sendEmailVerification } = require('../utils/sendGrid');

module.exports = async req => {
  const { password, emailBool } = req.body;

  const email = req.body.email.trim().toLowerCase();

  const user = await queryUserByEmail(email);
  if (user && user.email) {
    throw new ResourceExistsError('email already in use');
  }

  const encryptPass = encrypt(password, true);
  const userId = uuidv4();
  const currentDate = new Date().toISOString();

  const putParams = {
    userId,
    email,
    password: encryptPass,
    emailVerified: false,
    provider: 'thisUserService',
    role: '1',
    addedDate: currentDate,
    updatedDate: currentDate,
  };
  await putUser(putParams);

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
