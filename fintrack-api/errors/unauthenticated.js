const { StatusCodes } = require('http-status-codes')
const APIError = require('./APIError')

class UnauthenticatedError extends APIError {
  constructor(message) {
    super(message)
    // unauthenticated errors are 401 in this case
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthenticatedError