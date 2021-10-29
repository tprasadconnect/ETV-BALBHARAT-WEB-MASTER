import { SystemState } from '../storeType';

export const getPreferencesState = (state: SystemState) => {
  return state.preferences;
};

export const getLoaderState = (state: SystemState) => {
  return state.preferences.loader;
};
