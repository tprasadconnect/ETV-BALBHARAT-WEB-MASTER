import { SystemState } from '../storeType';

export const getRegisterState = (state: SystemState) => {
  return state.register;
};

export const getLoaderState = (state: SystemState) => {
  return state.register.loader;
};
