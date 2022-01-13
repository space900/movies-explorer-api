const statusMessages = require('../utils/status-messages');

class NotFoundError extends Error {
  constructor(message = statusMessages.NOT_FOUND) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
