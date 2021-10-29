import {
  SEARCH_ACTION,
  SEARCH_SUCCESS_ACTION,
  SEARCH_FAILURE_ACTION,
} from './actionTypes';

interface SearchAction {
  type: typeof SEARCH_ACTION;
  payload: any;
}

interface SearchSuccessAction {
  type: typeof SEARCH_SUCCESS_ACTION;
  payload: any;
}

interface SearchFailureAction {
  type: typeof SEARCH_FAILURE_ACTION;
  payload: any;
}

export type SearchActionTypes =
  | SearchAction
  | SearchSuccessAction
  | SearchFailureAction;
