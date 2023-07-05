import styled from 'styled-components'
import { Link } from 'react-router-dom'
//import NavBar from './NavBar'

const Header = () => {
    return (
        <Wrapper>
            <Navigation>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/transactions">Transactions</StyledLink>
                <StyledLink to="/about">About</StyledLink>
            </Navigation>
        </Wrapper>
    )
}

export default Header

const Wrapper = styled.header`
    grid-area: header;
    background-color: #333;
    padding: 10px;
    text-align: center;
`

const Navigation = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: left;
    color: #fff;
    align-items: center;
    padding: 0 1rem;
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