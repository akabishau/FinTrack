const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initialBalance: {
        type: Number,
        required: true
    },
    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Transaction',
        required: true,
    },
    description: {
        name: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

accountSchema.index({ name: 1,createdBy: 1 }, { unique: true })

const Account = mongoose.model('Account', accountSchema)
module.exports = Account