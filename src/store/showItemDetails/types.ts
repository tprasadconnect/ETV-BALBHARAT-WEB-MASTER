import {
  SHOW_ITEM_DETAILS_ACTION,
  SHOW_ITEM_DETAILS_SUCCESS_ACTION,
  SHOW_ITEM_DETAILS_FAILURE_ACTION,
  SHOW_ITEM_DETAILS_RESET_ACTION
} from './actionTypes';

interface ShowItemDetailsAction {
  type: typeof SHOW_ITEM_DETAILS_ACTION;
  payload: any;
}

interface ShowItemDetailsSuccessAction {
  type: typeof SHOW_ITEM_DETAILS_SUCCESS_ACTION;
  payload: any;
}

interface ShowItemDetailsFailureAction {
  type: typeof SHOW_ITEM_DETAILS_FAILURE_ACTION;
  payload: any;
}

interface ShowItemDetailsResetAction {
  type: typeof SHOW_ITEM_DETAILS_RESET_ACTION;
  payload: any;
}


export type ShowItemDetailsActionTypes =
  | ShowItemDetailsAction
  | ShowItemDetailsSuccessAction
  | ShowItemDetailsFailureAction
  | ShowItemDetailsResetAction;
