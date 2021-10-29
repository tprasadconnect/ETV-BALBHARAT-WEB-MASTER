import {
  SUB_CATEGORY_ACTION,
  SUB_CATEGORY_SUCCESS_ACTION,
  SUB_CATEGORY_FAILURE_ACTION,
} from './actionTypes';

interface SubCategoryAction {
  type: typeof SUB_CATEGORY_ACTION;
  payload: any;
}

interface SubCategorySuccessAction {
  type: typeof SUB_CATEGORY_SUCCESS_ACTION;
  payload: any;
}

interface SubCategoryFailureAction {
  type: typeof SUB_CATEGORY_FAILURE_ACTION;
  payload: any;
}

export type SubCategoryActionTypes =
  | SubCategoryAction
  | SubCategorySuccessAction
  | SubCategoryFailureAction;
