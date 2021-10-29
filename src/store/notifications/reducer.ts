import {
  NOTIFICATIONS_ACTION,
  NOTIFICATIONS_FAILURE_ACTION,
  NOTIFICATIONS_SUCCESS_ACTION,
} from './actionTypes';
import { NotificationsActionTypes } from './types';

export const initialNotificationsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialNotificationsState,
  action: NotificationsActionTypes
) => {
  switch (action.type) {
    case NOTIFICATIONS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case NOTIFICATIONS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case NOTIFICATIONS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
