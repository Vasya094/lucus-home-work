import { PHOTOS_GET_SUC } from '../types/photosType'
import { PHOTOS_GET_REQ } from '../types/photosType'
import { PHOTOS_GET_FAIL} from '../types/photosType'

export const photosReducer = (state = { photos: [] }, action) => {
    switch (action.type) {
      case PHOTOS_GET_REQ:
        return { loading: true, products: [] };
      case PHOTOS_GET_SUC:
        return {
          loading: false,
          photos: action.payload,
        };
      case PHOTOS_GET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };