const TransactionType = require('./models/TransactionType')

const createDefaultTransactionTypes = async () => {
    console.log('Creating default transaction types...')
    try {
        const existingTransactionTypes = await TransactionType.find()

        if (existingTransactionTypes.length > 0) {
            console.log('Transaction types already configured')
            return
        }

        // Create transaction types
        const incomeType = new TransactionType({ name: 'income' })
        await incomeType.save()

        const expenseType = new TransactionType({ name: 'expense' })
        await expenseType.save()

        const transferType = new TransactionType({ name: 'transfer' })
        await transferType.save()

        console.log('Default transaction types created successfully.')
    } catch (error) {
        console.error('Error creating default transaction types:', error)
    }
}

module.exports = createDefaultTransactionTypes