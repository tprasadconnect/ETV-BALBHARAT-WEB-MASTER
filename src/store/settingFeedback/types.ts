import {
  SETTING_FEEDBACK_ACTION,
  SETTING_FEEDBACK_SUCCESS_ACTION,
  SETTING_FEEDBACK_FAILURE_ACTION,
} from './actionTypes';

interface SettingFeedbackAction {
  type: typeof SETTING_FEEDBACK_ACTION;
  payload: any;
}

interface SettingFeedbackSuccessAction {
  type: typeof SETTING_FEEDBACK_SUCCESS_ACTION;
  payload: any;
}

interface SettingFeedbackFailureAction {
  type: typeof SETTING_FEEDBACK_FAILURE_ACTION;
  payload: any;
}

export type SettingFeedbackActionTypes =
  | SettingFeedbackAction
  | SettingFeedbackSuccessAction
  | SettingFeedbackFailureAction;
