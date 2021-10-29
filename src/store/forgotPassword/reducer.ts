import {
  FORGOT_PASSWORD_ACTION,
  FORGOT_PASSWORD_FAILURE_ACTION,
  FORGOT_PASSWORD_SUCCESS_ACTION,
} from './actionTypes';
import { ForgotPasswordActionTypes } from './types';

export const initialForgotPasswordState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialForgotPasswordState,
  action: ForgotPasswordActionTypes
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_ACTION:
      return {
        ...state,
        loader: true,
      };
    case FORGOT_PASSWORD_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case FORGOT_PASSWORD_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
