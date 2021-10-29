import {
  VIDEO_PREFERENCES_ACTION,
  VIDEO_PREFERENCES_SUCCESS_ACTION,
  VIDEO_PREFERENCES_FAILURE_ACTION,
} from './actionTypes';
import { VideoPreferencesActionTypes } from './types';

export const initialVideoPreferencesState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialVideoPreferencesState,
  action: VideoPreferencesActionTypes
) => {
  switch (action.type) {
    case VIDEO_PREFERENCES_ACTION:
      return {
        ...state,
        loader: true,
      };
    case VIDEO_PREFERENCES_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case VIDEO_PREFERENCES_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
