import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import Header from './components/Header'
import UserSignUp from './components/UserSignUp'
import UserSignIn from './components/UserSignIn'
import UserSignOut from './components/UserSignOut'
import Settings from './components/Settings'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import TransactionCreate from './components/TransactionCreate'
import TransactionForm from './components/TransactionForm'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='https://fintrackapp.onrender.com/signup' element={<UserSignUp />} />
        <Route path='https://fintrackapp.onrender.com/signin' element={<UserSignIn />} />
        <Route path='https://fintrackapp.onrender.com/signout' element={<UserSignOut />} />
        <Route element={<PrivateRoute />}>
          <Route path='https://fintrackapp.onrender.com' element={<Dashboard />} />
          <Route path='https://fintrackapp.onrender.com/create-transaction' element={<TransactionCreate />} />
          <Route path='https://fintrackapp.onrender.com/transactions' element={<TransactionForm />} />
          <Route path='https://fintrackapp.onrender.com/transactions/:id' element={<TransactionForm />} />
          <Route path='https://fintrackapp.onrender.com/settings' element={<Settings />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
