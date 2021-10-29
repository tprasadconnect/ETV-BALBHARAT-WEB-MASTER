import {
  REGISTRATION_ACTION,
  REGISTRATION_SUCCESS_ACTION,
  REGISTRATION_FAILURE_ACTION,
} from './actionTypes';

interface RegistrationAction {
  type: typeof REGISTRATION_ACTION;
  payload: any;
}

interface RegistrationSuccessAction {
  type: typeof REGISTRATION_SUCCESS_ACTION;
  payload: any;
}

interface RegistrationFailureAction {
  type: typeof REGISTRATION_FAILURE_ACTION;
  payload: any;
}

export type RegisterActionTypes =
  | RegistrationAction
  | RegistrationSuccessAction
  | RegistrationFailureAction;
