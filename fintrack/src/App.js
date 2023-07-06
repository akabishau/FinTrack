import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import Header from './components/Header'
import UserSignUp from './components/UserSignUp'
import UserSignIn from './components/UserSignIn'
import UserSignOut from './components/UserSignOut'
import Authenticated from './components/Authenticated'
import Settings from './components/Settings'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<UserSignUp />} />
        <Route path='signin' element={<UserSignIn />} />
        <Route path='signout' element={<UserSignOut />} />
        <Route element={<PrivateRoute />}>
          <Route path='authenticated' element={<Authenticated />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
