import {
  SET_WATCHED_LIST_ACTION,
  SET_WATCHED_LIST_FAILURE_ACTION,
  SET_WATCHED_LIST_SUCCESS_ACTION,
} from './actionTypes';
import { SetWatchedListActionTypes } from './types';

export const initialSetWatchedListState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSetWatchedListState,
  action: SetWatchedListActionTypes
) => {
  switch (action.type) {
    case SET_WATCHED_LIST_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SET_WATCHED_LIST_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SET_WATCHED_LIST_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
