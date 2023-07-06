import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const PrivateRoute = () => {

    const { authUser } = useContext(UserContext)
    console.log('private routhe', authUser)

    const location = useLocation()
    console.log(location)

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to='/signin' state={{from: location.pathname }} />
    }
}

export default PrivateRoute