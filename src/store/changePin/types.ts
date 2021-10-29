import {
  CHANGE_PIN_ACTION,
  CHANGE_PIN_SUCCESS_ACTION,
  CHANGE_PIN_FAILURE_ACTION,
} from './actionTypes';

interface ChangePinAction {
  type: typeof CHANGE_PIN_ACTION;
  payload: any;
}

interface ChangePinSuccessAction {
  type: typeof CHANGE_PIN_SUCCESS_ACTION;
  payload: any;
}

interface ChangePinFailureAction {
  type: typeof CHANGE_PIN_FAILURE_ACTION;
  payload: any;
}

export type ChangePinActionTypes =
  | ChangePinAction
  | ChangePinSuccessAction
  | ChangePinFailureAction;
