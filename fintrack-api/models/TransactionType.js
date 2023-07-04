const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['income', 'expense', 'transfer'],
        immutable: true,
        required: true,
    }
    
}, { timestamps: true })

const TransactionType = mongoose.model('TransactionType', typeSchema)

module.exports = TransactionType