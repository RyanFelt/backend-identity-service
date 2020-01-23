const identityService = require('./routes');
const { authRole } = require('./middlewares/authenticate');

module.exports = {
  identityService,
  authenticate: authRole,
};
