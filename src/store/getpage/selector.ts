import { SystemState } from '../storeType';

export const getPageState = (state: SystemState) => {
  return state.getPage;
};
export const getPageLoaderState = (state: SystemState) => {
  return state.getPage.loader;
};
