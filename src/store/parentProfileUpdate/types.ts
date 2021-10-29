import {
  PARENT_PROFILE_UPDATE_ACTION,
  PARENT_PROFILE_UPDATE_SUCCESS_ACTION,
  PARENT_PROFILE_UPDATE_FAILURE_ACTION,
} from './actionTypes';

interface ParentProfileUpdateAction {
  type: typeof PARENT_PROFILE_UPDATE_ACTION;
  payload: any;
}

interface ParentProfileUpdateSuccessAction {
  type: typeof PARENT_PROFILE_UPDATE_SUCCESS_ACTION;
  payload: any;
}

interface ParentProfileUpdateFailureAction {
  type: typeof PARENT_PROFILE_UPDATE_FAILURE_ACTION;
  payload: any;
}

export type ParentProfileUpdateActionTypes =
  | ParentProfileUpdateAction
  | ParentProfileUpdateSuccessAction
  | ParentProfileUpdateFailureAction;
