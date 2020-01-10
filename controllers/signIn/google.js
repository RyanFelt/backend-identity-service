// const rp = require('request-promise');
// const uuidv4 = require('uuid/v4');
// const { sendEmailVerification } = require('../utils/sendGrid');

// const decodeGoogleToken = async token => {
//   const url = `${process.env.IS_GOOGLE_DECRYPT_API}/oauth2/v3/tokeninfo?idToken=${token}`;
//   const requestParams = {
//     uri: url,
//     json: true,
//   };
//   return rp(requestParams);
// };
// const provider = async req => {
//   const googleResponse = await decodeGoogleToken(req.headers.authorization);
//   const email = googleResponse.email.trim().toLowerCase();
//   const user = await queryUserByEmail(email);
//   if (user && user.provider === 'google') return user;
//   if (!user) {
//     const currentDate = new Date().toISOString();
//     const putParams = {
//       userId: uuidv4(),
//       email,
//       emailVerified: false,
//       provider: 'google',
//       role: 'PEASANT',
//       addedDate: currentDate,
//       updatedDate: currentDate,
//     };
//     putUser(putParams);
//     const emailHash = hashEncrypt(email);
//     const mailerResult = await sendEmailVerification(email, emailHash);
//     if (!mailerResult) console.log('ERROR:: Email Not Sent.');
//     return putParams;
//   }
//   throw new InvalidCredentialsError(`email already in use with ${user.provider}`);
// };
