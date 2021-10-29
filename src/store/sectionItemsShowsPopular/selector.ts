import { SystemState } from '../storeType';

export const getSectionItemsState = (state: SystemState) => {
  return state.sectionItemsShowsPopular;
};

export const getLoaderState = (state: SystemState) => {
  return state.sectionItemsShowsPopular.loader;
};
