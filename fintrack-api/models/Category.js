const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

// Create a unique index for 'name', 'type' and 'createdBy'
categorySchema.index({ name: 1, type: 1, createdBy: 1 }, { unique: true })

module.exports = mongoose.model('Category', categorySchema)