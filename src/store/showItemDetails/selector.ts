import { SystemState } from '../storeType';

export const getShowItemDetailsState = (state: SystemState) => {
  return state.showItemDetails;
};

export const getLoaderState = (state: SystemState) => {
  return state.showItemDetails.loader;
};
