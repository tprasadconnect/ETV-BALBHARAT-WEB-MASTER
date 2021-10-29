import {
  PARENT_PROFILE_ACTION,
  PARENT_PROFILE_SUCCESS_ACTION,
  PARENT_PROFILE_FAILURE_ACTION,
} from './actionTypes';

interface ParentProfileAction {
  type: typeof PARENT_PROFILE_ACTION;
  payload: any;
}

interface ParentProfileSuccessAction {
  type: typeof PARENT_PROFILE_SUCCESS_ACTION;
  payload: any;
}

interface ParentProfileFailureAction {
  type: typeof PARENT_PROFILE_FAILURE_ACTION;
  payload: any;
}

export type ParentProfileActionTypes =
  | ParentProfileAction
  | ParentProfileSuccessAction
  | ParentProfileFailureAction;
