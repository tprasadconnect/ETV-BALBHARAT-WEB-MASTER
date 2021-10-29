import {
  ITEM_DETAILS_ACTION,
  ITEM_DETAILS_SUCCESS_ACTION,
  ITEM_DETAILS_FAILURE_ACTION,
} from './actionTypes';

interface ItemDetailsAction {
  type: typeof ITEM_DETAILS_ACTION;
  payload: any;
}

interface ItemDetailsSuccessAction {
  type: typeof ITEM_DETAILS_SUCCESS_ACTION;
  payload: any;
}

interface ItemDetailsFailureAction {
  type: typeof ITEM_DETAILS_FAILURE_ACTION;
  payload: any;
}

export type ItemDetailsActionTypes =
  | ItemDetailsAction
  | ItemDetailsSuccessAction
  | ItemDetailsFailureAction;
