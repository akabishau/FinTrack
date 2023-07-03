const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  transactionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TransactionType',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Create a unique index for 'name', 'type' and 'createdBy'
categorySchema.index({ name: 1, transactionType: 1, createdBy: 1 }, { unique: true })
const Category = mongoose.model('Category', categorySchema)

module.exports = Category