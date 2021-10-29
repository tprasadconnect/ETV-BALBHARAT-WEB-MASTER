import {
  SetKidRegistrationActionTypes,
  GetKidProfileActionTypes,
  ProfileBuilderActionTypes,
} from './types';
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
  ADD_NEW_PROFILE_BUILDER_DATA,
  EDIT_PROFILE_BUILDER_DATA,
  UPDATE_KID_REGISTRATION_SUCCESS_ACTION,
  UPDATE_KID_REGISTRATION_FAILURE_ACTION,
} from './actionTypes';

export const initialProfileBuilderState = {
  activeTab: 1,
  profileBuilderData: {
    editProfile: {},
  },
  avatarList: [],
  preferencesList: [],
  setKidRegistration: {
    loader: false,
    error: null,
    data: null,
  },
  updateKidRegistration: {
    loader: false,
    error: null,
    data: null,
  },
  getKidProfile: {
    loader: false,
    error: null,
    data: null,
  },
};

export default (
  state = initialProfileBuilderState,
  action:
    | SetKidRegistrationActionTypes
    | GetKidProfileActionTypes
    | ProfileBuilderActionTypes
) => {
  switch (action.type) {
    case GET_AVATAR_LIST_ACTION:
      return {
        ...state,
        avatarList: action.payload.data,
        error: action.payload.error,
      };
    case GET_PREFERENCES_LIST_ACTION:
      return { ...state, preferencesList: action.payload.data };
    case GET_KID_PROFILE_ACTION:
      return { ...state, loader: true };
    case GET_KID_PROFILE_SUCCESS_ACTION:
      return { ...state, loader: false, data: action.payload.data };
    case GET_KID_PROFILE_FAILURE_ACTION:
      return { ...state, loader: false, error: action.payload.error };
    case SET_KID_REGISTRATION_ACTION:
      return { ...state, loader: true };
    case SET_KID_REGISTRATION_SUCCESS_ACTION:
      return {
        ...state,
        loader: action.payload.loader,
        setKidRegistration: {
          ...state.setKidRegistration,
          data: action.payload.data,
          loader: action.payload.loader,
        },
      };

    case SET_KID_REGISTRATION_FAILURE_ACTION:
      return {
        ...state,
        setKidRegistration: {
          ...state.setKidRegistration,
          error: action.payload.error,
          loader: action.payload.loader,
        },
      };

    case UPDATE_KID_REGISTRATION_SUCCESS_ACTION:
      return {
        ...state,
        updateKidRegistration: {
          ...state.setKidRegistration,
          data: action.payload.data,
          loader: action.payload.loader,
        },
      };

    case UPDATE_KID_REGISTRATION_FAILURE_ACTION:
      return {
        ...state,
        updateKidRegistration: {
          ...state.setKidRegistration,
          error: action.payload.error,
          loader: action.payload.loader,
        },
      };

    case SET_TAB_INDEX:
      return { ...state, activeTab: action.payload };
    case ADD_NEW_PROFILE_BUILDER_DATA: {
      return {
        ...state,
        profileBuilderData: {
          ...state.profileBuilderData,
          editProfile: action.payload.data,
        },
      };
    }
    case EDIT_PROFILE_BUILDER_DATA: {
      return {
        ...state,
        profileBuilderData: {
          ...state.profileBuilderData,
          editProfile: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
