import { postReq } from '../apiCall';
import { actionTypes } from '../../store/login';
import { actionTypes as userStoreActionTypes } from '../../store/userStore';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function login(params: any) {
  const url = API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.LOGIN;
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.LOGIN_ACTION,
    });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          dispatch({
            type: actionTypes.LOGIN_SUCCESS_ACTION,
            payload: { data: response.data.data },
          });
          dispatch({
            type: userStoreActionTypes.USER_STORE_SUCCESS_ACTION,
            payload: { data: response.data.data },
          });
          localStorage.setItem('userData', JSON.stringify(response.data.data));
        } else if (response.data.status === 0) {
          dispatch({
            type: actionTypes.LOGIN_FAILURE_ACTION,
            payload: { error: response.data.errorDetails[0] },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: actionTypes.LOGIN_FAILURE_ACTION,
          payload: { error },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
