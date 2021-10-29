import { SystemState } from '../storeType';

export const getSocialLinksState = (state: SystemState) => {
  return state.socialLinks;
};

export const getLoaderState = (state: SystemState) => {
  return state.socialLinks.loader;
};
