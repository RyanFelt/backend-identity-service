const identityService = require('./routes');
const { authRole } = require('./middlewares/authenticate');

module.exports = configParam => {
  process.env.IS_USER_TABLE = configParam.USER_TABLE || 'users';
  process.env.IS_REFRESH_TABLE = configParam.REFRESH_TABLE || 'refresh';
  process.env.IS_REGION = configParam.REGION || 'us-east-1';
  process.env.IS_ACCESSS_TOKEN_TIME = configParam.ACCESS_TOKEN_TIME || 72000;
  process.env.IS_REFRESH_TOKEN_TIME = configParam.REFRESH_TOKEN_TIME || 720000;
  process.env.IS_ACCESS_KEY = configParam.ACCESS_KEY || 'server_secret';
  process.env.IS_REFRESH_KEY = configParam.REFRESH_KEY || 'refresh_secret';
  process.env.IS_GOOGLE_DECRYPT_API = 'https://www.googleapis.com';
  process.env.IS_CIPHER_ALGORITHM = configParam.CIPHER_ALOGRITHM || 'aes-256-ctr';
  // eslint-disable-next-line operator-linebreak
  process.env.IS_ENCRYPT_PASSWORD_KEY =
    configParam.IS_ENCRYPT_PASSWORD_KEY || 'b2df428b9929d3ace7c598bbf4e496b2';
  process.env.IS_ENCRYPT_KEY = configParam.ENCRYPT_KEY || 'ciphersjdkfituejdnvmgjfhnskcjsme';
  process.env.IS_INPUT_ENCODING = configParam.INPUT_ENCODING || 'utf8';
  process.env.IS_OUTPUT_ENCODING = configParam.OUTPUT_ENCODING || 'hex';
  process.env.IS_DYNAMODB_PORT = configParam.DYNAMODB_PORT || 8000;
  process.env.IS_SG_API_KEY = configParam.SG_API_KEY;
  process.env.IS_SG_URL = 'https://api.sendgrid.com';
  process.env.IS_EMAIL_FE_HOST = configParam.EMAIL_FE_HOST || 'http://localhost';
  process.env.IS_AUTH_CONFIG = configParam.AUTH_CONFIG;

  return {
    identityService,
    authenticate: authRole,
  };
};
