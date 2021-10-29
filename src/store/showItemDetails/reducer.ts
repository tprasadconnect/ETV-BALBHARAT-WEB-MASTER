import {
  SHOW_ITEM_DETAILS_ACTION,
  SHOW_ITEM_DETAILS_FAILURE_ACTION,
  SHOW_ITEM_DETAILS_SUCCESS_ACTION,
  SHOW_ITEM_DETAILS_RESET_ACTION,
} from './actionTypes';
import { ShowItemDetailsActionTypes } from './types';

export const initialShowItemDetailsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialShowItemDetailsState,
  action: ShowItemDetailsActionTypes
) => {
  switch (action.type) {
    case SHOW_ITEM_DETAILS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SHOW_ITEM_DETAILS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SHOW_ITEM_DETAILS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    case SHOW_ITEM_DETAILS_RESET_ACTION:
      return { ...state, loader: false, data: null };
    default:
      return state;
  }
};
