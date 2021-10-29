import { SystemState } from '../storeType';

export const getFavouriteState = (state: SystemState) => {
  return state.favourite;
};

export const getLoaderState = (state: SystemState) => {
  return state.favourite.loader;
};
