import Modal from "react-bootstrap/Modal";
import ToDoForm from './ToDoForm'

export default function ToDoEdit( { showEdit, setShowEdit, toDo, getToDos } ) {
  return (
    <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}>
            <Modal.Header className='bg-purple' closeButton>
                <h3>Editing {toDo.name}</h3>
            </Modal.Header>
            <Modal.Body>
                <ToDoForm getToDos={getToDos} setShowEdit={setShowEdit} toDo={toDo} />
            </Modal.Body>
    </Modal>
  )
}