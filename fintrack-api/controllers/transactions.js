const Transaction = require('../models/Transaction')
const Account = require('../models/Account')
const { StatusCodes } = require('http-status-codes')

const createTransaction = async (req, res) => {
    console.log('createTransaction')
    try {
        req.body.createdBy = req.user.userId
        const transaction = await Transaction.create(req.body)
        // link transaction to account - pre save hook in Transaction model
        res.status(StatusCodes.CREATED).json({
            status: 'Success',
            msg: `Transaction has been created`,
            transaction
        })

    } catch (error) {
        console.log(error)
    }
}

const getTransaction = async (req, res) => {
    console.log('getTransaction')
    // destructure user id and transaction id from req
    const { user: { userId }, params: { transactionId } } = req
    try {
        const transaction = await Transaction.findOne(
            { createdBy: userId, _id: transactionId })
            .populate('account', 'name')
            .populate('transactionType', 'name')
            .populate('category', 'name')
        if (!transaction) {
            throw new Error('Transaction not found')
        }
        res.status(StatusCodes.OK).json({
            status: 'Success',
            transaction
        })
    } catch (error) {
        console.log(error)
    }
}

const updateTransaction = async (req, res) => {
    console.log('updateTransaction')
    try {
        const { user: { userId }, params: { transactionId }, body } = req

        const update = {}
        if (body.transactionType) update.transactionType = body.transactionType
        if (body.category) update.category = body.category
        // add change for the account later (pre save hook in Transaction model to link transaction to new account)
        if (body.amount) update.amount = body.amount
        if (body.description) update.description = body.description

        const updatedTransaction = await Transaction.findOneAndUpdate(
            { createdBy: userId, _id: transactionId },
            update, // update object
            { new: true, runValidators: true, omitUndefined: true } // by default returns old document and does not run validators on update
        )

        if (!updatedTransaction) {
            throw new Error('Transaction not found')
        }

        res.status(StatusCodes.OK).json({
            status: 'Success',
            msg: `Transaction has been updated`,
            updatedTransaction
        })

    } catch (error) {
        console.log(error)
    }
}

const deleteTransaction = async (req, res) => {
    console.log('deleteTransaction')
    try {
        const { user: { userId }, params: { transactionId } } = req
        const transaction = await Transaction.findOneAndDelete(
            { createdBy: userId, _id: transactionId })
        if (!transaction) {
            throw new Error('Transaction not found')
        }
        res.status(StatusCodes.OK).json({
            status: 'Success',
            msg: `Transaction has been deleted`,
            transaction
        })

    } catch (error) {
        console.log(error)
    }

}

const getTransactions = async (req, res) => {
    console.log('getAllTransactions')
    try {
        const userId = req.user.userId
        const transactions = await Transaction.find({ createdBy: userId })
            .populate('account', 'name')
            .populate('transactionType', 'name')
            .populate('category', 'name')

        res.status(StatusCodes.OK).json({
            status: 'Success',
            count: transactions.length,
            transactions,
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
    }
};

module.exports = {
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactions
}