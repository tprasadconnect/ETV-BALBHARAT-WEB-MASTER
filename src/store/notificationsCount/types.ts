import {
  NOTIFICATIONS_COUNT_ACTION,
  NOTIFICATIONS_COUNT_SUCCESS_ACTION,
  NOTIFICATIONS_COUNT_FAILURE_ACTION,
} from './actionTypes';

interface NotificationsCountAction {
  type: typeof NOTIFICATIONS_COUNT_ACTION;
  payload: any;
}

interface NotificationsCountSuccessAction {
  type: typeof NOTIFICATIONS_COUNT_SUCCESS_ACTION;
  payload: any;
}

interface NotificationsCountFailureAction {
  type: typeof NOTIFICATIONS_COUNT_FAILURE_ACTION;
  payload: any;
}

export type NotificationsCountActionTypes =
  | NotificationsCountAction
  | NotificationsCountSuccessAction
  | NotificationsCountFailureAction;
