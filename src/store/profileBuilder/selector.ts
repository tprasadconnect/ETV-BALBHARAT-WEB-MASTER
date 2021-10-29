import { SystemState } from '../storeType';

export const getAvatarList = (state: SystemState) => {
  return state.profileBuilder.avatarList;
};
export const getPreferencesList = (state: SystemState) => {
  return state.profileBuilder.preferencesList;
};

export const getProfileBuilderData = (state: SystemState) => {
  return state.profileBuilder.profileBuilderData;
};

export const getKidProfileState = (state: SystemState) => {
  return state.profileBuilder.getKidProfile;
};
export const getKidProfileLoaderState = (state: SystemState) => {
  return state.profileBuilder.getKidProfile.loader;
};

export const getKidRegistrationState = (state: SystemState) => {
  return state.profileBuilder.setKidRegistration;
};
export const getKidRegistrationLoaderState = (state: SystemState) => {
  return state.profileBuilder.setKidRegistration.loader;
};

export const getActiveTab = (state: SystemState) => {
  return state.profileBuilder.activeTab;
};
