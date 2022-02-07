import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/authReducer.js";
import { photosReducer } from "./reducers/photosReducers.js";
import { deleteRowItemtReducer, tableItemReducer, tableItemsReducer } from "./reducers/tableItemsReducer.js";
import { todoReducer, visibilityFilter } from "./reducers/todoReducers.js";

const reducer = combineReducers( {
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  tableItems: tableItemsReducer,
  todos: todoReducer,
  todoFilters: visibilityFilter,
  photosList: photosReducer,
  itemFormInfo: tableItemReducer,
} )


const userInfoFromLocalStorage = localStorage.getItem("userInfo")
 ? JSON.parse(localStorage.getItem("userInfo"))
 : null;


const initialState = {
 userLogin: {userInfo: userInfoFromLocalStorage}
}


const store = createStore( reducer, initialState, applyMiddleware(thunk) ) 

export default store