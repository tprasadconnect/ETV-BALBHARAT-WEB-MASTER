import {
  CONTINUE_WATCHING_ACTION,
  CONTINUE_WATCHING_FAILURE_ACTION,
  CONTINUE_WATCHING_SUCCESS_ACTION,
} from './actionTypes';
import { ContinueWatchingActionTypes } from './types';

export const initialContinueWatchingState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialContinueWatchingState,
  action: ContinueWatchingActionTypes
) => {
  switch (action.type) {
    case CONTINUE_WATCHING_ACTION:
      return {
        ...state,
        loader: true,
      };
    case CONTINUE_WATCHING_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case CONTINUE_WATCHING_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
