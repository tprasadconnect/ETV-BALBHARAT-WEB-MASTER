import { SystemState } from '../storeType';

export const getForgotPasswordState = (state: SystemState) => {
  return state.forgotPassword;
};

export const getLoaderState = (state: SystemState) => {
  return state.forgotPassword.loader;
};
