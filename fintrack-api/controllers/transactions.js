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
}

const deleteTransaction = async (req, res) => {
    console.log('deleteTransaction')
}

const getTransactions = async (req, res) => {
    try {
    //   const { accountId } = req.params;
    const accountId = '64a351838907772dc77d486d'
  
      const account = await Account.findById(accountId).populate('transactions');
  
      if (!account) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Account not found' });
      }
  
      const transactions = account.transactions;
  
      res.status(StatusCodes.OK).json({
        status: 'Success',
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