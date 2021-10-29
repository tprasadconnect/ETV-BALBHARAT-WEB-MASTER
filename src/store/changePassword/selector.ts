import { SystemState } from '../storeType';

export const getChangePasswordState = (state: SystemState) => {
  return state.changePassword;
};

export const getLoaderState = (state: SystemState) => {
  return state.changePassword.loader;
};
