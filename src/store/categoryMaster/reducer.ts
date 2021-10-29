import {
  CATEGORY_MASTER_ACTION,
  CATEGORY_MASTER_SUCCESS_ACTION,
  CATEGORY_MASTER_FAILURE_ACTION,
} from './actionTypes';
import { CategoryMasterActionTypes } from './types';

export const initialCategoryMasterState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialCategoryMasterState,
  action: CategoryMasterActionTypes
) => {
  switch (action.type) {
    case CATEGORY_MASTER_ACTION:
      return {
        ...state,
        loader: true,
      };
    case CATEGORY_MASTER_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case CATEGORY_MASTER_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
