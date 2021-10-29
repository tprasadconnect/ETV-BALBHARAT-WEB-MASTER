import {
  FEEDBACK_ACTION,
  FEEDBACK_FAILURE_ACTION,
  FEEDBACK_SUCCESS_ACTION,
} from './actionTypes';
import { FeedbackActionTypes } from './types';

export const initialFeedbackState = {
  loader: false,
  error: null,
  data: null,
};

export default (state = initialFeedbackState, action: FeedbackActionTypes) => {
  switch (action.type) {
    case FEEDBACK_ACTION:
      return {
        ...state,
        loader: true,
      };
    case FEEDBACK_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case FEEDBACK_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
