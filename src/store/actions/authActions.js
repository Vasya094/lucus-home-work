import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../types/authTypes.js"
import { auth } from "../../firebase.js"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })
    localStorage.setItem("userInfo", JSON.stringify(user))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
  await auth.signOut()
  dispatch({ type: USER_LOGOUT })
}

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: user,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })
    localStorage.setItem("userInfo", JSON.stringify(user))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
