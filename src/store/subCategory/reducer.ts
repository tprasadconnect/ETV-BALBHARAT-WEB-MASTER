import {
  SUB_CATEGORY_ACTION,
  SUB_CATEGORY_SUCCESS_ACTION,
  SUB_CATEGORY_FAILURE_ACTION,
} from './actionTypes';
import { SubCategoryActionTypes } from './types';

export const initialSubCategoryState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSubCategoryState,
  action: SubCategoryActionTypes
) => {
  switch (action.type) {
    case SUB_CATEGORY_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SUB_CATEGORY_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SUB_CATEGORY_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
