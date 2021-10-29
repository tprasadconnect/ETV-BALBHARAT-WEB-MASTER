import {
  SCHEDULED_PROGRAMS_ACTION,
  SCHEDULED_PROGRAMS_SUCCESS_ACTION,
  SCHEDULED_PROGRAMS_FAILURE_ACTION,
} from './actionTypes';
import { ScheduledProgramsActionTypes } from './types';

export const initialScheduledProgramsState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialScheduledProgramsState,
  action: ScheduledProgramsActionTypes
) => {
  switch (action.type) {
    case SCHEDULED_PROGRAMS_ACTION:
      return {
        ...state,
        loader: true,
      };
    case SCHEDULED_PROGRAMS_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case SCHEDULED_PROGRAMS_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
