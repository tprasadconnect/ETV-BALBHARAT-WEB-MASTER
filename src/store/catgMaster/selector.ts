import { SystemState } from '../storeType';

export const getCatgMasterState = (state: SystemState) => {
  return state.catgMaster;
};

export const getLoaderState = (state: SystemState) => {
  return state.catgMaster.loader;
};
