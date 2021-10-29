import {
  SECTION_ITEMS_MOVIES_POPULAR_ACTION,
  SECTION_ITEMS_MOVIES_POPULAR_FAILURE_ACTION,
  SECTION_ITEMS_MOVIES_POPULAR_SUCCESS_ACTION,
} from './actionTypes';
import { SectionItemsMoviesPopularActionTypes } from './types';

export const initialSectionItemsMoviesPopularState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSectionItemsMoviesPopularState,
  action: SectionItemsMoviesPopularActionTypes
) => {
  switch (action.type) {
    case SECTION_ITEMS_MOVIES_POPULAR_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SECTION_ITEMS_MOVIES_POPULAR_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SECTION_ITEMS_MOVIES_POPULAR_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
