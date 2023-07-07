import { useState, useContext, useEffect } from 'react'
import { getAccount } from '../utils/api-accounts'

import UserContext from '../context/UserContext'
import { AuthContext } from '../context/AuthContext'


function Dashboard() {
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

            <div className='content'>
                {selectedAccount ? (
                    <div>
                        <h2>Balance: {accountDetails.balance}</h2>
                        {transactions.length > 0 ? (
                            <ul>
                                {transactions.map((transaction) => (
                                    <li key={transaction._id}>
                                        {transaction.category.name} - {transaction.amount}
                                    </li>
                                ))}
                            </ul>
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

export default Dashboard
