import { SystemState } from '../storeType';

export const getSetPinState = (state: SystemState) => {
  return state.setPin;
};

export const getLoaderState = (state: SystemState) => {
  return state.setPin.loader;
};
