import {
  CATG_MASTER_ACTION,
  CATG_MASTER_FAILURE_ACTION,
  CATG_MASTER_SUCCESS_ACTION,
} from './actionTypes';
import { CatgMasterActionTypes } from './types';

export const initialCatgMasterState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialCatgMasterState,
  action: CatgMasterActionTypes
) => {
  switch (action.type) {
    case CATG_MASTER_ACTION:
      return {
        ...state,
        loader: true,
      };
    case CATG_MASTER_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case CATG_MASTER_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
