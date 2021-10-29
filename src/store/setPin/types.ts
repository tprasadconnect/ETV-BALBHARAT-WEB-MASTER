import {
  SET_PIN_ACTION,
  SET_PIN_SUCCESS_ACTION,
  SET_PIN_FAILURE_ACTION,
} from './actionTypes';

interface SetPinAction {
  type: typeof SET_PIN_ACTION;
  payload: any;
}

interface SetPinSuccessAction {
  type: typeof SET_PIN_SUCCESS_ACTION;
  payload: any;
}

interface SetPinFailureAction {
  type: typeof SET_PIN_FAILURE_ACTION;
  payload: any;
}

export type SetPinActionTypes =
  | SetPinAction
  | SetPinSuccessAction
  | SetPinFailureAction;
