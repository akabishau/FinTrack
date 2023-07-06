import { useContext, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
//import ThemeContext from '../context/ThemeContext'
import ErrorsDisplay from './ErrorsDisplay'


import UserContext from '../context/UserContext'

const UserSignIn = () => {
  //const { accentColor } = useContext(ThemeContext)
  const { actions } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation() // contains the state object passed from the PrivateRoute component
  console.log(location)

  // State
  const email = useRef(null)
  const password = useRef(null)
  const [errors, setErrors] = useState([]) // used to display errors

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault()

    let from = location.state ? location.state.from : '/authenticated'
    console.log(from)

    const credentials = {
      email: email.current.value,
      password: password.current.value
    }

    try {
      const user = await actions.signIn(credentials)
      if (user) {
        console.log(user)
        navigate(from, { replace: true })
      } else {
        setErrors(['Sign-in was unsuccessful'])
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
        <h1>Sign in</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
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
              <button className='button' type='submit' style={{ background: '' }}>Sign in</button>
              <button className='button button-secondary' style={{ color: '' }} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>
          Don't have a user account? <Link style={{ color: '' }} to='/signup'>Click here</Link> to sign up!
        </p>
      </div>
    </div>
  )
}

export default UserSignIn