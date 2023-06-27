import transactionData from '../data/transactions.json'
import TransactionList from '../components/TransactionList'

const TransactionsPage = () => {
    return (
        <>
            <h1>Recent Transactions</h1>
            <TransactionList transactions={transactionData.transactions} />
        </>
        
    )
}

export default TransactionsPage