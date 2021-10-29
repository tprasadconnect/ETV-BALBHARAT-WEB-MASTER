import { SystemState } from '../storeType';

export const getPolicyNotesState = (state: SystemState) => {
  return state.policyNotes;
};

export const getLoaderState = (state: SystemState) => {
  return state.policyNotes.loader;
};
