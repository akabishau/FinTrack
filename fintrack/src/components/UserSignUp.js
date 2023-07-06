import { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import ThemeContext from '../context/ThemeContext'
import UserContext from '../context/UserContext'
import ErrorsDisplay from './ErrorsDisplay'

const UserSignUp = () => {
    //const { accentColor } = useContext(ThemeContext)
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
                //navigate('/login')
                await actions.signIn(user) // more additional properties
                navigate('/authenticated')
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

    const handleCancel = (event) => {
        event.preventDefault()
        navigate('/')
    }

    return (
        <div className='bounds'>
            <div className='grid-33 centered signin'>
                <h1>Sign up</h1>
                <div>
                    <ErrorsDisplay errors={errors} />

                    <form onSubmit={handleSubmit}>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            ref={name}
                            placeholder='Name' />
                        <input
                            id='email'
                            name='email'
                            type='text'
                            ref={email}
                            placeholder='Email' />
                        <input
                            id='password'
                            name='password'
                            type='password'
                            ref={password}
                            placeholder='Password' />

                        <div className='pad-bottom'>
                            <button className='button' type='submit' style={{ background: '' }}>Sign up</button>
                            <button className='button button-secondary' style={{ color: '' }} onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
                <p>
                    Already have a user account? <Link style={{ color: '' }} to='/signin'>Click here</Link> to sign in!
                </p>
            </div>
        </div>
    )
}

export default UserSignUp