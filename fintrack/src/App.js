import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import TransactionsPage from './pages/Transactions'
import TransactionPage from './pages/Transaction'
import AboutPage from './pages/About'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
          <Route path='/transactions/:transactionId' element={<TransactionPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
