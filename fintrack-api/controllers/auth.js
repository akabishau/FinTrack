const User = require('../models/User')
const TransactionType = require('../models/TransactionType')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
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
                status: 'Failed',
                msg: error.message
            }
        )
    }
}


const login = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        throw new Error('Please provide both email and password')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Could not find email')
    }

    const isMatch = await user.comparePasswords(password)
    if (!isMatch) {
        throw new Error('Incorrect password')
    }

    const token = user.createJWT()
    res.status(200).json({ msg: 'Login successful', token, user })
}

module.exports = { register, login }