import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(null)

    // load token from cookie when component mounts
    useEffect(() => {
        const storedToken = Cookies.get('authToken')
        if (storedToken) {
            setAuthToken(storedToken)
        }
    }, [])

    
    const setToken = (newToken) => {
        setAuthToken(newToken)
        Cookies.set('authToken', newToken, { expires: 7 })
    }

    const removeToken = () => {
        setAuthToken(null)
        Cookies.remove('authToken')
    }


    return (
        <AuthContext.Provider value={{ authToken, actions: { setToken, removeToken } }}>
            {children}
        </AuthContext.Provider>
    )
}