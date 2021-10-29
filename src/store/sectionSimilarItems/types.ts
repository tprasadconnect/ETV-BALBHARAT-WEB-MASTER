import {
  SECTION_SIMILAR_ITEMS_ACTION,
  SECTION_SIMILAR_ITEMS_SUCCESS_ACTION,
  SECTION_SIMILAR_ITEMS_FAILURE_ACTION,
} from './actionTypes';

interface SectionSimilarItemsAction {
  type: typeof SECTION_SIMILAR_ITEMS_ACTION;
  payload: any;
}

interface SectionSimilarItemsSuccessAction {
  type: typeof SECTION_SIMILAR_ITEMS_SUCCESS_ACTION;
  payload: any;
}

interface SectionSimilarItemsFailureAction {
  type: typeof SECTION_SIMILAR_ITEMS_FAILURE_ACTION;
  payload: any;
}

export type SectionSimilarItemsActionTypes =
  | SectionSimilarItemsAction
  | SectionSimilarItemsSuccessAction
  | SectionSimilarItemsFailureAction;
