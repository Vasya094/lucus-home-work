import { ADD_TODO, TOGGLE_TODO, SET_FILTER, DELETE_TODO } from "../types/todoTypes"

let nextTodoId = 0


export const addTodo = (content) => (dispatch) => {
  dispatch({
    type: ADD_TODO,
    payload: {
      id: ++nextTodoId,
      content,
    },
  })
}
export const deleteTodo = (id) => (dispatch) => {
  dispatch({
    type: DELETE_TODO,
    payload: { id },
  })
}

export const toggleTodo = (id) => (dispatch) => {
    dispatch({
  type: TOGGLE_TODO,
  payload: { id },
})}

export const setFilter = (filter) => dispatch => dispatch({ type: SET_FILTER, payload: { filter } })
