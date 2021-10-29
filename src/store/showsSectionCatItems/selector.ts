import { SystemState } from '../storeType';

export const getShowsSectionCatItemsState = (state: SystemState) => {
  return state.showsSectionCatItems;
};

export const getLoaderState = (state: SystemState) => {
  return state.showsSectionCatItems.loader;
};
