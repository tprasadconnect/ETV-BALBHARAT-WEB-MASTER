import {
  TOONS_ACTION,
  TOONS_SUCCESS_ACTION,
  TOONS_FAILURE_ACTION,
} from './actionTypes';
import { ToonsActionTypes } from './types';

export const initialToonsState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialToonsState, action: ToonsActionTypes) => {
  switch (action.type) {
    case TOONS_ACTION:
      return { ...state, loader: true };
    case TOONS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case TOONS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
