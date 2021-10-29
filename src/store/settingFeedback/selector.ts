import { SystemState } from '../storeType';

export const getSettingFeedbackState = (state: SystemState) => {
  return state.settingFeedback;
};

export const getLoaderState = (state: SystemState) => {
  return state.settingFeedback.loader;
};
