import {
  GET_PAGE_ACTION,
  GET_PAGE_SUCCESS_ACTION,
  GET_PAGE_FAILURE_ACTION,
} from './actionTypes';
import { GetPageActionTypes } from './types';

export const initialGetPageAction = {
  loader: false,
  error: null,
  data: null,
};
export default (state = initialGetPageAction, action: GetPageActionTypes) => {
  switch (action.type) {
    case GET_PAGE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case GET_PAGE_SUCCESS_ACTION:
      return {
        ...state,
        loader: false,
        data: action.payload.data,
      };
    case GET_PAGE_FAILURE_ACTION:
      return {
        ...state,
        loader: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
