import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const PrivateRoute = () => {
    
    const { authUser } = useContext(UserContext)


    const location = useLocation()
    console.log('private route', location.pathname, authUser ? authUser.name : null)

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to='/signin' state={{from: location.pathname }} />
    }
}

export default PrivateRoute