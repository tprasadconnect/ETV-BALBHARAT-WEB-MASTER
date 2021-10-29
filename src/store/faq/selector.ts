import { SystemState } from '../storeType';

export const getFaqState = (state: SystemState) => {
  return state.faq;
};

export const getLoaderState = (state: SystemState) => {
  return state.faq.loader;
};
