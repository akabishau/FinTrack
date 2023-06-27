import transactionData from '../data/transactions.json'

const TransactionListHeader = () => {
    return (
        <header>
            <div>Type</div>
            <div> Category</div>
            <div> Amount</div>
        </header>
    )
}

// { } is used to insert JS expression into JSX, should return a value
const Transaction = (props) => {
    return (
        <div>
            <div>{props.type}</div>
            <div>{props.category}</div>
            <div>{'$' + props.amount}</div>
        </div>
    )
}


const TransactionList = (props) => {
    return (
        <div>
            <TransactionListHeader />
            {/* transactions list */}
            {props.transactions.map(transaction =>
                <Transaction
                    key={transaction._id}
                    type={transaction.transType}
                    category={transaction.category}
                    amount={transaction.amount} />
            )}
        </div>
    )
}


const TransactionsPage = () => {
    return (
        <>
            <h1>Recent Transactions</h1>
            <TransactionListHeader />
            <TransactionList transactions={transactionData.transactions} />
        </>
        
    )
}

export default TransactionsPage