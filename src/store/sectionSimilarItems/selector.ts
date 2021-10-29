import { SystemState } from '../storeType';

export const getSectionSimilarItemsState = (state: SystemState) => {
  return state.sectionSimilarItems;
};

export const getLoaderState = (state: SystemState) => {
  return state.sectionSimilarItems.loader;
};
