const { StatusCodes } = require('http-status-codes')
const APIError = require('../errors/APIError')

const errorHandler = (err, req, res, next) => {
    console.log('errorHandler middleware called')

    if (err instanceof APIError) {
        console.log('custom error')
        return res.status(err.statusCode).json({ msg: err.message })
    }
    console.log('internal error', err.message)
    
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Something went wrong, please try again later')
}

module.exports = errorHandler