import {
  CATG_MASTER_ACTION,
  CATG_MASTER_SUCCESS_ACTION,
  CATG_MASTER_FAILURE_ACTION,
} from './actionTypes';

interface CatgMasterAction {
  type: typeof CATG_MASTER_ACTION;
  payload: any;
}

interface CatgMasterSuccessAction {
  type: typeof CATG_MASTER_SUCCESS_ACTION;
  payload: any;
}

interface CatgMasterFailureAction {
  type: typeof CATG_MASTER_FAILURE_ACTION;
  payload: any;
}

export type CatgMasterActionTypes =
  | CatgMasterAction
  | CatgMasterSuccessAction
  | CatgMasterFailureAction;
