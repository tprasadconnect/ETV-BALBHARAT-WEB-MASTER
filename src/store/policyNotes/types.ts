import {
  POLICY_NOTES_ACTION,
  POLICY_NOTES_SUCCESS_ACTION,
  POLICY_NOTES_FAILURE_ACTION,
} from './actionTypes';

interface PolicyNotesAction {
  type: typeof POLICY_NOTES_ACTION;
  payload: any;
}

interface PolicyNotesSuccessAction {
  type: typeof POLICY_NOTES_SUCCESS_ACTION;
  payload: any;
}

interface PolicyNotesFailureAction {
  type: typeof POLICY_NOTES_FAILURE_ACTION;
  payload: any;
}

export type PolicyNotesActionTypes =
  | PolicyNotesAction
  | PolicyNotesSuccessAction
  | PolicyNotesFailureAction;
