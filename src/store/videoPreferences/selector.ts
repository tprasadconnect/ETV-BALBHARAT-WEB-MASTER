import { SystemState } from '../storeType';

export const getVideoPreferencesState = (state: SystemState) => {
  return state.videoPreferences;
};

export const getLoaderState = (state: SystemState) => {
  return state.videoPreferences.loader;
};
