import { postReq } from '../apiCall';
import { actionTypes } from '../../store/profileBuilder';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function updateKidRegistration(params: any) {
  const url =
    API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.UPDATE_KID_REGISTRATION;
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.UPDATE_KID_REGISTRATION_SUCCESS_ACTION,
      payload: { data: null, loader: true },
    });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          dispatch({
            type: actionTypes.UPDATE_KID_REGISTRATION_SUCCESS_ACTION,
            payload: { data: response.data.data, loader: false },
          });
        } else if (response.data.status === 0) {
          dispatch({
            type: actionTypes.UPDATE_KID_REGISTRATION_FAILURE_ACTION,
            payload: { error: response.data.errorDetails, loader: false },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: actionTypes.UPDATE_KID_REGISTRATION_FAILURE_ACTION,
          payload: { error, loader: false },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
