import React, { useState, useEffect } from 'react'
import { getAccounts } from '../utils/api-accounts'
import { getTransactions } from '../utils/api-transactions'



function Dashboard() {
    const [accounts, setAccounts] = useState([])
    const [transactions, setTransactions] = useState([])
    const [selectedAccount, setSelectedAccount] = useState(null)

    useEffect(() => {
        const fetchAccountsData = async () => {
            try {
                const accountsData = await getAccounts()
                setAccounts(accountsData)
            } catch (error) {
                console.error('Error fetching accounts:', error)
            }
        }

        fetchAccountsData()
    }, [])

    useEffect(() => {
        const fetchTransactionsData = async (accountId) => {
            try {
                const data = await getTransactions(accountId)
                setTransactions(data)
            } catch (error) {
                console.error('Error fetching transactions:', error)
            }
        }
        console.log('selectedAccount', selectedAccount?._id)
        fetchTransactionsData(selectedAccount?._id)
    }, [selectedAccount])


    const handleAccountSelection = async (account) => {
        setSelectedAccount(account)
    }

    return (
        <div className='app'>
            <div className='sidebar'>
                <h2>Accounts</h2>
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
            </div>

            <div className='content'>
                {selectedAccount ? (
                    <div>
                        {transactions.length > 0 ? (
                            <ul>
                                {transactions.map((transaction) => (
                                    <li key={transaction._id}>
                                        {transaction.amount}
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
