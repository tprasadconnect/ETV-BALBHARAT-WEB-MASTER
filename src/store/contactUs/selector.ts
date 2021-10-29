import { SystemState } from '../storeType';

export const getContactUsState = (state: SystemState) => {
  return state.contactUs;
};

export const getLoaderState = (state: SystemState) => {
  return state.contactUs.loader;
};
