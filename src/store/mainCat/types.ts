import {
  MAIN_CAT_ACTION,
  MAIN_CAT_SUCCESS_ACTION,
  MAIN_CAT_FAILURE_ACTION,
} from './actionTypes';

interface MainCatAction {
  type: typeof MAIN_CAT_ACTION;
  payload: any;
}

interface MainCatSuccessAction {
  type: typeof MAIN_CAT_SUCCESS_ACTION;
  payload: any;
}

interface MainCatFailureAction {
  type: typeof MAIN_CAT_FAILURE_ACTION;
  payload: any;
}

export type MainCatActionTypes =
  | MainCatAction
  | MainCatSuccessAction
  | MainCatFailureAction;
