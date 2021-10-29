import { SystemState } from '../storeType';

export const getContinueWatchingState = (state: SystemState) => {
  return state.continueWatching;
};

export const getLoaderState = (state: SystemState) => {
  return state.continueWatching.loader;
};
