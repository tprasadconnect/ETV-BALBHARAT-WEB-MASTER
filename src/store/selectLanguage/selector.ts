import { SystemState } from '../storeType';

export const getSelectLanguageState = (state: SystemState) => {
  return state.selectLanguage.data;
};
export const getLoaderState = (state: SystemState) => {
  return state.selectLanguage.loader;
};
export const getSelectLanguageId = (state: SystemState) => {
  return state.selectLanguage?.data?.lang_id;
};
