const AWS = require('aws-sdk');

let config = {
  region: process.env.IS_REGION || 'us-east-1',
};

if (process.env.IS_NODE_ENV === 'TEST' || process.env.IS_NODE_ENV === 'LOCAL') {
  config = Object.assign(config, {
    endpoint: new AWS.Endpoint(`http://localhost:${process.env.IS_DYNAMODB_PORT}`),
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
  });
}

AWS.config.update(config);

const docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
const dynamodb = new AWS.DynamoDB();

module.exports = {
  AWS,
  docClient,
  dynamodb,
};
