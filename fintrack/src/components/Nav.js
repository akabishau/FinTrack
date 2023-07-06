import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'


const Nav = () => {
    const { authUser } = useContext(UserContext)

    return (
        <nav>
            {authUser ?
                <>
                    <span>Welcome {authUser.user.name}</span>
                    <Link className='settings' to='/settings'>Settings</Link>
                    <Link className='signout' to='/signout'>Sign out</Link>
                </>
                :
                <>
                    <span>Welcome Guest</span>
                    <Link className='signup' to='/signup'>Sign up</Link>
                    <Link className='signin' to='/signin'>Sign in</Link>
                </>
            }

        </nav>
    )
}

export default Nav