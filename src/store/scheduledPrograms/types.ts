import {
  SCHEDULED_PROGRAMS_ACTION,
  SCHEDULED_PROGRAMS_SUCCESS_ACTION,
  SCHEDULED_PROGRAMS_FAILURE_ACTION,
} from './actionTypes';

interface ScheduledProgramsAction {
  type: typeof SCHEDULED_PROGRAMS_ACTION;
  payload: any;
}

interface ScheduledProgramsSuccessAction {
  type: typeof SCHEDULED_PROGRAMS_SUCCESS_ACTION;
  payload: any;
}

interface ScheduledProgramsFailureAction {
  type: typeof SCHEDULED_PROGRAMS_FAILURE_ACTION;
  payload: any;
}

export type ScheduledProgramsActionTypes =
  | ScheduledProgramsAction
  | ScheduledProgramsSuccessAction
  | ScheduledProgramsFailureAction;
