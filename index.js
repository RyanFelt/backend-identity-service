const { authRole, authenticate } = require('./middlewares/authenticate');
const buildRoute = require('./controllers/utils/buildRoute');
const changePassword = require('./controllers/changePassword');
const refresh = require('./controllers/refresh');
const registration = require('./controllers/registration');
const signIn = require('./controllers/signIn');
const signOut = require('./controllers/signOut');

const { validate } = require('./middlewares/validate');

module.exports = {
  authenticate: authRole,
  changePassword: [authenticate, buildRoute(changePassword)],
  refresh: buildRoute(refresh),
  registration: buildRoute(registration),
  signIn: [validate, buildRoute(signIn)],
  signOut: buildRoute(signOut),
};
