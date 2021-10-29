import { SystemState } from '../storeType';

export const getSectionCatItemsState = (state: SystemState) => {
  return state.sectionCatItems;
};

export const getLoaderState = (state: SystemState) => {
  return state.sectionCatItems.loader;
};
