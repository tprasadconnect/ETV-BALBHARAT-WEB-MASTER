import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAILURE_ACTION,
} from './actionTypes';

interface LoginAction {
  type: typeof LOGIN_ACTION;
  payload: any;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS_ACTION;
  payload: any;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE_ACTION;
  payload: any;
}

export type LoginActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction;
