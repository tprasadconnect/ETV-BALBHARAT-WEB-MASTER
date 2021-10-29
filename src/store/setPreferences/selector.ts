import { SystemState } from '../storeType';

export const getSetPreferencesState = (state: SystemState) => {
  return state.setPreferences;
};

export const getLoaderState = (state: SystemState) => {
  return state.setPreferences.loader;
};
