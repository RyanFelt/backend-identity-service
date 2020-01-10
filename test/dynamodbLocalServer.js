require('dotenv').config();
// const dynamodbLocal = require('dynamodb-localhost');
const { createTables } = require('./dynamodbLocal');

// const { IS_DYNAMODB_PORT } = process.env;

(async () => {
  // dynamodbLocal.install(() => {});
  // dynamodbLocal.start({ port: IS_DYNAMODB_PORT });
  await createTables();
})();
