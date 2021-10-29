import { SystemState } from '../storeType';

export const getSubCategoryState = (state: SystemState) => {
  return state.subCategory;
};

export const getLoaderState = (state: SystemState) => {
  return state.subCategory.loader;
};
