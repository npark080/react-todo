import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Card from "react-bootstrap/Card"
import Profile from './Profile'

import image from '../../assets/images/pepe-bye.gif'

export default function Logout() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleAuth() {
        logout()
        navigate('/')
    }

    async function nvm() {
        return navigate('/')
      }

  return (
    <div className='log'>
    <Card className="shadow">
        <Card.Header>
            <h2>Goodbye</h2>
        </Card.Header>
        <Card.Body>
            <img src={image} alt="Pepe frog leaving" className='py-3'/>
            <h5>Have a good one!</h5>
            <button className="btn btn-login m-2" onClick={() => handleAuth()}>
                Logout
            </button>
            <button className="btn btn-nvm m-2" onClick={() => nvm()}>
                No wait...
            </button>
        </Card.Body>
    </Card>
    </div>
  )
}
    <div className='logout text-center p-3 bg-dark text-white'>
        <Profile />
        <button onClick={() => handleAuth()} className="btn btn-info">
            Logout
        </button>
    </div>