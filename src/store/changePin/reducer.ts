import {
  CHANGE_PIN_ACTION,
  CHANGE_PIN_FAILURE_ACTION,
  CHANGE_PIN_SUCCESS_ACTION,
} from './actionTypes';
import { ChangePinActionTypes } from './types';

export const initialChangePinState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialChangePinState,
  action: ChangePinActionTypes
) => {
  switch (action.type) {
    case CHANGE_PIN_ACTION:
      return {
        ...state,
        loader: true,
      };
    case CHANGE_PIN_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case CHANGE_PIN_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
