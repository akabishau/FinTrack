//import { useContext } from 'react'
import { Link } from 'react-router-dom'

import Nav from './Nav'

const Header = () => {
    return (
        <div style={{ background: 'lightblue' }}>
            <div>
                <Link to='/'>
                    <h1>FinTrack</h1>
                </Link>
                <Nav />
            </div>
        </div>
    )
}

export default Header