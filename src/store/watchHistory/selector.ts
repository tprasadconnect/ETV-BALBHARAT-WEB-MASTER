import { SystemState } from '../storeType';

export const getWatchHistoryState = (state: SystemState) => {
  return state.watchHistory;
};

export const getLoaderState = (state: SystemState) => {
  return state.watchHistory.loader;
};
