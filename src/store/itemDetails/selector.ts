import { SystemState } from '../storeType';

export const getItemDetailsState = (state: SystemState) => {
  return state.itemDetails;
};

export const getLoaderState = (state: SystemState) => {
  return state.itemDetails.loader;
};
