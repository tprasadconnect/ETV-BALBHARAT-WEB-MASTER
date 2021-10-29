import {
  REGISTRATION_ACTION,
  REGISTRATION_SUCCESS_ACTION,
  REGISTRATION_FAILURE_ACTION,
} from './actionTypes';
import { RegisterActionTypes } from './types';

export const initialRegisterState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialRegisterState, action: RegisterActionTypes) => {
  switch (action.type) {
    case REGISTRATION_ACTION:
      return {
        ...state,
        loader: true,
      };
    case REGISTRATION_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case REGISTRATION_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
