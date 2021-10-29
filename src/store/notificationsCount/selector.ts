import { SystemState } from '../storeType';

export const getNotificationsCountState = (state: SystemState) => {
  return state.notificationsCount;
};

export const getLoaderState = (state: SystemState) => {
  return state.notificationsCount.loader;
};
