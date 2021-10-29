import {
  CONTINUE_WATCHING_ACTION,
  CONTINUE_WATCHING_SUCCESS_ACTION,
  CONTINUE_WATCHING_FAILURE_ACTION,
} from './actionTypes';

interface ContinueWatchingAction {
  type: typeof CONTINUE_WATCHING_ACTION;
  payload: any;
}

interface ContinueWatchingSuccessAction {
  type: typeof CONTINUE_WATCHING_SUCCESS_ACTION;
  payload: any;
}

interface ContinueWatchingFailureAction {
  type: typeof CONTINUE_WATCHING_FAILURE_ACTION;
  payload: any;
}

export type ContinueWatchingActionTypes =
  | ContinueWatchingAction
  | ContinueWatchingSuccessAction
  | ContinueWatchingFailureAction;
