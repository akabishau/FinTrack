

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['income', 'expense', 'transfer'],
        required: true,
    }
})

const Type = mongoose.model('Type', typeSchema)

module.exports = Type