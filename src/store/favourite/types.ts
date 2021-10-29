import {
  FAVOURITE_ACTION,
  FAVOURITE_SUCCESS_ACTION,
  FAVOURITE_FAILURE_ACTION,
} from './actionTypes';

interface FavouriteAction {
  type: typeof FAVOURITE_ACTION;
  payload: any;
}

interface FavouriteSuccessAction {
  type: typeof FAVOURITE_SUCCESS_ACTION;
  payload: any;
}

interface FavouriteFailureAction {
  type: typeof FAVOURITE_FAILURE_ACTION;
  payload: any;
}

export type FavouriteActionTypes =
  | FavouriteAction
  | FavouriteSuccessAction
  | FavouriteFailureAction;
