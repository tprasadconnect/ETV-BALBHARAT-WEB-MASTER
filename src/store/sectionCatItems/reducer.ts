import {
  SECTION_CAT_ITEMS_ACTION,
  SECTION_CAT_ITEMS_FAILURE_ACTION,
  SECTION_CAT_ITEMS_SUCCESS_ACTION,
} from './actionTypes';
import { SectionCatItemsActionTypes } from './types';

export const initialSectionCatItemsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSectionCatItemsState,
  action: SectionCatItemsActionTypes
) => {
  switch (action.type) {
    case SECTION_CAT_ITEMS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SECTION_CAT_ITEMS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SECTION_CAT_ITEMS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
