const User = require('../models/User')
const Account = require('../models/Account')
const { StatusCodes } = require('http-status-codes')


// create account
const createAccount = async (req, res) => {
    console.log('createAccount')
    try {
        console.log(req.user.userId)
        const user = await User.findById(req.user.userId)
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
        }
        const { name, initialBalance, description } = req.body
        const account = await Account.create({ name, initialBalance, description, createdBy: req.user.userId })
        // check if account was created
        user.accounts.push(account._id)
        user.save()
        res.status(StatusCodes.CREATED).json({
            status: 'Success',
            msg: `Account has been created`,
            account,
            user
        })
    } catch (error) {
        console.log(error)
    }
}
// view account
// update account
// delete account

const getAccounts = async (req, res) => {
    console.log('getAccounts')
    try {
        const user = await User.findById(req.user.userId)
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
        }
        const accounts = await Account.find({ createdBy: req.user.userId })
        if (!accounts) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'No accounts found' })
        }
        res.status(StatusCodes.OK).json({ accounts })

    } catch (error) {
        console.error(error)
    }
}

module.exports = { createAccount, getAccounts }