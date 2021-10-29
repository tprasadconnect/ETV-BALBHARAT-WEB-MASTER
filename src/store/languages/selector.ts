import { SystemState } from '../storeType';

export const getLanguageState = (state: SystemState) => {
  return state.language;
};

export const getLoaderState = (state: SystemState) => {
  return state.language.loader;
};
