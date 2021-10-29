import {
  FAQ_ACTION,
  FAQ_SUCCESS_ACTION,
  FAQ_FAILURE_ACTION,
} from './actionTypes';

interface FaqAction {
  type: typeof FAQ_ACTION;
  payload: any;
}

interface FaqSuccessAction {
  type: typeof FAQ_SUCCESS_ACTION;
  payload: any;
}

interface FaqFailureAction {
  type: typeof FAQ_FAILURE_ACTION;
  payload: any;
}

export type FaqActionTypes = FaqAction | FaqSuccessAction | FaqFailureAction;
