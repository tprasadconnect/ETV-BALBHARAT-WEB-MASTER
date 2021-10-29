import { SystemState } from '../storeType';

export const getSetWatchedListState = (state: SystemState) => {
  return state.setWatchedList;
};

export const getLoaderState = (state: SystemState) => {
  return state.setWatchedList.loader;
};
