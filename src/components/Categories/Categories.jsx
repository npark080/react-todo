import { useState, useEffect } from "react"
import axios from 'axios'
import SingleCategory from "./SingleCategory"
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from "./CatCreate"
import './Categories.css'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const { currentUser } = useAuth()
  const [showCreate, setShowCreate] = useState(false);

  const getCategories = () => {
    axios.get(`https://localhost:7040/api/Categories`).then(response => {
        console.log(response)
        setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <section className="categories background">
        <article>
            <h1 className="text-center">Dashboard</h1>
        </article>
        {/* BEGIN CREATE UI */}
        {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
          <div className="p-2 mb-3 text-center">
            {showCreate ?
              <>
                <button onClick={() => setShowCreate(false)} className="btn btn-cancel">
                  Cancel
                </button>
                <CatCreate setShowCreate={setShowCreate} getCategories={getCategories}/>
              </> :
              <button onClick={() => setShowCreate(true)} className="btn btn-submit">
                New Category
              </button>
            }
            </div>
        }
        {/* END CREATE UI */}
        <div className="container">
            <article className="categoriesGallery row justify-content-center text-center">
                    {/* READ UI BEGINS */}
                    {categories.map(c => 
                        <SingleCategory key={c.categoryId} category={c} getCategories={getCategories} />
                    )}
                    {/* READ UI ENDS */}
                    </article>
        </div>
    </section>
  )
}