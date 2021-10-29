import {
  FEEDBACK_ACTION,
  FEEDBACK_SUCCESS_ACTION,
  FEEDBACK_FAILURE_ACTION,
} from './actionTypes';

interface FeedbackAction {
  type: typeof FEEDBACK_ACTION;
  payload: any;
}

interface FeedbackSuccessAction {
  type: typeof FEEDBACK_SUCCESS_ACTION;
  payload: any;
}

interface FeedbackFailureAction {
  type: typeof FEEDBACK_FAILURE_ACTION;
  payload: any;
}

export type FeedbackActionTypes =
  | FeedbackAction
  | FeedbackSuccessAction
  | FeedbackFailureAction;
