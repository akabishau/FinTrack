const { StatusCodes } = require('http-status-codes')
const { APIError } = require('../errors')
// node first looks for a file called index.js when you require a directory

const errorHandler = (err, req, res, next) => {
    console.log('errorHandler middleware called')

    if (err instanceof APIError) {
        console.log('custom error')
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
}

module.exports = errorHandler