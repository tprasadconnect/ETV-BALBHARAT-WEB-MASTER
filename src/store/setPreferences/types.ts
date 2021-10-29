import {
  SET_PREFERENCES_ACTION,
  SET_PREFERENCES_SUCCESS_ACTION,
  SET_PREFERENCES_FAILURE_ACTION,
} from './actionTypes';

interface SetPreferencesAction {
  type: typeof SET_PREFERENCES_ACTION;
  payload: any;
}

interface SetPreferencesSuccessAction {
  type: typeof SET_PREFERENCES_SUCCESS_ACTION;
  payload: any;
}

interface SetPreferencesFailureAction {
  type: typeof SET_PREFERENCES_FAILURE_ACTION;
  payload: any;
}

export type SetPreferencesActionTypes =
  | SetPreferencesAction
  | SetPreferencesSuccessAction
  | SetPreferencesFailureAction;
