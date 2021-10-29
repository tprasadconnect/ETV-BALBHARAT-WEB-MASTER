import {
  ITEM_DETAILS_ACTION,
  ITEM_DETAILS_FAILURE_ACTION,
  ITEM_DETAILS_SUCCESS_ACTION,
} from './actionTypes';
import { ItemDetailsActionTypes } from './types';

export const initialItemDetailsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialItemDetailsState,
  action: ItemDetailsActionTypes
) => {
  switch (action.type) {
    case ITEM_DETAILS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case ITEM_DETAILS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case ITEM_DETAILS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
