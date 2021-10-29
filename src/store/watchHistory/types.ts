import {
  WATCH_HISTORY_ACTION,
  WATCH_HISTORY_SUCCESS_ACTION,
  WATCH_HISTORY_FAILURE_ACTION,
} from './actionTypes';

interface WatchHistoryAction {
  type: typeof WATCH_HISTORY_ACTION;
  payload: any;
}

interface WatchHistorySuccessAction {
  type: typeof WATCH_HISTORY_SUCCESS_ACTION;
  payload: any;
}

interface WatchHistoryFailureAction {
  type: typeof WATCH_HISTORY_FAILURE_ACTION;
  payload: any;
}

export type WatchHistoryActionTypes =
  | WatchHistoryAction
  | WatchHistorySuccessAction
  | WatchHistoryFailureAction;
