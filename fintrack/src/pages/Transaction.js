import { useParams } from "react-router-dom"

const TransactionPage = () => {
    const { transactionId } = useParams()
    return (
        <h1>This is the single transaction page with id: {transactionId}!</h1>
    )
}

export default TransactionPage