import { useAuth } from "../../contexts/AuthContext"
import { useState, useEffect } from "react"
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import CatEdit from "./CatEdit"
import axios from "axios"

export default function SingleCategory({ category, getCategories }) {
    const { categoryName, categoryDescription, categoryId } = category
    const { currentUser} = useAuth()
    const [showEdit, setShowEdit] = useState(false);
    const [toDos, setToDos] = useState([])

    useEffect(() => {
        axios.get(`https://localhost:7040/api/ToDos`).then(r => setToDos(r.data))
      }, []);

      const deleteCat = (id) => {
        if(window.confirm(`Are you sure you want to delete ${categoryName}?`)){
          if(toDos.filter(t => t.categoryId === id).length > 0){
            window.alert(`Error - Cannot delete the category ${categoryName} because it contains the following task(s):
            ${toDos.filter(t => t.categoryId === id).map(t => 
              `\n${t.name}`  
            )}\nPlease delete these tasks or reassign them to a different category before deleting ${categoryName}.`)
          } else {
              axios.delete(`https://localhost:7040/api/Categories/${id}`).then(() => getCategories())
          }
        }
      }
      
    return (
        <div className="singleCategory col-md-5 m-4 rounded shadow">
            <h3>{categoryName}</h3>
            <p>{categoryDescription}</p>
        {/* BEGIN EDIT UI */}
        {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
        <div>
            <button onClick={() => setShowEdit(true)} className="m-1 rounded button" id="editLink">
              <FaEdit />
            </button>
            <button onClick={() => deleteCat(categoryId)} className="m-1 rounded button" id="deleteLink">
              <FaTrashAlt />
            </button>
            {showEdit &&
            <CatEdit 
            category={category}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            getCategories={getCategories}
            />
        }
        </div>
        }
            {/* END EDIT UI */}
        </div>
    )
}
