import {
  SELECT_LANGUAGE_ACTION,
  SELECT_LANGUAGE_SUCCESS_ACTION,
  SELECT_LANGUAGE_FAILURE_ACTION,
} from './actionTypes';

interface SelectLanguageAction {
  type: typeof SELECT_LANGUAGE_ACTION;
  payload: any;
}
interface SelectLanguageSuccessAction {
  type: typeof SELECT_LANGUAGE_SUCCESS_ACTION;
  payload: any;
}
interface SelectLanguageFailureAction {
  type: typeof SELECT_LANGUAGE_FAILURE_ACTION;
  payload: any;
}

export type SelectLanguageActionTypes =
  | SelectLanguageAction
  | SelectLanguageSuccessAction
  | SelectLanguageFailureAction;
