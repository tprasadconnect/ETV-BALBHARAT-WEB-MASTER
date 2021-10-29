import {
  LANGUAGE_ACTION,
  LANGUAGE_FAILURE_ACTION,
  LANGUAGE_SUCCESS_ACTION,
} from './actionTypes';
import { LanguageActionTypes } from './types';

export const initialLanguageState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialLanguageState, action: LanguageActionTypes) => {
  switch (action.type) {
    case LANGUAGE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case LANGUAGE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case LANGUAGE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
