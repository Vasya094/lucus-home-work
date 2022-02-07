import React from "react"
import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import ItemTodo from "./ItemTodo"

const TodoList = () => {
  const todosInfo = useSelector((state) => state.todos)
  const { byIds } = todosInfo
  return (
    <ul className='todo-list'>
      {byIds ? Object.keys(byIds).map((todoKey) => {
            return (
              <ListGroup key={byIds}>
                <ItemTodo
                  key={`todo-${todoKey}`}
                  todo={{ ...byIds[todoKey], id: todoKey }}
                ></ItemTodo>
              </ListGroup>
            )
          })
        : "No todos, yay!"}
    </ul>
  )
}

export default TodoList
