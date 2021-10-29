import { SystemState } from '../storeType';

export const getChangePinState = (state: SystemState) => {
  return state.changePin;
};

export const getLoaderState = (state: SystemState) => {
  return state.changePin.loader;
};
