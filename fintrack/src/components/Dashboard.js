import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'
import { getAccount } from '../utils/api-accounts'
import { useNavigate } from 'react-router-dom'

import UserContext from '../context/UserContext'
import { AuthContext } from '../context/AuthContext'


function Dashboard() {

    const navigate = useNavigate()

    // state
    const [accounts, setAccounts] = useState([])
    const [transactions, setTransactions] = useState([])
    const [accountDetails, setAccountDetails] = useState([])
    const [selectedAccount, setSelectedAccount] = useState(null)

    // context
    const { authToken } = useContext(AuthContext)
    const { authUser } = useContext(UserContext)


    useEffect(() => {
        setAccounts(authUser.accounts || [])
    }, [authUser])

    useEffect(() => {
        if (selectedAccount) {
            const getAccountTransactions = async () => {
                try {
                    const data = await getAccount(selectedAccount?._id, authToken)
                    console.log('ACCOUNT:', data)
                    setAccountDetails(data.account)
                    setTransactions(data.account.transactions || [])
                } catch (error) {
                    console.error('Error fetching transactions:', error)
                }
            }
            getAccountTransactions()
        }

    }, [selectedAccount, authToken])


    const handleAccountSelection = async (account) => {
        setSelectedAccount(account)
    }


    const handleCreateTransaction = () => {
        console.log('handleCreateTransaction', selectedAccount)
        navigate(
            '/transactions/',
            { state: { selectedAccount } }
        )
    }


    const handleTransactionEdit = (transaction) => {
        navigate(
            `/transactions/${transaction._id}`,
            { state: { transaction } }
        )
    }


    return (
        <div className='app'>
            <div className='sidebar'>
                <h2>Accounts</h2>
                <div>
                    {accounts.length > 0 ? (
                        <ul>
                            {accounts.map((account) => (
                                <li
                                    key={account._id}
                                    className={selectedAccount === account ? 'selected' : ''}
                                    onClick={() => handleAccountSelection(account)}
                                >
                                    {account.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>No accounts found</div>
                    )}
                </div>
            </div>

            <div>
                {selectedAccount ? (
                    <div>
                        <Balance>Balance: {accountDetails.balance}</Balance>
                        <button onClick={handleCreateTransaction}>Create New</button>
                        {transactions.length > 0 ? (
                            <TransactionList>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction._id}>
                                        <div>{transaction.transactionType.name}</div>
                                        <div>{transaction.category.name}</div>
                                        <Amount transactionType={transaction.transactionType}>
                                            {transaction.transactionType === 'expense' ? '-' : ''}
                                            <NegativeSign>{Math.abs(transaction.amount)}</NegativeSign>
                                        </Amount>
                                        <button onClick={() => handleTransactionEdit(transaction)}>Edit</button>
                                    </TableRow>
                                ))}
                            </TransactionList>
                        ) : (
                            <div>No transactions found</div>
                        )}
                    </div>
                ) : (
                    <div>Please select an account</div>
                )}
            </div>
        </div>
    )
}

const Amount = styled.div`
  color: ${props => props.transactionType === 'expense' ? 'red' : 'green'};
`

const NegativeSign = styled.span`
  &::before {
    content: '-';
  }
`

const Balance = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`

const TransactionList = styled.div`
    height: 100%;
    padding: 10px;
    margin: 0;
    display: grid;
    grid-auto-rows: 50px;
    gap: 10px;
`

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
`

export default Dashboard
