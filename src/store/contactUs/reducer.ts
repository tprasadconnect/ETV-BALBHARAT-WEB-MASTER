import {
  CONTACT_US_ACTION,
  CONTACT_US_FAILURE_ACTION,
  CONTACT_US_SUCCESS_ACTION,
} from './actionTypes';
import { ContactUsActionTypes } from './types';

export const initialContactUsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialContactUsState,
  action: ContactUsActionTypes
) => {
  switch (action.type) {
    case CONTACT_US_ACTION:
      return {
        ...state,
        loader: true,
      };
    case CONTACT_US_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case CONTACT_US_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
