import {
  SECTION_ITEMS_ACTION,
  SECTION_ITEMS_FAILURE_ACTION,
  SECTION_ITEMS_SUCCESS_ACTION,
} from './actionTypes';
import { SectionItemsActionTypes } from './types';

export const initialSectionItemsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSectionItemsState,
  action: SectionItemsActionTypes
) => {
  switch (action.type) {
    case SECTION_ITEMS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SECTION_ITEMS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SECTION_ITEMS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
