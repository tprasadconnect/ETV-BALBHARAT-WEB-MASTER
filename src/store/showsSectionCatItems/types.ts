import {
  SHOWS_SECTION_CAT_ITEMS_ACTION,
  SHOWS_SECTION_CAT_ITEMS_SUCCESS_ACTION,
  SHOWS_SECTION_CAT_ITEMS_FAILURE_ACTION,
  SHOWS_SECTION_CAT_ITEMS_RESET_ACTION
} from './actionTypes';

interface ShowsSectionCatItemsAction {
  type: typeof SHOWS_SECTION_CAT_ITEMS_ACTION;
  payload: any;
}

interface ShowsSectionCatItemsSuccessAction {
  type: typeof SHOWS_SECTION_CAT_ITEMS_SUCCESS_ACTION;
  payload: any;
}

interface ShowsSectionCatItemsFailureAction {
  type: typeof SHOWS_SECTION_CAT_ITEMS_FAILURE_ACTION;
  payload: any;
}

interface ShowsSectionCatItemsResetAction {
  type: typeof SHOWS_SECTION_CAT_ITEMS_RESET_ACTION;
  payload: any;
}



export type ShowsSectionCatItemsActionTypes =
  | ShowsSectionCatItemsAction
  | ShowsSectionCatItemsSuccessAction
  | ShowsSectionCatItemsFailureAction
  | ShowsSectionCatItemsResetAction;
