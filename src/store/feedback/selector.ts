import { SystemState } from '../storeType';

export const getFeedbackState = (state: SystemState) => {
  return state.feedback;
};

export const getLoaderState = (state: SystemState) => {
  return state.feedback.loader;
};
