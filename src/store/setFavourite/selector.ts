import { SystemState } from '../storeType';

export const getSetFavouriteState = (state: SystemState) => {
  return state.setFavorite;
};

export const getLoaderState = (state: SystemState) => {
  return state.setFavorite.loader;
};
