import {
  MAIN_CAT_ACTION,
  MAIN_CAT_FAILURE_ACTION,
  MAIN_CAT_SUCCESS_ACTION,
} from './actionTypes';
import { MainCatActionTypes } from './types';

export const initialMainCatState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialMainCatState, action: MainCatActionTypes) => {
  switch (action.type) {
    case MAIN_CAT_ACTION:
      return {
        ...state,
        loader: true,
      };
    case MAIN_CAT_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case MAIN_CAT_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
