const StatusMessages = require('../utils/status-messages');

class ForbiddenError extends Error {
  constructor(message = StatusMessages.FORBIDDEN) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
