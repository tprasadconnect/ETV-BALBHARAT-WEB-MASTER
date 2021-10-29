import {
  SECTION_SIMILAR_ITEMS_ACTION,
  SECTION_SIMILAR_ITEMS_FAILURE_ACTION,
  SECTION_SIMILAR_ITEMS_SUCCESS_ACTION,
} from './actionTypes';
import { SectionSimilarItemsActionTypes } from './types';

export const initialSectionSimilarItemsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSectionSimilarItemsState,
  action: SectionSimilarItemsActionTypes
) => {
  switch (action.type) {
    case SECTION_SIMILAR_ITEMS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SECTION_SIMILAR_ITEMS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SECTION_SIMILAR_ITEMS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
