import {
  LOGIN_ACTION,
  LOGIN_FAILURE_ACTION,
  LOGIN_SUCCESS_ACTION,
} from './actionTypes';
import { LoginActionTypes } from './types';

export const initialLoginState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialLoginState, action: LoginActionTypes) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        loader: true,
      };
    case LOGIN_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case LOGIN_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
