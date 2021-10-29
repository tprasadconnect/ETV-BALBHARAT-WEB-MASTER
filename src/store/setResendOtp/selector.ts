import { SystemState } from '../storeType';

export const getSetResendOtpState = (state: SystemState) => {
  return state.setResendOtp;
};

export const getLoaderState = (state: SystemState) => {
  return state.setResendOtp.loader;
};
