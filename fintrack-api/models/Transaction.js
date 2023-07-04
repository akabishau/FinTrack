const mongoose = require('mongoose')
const Account = require('../models/Account')

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

transactionSchema.pre('save', async function (next) {
    console.log('transactionSchema.pre(save)')
    try {
        const account = await Account.findById(this.account)
        account.transactions.push(this._id)
        await account.save()
        next()
    } catch (error) {
        console.log(error)
        // rollback transaction in case of any error
        await Transaction.findByIdAndDelete(this._id)
        next(error)
    }
    
})


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction