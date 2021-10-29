import { SystemState } from '../storeType';

export const getSectionItemsState = (state: SystemState) => {
  return state.sectionItems;
};

export const getLoaderState = (state: SystemState) => {
  return state.sectionItems.loader;
};
