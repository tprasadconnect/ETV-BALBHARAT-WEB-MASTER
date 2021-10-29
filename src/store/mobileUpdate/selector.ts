import { SystemState } from '../storeType';

export const getMobileUpdateState = (state: SystemState) => {
  return state.mobileUpdate;
};

export const getLoaderState = (state: SystemState) => {
  return state.mobileUpdate.loader;
};
