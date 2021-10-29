import {
  SELECT_LANGUAGE_ACTION,
  SELECT_LANGUAGE_FAILURE_ACTION,
  SELECT_LANGUAGE_SUCCESS_ACTION,
} from './actionTypes';
import { SelectLanguageActionTypes } from './types';

export const initialSelectLanguageActionState = {
  loader: false,
  data: {
    lang_id: null,
    lang_name: null,
    lang_name_en: null,
    lang_image: null,
  },
  error: null,
};

export default (
  state = initialSelectLanguageActionState,
  action: SelectLanguageActionTypes
) => {
  switch (action.type) {
    case SELECT_LANGUAGE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SELECT_LANGUAGE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SELECT_LANGUAGE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
