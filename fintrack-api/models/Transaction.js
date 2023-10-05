const mongoose = require('mongoose')
const Account = require('../models/Account')
const TransactionType = require('../models/TransactionType')
const Category = require('../models/Category')

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

    // validate type/category/account exist
    const isValidAccount = await Account.exists({ _id: this.account })
    if (!isValidAccount) {
        return next(new Error('Invalid account'));
    }


    const isValidTransactionType = await TransactionType.exists({ _id: this.transactionType })
    if (!isValidTransactionType) {
        return next(new Error('Invalid transaction type'))
    }

    const isValidCategory = await Category.exists({ _id: this.category });
    if (!isValidCategory) {
        return next(new Error('Invalid category'));
    }

    // link transaction to account
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

transactionSchema.pre('findOneAndDelete', async function (next) {
    console.log('transactionSchema.pre(findOneAndDelete)')

    // review using session/transaction here to rollback in case of error
    try {
        // getQuery accesses current query conditions
        const transaction = await Transaction.findOne(this.getQuery())

        if (!transaction) {
            return next(new Error('Transaction not found'))
        }

        const account = await Account.findById(transaction.account);
        if (!account) {
            throw new Error('Associated account not found');
        }

        account.transactions.pull(transaction._id);
        await account.save();
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
})


const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction