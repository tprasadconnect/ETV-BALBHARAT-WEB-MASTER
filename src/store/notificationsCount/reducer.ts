import {
  NOTIFICATIONS_COUNT_ACTION,
  NOTIFICATIONS_COUNT_FAILURE_ACTION,
  NOTIFICATIONS_COUNT_SUCCESS_ACTION,
} from './actionTypes';
import { NotificationsCountActionTypes } from './types';

export const initialNotificationsCountState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialNotificationsCountState,
  action: NotificationsCountActionTypes
) => {
  switch (action.type) {
    case NOTIFICATIONS_COUNT_ACTION:
      return {
        ...state,
        loader: true,
      };
    case NOTIFICATIONS_COUNT_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case NOTIFICATIONS_COUNT_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
