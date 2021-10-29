import {
  FAVOURITE_ACTION,
  FAVOURITE_FAILURE_ACTION,
  FAVOURITE_SUCCESS_ACTION,
} from './actionTypes';
import { FavouriteActionTypes } from './types';

export const initialFavouriteState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialFavouriteState,
  action: FavouriteActionTypes
) => {
  switch (action.type) {
    case FAVOURITE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case FAVOURITE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case FAVOURITE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
