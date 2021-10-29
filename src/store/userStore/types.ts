import {
  USER_STORE_ACTION,
  USER_STORE_SUCCESS_ACTION,
  USER_STORE_FAILURE_ACTION,
} from './actionTypes';

interface UserStoreAction {
  type: typeof USER_STORE_ACTION;
  payload: any;
}

interface UserStoreSuccessAction {
  type: typeof USER_STORE_SUCCESS_ACTION;
  payload: any;
}

interface UserStoreFailureAction {
  type: typeof USER_STORE_FAILURE_ACTION;
  payload: any;
}

export type UserStoreActionTypes =
  | UserStoreAction
  | UserStoreSuccessAction
  | UserStoreFailureAction;
