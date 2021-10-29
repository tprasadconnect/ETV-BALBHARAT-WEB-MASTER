import { SystemState } from '../storeType';

export const getScheduledProgramsState = (state: SystemState) => {
  return state.scheduledPrograms;
};

export const getLoaderState = (state: SystemState) => {
  return state.scheduledPrograms.loader;
};
