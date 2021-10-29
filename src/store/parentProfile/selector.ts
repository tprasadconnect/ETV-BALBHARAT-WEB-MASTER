import { SystemState } from '../storeType';

export const getParentProfileState = (state: SystemState) => {
  return state.parentProfile;
};

export const getLoaderState = (state: SystemState) => {
  return state.parentProfile.loader;
};
