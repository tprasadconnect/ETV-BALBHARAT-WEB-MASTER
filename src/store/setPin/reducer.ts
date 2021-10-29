import {
  SET_PIN_ACTION,
  SET_PIN_FAILURE_ACTION,
  SET_PIN_SUCCESS_ACTION,
} from './actionTypes';
import { SetPinActionTypes } from './types';

export const initialSetPinState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialSetPinState, action: SetPinActionTypes) => {
  switch (action.type) {
    case SET_PIN_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SET_PIN_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SET_PIN_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
