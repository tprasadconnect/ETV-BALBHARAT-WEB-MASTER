import { SystemState } from '../storeType';

export const getSearchState = (state: SystemState) => {
  return state.search;
};

export const getLoaderState = (state: SystemState) => {
  return state.search.loader;
};
