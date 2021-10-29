import { SystemState } from '../storeType';

export const getSectionItemsState = (state: SystemState) => {
  return state.sectionItemsMoviesPopular;
};

export const getLoaderState = (state: SystemState) => {
  return state.sectionItemsMoviesPopular.loader;
};
