import {
  SOCIAL_LINKS_SUCCESS_ACTION,
  SOCIAL_LINKS_FAILURE_ACTION,
  SOCIAL_LINKS_ACTION,
} from './actionTypes';
import { SocialLinksActionTypes } from './types';

export const initialSocialLinksState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSocialLinksState,
  action: SocialLinksActionTypes
) => {
  switch (action.type) {
    case SOCIAL_LINKS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SOCIAL_LINKS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SOCIAL_LINKS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
