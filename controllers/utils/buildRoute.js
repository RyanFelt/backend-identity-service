const { resolveErrorSendResponse } = require('./errors');

module.exports = handlerFunc => async (req, res) => {
  try {
    const requestResponse = await handlerFunc(req);
    res.status(200).send(requestResponse);
  } catch (e) {
    resolveErrorSendResponse(e, res);
  }
};
