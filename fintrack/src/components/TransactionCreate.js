import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function TransactionCreationPage() {

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const accountId = searchParams.get('accountId')
    const accountName = searchParams.get('accountName')


    const [formData, setFormData] = useState({
        account: accountId,
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

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Send the form data to the server for transaction creation
        console.log(formData)
        // Assuming successful creation, navigate back to the previous page
        navigate(-1)
    }

    const handleCancel = () => { navigate(-1) }

    return (
        <div>
            <h2>Create Transaction</h2> 
            <h3>Account: {accountName}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Category:
                        <input
                            type='text'
                            name='category'
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type='number'
                            name='amount'
                            value={formData.amount}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
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
