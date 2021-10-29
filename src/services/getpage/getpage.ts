import { postReq } from '../apiCall';
import { actionTypes } from '../../store/getpage';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function getpage(params: any) {
  const url = API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.GET_PAGE;
  return (dispatch: any) => {
    dispatch({ type: actionTypes.GET_PAGE_ACTION });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          dispatch({
            type: actionTypes.GET_PAGE_SUCCESS_ACTION,
            payload: { data: response.data.data },
          });
        } else if (response.data.status === 0) {
          dispatch({
            type: actionTypes.GET_PAGE_FAILURE_ACTION,
            payload: { error: response.data.errorDetails[0] },
          });
        }
      })
      .catch((error: any) => {
        dispatch({ type: actionTypes.GET_PAGE_ACTION, payload: { error } });
      });
  };
}
