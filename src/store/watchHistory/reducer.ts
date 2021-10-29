import {
  WATCH_HISTORY_ACTION,
  WATCH_HISTORY_FAILURE_ACTION,
  WATCH_HISTORY_SUCCESS_ACTION,
} from './actionTypes';
import { WatchHistoryActionTypes } from './types';

export const initialWatchHistoryState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialWatchHistoryState,
  action: WatchHistoryActionTypes
) => {
  switch (action.type) {
    case WATCH_HISTORY_ACTION:
      return {
        ...state,
        loader: true,
      };
    case WATCH_HISTORY_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case WATCH_HISTORY_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
