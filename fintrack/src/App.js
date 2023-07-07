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
        <Route path='signup' element={<UserSignUp />} />
        <Route path='signin' element={<UserSignIn />} />
        <Route path='signout' element={<UserSignOut />} />
        <Route element={<PrivateRoute />}>
          <Route path='https://fintrackapp.onrender.com' element={<Dashboard />} />
          <Route path='create-transaction' element={<TransactionCreate />} />
          <Route path='transactions' element={<TransactionForm />} />
          <Route path='transactions/:id' element={<TransactionForm />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
