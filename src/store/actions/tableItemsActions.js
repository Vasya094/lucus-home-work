import axios from "axios"
import {
  ITEMS_LIST_REQ,
  ITEMS_LIST_SUC,
  ITEMS_LIST_FAIL,
  TABLE_ITEM_INFO_REQ,
  TABLE_ITEM_INFO_SUC,
  TABLE_ITEM_INFO_FAIL,
  DELETE_ROW_ITEM_INFO_REQ,
  DELETE_ROW_ITEM_INFO_SUC,
  DELETE_ROW_ITEM_INFO_FAIL,
  ITEMS_DELETE_ITEM_SUC,
  UPDATE_ITEM_IN_TABLE,
  SAVE_UPDATED_ITEM_INFO_REQ,
  SAVE_UPDATED_ITEM_INFO_SUC,
  SAVE_UPDATED_ITEM_INFO_FAIL,
} from "../types/tableItemsTypes.js"

export const tableItemsList = () => async (dispatch) => {
  try {
    dispatch({ type: ITEMS_LIST_REQ })

    const { data } = await axios.get("http://127.0.0.1:3002/posts", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch({
      type: ITEMS_LIST_SUC,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ITEMS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const tableItenDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TABLE_ITEM_INFO_REQ })
    let data = []
    try {
      const resultsData = await axios.get(`http://127.0.0.1:3002/posts/${id}`)
      data = resultsData.data
    } catch (e) {
      console.log(e)
    }
    dispatch({
      type: TABLE_ITEM_INFO_SUC,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TABLE_ITEM_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveUpdatedItem = (post) => async (dispatch) => {
  try {
    dispatch({ type: SAVE_UPDATED_ITEM_INFO_REQ })
    let data
    if (!post.newItem) {
      const result = await await axios.put(
        `http://127.0.0.1:3002/posts/${post.id}`,
        post
      )
      data = result.data
    } else {
      delete post.newItem
      const result = await axios.post(
        `http://127.0.0.1:3002/posts`,
        {...post}
      )
      data = result.data
    }
    dispatch({
      type: TABLE_ITEM_INFO_SUC,
      payload: data,
    })
    dispatch(tableItemsList())
  } catch (error) {
    dispatch({
      type: SAVE_UPDATED_ITEM_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const tableItemInForm = (key, value) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM_IN_TABLE,
    payload: { key, value },
  })
}

export const rowItemDelete = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ROW_ITEM_INFO_REQ,
    })
    await axios.delete(`http://127.0.0.1:3002/posts/${id}`)
    dispatch({
      type: ITEMS_DELETE_ITEM_SUC,
      payload: { id },
    })
  } catch (error) {
    dispatch({
      type: DELETE_ROW_ITEM_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
