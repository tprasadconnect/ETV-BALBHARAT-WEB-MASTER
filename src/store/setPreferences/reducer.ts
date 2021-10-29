import {
  SET_PREFERENCES_ACTION,
  SET_PREFERENCES_SUCCESS_ACTION,
  SET_PREFERENCES_FAILURE_ACTION,
} from './actionTypes';
import { SetPreferencesActionTypes } from './types';

export const initialSetPreferencesState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSetPreferencesState,
  action: SetPreferencesActionTypes
) => {
  switch (action.type) {
    case SET_PREFERENCES_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SET_PREFERENCES_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SET_PREFERENCES_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
