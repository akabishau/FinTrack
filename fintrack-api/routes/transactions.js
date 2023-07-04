const express = require('express')
const router = express.Router()

const {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactions')

router.route('/').get(getTransactions).post(createTransaction)
router.route('/:transactionId').get(getTransaction).patch(updateTransaction).delete(deleteTransaction)

module.exports = router