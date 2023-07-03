const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['income', 'expense', 'transfer'],
        required: true,
    }
})

const TransactionType = mongoose.model('TransactionType', typeSchema)

module.exports = mongoose.model('TransactionType', typeSchema)