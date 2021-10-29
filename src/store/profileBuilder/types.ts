import {
  GET_AVATAR_LIST_ACTION,
  GET_PREFERENCES_LIST_ACTION,
  GET_KID_PROFILE_ACTION,
  GET_KID_PROFILE_SUCCESS_ACTION,
  GET_KID_PROFILE_FAILURE_ACTION,
  SET_KID_REGISTRATION_ACTION,
  SET_KID_REGISTRATION_SUCCESS_ACTION,
  SET_KID_REGISTRATION_FAILURE_ACTION,
  SET_TAB_INDEX,
  SET_PROFILE_BUILDER_DATA,
  ADD_NEW_PROFILE_BUILDER_DATA,
  EDIT_PROFILE_BUILDER_DATA,
  UPDATE_KID_REGISTRATION_SUCCESS_ACTION,
  UPDATE_KID_REGISTRATION_FAILURE_ACTION,
} from './actionTypes';

interface GetAvatarListAction {
  type: typeof GET_AVATAR_LIST_ACTION;
  payload: any;
}
interface GetPreferencesListAction {
  type: typeof GET_PREFERENCES_LIST_ACTION;
  payload: any;
}

interface GetKidProfileAction {
  type: typeof GET_KID_PROFILE_ACTION;
  payload: any;
}
interface GetKidProfileSuccessAction {
  type: typeof GET_KID_PROFILE_SUCCESS_ACTION;
  payload: any;
}
interface GetKidProfileFailureAction {
  type: typeof GET_KID_PROFILE_FAILURE_ACTION;
  payload: any;
}

interface SetKidRegistrationAction {
  type: typeof SET_KID_REGISTRATION_ACTION;
  payload: any;
}
interface SetKidRegistrationSuccessAction {
  type: typeof SET_KID_REGISTRATION_SUCCESS_ACTION;
  payload: any;
}
interface SetKidRegistrationFailureAction {
  type: typeof SET_KID_REGISTRATION_FAILURE_ACTION;
  payload: any;
}
interface SetTabIndex {
  type: typeof SET_TAB_INDEX;
  payload: any;
}
interface SetProfileBuilderData {
  type: typeof SET_PROFILE_BUILDER_DATA;
  payload: any;
}
interface AddNewProfileBuilderData {
  type: typeof ADD_NEW_PROFILE_BUILDER_DATA;
  payload: any;
}
interface EditProfileBuilderData {
  type: typeof EDIT_PROFILE_BUILDER_DATA;
  payload: any;
}

interface UpadeKidRegistrationSuccessAction {
  type: typeof UPDATE_KID_REGISTRATION_SUCCESS_ACTION;
  payload: any;
}

interface UpadeKidRegistrationFailureAction {
  type: typeof UPDATE_KID_REGISTRATION_FAILURE_ACTION;
  payload: any;
}

export type GetKidProfileActionTypes =
  | GetKidProfileAction
  | GetKidProfileSuccessAction
  | GetKidProfileFailureAction;

export type SetKidRegistrationActionTypes =
  | SetKidRegistrationAction
  | SetKidRegistrationSuccessAction
  | SetKidRegistrationFailureAction;

export type ProfileBuilderActionTypes =
  | SetTabIndex
  | SetProfileBuilderData
  | GetAvatarListAction
  | GetPreferencesListAction
  | AddNewProfileBuilderData
  | EditProfileBuilderData
  | UpadeKidRegistrationSuccessAction
  | UpadeKidRegistrationFailureAction;
