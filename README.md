# Identity Service

### Test

DynamoDB Local 
    - (Docker) run "docker-compose up", in a seperate tab run "npm run start-dynamo" this will create your tables.
    - (Without Docker) To run dynamodb-localhost package, remove comments from ./test/dynamodbLocalServer.js and run "npm run start-dynamo"

Test - "npm run test"

Sample Code:

    const setUp = require('ryanfelt-identity-service');

    const { identityService, authenticate } = setUp({
    DYNAMODB_PORT: 8000,
    USER_TABLE: 'users',
    REFRESH_TABLE: 'refresh',
    REGION: 'us-east-1',
    ACCESSS_TOKEN_TIME: 72000,
    REFRESH_TOKEN_TIME: 720000,
    ACCESS_KEY: 'server_secret',
    REFRESH_KEY: 'refresh_secret',
    CIPHER_ALGORITHM: 'aes-256-ctr',
    ENCRYPT_PASSWORD_KEY: 'b2df428b9929d3ace7c598bbf4e496b2',
    ENCRYPT_KEY: 'ciphersjdkfituejdnvmgjfhnskcjsme',
    INPUT_ENCODING: 'utf8',
    OUTPUT_ENCODING: 'hex'
    });

    app.use('/identity-service', identityService);
    app.get('/api/getAllTitles', authenticate('ADMIN'), getAllTitles);

