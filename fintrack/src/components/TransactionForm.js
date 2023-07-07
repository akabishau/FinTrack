import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { createTransaction, updateTransaction } from '../utils/api-transactions'

import UserContext from '../context/UserContext'
import { AuthContext } from '../context/AuthContext'

function TransactionForm() {
    const navigate = useNavigate()
    const location = useLocation()

    const transaction = location.state?.transaction
    useEffect(() => {
        console.log('transaction details:', transaction)
        if (transaction) {
            setIsEditMode(true)
            setFormData({
                account: transaction.account._id,
                transactionType: transaction.transactionType._id,
                category: transaction.category._id,
                amount: transaction.amount,
                description: transaction.description
            })
        }
    }, [transaction])

    const [isEditMode, setIsEditMode] = useState(false)

    // create new logic
    const searchParams = new URLSearchParams(location.search)
    const accountId = searchParams.get('accountId')
    const accountName = searchParams.get('accountName')

    const { authToken } = useContext(AuthContext)
    // get the user's categories and transaction types from context
    const { authUser } = useContext(UserContext)
    const categories = authUser.categories || []
    const transactionTypes = authUser.transactionTypes || []

    const [feedbackMessage, setFeedbackMessage] = useState('')

    const [formData, setFormData] = useState({
        account: accountId,
        transactionType: '',
        category: '',
        amount: '',
        description: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isEditMode) {
            console.log('edit mode')
            try {
                const response = await updateTransaction(transaction._id, formData, authToken)
                const data = await response.json()
                console.log('data:', data)
                if (response.status === 200) {
                    setFeedbackMessage('Update Successful')
                    setTimeout(() => { navigate(-1) }, 1000)
                } else {
                    setFeedbackMessage('Update Failed')
                    console.log('Error updating transaction:', response.status)
                }
            } catch (error) {
                setFeedbackMessage('Something went wrong. Please try again later.')
                console.error('Error updating transaction:', error)
            }


        } else {
            console.log('create mode')
            try {
                const response = await createTransaction(formData, authToken)
                if (response.status === 201) {
                    setFeedbackMessage(`Congrats! You've created a new transaction.`)
                    setTimeout(() => { navigate(-1) }, 1000)
                } else {
                    setFeedbackMessage('Transaction creation failed...')
                    console.log('Error creating transaction:', response.status)
                }
            } catch (error) {
                setFeedbackMessage('Transaction creation failed.')
                console.error('Error creating transaction:', error)
            }
        }
    }

    const handleCancel = () => { navigate(-1) }

    return (
        <div>
            <h2>{isEditMode ? 'Update Existing Transaction' : 'Create New Transaction'}</h2>

            {feedbackMessage && <p>{feedbackMessage}</p>}

            <h3>Account :{isEditMode ? transaction.account.name : accountName}</h3>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Type:
                        <select required name='transactionType' value={formData.transactionType} onChange={handleInputChange}>
                            <option value=''>Select Type</option>
                            {transactionTypes.map((type) => (
                                <option key={type._id} value={type._id}>{type.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label>Category:
                        <select required name="category" value={formData.category} onChange={handleInputChange}>
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label>Amount:
                        <input required
                            type='number'
                            name='amount'
                            value={formData.amount}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>

                <div>
                    <label>Description:
                        <input
                            type='text'
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <button type='submit'>{isEditMode ? 'Update' : 'Save'}</button>
                    <button type='button' onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TransactionForm
