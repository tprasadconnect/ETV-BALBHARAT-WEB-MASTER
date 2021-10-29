import {
  VIDEO_PREFERENCES_ACTION,
  VIDEO_PREFERENCES_SUCCESS_ACTION,
  VIDEO_PREFERENCES_FAILURE_ACTION,
} from './actionTypes';

interface VideoPreferencesAction {
  type: typeof VIDEO_PREFERENCES_ACTION;
  payload: any;
}

interface VideoPreferencesSuccessAction {
  type: typeof VIDEO_PREFERENCES_SUCCESS_ACTION;
  payload: any;
}

interface VideoPreferencesFailureAction {
  type: typeof VIDEO_PREFERENCES_FAILURE_ACTION;
  payload: any;
}

export type VideoPreferencesActionTypes =
  | VideoPreferencesAction
  | VideoPreferencesSuccessAction
  | VideoPreferencesFailureAction;
