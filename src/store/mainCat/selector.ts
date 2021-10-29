import { SystemState } from '../storeType';

export const getMainCatState = (state: SystemState) => {
  return state.mainCat;
};

export const getLoaderState = (state: SystemState) => {
  return state.mainCat.loader;
};
