import {
  VERIFY_OTP_ACTION,
  VERIFY_OTP_SUCCESS_ACTION,
  VERIFY_OTP_FAILURE_ACTION,
} from './actionTypes';

interface VerifyOtpAction {
  type: typeof VERIFY_OTP_ACTION;
  payload: any;
}

interface VerifyOtpSuccessAction {
  type: typeof VERIFY_OTP_SUCCESS_ACTION;
  payload: any;
}

interface VerifyOtpFailureAction {
  type: typeof VERIFY_OTP_FAILURE_ACTION;
  payload: any;
}

export type VerifyOtpActionTypes =
  | VerifyOtpAction
  | VerifyOtpSuccessAction
  | VerifyOtpFailureAction;
