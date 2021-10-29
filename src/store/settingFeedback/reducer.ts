import {
  SETTING_FEEDBACK_ACTION,
  SETTING_FEEDBACK_FAILURE_ACTION,
  SETTING_FEEDBACK_SUCCESS_ACTION,
} from './actionTypes';
import { SettingFeedbackActionTypes } from './types';

export const initialSettingFeedbackState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSettingFeedbackState,
  action: SettingFeedbackActionTypes
) => {
  switch (action.type) {
    case SETTING_FEEDBACK_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SETTING_FEEDBACK_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SETTING_FEEDBACK_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
