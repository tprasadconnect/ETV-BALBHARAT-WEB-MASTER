import {
  FAQ_ACTION,
  FAQ_FAILURE_ACTION,
  FAQ_SUCCESS_ACTION,
} from './actionTypes';
import { FaqActionTypes } from './types';

export const initialFaqState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialFaqState, action: FaqActionTypes) => {
  switch (action.type) {
    case FAQ_ACTION:
      return {
        ...state,
        loader: true,
      };
    case FAQ_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case FAQ_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
