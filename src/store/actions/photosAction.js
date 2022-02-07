import axios from "axios"
import { PHOTOS_GET_SUC } from "../types/photosType"
import { PHOTOS_GET_REQ } from "../types/photosType"
import { PHOTOS_GET_FAIL } from "../types/photosType"

export const getPhotos = (textToSearch) => async (dispatch) => {
  try {
    dispatch({
      type: PHOTOS_GET_REQ,
    })
    const url = `https://api.unsplash.com/search/photos?page=1&query=${textToSearch}&client_id=wkNcgcrnrWLyyO_ne5OMDTcFJ2G7B2JeodFK1Ax8OwE&per_page=20`
    const { data } = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    dispatch({
      type: PHOTOS_GET_SUC,
      payload: data.results,
    })
  } catch (error) {
    dispatch({
      type: PHOTOS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
