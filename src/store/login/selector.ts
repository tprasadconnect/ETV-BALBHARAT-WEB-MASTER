import { SystemState } from '../storeType';

export const getLoginState = (state: SystemState) => {
  return state.login;
};

export const getLoaderState = (state: SystemState) => {
  return state.login.loader;
};
