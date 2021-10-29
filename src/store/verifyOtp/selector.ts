import { SystemState } from '../storeType';

export const getVerifyOtpState = (state: SystemState) => {
  return state.verifyOtp;
};

export const getLoaderState = (state: SystemState) => {
  return state.verifyOtp.loader;
};
