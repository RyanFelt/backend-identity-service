const express = require('express');
const { authenticate } = require('./middlewares/authenticate');
const { buildRoute } = require('./controllers/utils/common');
const constants = require('./constants');
const changeEmailInit = require('./controllers/changeEmail/init');
const changeEmailConfirm = require('./controllers/changeEmail/confirm');
const changePassword = require('./controllers/changePassword');
const passwordResetInit = require('./controllers/passwordReset/init');
const passwordResetConfirm = require('./controllers/passwordReset/confirm');
const refresh = require('./controllers/refresh');
const registration = require('./controllers/registration');
const signIn = require('./controllers/signIn');
const signOut = require('./controllers/signOut');
const validate = require('./middlewares/validate');
const verifyEmail = require('./controllers/verifyEmail');

const { IS_PORT } = constants;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));
app.use(validate);

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
app.get('/changeEmailInit', authenticate, buildRoute(changeEmailInit));

/**
 * /changeEmailConfirm
 * Headers: content-type: application/json
 * Body: changeEmailHash, email(new email), emailBool
 * Changes email in db. changeEmailHash comes from changeEmailInit endpoint.
 */
app.post('/changeEmailConfirm', buildRoute(changeEmailConfirm));

/**
 * /changePassword
 * Headers: content-type: application/json, authorization: <authorization>
 * Body: password(current), newPassword
 * Will save new password to DB
 */
app.post('/changePassword', authenticate, buildRoute(changePassword));

/**
 * /passwordResetInit
 * Headers: content-type: application/json
 * Body: email
 * Sends reset password email to passed in email address.
 */
app.post('/passwordResetInit', buildRoute(passwordResetInit));

/**
 * /passwordResetConfirm
 * Headers: content-type: application/json
 * Body: passwordResetHash, password(new password)
 * Sets new password in database. passwordResetHash comes from passwordResetInit endpoint.
 */
app.post('/passwordResetConfirm', buildRoute(passwordResetConfirm));

/**
 * /refresh
 * Headers: content-type: application/json, authorization: <refresh>
 * Sends a new authorization token
 */
app.get('/refresh', buildRoute(refresh));

/**
 * /registration
 * Headers: content-type: application/json
 * Body: email, password, emailBool
 * Adds user to DB. Will only send verificaion email if emailBool is true.
 */
app.post('/registration', buildRoute(registration));

/**
 * /signIn
 * Headers: content-type: application/json
 * Body: email, password
 * This user service sign in
 * Returns authorization token and refresh token
 */
app.post('/signIn', buildRoute(signIn));

/**
 * /signOut
 * Headers: content-type: application/json, authorization: <refresh>
 * Deletes refresh token from database.
 */
app.get('/signOut', buildRoute(signOut));

/**
 * /verifyEmail/<emailHash>
 * query: emailHash (This comes from the verification email)
 * Changes record in DB to emailVerified: true
 */
app.get('/verifyEmail', buildRoute(verifyEmail));

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
