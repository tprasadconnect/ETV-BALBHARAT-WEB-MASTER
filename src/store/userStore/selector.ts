import { SystemState } from '../storeType';

export const getUserStoreState = (state: SystemState) => {
  return state.userStore;
};

export const getLoaderState = (state: SystemState) => {
  return state.userStore.loader;
};
