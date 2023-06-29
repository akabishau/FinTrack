import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <GridLayout>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </GridLayout>
    )
}

export default Layout


const GridLayout = styled.div`
    display: grid;
    min-height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 1fr 50px;
    grid-template-areas:
    'header'
    'main'
    'footer';
    
`

const Content = styled.main`
    grid-area: main;
    background-color: #f4f4f4;
    border: 1px solid #333;
    padding: 10px;
`