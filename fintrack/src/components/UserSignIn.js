import { useContext, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ErrorsDisplay from './ErrorsDisplay'
import UserContext from '../context/UserContext'

const UserSignIn = () => {

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

    // get the location state object passed from the PrivateRoute component or set it to the root path
    // let from = location.state ? location.state.from : '/'

    const credentials = {
      email: email.current.value,
      password: password.current.value
    }

    try {
      const errorInfo = await actions.signIn(credentials)
      
      if (!errorInfo) {
        // navigate to the previous page or the root/dashboard
        // TODO: review - wasn't working after deployment
        //navigate(from, { replace: true })
        navigate('/')
      } else {
        setErrors([errorInfo.status, errorInfo.msg])
      }
    } catch (error) {
      console.log(error.message)
      // error route is redirected to not found for now
      navigate('/error') 
    }
  }

  return (
    <div>
      <div>
        <h1>Sign in</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <input id='email' name='email' type='text' ref={email} placeholder='Email' />
            <input id='password' name='password' type='password' ref={password} placeholder='Password' />
            <button type='submit'>Sign in</button>
          </form>
        </div>
        <p>
          Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!
        </p>
      </div>
    </div>
  )
}

export default UserSignIn