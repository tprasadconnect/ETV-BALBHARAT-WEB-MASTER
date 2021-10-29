import {
  USER_STORE_ACTION,
  USER_STORE_FAILURE_ACTION,
  USER_STORE_SUCCESS_ACTION,
} from './actionTypes';
import { UserStoreActionTypes } from './types';

export const initialUserStoreState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialUserStoreState,
  action: UserStoreActionTypes
) => {
  switch (action.type) {
    case USER_STORE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case USER_STORE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case USER_STORE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
