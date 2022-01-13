const statusMessages = require('../utils/status-messages');

class UnauthorizedError extends Error {
  constructor(message = statusMessages.UNAUTHORIZED) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
