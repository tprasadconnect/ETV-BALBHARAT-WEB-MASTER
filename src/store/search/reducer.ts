import {
  SEARCH_ACTION,
  SEARCH_FAILURE_ACTION,
  SEARCH_SUCCESS_ACTION,
} from './actionTypes';
import { SearchActionTypes } from './types';

export const initialSearchState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialSearchState, action: SearchActionTypes) => {
  switch (action.type) {
    case SEARCH_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SEARCH_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SEARCH_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
