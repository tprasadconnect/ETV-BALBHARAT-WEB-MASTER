import { postReq } from '../apiCall';
import { actionTypes } from '../../store/register';
import { actionTypes as userStoreActionTypes } from '../../store/userStore';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function registration(params: any) {
  const url = API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.REGISTRATION;
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.REGISTRATION_ACTION,
    });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          dispatch({
            type: actionTypes.REGISTRATION_SUCCESS_ACTION,
            payload: { data: response.data.data[0] },
          });
          dispatch({
            type: userStoreActionTypes.USER_STORE_SUCCESS_ACTION,
            payload: { data: response.data.data[0] },
          });
          localStorage.setItem(
            'userData',
            JSON.stringify(response.data.data[0])
          );
        } else if (response.data.status === 0) {
          dispatch({
            type: actionTypes.REGISTRATION_FAILURE_ACTION,
            payload: { error: response.data.errorDetails[0] },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: actionTypes.REGISTRATION_FAILURE_ACTION,
          payload: { error },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
