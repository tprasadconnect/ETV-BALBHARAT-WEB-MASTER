import {
  CHANGE_PASSWORD_ACTION,
  CHANGE_PASSWORD_SUCCESS_ACTION,
  CHANGE_PASSWORD_FAILURE_ACTION,
} from './actionTypes';

interface ChangePasswordAction {
  type: typeof CHANGE_PASSWORD_ACTION;
  payload: any;
}

interface ChangePasswordSuccessAction {
  type: typeof CHANGE_PASSWORD_SUCCESS_ACTION;
  payload: any;
}

interface ChangePasswordFailureAction {
  type: typeof CHANGE_PASSWORD_FAILURE_ACTION;
  payload: any;
}

export type ChangePasswordActionTypes =
  | ChangePasswordAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailureAction;
