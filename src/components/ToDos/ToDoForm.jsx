import { useState, useEffect } from "react"
import { Formik, Field, Form } from "formik"
import { toDoSchema } from "../../utilities/validationSchemas"
import axios from "axios"

export default function ToDoForm( { toDo = '', setShowCreate, setShowEdit, getToDos } ) {
    const { toDoId, name, done, categoryId} = toDo || ''

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7040/api/Categories`).then(t => setCategories(t.data))
    }, []);

    const handleSubmit = (values) => {
        console.log(values)
        if (!toDo) {
            const newToDo = {
                name: values.name,
                done: false,
                categoryId: values.categoryId
            }

            axios.post(`https://localhost:7040/api/ToDos`, newToDo).then(() => {
                getToDos()
                setShowCreate(false)
            })
        }
        else {
            const taskToEdit = {
                toDoId: toDoId,
                name: values.name,
                done: done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7040/api/ToDos/${toDoId}`, taskToEdit).then(() => {
                setShowEdit(false)
                getToDos()
            })
        }
    }

  return (
    <Formik
       initialValues={{
        name: toDo ? name : '',
        done: toDo ? done : false,
        categoryId: toDo ? categoryId : ''
       }}
       validationSchema={toDoSchema}
       onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            <Form id='toDoForm'>
            <div className="form-group m-3">
                <Field name='name' className='form-control' placeholder='New Task' />
                {errors.name && touched.name ? (
                    <div className="text-danger">{errors.linkText}</div>
                ) : null}
            </div>
            <div className="form-group m-3">
            <Field as='select' className='form-control' name='categoryId'>
                        <option value='' disabled>
                            Category
                        </option>
                        {categories.map(cat => 
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>    
                        )}
                    </Field>
            </div>
            <div className="form-group m-3">
                <button className="btn btn-submit" type='submit'>Submit</button>
            </div>
        </Form>
        )}
    </Formik>
  )
}
