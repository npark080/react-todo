import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'
import SingleToDo from './SingleToDo'
import './ToDos.css'
import FilterCat from './FilterCat'
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'
import './ToDos.css'

export default function ToDos() {
  const [toDos, setToDos] = useState([])
  const { currentUser } = useAuth()
  const [showCreate, setShowCreate] = useState();
  const [filter, setFilter] = useState(0)
  const [showDone, setShowDone] = useState(false)

    const getToDos = () => {
        axios.get(`https://localhost:7040/api/ToDos`).then(response => {
            console.log(response)
            setToDos(response.data)
        })
    }

useEffect(() => {
    getToDos()
}, []);

return (
  <section className="todos background">
    <article>
      <h1 className='text-center'>To Do</h1>
    </article>
    {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
      <div className="p-2 mb-3 text-center">
        {!showCreate ?
          <button className="btn btn-submit" onClick={() => setShowCreate(true)}>
            New Task
          </button> :
          <button className="btn btn-cancel" onClick={() => setShowCreate(false)}>
            Cancel
        </button>
        }
        {showCreate &&
          <div className="createContainer w-75 m-auto">
              <ToDoCreate getToDos={getToDos} setShowCreate={setShowCreate} />
          </div>
        }
      </div>
    }
    <div className='todo-card'>
    <FilterCat setFilter={setFilter} showDone={showDone} setShowDone={setShowDone} />
    <Container className='pt-4 text-center'>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>Task</th>
            <th>Category</th>
            {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL &&
              <th>Actions</th>
            }
          </tr>
        </thead>
        <tbody>
          {!showDone ?
            <>
             {filter === 0 ? toDos.filter(t => t.done === false).map(t =>
              <SingleToDo key={t.toDoId} toDo={t} getToDos={getToDos}/>
              ) :
              toDos.filter(t => t.done === false && t.categoryId === filter).map(t =>
                <SingleToDo key={t.toDoId} toDo={t} getToDos={getToDos} />
            )}
          </> :
          <>
            {filter === 0 ? toDos.map(t =>
                <SingleToDo key={t.toDoId} toDo={t} getToDos={getToDos}/>
              ) :
              toDos.filter(t => t.categoryId === filter).map(t =>
                <SingleToDo key={t.toDoId} toDo={t} getToDos={getToDos} />
            )}
          </>
          }
        </tbody>
      </Table>
          {!showDone ?
          <>
          {filter !== 0 && toDos.filter(x => x.done === false && x.categoryId === filter).length === 0 &&
            <h2 className="text-center status">
              There are no incomplete tasks in this category.
            </h2>
          }
          </> :
          <>
            {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
            <h2 className="text-center status">
              There are no tasks in this category.
            </h2>
          }
          </>
          }
    </Container>        
    </div>
      
  </section>
)
}
