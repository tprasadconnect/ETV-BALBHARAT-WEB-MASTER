import {
  GET_PAGE_ACTION,
  GET_PAGE_SUCCESS_ACTION,
  GET_PAGE_FAILURE_ACTION,
} from './actionTypes';

interface GetPageAction {
  type: typeof GET_PAGE_ACTION;
  payload: any;
}
interface GetPageSuccessAction {
  type: typeof GET_PAGE_SUCCESS_ACTION;
  payload: any;
}
interface GetPageFailureAction {
  type: typeof GET_PAGE_FAILURE_ACTION;
  payload: any;
}

export type GetPageActionTypes =
  | GetPageAction
  | GetPageSuccessAction
  | GetPageFailureAction;
