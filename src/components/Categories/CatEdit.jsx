import Modal from 'react-bootstrap/Modal'
import CatForm from './CatForm'

export default function CatEdit({ category, showEdit, setShowEdit, getCategories }) {
const { categoryName } = category

  return (
    <Modal
    show={showEdit}
    onHide={() => setShowEdit(false)}
    size='lg'>
    <Modal.Header closeButton>
        <h2>Editing {categoryName}</h2>
    </Modal.Header>
    <Modal.Body>
        <CatForm category={category} setShowEdit={setShowEdit} getCategories={getCategories} />
    </Modal.Body>
    </Modal>
  )
}