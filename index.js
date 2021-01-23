const { authRole, authenticate } = require('./middlewares/authenticate');
const buildRoute = require('./controllers/utils/buildRoute');
const changeEmailInit = require('./controllers/changeEmail/init');
const changeEmailConfirm = require('./controllers/changeEmail/confirm');
const changePassword = require('./controllers/changePassword');
const passwordResetInit = require('./controllers/passwordReset/init');
const passwordResetConfirm = require('./controllers/passwordReset/confirm');
const refresh = require('./controllers/refresh');
const registration = require('./controllers/registration');
const signIn = require('./controllers/signIn');
const signOut = require('./controllers/signOut');
const verifyEmail = require('./controllers/verifyEmail');
const {
  changeEmailConfirmSchema,
  changeEmailInitSchema,
  changePasswordSchema,
  passwordResetInitSchema,
  refreshSchema,
  registrationSchema,
  signInSchema,
  signOutSchema,
} = require('./controllers/utils/validate/schema');

module.exports = {
  authenticate: authRole,
  changeEmailInit: buildRoute(changeEmailInit, changeEmailInitSchema),
  changeEmailConfirm: buildRoute(changeEmailConfirm, changeEmailConfirmSchema),
  changePassword: [authenticate, buildRoute(changePassword, changePasswordSchema)],
  passwordResetInit: buildRoute(passwordResetInit, passwordResetInitSchema),
  passwordResetConfirm: buildRoute(passwordResetConfirm),
  refresh: buildRoute(refresh, refreshSchema),
  registration: buildRoute(registration, registrationSchema),
  signIn: buildRoute(signIn, signInSchema),
  signOut: buildRoute(signOut, signOutSchema),
  verifyEmail: buildRoute(verifyEmail),
};
