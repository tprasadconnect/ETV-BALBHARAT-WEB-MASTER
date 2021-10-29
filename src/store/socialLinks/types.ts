import {
  SOCIAL_LINKS_ACTION,
  SOCIAL_LINKS_FAILURE_ACTION,
  SOCIAL_LINKS_SUCCESS_ACTION,
} from './actionTypes';

interface SocialLinksAction {
  type: typeof SOCIAL_LINKS_ACTION;
  payload: any;
}

interface SocialLinksSuccessAction {
  type: typeof SOCIAL_LINKS_SUCCESS_ACTION;
  payload: any;
}

interface SocialLinksFailureAction {
  type: typeof SOCIAL_LINKS_FAILURE_ACTION;
  payload: any;
}

export type SocialLinksActionTypes =
  | SocialLinksAction
  | SocialLinksSuccessAction
  | SocialLinksFailureAction;
