import {
  PARENT_PROFILE_ACTION,
  PARENT_PROFILE_SUCCESS_ACTION,
  PARENT_PROFILE_FAILURE_ACTION,
} from './actionTypes';
import { ParentProfileActionTypes } from './types';

export const initialParentProfileState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialParentProfileState,
  action: ParentProfileActionTypes
) => {
  switch (action.type) {
    case PARENT_PROFILE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case PARENT_PROFILE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case PARENT_PROFILE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
