import { SystemState } from '../storeType';

export const getCatagoryMasterState = (state: SystemState) => {
  return state.categoryMaster;
};

export const getLoaderState = (state: SystemState) => {
  return state.categoryMaster.loader;
};
