import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TransactionListHeader = () => {
    return (
        <TableHeader>
            <div>Type</div>
            <div>Category</div>
            <div>Amount</div>
        </TableHeader>
    )
}


const Transaction = ({tranData}) => {
    return (
        <TableRow>
            <div>{tranData.transType}</div>
            <div>{tranData.category}</div>
            <div>{'$' + tranData.amount}</div>
        </TableRow>
    )
}


const TransactionList = ({ transactions }) => {
    return (
        <Wrapper>
            <TransactionListHeader />
            {/* transactions list */}
            {transactions.map(transaction =>
                <StyledLink key={transaction._id} to={`/transactions/${transaction._id}`}>
                    <Transaction tranData={transaction} />
                </StyledLink>

            )}
        </Wrapper>
    )
}

export default TransactionList

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(50px, auto);
    grid-gap: 10px;
    background-color: orange;
    border: 1px solid #333;
    padding: 10px;
`
const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-columns: minmax(50px, auto);
    border: 1px solid #333;
`

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: 1px solid #333;
`

const StyledLink = styled(Link)`
    display: grid;
    grid-auto-rows: minmax(50px, auto);
    color: #fff;
    text-decoration: none;
    &:hover {
        background-color: pink;
    }
`