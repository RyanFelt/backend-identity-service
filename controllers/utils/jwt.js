const jwt = require('jsonwebtoken');

exports.generateToken = user =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      role: user.role,
    },
    process.env.IS_ACCESS_KEY,
    {
      expiresIn: process.env.IS_ACCESSS_TOKEN_TIME,
    },
  );

exports.generateRefreshToken = user =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign(
    {
      userId: user.userId,
    },
    process.env.IS_REFRESH_KEY,
    {
      expiresIn: process.env.IS_REFRESH_TOKEN_TIME,
    },
  );

exports.authenticateRefresh = async authorization => {
  try {
    const token = authorization;
    const decodeToken = await jwt.verify(token, process.env.IS_REFRESH_KEY);
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
    const decodeToken = await jwt.verify(token, process.env.IS_ACCESS_KEY);
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
