import {
  POLICY_NOTES_ACTION,
  POLICY_NOTES_SUCCESS_ACTION,
  POLICY_NOTES_FAILURE_ACTION,
} from './actionTypes';
import { PolicyNotesActionTypes } from './types';

export const initialPolicyNotesState = {
  loader: false,
  error: null,
  data: null,
};

export default (
  state = initialPolicyNotesState,
  action: PolicyNotesActionTypes
) => {
  switch (action.type) {
    case POLICY_NOTES_ACTION:
      return {
        ...state,
        loader: true,
      };
    case POLICY_NOTES_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case POLICY_NOTES_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    default:
      return state;
  }
};
