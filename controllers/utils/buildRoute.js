const { resolveErrorSendResponse } = require('./errors');
const validate = require('./validate');

module.exports = (handlerFunc, validateSchema) => async (req, res) => {
  try {
    validate(req, validateSchema);
    const requestResponse = await handlerFunc(req);
    res.status(200).send(requestResponse);
  } catch (e) {
    resolveErrorSendResponse(e, res);
  }
};
