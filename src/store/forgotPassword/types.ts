import {
  FORGOT_PASSWORD_ACTION,
  FORGOT_PASSWORD_SUCCESS_ACTION,
  FORGOT_PASSWORD_FAILURE_ACTION,
} from './actionTypes';

interface ForgotPasswordAction {
  type: typeof FORGOT_PASSWORD_ACTION;
  payload: any;
}

interface ForgotPasswordSuccessAction {
  type: typeof FORGOT_PASSWORD_SUCCESS_ACTION;
  payload: any;
}

interface ForgotPasswordFailureAction {
  type: typeof FORGOT_PASSWORD_FAILURE_ACTION;
  payload: any;
}

export type ForgotPasswordActionTypes =
  | ForgotPasswordAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction;
