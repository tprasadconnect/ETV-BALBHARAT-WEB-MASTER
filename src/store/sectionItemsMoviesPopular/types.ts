import {
  SECTION_ITEMS_MOVIES_POPULAR_ACTION,
  SECTION_ITEMS_MOVIES_POPULAR_SUCCESS_ACTION,
  SECTION_ITEMS_MOVIES_POPULAR_FAILURE_ACTION,
} from './actionTypes';

interface SectionItemsMoviesPopularAction {
  type: typeof SECTION_ITEMS_MOVIES_POPULAR_ACTION;
  payload: any;
}

interface SectionItemsMoviesPopularSuccessAction {
  type: typeof SECTION_ITEMS_MOVIES_POPULAR_SUCCESS_ACTION;
  payload: any;
}

interface SectionItemsMoviesPopularFailureAction {
  type: typeof SECTION_ITEMS_MOVIES_POPULAR_FAILURE_ACTION;
  payload: any;
}

export type SectionItemsMoviesPopularActionTypes =
  | SectionItemsMoviesPopularAction
  | SectionItemsMoviesPopularSuccessAction
  | SectionItemsMoviesPopularFailureAction;
