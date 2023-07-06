import { useContext } from 'react'
import UserContext from '../context/UserContext'

const Dashboard = () => {

  const { authUser } = useContext(UserContext)

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h3>{ authUser.name } is Authenticated.</h3>
      </div>
    </div>
  )




  
}

export default Dashboard