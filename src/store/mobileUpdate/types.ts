import {
  MOBILE_UPDATE_ACTION,
  MOBILE_UPDATE_SUCCESS_ACTION,
  MOBILE_UPDATE_FAILURE_ACTION,
} from './actionTypes';

interface MobileUpdateAction {
  type: typeof MOBILE_UPDATE_ACTION;
  payload: any;
}

interface MobileUpdateSuccessAction {
  type: typeof MOBILE_UPDATE_SUCCESS_ACTION;
  payload: any;
}

interface MobileUpdateFailureAction {
  type: typeof MOBILE_UPDATE_FAILURE_ACTION;
  payload: any;
}

export type MobileUpdateActionTypes =
  | MobileUpdateAction
  | MobileUpdateSuccessAction
  | MobileUpdateFailureAction;
