//import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import styled from 'styled-components'

// import Nav from './Nav'

const Header = () => {
    const { authUser } = useContext(UserContext)

    return (
        <Wrapper>
            <StyledLink to='/'><h1>FinTrack</h1></StyledLink>
            <Navigation>
                {authUser ?
                    <>
                        <span>Logged in as {authUser.name}</span>
                        <StyledLink to='/settings'>Settings</StyledLink>
                        <StyledLink to='/signout'>Sign out</StyledLink>
                    </>
                    :
                    <>
                        <span>Welcome Guest</span>
                        <StyledLink to='/signup'>Sign up</StyledLink>
                        <StyledLink to='/signin'>Sign in</StyledLink>
                    </>
                }
            </Navigation >
        </Wrapper >
    )
}

const Wrapper = styled.header`
    background-color: #333;
    color: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1rem;
    text-align: left;
`

const Navigation = styled.nav`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    align-items: left;
    color: #fff;
    align-items: center;
`

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    padding: 0 1rem;
    &:hover {
        color: #fff;
        text-decoration: underline;
    }
`

export default Header