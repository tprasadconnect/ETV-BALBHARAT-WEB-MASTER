import { SystemState } from '../storeType';

export const getNotificationsState = (state: SystemState) => {
  return state.notifications;
};

export const getLoaderState = (state: SystemState) => {
  return state.notifications.loader;
};
