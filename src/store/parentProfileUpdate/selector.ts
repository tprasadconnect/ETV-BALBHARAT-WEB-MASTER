import { SystemState } from '../storeType';

export const getParentProfileUpdateState = (state: SystemState) => {
  return state.parentProfileUpdate;
};

export const getLoaderState = (state: SystemState) => {
  return state.parentProfileUpdate.loader;
};
