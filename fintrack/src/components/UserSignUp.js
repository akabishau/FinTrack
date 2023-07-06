import { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import ErrorsDisplay from './ErrorsDisplay'

const UserSignUp = () => {

    const navigate = useNavigate()
    const { actions } = useContext(UserContext)

    // State
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const [errors, setErrors] = useState([])

    // event handlers
    const handleSubmit = async (event) => {
        event.preventDefault()

        const user = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value
        }

        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(user)
        }

        try {
            console.log('fetchOptions', fetchOptions)
            const response = await fetch('/api/v1/auth/register', fetchOptions)
            if (response.status === 201) {
                console.log(`${user.name} is successfully signed up and authenticated!`)
                // sign in the user and redirect to the root/dashboard
                await actions.signIn(user) // user object has extra name property
                navigate('/')
            } else if (response.status === 400) {
                const data = await response.json()
                setErrors(data.errors)
            } else {
                throw new Error()
            }
        } catch (error) {
            console.log(error)
            navigate('/error')
        }

    }

    return (
        <div>
            <div>
                <h1>Sign up</h1>
                <div>
                    <ErrorsDisplay errors={errors} />

                    <form onSubmit={handleSubmit}>
                        <input id='name' name='name' type='text' ref={name} placeholder='Name' />
                        <input id='email' name='email' type='text' ref={email} placeholder='Email' />
                        <input id='password' name='password' type='password' ref={password} placeholder='Password' />
                        <button type='submit'>Sign up</button>
                    </form>
                </div>
                <p>
                    Already have a user account? <Link to='/signin'>Click here</Link> to sign in!
                </p>
            </div>
        </div>
    )
}

export default UserSignUp