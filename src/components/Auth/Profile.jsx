import { useAuth } from "../../contexts/AuthContext"
import './Auth.css'

export default function Profile() {
    const { currentUser } = useAuth()

  return (
    <span className='profile p-2'>
        {/* <img src={currentUser.photoURL} alt={currentUser.email + ' profile pic'} /> */}
        Hello{!currentUser.displayName ? '' : ' ' + currentUser.displayName.split(' ')[0]}!
    </span>
  )
}