import {
  VERIFY_OTP_ACTION,
  VERIFY_OTP_FAILURE_ACTION,
  VERIFY_OTP_SUCCESS_ACTION,
} from './actionTypes';
import { VerifyOtpActionTypes } from './types';

export const initialVerifyOtpState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialVerifyOtpState,
  action: VerifyOtpActionTypes
) => {
  switch (action.type) {
    case VERIFY_OTP_ACTION:
      return {
        ...state,
        loader: true,
      };
    case VERIFY_OTP_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case VERIFY_OTP_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
