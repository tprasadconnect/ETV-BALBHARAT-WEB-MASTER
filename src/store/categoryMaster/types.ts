import {
  CATEGORY_MASTER_ACTION,
  CATEGORY_MASTER_SUCCESS_ACTION,
  CATEGORY_MASTER_FAILURE_ACTION,
} from './actionTypes';

interface CategoryMasterAction {
  type: typeof CATEGORY_MASTER_ACTION;
  payload: any;
}

interface CategoryMasterSuccessAction {
  type: typeof CATEGORY_MASTER_SUCCESS_ACTION;
  payload: any;
}

interface CategoryMasterFailureAction {
  type: typeof CATEGORY_MASTER_FAILURE_ACTION;
  payload: any;
}

export type CategoryMasterActionTypes =
  | CategoryMasterAction
  | CategoryMasterSuccessAction
  | CategoryMasterFailureAction;
