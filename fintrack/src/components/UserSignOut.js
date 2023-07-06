import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Navigate } from 'react-router-dom'



const UserSignOut = () => {
    const { actions } = useContext(UserContext)

    // takes a function to run when the component is rednered
    useEffect(() => actions.signOut())
    
    // navigate back to the home page and replace signout with root the history stack
    return <Navigate to='/' replace />

}

export default UserSignOut