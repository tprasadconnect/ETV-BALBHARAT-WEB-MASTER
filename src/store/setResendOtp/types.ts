import {
  SET_RESEND_OTP_ACTION,
  SET_RESEND_OTP_SUCCESS_ACTION,
  SET_RESEND_OTP_FAILURE_ACTION,
} from './actionTypes';

interface SetResendOtpAction {
  type: typeof SET_RESEND_OTP_ACTION;
  payload: any;
}

interface SetResendOtpSuccessAction {
  type: typeof SET_RESEND_OTP_SUCCESS_ACTION;
  payload: any;
}

interface SetResendOtpFailureAction {
  type: typeof SET_RESEND_OTP_FAILURE_ACTION;
  payload: any;
}

export type SetResendOtpActionTypes =
  | SetResendOtpAction
  | SetResendOtpSuccessAction
  | SetResendOtpFailureAction;
