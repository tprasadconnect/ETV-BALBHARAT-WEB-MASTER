import {
  SET_WATCHED_LIST_ACTION,
  SET_WATCHED_LIST_SUCCESS_ACTION,
  SET_WATCHED_LIST_FAILURE_ACTION,
} from './actionTypes';

interface SetWatchedListAction {
  type: typeof SET_WATCHED_LIST_ACTION;
  payload: any;
}

interface SetWatchedListSuccessAction {
  type: typeof SET_WATCHED_LIST_SUCCESS_ACTION;
  payload: any;
}

interface SetWatchedListFailureAction {
  type: typeof SET_WATCHED_LIST_FAILURE_ACTION;
  payload: any;
}

export type SetWatchedListActionTypes =
  | SetWatchedListAction
  | SetWatchedListSuccessAction
  | SetWatchedListFailureAction;
