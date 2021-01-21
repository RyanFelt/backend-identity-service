const { authRole, authenticate } = require('./middlewares/authenticate');
const buildRoute = require('./controllers/utils/buildRoute');
const changePassword = require('./controllers/changePassword');
const refresh = require('./controllers/refresh');
const registration = require('./controllers/registration');
const signIn = require('./controllers/signIn');
const signOut = require('./controllers/signOut');
const {
  changePasswordSchema,
  refreshSchema,
  registrationSchema,
  signInSchema,
  signOutSchema,
} = require('./controllers/utils/validate/validationSchema');

module.exports = {
  authenticate: authRole,
  changePassword: [authenticate, buildRoute(changePassword, changePasswordSchema)],
  refresh: buildRoute(refresh, refreshSchema),
  registration: buildRoute(registration, registrationSchema),
  signIn: buildRoute(signIn, signInSchema),
  signOut: buildRoute(signOut, signOutSchema),
};
