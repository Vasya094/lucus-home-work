import React, { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addTodo } from "../store/actions/todoActions"

const AddTodo = () => {
  const [textTodo, setTextTodo] = useState("")
  const dispatch = useDispatch()
  const handleAddTodo = () => {
    if (textTodo) {
      dispatch(addTodo(textTodo))
      setTextTodo("")
    }
  }

  return (
    <div>
      <Form.Control onChange={(e) => setTextTodo(e.target.value)} value={textTodo} />
      <Button className='add-todo my-3' onClick={handleAddTodo}>
        Add Todo
      </Button>
    </div>
  )
}

// export default connect(null, { addTodo })(AddTodo)
export default AddTodo
