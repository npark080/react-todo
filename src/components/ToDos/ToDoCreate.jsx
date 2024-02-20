import ToDoForm from './ToDoForm'

export default function ToDoCreate( { setShowCreate, getToDos } ) {
  return (
    <article className="createToDo m-2 text-white justify-content-center">
        <ToDoForm getToDos={getToDos} setShowCreate={setShowCreate} />
    </article>
  )
}
