import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import TransactionsPage from './pages/Transactions'
import TransactionPage from './pages/Transaction'
import AboutPage from './pages/About'
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar'


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/transactions' element={<TransactionsPage />} />
            <Route path='/transactions/:transactionId' element={<TransactionPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
