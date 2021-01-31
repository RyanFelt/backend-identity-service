const express = require('express');
const { authenticate } = require('./middlewares/authenticate');
const { buildRoute } = require('./handlers/utils/common');
const changeEmailInit = require('./handlers/changeEmail/init');
const changeEmailConfirm = require('./handlers/changeEmail/confirm');
const changePassword = require('./handlers/changePassword');
const passwordResetInit = require('./handlers/passwordReset/init');
const passwordResetConfirm = require('./handlers/passwordReset/confirm');
const refresh = require('./handlers/refresh');
const registration = require('./handlers/registration');
const signIn = require('./handlers/signIn');
const signOut = require('./handlers/signOut');
const verifyEmail = require('./handlers/verifyEmail');

const router = express.Router();

/**
 * /healthCheck
 * For testing purposes
 */
router.get('/healthCheck', (req, res) => res.status(200).send('HEALTHY'));

/**
 * /changeEmailInit
 * Headers: content-type: application/json, authorization: <authorization>
 * Sends change email email.
 */
router.get('/changeEmailInit', authenticate, buildRoute(changeEmailInit));

/**
 * /changeEmailConfirm
 * Headers: content-type: application/json
 * Body: changeEmailHash, email(new email), emailBool
 * Changes email in db. changeEmailHash comes from changeEmailInit endpoint.
 */
router.post('/changeEmailConfirm', buildRoute(changeEmailConfirm));

/**
 * /changePassword
 * Headers: content-type: application/json, authorization: <authorization>
 * Body: password(current), newPassword
 * Will save new password to DB
 */
router.post('/changePassword', authenticate, buildRoute(changePassword));

/**
 * /passwordResetInit
 * Headers: content-type: application/json
 * Body: email
 * Sends reset password email to passed in email address.
 */
router.post('/passwordResetInit', buildRoute(passwordResetInit));

/**
 * /passwordResetConfirm
 * Headers: content-type: application/json
 * Body: passwordResetHash, password(new password)
 * Sets new password in database. passwordResetHash comes from passwordResetInit endpoint.
 */
router.post('/passwordResetConfirm', buildRoute(passwordResetConfirm));

/**
 * /refresh
 * Headers: content-type: application/json, authorization: <refresh>
 * Sends a new authorization token
 */
router.get('/refresh', buildRoute(refresh));

/**
 * /registration
 * Headers: content-type: application/json
 * Body: email, password, emailBool
 * Adds user to DB. Will only send verificaion email if emailBool is true.
 */
router.post('/registration', buildRoute(registration));

/**
 * /signIn
 * Headers: content-type: application/json
 * Body: email, password
 * This user service sign in
 * Returns authorization token and refresh token
 */
router.post('/signIn', buildRoute(signIn));

/**
 * /signOut
 * Headers: content-type: application/json, authorization: <refresh>
 * Deletes refresh token from database.
 */
router.get('/signOut', buildRoute(signOut));

/**
 * /verifyEmail/<emailHash>
 * query: emailHash (This comes from the verification email)
 * Changes record in DB to emailVerified: true
 */
router.get('/verifyEmail', buildRoute(verifyEmail));

module.exports = router;
