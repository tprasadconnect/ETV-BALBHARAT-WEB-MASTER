import {
  SECTION_CAT_ITEMS_ACTION,
  SECTION_CAT_ITEMS_SUCCESS_ACTION,
  SECTION_CAT_ITEMS_FAILURE_ACTION,
} from './actionTypes';

interface SectionCatItemsAction {
  type: typeof SECTION_CAT_ITEMS_ACTION;
  payload: any;
}

interface SectionCatItemsSuccessAction {
  type: typeof SECTION_CAT_ITEMS_SUCCESS_ACTION;
  payload: any;
}

interface SectionCatItemsFailureAction {
  type: typeof SECTION_CAT_ITEMS_FAILURE_ACTION;
  payload: any;
}

export type SectionCatItemsActionTypes =
  | SectionCatItemsAction
  | SectionCatItemsSuccessAction
  | SectionCatItemsFailureAction;
