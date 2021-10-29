import {
  LANGUAGE_ACTION,
  LANGUAGE_SUCCESS_ACTION,
  LANGUAGE_FAILURE_ACTION,
} from './actionTypes';

interface LanguageAction {
  type: typeof LANGUAGE_ACTION;
  payload: any;
}

interface LanguageSuccessAction {
  type: typeof LANGUAGE_SUCCESS_ACTION;
  payload: any;
}

interface LanguageFailureAction {
  type: typeof LANGUAGE_FAILURE_ACTION;
  payload: any;
}

export type LanguageActionTypes =
  | LanguageAction
  | LanguageSuccessAction
  | LanguageFailureAction;
