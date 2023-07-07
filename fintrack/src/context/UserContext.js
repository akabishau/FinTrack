import { createContext, useState, useContext } from 'react'
import Cookies from 'js-cookie'

import { AuthContext } from './AuthContext'
const UserContext = createContext(null)

// wrapper component that provides the context to its children
export const UserProvider = (props) => {

    // set authUser state from cookie sync
    const cookie = Cookies.get('authenticatedUser')
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null)


    const { actions } = useContext(AuthContext)


    // actions
    const signIn = async (credentials) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(credentials)
        }


        const response = await fetch('/api/v1/auth/login', fetchOptions)
        if (response.status === 200) {
            const { user, token } = await response.json()
            actions.setToken(token)

            setAuthUser(user)
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
            return null
        } else if (response.status === 401 || response.status === 400) {
            const errorInfo = await response.json()
            return errorInfo
        } else if (response.status === 500) {
            console.log('ErrorLogin', response.status)
            const errorInfo = { status: 'Login Failed', msg: 'Something went wrong. Please try again later.'}
            return errorInfo
        }
    }


    const signOut = () => {
        setAuthUser(null)
        Cookies.remove('authenticatedUser')
    }


    return (
        <UserContext.Provider value={{ authUser, actions: { signIn, signOut } }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext