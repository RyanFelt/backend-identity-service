const { authRole } = require('./middlewares/authenticate');
const buildRoute = require('./controllers/utils/buildRoute');
const refresh = require('./controllers/refresh');
const registration = require('./controllers/registration');
const signIn = require('./controllers/signIn');
const signOut = require('./controllers/signOut');

module.exports = {
  authenticate: authRole,
  refresh: buildRoute(refresh),
  registration: buildRoute(registration),
  signIn: buildRoute(signIn),
  signOut: buildRoute(signOut),
};
