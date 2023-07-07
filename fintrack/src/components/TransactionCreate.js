import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { createTransaction } from '../utils/api-transactions'

import UserContext from '../context/UserContext'
import { AuthContext } from '../context/AuthContext'

function TransactionCreationPage() {

    const navigate = useNavigate()
    const location = useLocation()
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
        try {
            const response = await createTransaction(formData, authToken)
            const data = await response.json()
            if (response.status === 201) {
                setFeedbackMessage(`${data.status} ${data.msg}`)
                setTimeout(() => { navigate(-1) }, 1000)
            } else {
                setFeedbackMessage(`${data.status} ${data.msg}`)
                console.log('Error creating transaction:', response.status)
            }
        } catch (error) {
            setFeedbackMessage('Transaction creation failed.')
            console.error('Error creating transaction:', error)
        }
    }

    const handleCancel = () => { navigate(-1) }

    return (
        <div>
            <h2>Create Transaction</h2>

            {feedbackMessage && <p>{feedbackMessage}</p>}

            <h3>Account: {accountName}</h3>

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
                    <button type='submit'>Create</button>
                    <button type='button' onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TransactionCreationPage
