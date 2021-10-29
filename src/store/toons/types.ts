import {
  TOONS_ACTION,
  TOONS_FAILURE_ACTION,
  TOONS_SUCCESS_ACTION,
} from './actionTypes';

interface ToonsAction {
  type: typeof TOONS_ACTION;
  payload: any;
}
interface ToonsFailureAction {
  type: typeof TOONS_FAILURE_ACTION;
  payload: any;
}
interface ToonsSuccessAction {
  type: typeof TOONS_SUCCESS_ACTION;
  payload: any;
}

export type ToonsActionTypes =
  | ToonsAction
  | ToonsFailureAction
  | ToonsSuccessAction;
