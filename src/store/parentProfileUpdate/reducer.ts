import {
  PARENT_PROFILE_UPDATE_ACTION,
  PARENT_PROFILE_UPDATE_SUCCESS_ACTION,
  PARENT_PROFILE_UPDATE_FAILURE_ACTION,
} from './actionTypes';
import { ParentProfileUpdateActionTypes } from './types';

export const initialParentProfileUpdateState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialParentProfileUpdateState,
  action: ParentProfileUpdateActionTypes
) => {
  switch (action.type) {
    case PARENT_PROFILE_UPDATE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case PARENT_PROFILE_UPDATE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case PARENT_PROFILE_UPDATE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
