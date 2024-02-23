import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Card from "react-bootstrap/Card"

import image from '../../assets/images/pepe-wave.gif'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleAuth() {
    await login()
    return navigate('/Categories')
  }

  return (
    <div className='log'>
        <Card className="shadow">
            <Card.Header>
                <h2>Hi there!</h2>
            </Card.Header>
            <Card.Body>
                <img src={image} alt="Pepe frog waving" className='py-3'/>
                <h5>Login with GitHub to get started:</h5>
                <button className="btn btn-login m-3" onClick={() => handleAuth()}>
                    Let's Go!
                </button>
            </Card.Body>
        </Card>
    </div>
  )
}