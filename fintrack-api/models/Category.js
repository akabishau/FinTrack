const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['income', 'expense', 'transfer'],
        required: true,
    }
})

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  transType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TransType',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Create a unique index for 'name', 'transType' and 'createdBy'
categorySchema.index({ name: 1, transType: 1, createdBy: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);
const TransType = mongoose.model('TransType', typeSchema);

module.exports = { Category, TransType };