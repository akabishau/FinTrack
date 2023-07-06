const User = require('../models/User')
const TransactionType = require('../models/TransactionType')
const { StatusCodes } = require('http-status-codes')

// node checks for index.js by default
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    console.log('register')
    try {
        // hash password in the model before saving
        const user = new User({ ...req.body })
        user.transactionTypes = await TransactionType.find()
        user.categories = []
        user.accounts = []
        await user.save()

        res.status(StatusCodes.CREATED).json(
            {
                status: 'Success',
                msg: 'New user has been created',
                user: { name: user.name }
            }
        )
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                status: 'Registration Failed',
                msg: error.message
            }
        )
    }
}


const login = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new BadRequestError('Please provide both email and password')
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw new UnauthenticatedError('Could not find email')
        }

        const isMatch = await user.comparePasswords(password)
        if (!isMatch) {
            throw new UnauthenticatedError('Incorrect password')
        }

        const token = user.createJWT()
        res.status(200).json({ msg: 'Login successful', token, user })
    } catch (error) {
        res.status(error.statusCode).json(
            {
                status: 'Login Failed',
                msg: error.message
            }
        )
    }

}

module.exports = { register, login }