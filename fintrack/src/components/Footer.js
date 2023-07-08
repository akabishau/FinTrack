import styled from 'styled-components'

const Footer = () => {
    return <FooterContainer>This is the footer</FooterContainer>
}

export default Footer

const FooterContainer = styled.footer`
    grid-area: footer;
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
`