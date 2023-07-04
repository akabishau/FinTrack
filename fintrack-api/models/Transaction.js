const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        transactionType: {
            type: mongoose.Types.ObjectId,
            ref: 'TransactionType',
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        account: {
            type: mongoose.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        description: {
            type: String
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },

    },
    { timestamps: true }
)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction