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
  SAVE_UPDATED_ITEM_INFO_REQ,
  SAVE_UPDATED_ITEM_INFO_SUC,
  SAVE_UPDATED_ITEM_INFO_FAIL,
  ITEMS_DELETE_ITEM_SUC,
  UPDATE_ITEM_IN_TABLE,
} from "../types/tableItemsTypes.js"

export const tableItemsReducer = (state = { tableItems: [] }, action) => {
  switch (action.type) {
    case ITEMS_LIST_REQ:
      return { loading: true, tableItems: [] }

    case ITEMS_LIST_SUC:
      return {
        loading: false,
        tableItems: action.payload,
      }
    case ITEMS_DELETE_ITEM_SUC:
      const { id } = action.payload
      const tableItems = state.tableItems.filter((item) => item.id !== id)

      return {
        loading: false,
        tableItems,
      }
    case ITEMS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tableItemReducer = (state = { itemInfo: {} }, action) => {
  switch (action.type) {
    case TABLE_ITEM_INFO_REQ:
      return { loading: true, itemInfo: {} }
    case TABLE_ITEM_INFO_SUC:
      return {
        loading: false,
        itemInfo: action.payload,
      }
    case TABLE_ITEM_INFO_FAIL:
      return { loading: false, error: action.payload }
    case SAVE_UPDATED_ITEM_INFO_REQ:
      return { loading: true, itemInfo: {} }
    case SAVE_UPDATED_ITEM_INFO_SUC:
      return {
        loading: false,
        itemInfo: action.payload,
      }
    case SAVE_UPDATED_ITEM_INFO_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_ITEM_IN_TABLE:
      const { key, value } = action.payload
      let newItemInfo = Object.assign(state.itemInfo, { [key]: value })
      return { loading: false, itemInfo: newItemInfo }
    default:
      return state
  }
}

// export const deleteRowItemtReducer = ( state = {} , action ) => {
//     switch (action.type) {
//       case DELETE_ROW_ITEM_INFO_REQ:
//         return {loading: true}
//       case DELETE_ROW_ITEM_INFO_SUC:
//         return {loading: false, success: true}
//       case DELETE_ROW_ITEM_INFO_FAIL:
//         return {loading: false, error: action.payload}
//        default:
//         return state
//     }
//   }
