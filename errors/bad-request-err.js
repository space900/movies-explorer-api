const StatusMessages = require('../utils/status-messages');

class BadRequestError extends Error {
  constructor(message = StatusMessages.BAD_REQUEST) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
