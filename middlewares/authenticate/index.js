const jwt = require('jsonwebtoken');
const {
  InvalidCredentialsError,
  ForbiddenError,
  resolveErrorSendResponse,
} = require('../../controllers/utils/errors');

const { IS_ACCESS_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      req.user = {};
      return next();
    }

    const token = req.headers.authorization;
    let decodeToken = {};

    try {
      decodeToken = await jwt.verify(token, IS_ACCESS_KEY);
    } catch (e) {
      console.log('ERROR :: authenticate()', e);
      throw new InvalidCredentialsError('Unauthorized');
    }

    req.user = {
      userId: decodeToken.userId,
      email: decodeToken.email,
      role: decodeToken.role,
    };

    return next();
  } catch (e) {
    return resolveErrorSendResponse(e, res);
  }
};

exports.authRole = roleParam => (req, res, next) => {
  let role = roleParam;
  if (!role) {
    role = 1;
  }

  authenticate(req, res, () => {
    if (role <= req.user.role) {
      next();
    } else {
      throw new ForbiddenError('Insufficient permissions');
    }
  });
};

exports.authenticate = authenticate;
