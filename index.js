const { authRole } = require('./middlewares/authenticate');
const buildRoute = require('./controllers/utils/buildRoute');
const refresh = require('./controllers/refresh');
const registration = require('./controllers/registration');
const signIn = require('./controllers/signIn');

module.exports = {
  refresh: buildRoute(refresh),
  registration: buildRoute(registration),
  signIn: buildRoute(signIn),
  authenticate: authRole,
};
