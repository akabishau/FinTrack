import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'


const Nav = () => {
    
    const { authUser } = useContext(UserContext)

    return (
        <nav>
            {authUser ?
                <>
                    <span>Logged in as {authUser.user.name}</span>
                    <Link to='/settings'>Settings</Link>
                    <Link to='/signout'>Sign out</Link>
                </>
                :
                <>
                    <span>Welcome Guest</span>
                    <Link to='/signup'>Sign up</Link>
                    <Link to='/signin'>Sign in</Link>
                </>
            }

        </nav>
    )
}

export default Nav