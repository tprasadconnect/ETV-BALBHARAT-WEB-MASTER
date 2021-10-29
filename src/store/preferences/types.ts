import {
  PREFERENCES_ACTION,
  PREFERENCES_SUCCESS_ACTION,
  PREFERENCES_FAILURE_ACTION,
} from './actionTypes';

interface PreferencesAction {
  type: typeof PREFERENCES_ACTION;
  payload: any;
}

interface PreferencesSuccessAction {
  type: typeof PREFERENCES_SUCCESS_ACTION;
  payload: any;
}

interface PreferencesFailureAction {
  type: typeof PREFERENCES_FAILURE_ACTION;
  payload: any;
}

export type PreferencesActionTypes =
  | PreferencesAction
  | PreferencesSuccessAction
  | PreferencesFailureAction;
