const express = require('express');
const constants = require('./constants');
const {
  changeEmailInit,
  changeEmailConfirm,
  changePassword,
  passwordResetInit,
  passwordResetConfirm,
  refresh,
  registration,
  signIn,
  signOut,
  verifyEmail,
} = require('./');

const { IS_PORT } = constants;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));

/**
 * /healthCheck
 * For testing purposes
 */
app.get('/healthCheck', (req, res) => res.status(200).send('HEALTHY'));

/**
 * /changeEmailInit
 * Headers: content-type: application/json, authorization: <authorization>
 * Sends change email email.
 */
app.get('/changeEmailInit', changeEmailInit);

/**
 * /changeEmailConfirm
 * Headers: content-type: application/json
 * Body: changeEmailHash, email(new email), emailBool
 * Changes email in db. changeEmailHash comes from changeEmailInit endpoint.
 */
app.post('/changeEmailConfirm', changeEmailConfirm);

/**
 * /changePassword
 * Headers: content-type: application/json, authorization: <authorization>
 * Body: password(current), newPassword
 * Will save new password to DB
 */
app.post('/changePassword', changePassword);

/**
 * /passwordResetInit
 * Headers: content-type: application/json
 * Body: email
 * Sends reset password email to passed in email address.
 */
app.post('/passwordResetInit', passwordResetInit);

/**
 * /passwordResetConfirm
 * Headers: content-type: application/json
 * Body: passwordResetHash, password(new password)
 * Sets new password in database. passwordResetHash comes from passwordResetInit endpoint.
 */
app.post('/passwordResetConfirm', passwordResetConfirm);

/**
 * /refresh
 * Headers: content-type: application/json, authorization: <refresh>
 * Sends a new authorization token
 */
app.get('/refresh', refresh);

/**
 * /registration
 * Headers: content-type: application/json
 * Body: email, password, emailBool
 * Adds user to DB. Will only send verificaion email if emailBool is true.
 */
app.post('/registration', registration);

/**
 * /signIn
 * Headers: content-type: application/json
 * Body: email, password
 * This user service sign in
 * Returns authorization token and refresh token
 */
app.post('/signIn', signIn);

/**
 * /signOut
 * Headers: content-type: application/json, authorization: <refresh>
 * Deletes refresh token from database.
 */
app.get('/signOut', signOut);

/**
 * /verifyEmail/<emailHash>
 * query: emailHash (This comes from the verification email)
 * Changes record in DB to emailVerified: true
 */
app.get('/verifyEmail', verifyEmail);

app.listen(IS_PORT, () => {
  console.log(`
'####'########:'########'##::: ##'########'####'########'##:::'##:
. ##::##.... ##:##.....::###:: ##... ##..:. ##:... ##..:. ##:'##::
: ##::##:::: ##:##:::::::####: ##::: ##:::: ##:::: ##::::. ####:::
: ##::##:::: ##:######:::## ## ##::: ##:::: ##:::: ##:::::. ##::::
: ##::##:::: ##:##...::::##. ####::: ##:::: ##:::: ##:::::: ##::::
: ##::##:::: ##:##:::::::##:. ###::: ##:::: ##:::: ##:::::: ##::::
'####:########::########:##::. ##::: ##:::'####::: ##:::::: ##::::
....:........::........:..::::..::::..::::....::::..:::::::..:::::
`);
  console.log(`---- Server running at localhost:${IS_PORT} ----`);
});
