import { Link } from 'react-router-dom'

const TransactionListHeader = () => {
    return (
        <header>
            <div>Type</div>
            <div>Category</div>
            <div>Amount</div>
        </header>
    )
}


const Transaction = ({tranData}) => {
    return (
        <div>
            <div>{tranData.transType}</div>
            <div>{tranData.category}</div>
            <div>{'$' + tranData.amount}</div>
        </div>
    )
}


const TransactionList = ({ transactions }) => {
    return (
        <div>
            <TransactionListHeader />
            {/* transactions list */}
            {transactions.map(transaction =>
                <Link key={transaction._id} to={`/transactions/${transaction._id}`}>
                    <Transaction tranData={transaction} />
                </Link>

            )}
        </div>
    )
}

export default TransactionList