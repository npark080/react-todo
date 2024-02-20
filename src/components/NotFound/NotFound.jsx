import image from '../../assets/images/confusedpepe.png'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className='notFound'>
      <div className="card shadow rounded">
        <img src={image} alt="Confused Pepe frog" className='py-3'/>
        <h1>Page Not Found</h1>
      </div>
    </div>
  )
}

