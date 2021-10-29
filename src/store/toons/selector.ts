import { SystemState } from '../storeType';

export const getToonsState = (store: SystemState) => {
  return store.toons;
};
export const getLoaderState = (store: SystemState) => {
  return store.toons.loader;
};
