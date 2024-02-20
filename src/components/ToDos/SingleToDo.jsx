import { useState } from 'react'
import axios from 'axios'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import ToDoEdit from './ToDoEdit'

export default function SingleToDo( { toDo, getToDos } ) {
  const { name, toDoId, done, categoryId } = toDo
  const [showEdit, setShowEdit] = useState(false)
   const { currentUser } = useAuth()

    const flipDone = () => {
        let updatedToDo = {
            toDoId: toDoId,
            name: toDo.name,
            done: !done,
            categoryId: categoryId
        }
        axios.put(`https://localhost:7040/api/ToDos/${toDoId}`, updatedToDo).then(response => {
            console.log(response)
            getToDos()
        })
    }

    const deleteToDo = (id) => {
        if(window.confirm(`Are you sure you want to delete ${name}?`)) {
            axios.delete(`https://localhost:7040/api/ToDos/${id}`).then(() => {getToDos()})
        }
    }

  return (
    <tr>
        <td>
            <input className='checkbox justify-content-center' type='checkbox' checked={done} onChange={() => flipDone()} />
        </td>
        <td>{name}</td>
        <td>{toDo.category.categoryName}</td>
        {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
            <td className='text-center'>
                <button className="fs-5 rounded" id='editLink' onClick={() => setShowEdit(true)}>
                    <FaEdit />
                </button>
                &emsp;
                <button className='fs-5 rounded' id='deleteLink' onClick={() => deleteToDo(toDoId)}>
                    <FaTrashAlt />
                </button>
                {showEdit &&
                    <ToDoEdit
                        toDo={toDo}
                        getToDos={getToDos}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit} />
                }
            </td>
        }
    </tr>
  )
}