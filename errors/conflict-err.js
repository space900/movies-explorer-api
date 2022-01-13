const StatusMessages = require('../utils/status-messages');

class ConflictError extends Error {
  constructor(message = StatusMessages.CONFLICT) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
