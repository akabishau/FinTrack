import { useParams } from "react-router-dom"
import transactionData from '../data/transactions.json'
import NotFound from "./NotFound"

const TransactionPage = () => {
    const { transactionId } = useParams()
    const transaction = transactionData.transactions.find(transaction => transaction._id === transactionId)

    if (!transaction) {
        return <NotFound />
    }

    return (
        <>
            <h1>This is the single transaction page with id: {transactionId}!</h1>
            <h3>This is an {transaction.transType} in the category of {transaction.category} with amount of ${transaction.amount}</h3>
        </>

    )
}

export default TransactionPage