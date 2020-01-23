const jwt = require('jsonwebtoken');

const {
  IS_ACCESS_KEY,
  IS_ACCESSS_TOKEN_TIME,
  IS_REFRESH_KEY,
  IS_REFRESH_TOKEN_TIME,
} = process.env;

exports.generateToken = user =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      role: user.role,
    },
    IS_ACCESS_KEY,
    {
      expiresIn: IS_ACCESSS_TOKEN_TIME,
    },
  );

exports.generateRefreshToken = user =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign(
    {
      userId: user.userId,
    },
    IS_REFRESH_KEY,
    {
      expiresIn: IS_REFRESH_TOKEN_TIME,
    },
  );

exports.authenticateRefresh = async authorization => {
  try {
    const token = authorization;
    const decodeToken = await jwt.verify(token, IS_REFRESH_KEY);
    return {
      userId: decodeToken.userId,
    };
  } catch (e) {
    console.log('ERROR :: authenticateRefresh()', e);
    return false;
  }
};

exports.auth = async authorization => {
  try {
    const token = authorization;
    const decodeToken = await jwt.verify(token, IS_ACCESS_KEY);
    return {
      userId: decodeToken.userId,
      email: decodeToken.email,
      role: decodeToken.role,
    };
  } catch (e) {
    console.log('ERROR :: auth()', e);
    return false;
  }
};
