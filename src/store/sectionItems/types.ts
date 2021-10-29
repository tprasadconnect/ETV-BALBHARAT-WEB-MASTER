import {
  SECTION_ITEMS_ACTION,
  SECTION_ITEMS_SUCCESS_ACTION,
  SECTION_ITEMS_FAILURE_ACTION,
} from './actionTypes';

interface SectionItemsAction {
  type: typeof SECTION_ITEMS_ACTION;
  payload: any;
}

interface SectionItemsSuccessAction {
  type: typeof SECTION_ITEMS_SUCCESS_ACTION;
  payload: any;
}

interface SectionItemsFailureAction {
  type: typeof SECTION_ITEMS_FAILURE_ACTION;
  payload: any;
}

export type SectionItemsActionTypes =
  | SectionItemsAction
  | SectionItemsSuccessAction
  | SectionItemsFailureAction;
