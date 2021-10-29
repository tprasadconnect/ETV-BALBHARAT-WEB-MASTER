import {
  SET_RESEND_OTP_ACTION,
  SET_RESEND_OTP_SUCCESS_ACTION,
  SET_RESEND_OTP_FAILURE_ACTION,
} from './actionTypes';

import { SetResendOtpActionTypes } from './types';

export const initialSetResendOtpState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialSetResendOtpState,
  action: SetResendOtpActionTypes
) => {
  switch (action.type) {
    case SET_RESEND_OTP_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SET_RESEND_OTP_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SET_RESEND_OTP_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
