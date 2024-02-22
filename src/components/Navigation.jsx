import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Profile from './Auth/Profile'
import gif from '../assets/images/pepe-cute.gif'
import image from '../assets/images/pepe-stale.png'

export default function Navigation() {
  const { currentUser } = useAuth()

  return (
    <Navbar expand='md' bg='dark' data-bs-theme='dark'>
        {currentUser &&
        <Navbar.Brand href='/'><img className='pepe' src={gif} alt="pepe the frog" /></Navbar.Brand>
        }
        {!currentUser &&
          <Navbar.Brand href='/'><img className='pepe' src={image} alt="pepe frog dancing" /></Navbar.Brand>
        } 
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
        <Nav className='text-center p-3'>
          {currentUser &&
            <p className='profile'><Profile /></p>
          }

          <Link to='/categories' className="nav-link">Categories</Link>
          <Link to='/todos' className="nav-link">ToDo</Link>
          {/* <Link to='/about' className="nav-link">About</Link> */}

          {!currentUser &&
            <Link to='/login' className="nav-link">Login</Link>
          }
          {currentUser &&
            <Link to='/logout' className="nav-link">Logout</Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}