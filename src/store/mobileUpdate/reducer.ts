import {
  MOBILE_UPDATE_ACTION,
  MOBILE_UPDATE_FAILURE_ACTION,
  MOBILE_UPDATE_SUCCESS_ACTION,
} from './actionTypes';
import { MobileUpdateActionTypes } from './types';

export const initialMobileUpdateState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialMobileUpdateState,
  action: MobileUpdateActionTypes
) => {
  switch (action.type) {
    case MOBILE_UPDATE_ACTION:
      return {
        ...state,
        loader: true,
      };
    case MOBILE_UPDATE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case MOBILE_UPDATE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
