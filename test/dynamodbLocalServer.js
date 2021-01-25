const { createTables } = require('./dynamodbLocal');

(async () => {
  await createTables();
})();
