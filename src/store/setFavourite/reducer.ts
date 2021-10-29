import {
  SET_FAVOURITE_ACTION,
  SET_FAVOURITE_FAILURE_ACTION,
  SET_FAVOURITE_SUCCESS_ACTION,
} from './actionTypes';
import { SetFavouriteActionTypes } from './types';

export const initialSetFavouriteState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSetFavouriteState,
  action: SetFavouriteActionTypes
) => {
  switch (action.type) {
    case SET_FAVOURITE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SET_FAVOURITE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SET_FAVOURITE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
