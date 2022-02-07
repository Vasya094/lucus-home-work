import React from "react"
import TodoList from "../TodoList"
import AddTodoForm from "../AddTodoForm"

const Todo = () => {
  return (
    <div style={{ position: "absolute", top: "0", width: "70vw" }}>
      <div className='container bg-white p-4 mt-5'>
        <h1>My Todo List</h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </div>
  )
}

export default Todo
