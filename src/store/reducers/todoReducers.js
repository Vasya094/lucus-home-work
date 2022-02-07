import {
  ADD_TODO,
  TOGGLE_TODO,
  VISIBILITY_FILTERS,
  SET_FILTER,
  DELETE_TODO,
} from "../types/todoTypes"

const initialState = {
  allIds: [],
  byIds: {},
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false,
          },
        },
      }
    }
    case TOGGLE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed,
          },
        },
      }
    }
    case DELETE_TODO: {
        const { id } = action.payload
        let newbyIds = state.byIds
        delete newbyIds[id]
        return {
            ...state,
            byIds: newbyIds
          }
    }
    default:
      return state
  }
}

const initialStateFilter = VISIBILITY_FILTERS.ALL

export const visibilityFilter = (state = initialStateFilter, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter
    }
    default: {
      return state
    }
  }
}

