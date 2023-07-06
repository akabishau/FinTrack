import { createContext, useState } from 'react'
import Cookies from 'js-cookie'

const UserContext = createContext(null)

export const UserProvider = (props) => {
    const cookie = Cookies.get('authenticatedUser') // will be undefined if no cookie exists
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null)

    const signIn = async (credentials) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(credentials)
        }

        // returns a user object if successful, null if not
        const response = await fetch('/api/v1/auth/login', fetchOptions)
        if (response.status === 200) {
            const user = await response.json()
            setAuthUser(user)
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
            return user
        } else if (response.status === 401) {
            return null
        } else {
            throw new Error()
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