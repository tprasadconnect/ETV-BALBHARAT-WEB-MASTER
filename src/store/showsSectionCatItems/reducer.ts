import {
  SHOWS_SECTION_CAT_ITEMS_ACTION,
  SHOWS_SECTION_CAT_ITEMS_FAILURE_ACTION,
  SHOWS_SECTION_CAT_ITEMS_SUCCESS_ACTION,
  SHOWS_SECTION_CAT_ITEMS_RESET_ACTION
} from './actionTypes';
import { ShowsSectionCatItemsActionTypes } from './types';

export const initialShowsSectionCatItemsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialShowsSectionCatItemsState,
  action: ShowsSectionCatItemsActionTypes
) => {
  switch (action.type) {
    case SHOWS_SECTION_CAT_ITEMS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SHOWS_SECTION_CAT_ITEMS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SHOWS_SECTION_CAT_ITEMS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    case SHOWS_SECTION_CAT_ITEMS_RESET_ACTION:
      return { ...state, loader: false, data: null };
    default:
      return state;
  }
};
