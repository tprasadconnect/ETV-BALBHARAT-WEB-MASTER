import {
  NOTIFICATIONS_ACTION,
  NOTIFICATIONS_SUCCESS_ACTION,
  NOTIFICATIONS_FAILURE_ACTION,
} from './actionTypes';

interface NotificationsAction {
  type: typeof NOTIFICATIONS_ACTION;
  payload: any;
}

interface NotificationsSuccessAction {
  type: typeof NOTIFICATIONS_SUCCESS_ACTION;
  payload: any;
}

interface NotificationsFailureAction {
  type: typeof NOTIFICATIONS_FAILURE_ACTION;
  payload: any;
}

export type NotificationsActionTypes =
  | NotificationsAction
  | NotificationsSuccessAction
  | NotificationsFailureAction;
