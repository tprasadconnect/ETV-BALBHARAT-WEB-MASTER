import {
  CHANGE_PASSWORD_ACTION,
  CHANGE_PASSWORD_SUCCESS_ACTION,
  CHANGE_PASSWORD_FAILURE_ACTION,
} from './actionTypes';

import { ChangePasswordActionTypes } from './types';

export const initialChangePasswordState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialChangePasswordState,
  action: ChangePasswordActionTypes
) => {
  switch (action.type) {
    case CHANGE_PASSWORD_ACTION:
      return {
        ...state,
        loader: true,
      };
    case CHANGE_PASSWORD_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case CHANGE_PASSWORD_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
