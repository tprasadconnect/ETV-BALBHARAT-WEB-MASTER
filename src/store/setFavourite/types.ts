import {
  SET_FAVOURITE_ACTION,
  SET_FAVOURITE_SUCCESS_ACTION,
  SET_FAVOURITE_FAILURE_ACTION,
} from './actionTypes';

interface SetFavouriteAction {
  type: typeof SET_FAVOURITE_ACTION;
  payload: any;
}

interface SetFavouriteSuccessAction {
  type: typeof SET_FAVOURITE_SUCCESS_ACTION;
  payload: any;
}

interface SetFavouriteFailureAction {
  type: typeof SET_FAVOURITE_FAILURE_ACTION;
  payload: any;
}

export type SetFavouriteActionTypes =
  | SetFavouriteAction
  | SetFavouriteSuccessAction
  | SetFavouriteFailureAction;
