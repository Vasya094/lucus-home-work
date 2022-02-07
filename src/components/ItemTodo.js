import React from "react"
import { connect, useDispatch } from "react-redux"
import cx from "classnames"
import { deleteTodo, toggleTodo } from "../store/actions/todoActions"
import { Badge, CloseButton, ListGroup } from "react-bootstrap"

const ItemTodo = ({ todo }) => {
  const dispatch = useDispatch()
  const toggleTodoComp = (id) => {
    dispatch(toggleTodo(id))
  }

  const deleteTodoComp = (id) => {
    dispatch(deleteTodo(id))
  }

  return (
    <ListGroup.Item
      as='li'
      onClick={() => toggleTodoComp(todo.id)}
      className='d-flex justify-content-between align-items-start'
    >
      <span
        className={cx(
          "todo-item__text",
          todo && todo.completed && "todo-item__text--completed"
        )}
      >
        {todo.content}
      </span>
      <div>
        <span
          id='todo-item-smile'
          style={{
            verticalAlign: "super",
            height: "",
            backgroundColor: todo && todo.completed ? "greenyellow" : "blue",
          }}
          className={
            todo && todo.completed
              ? "smile-completed mr-2 todo-smile"
              : "mr-2 todo-smile"
          }
        >
          {todo && todo.completed ? "👌" : "👋"}{" "}
        </span>
        <CloseButton aria-label='Hide' onClick={() => deleteTodoComp(todo.id)}>
          X
        </CloseButton>
      </div>
    </ListGroup.Item>
  )
}

export default connect(null, { toggleTodo })(ItemTodo)
