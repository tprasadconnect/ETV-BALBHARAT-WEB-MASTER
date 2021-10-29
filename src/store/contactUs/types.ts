import {
  CONTACT_US_ACTION,
  CONTACT_US_SUCCESS_ACTION,
  CONTACT_US_FAILURE_ACTION,
} from './actionTypes';

interface ContactUsAction {
  type: typeof CONTACT_US_ACTION;
  payload: any;
}

interface ContactUsSuccessAction {
  type: typeof CONTACT_US_SUCCESS_ACTION;
  payload: any;
}

interface ContactUsFailureAction {
  type: typeof CONTACT_US_FAILURE_ACTION;
  payload: any;
}

export type ContactUsActionTypes =
  | ContactUsAction
  | ContactUsSuccessAction
  | ContactUsFailureAction;
