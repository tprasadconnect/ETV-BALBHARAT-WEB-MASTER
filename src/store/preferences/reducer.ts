import {
  PREFERENCES_ACTION,
  PREFERENCES_SUCCESS_ACTION,
  PREFERENCES_FAILURE_ACTION,
} from './actionTypes';
import { PreferencesActionTypes } from './types';

export const initialPreferencesState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialPreferencesState,
  action: PreferencesActionTypes
) => {
  switch (action.type) {
    case PREFERENCES_ACTION:
      return {
        ...state,
        loader: true,
      };
    case PREFERENCES_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case PREFERENCES_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
