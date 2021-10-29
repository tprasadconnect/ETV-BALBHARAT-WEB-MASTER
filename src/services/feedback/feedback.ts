import { postReq } from '../apiCall';
import { actionTypes } from '../../store/feedback';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function feedback(params: any) {
  const url = API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.SET_FEEDBACK;
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.FEEDBACK_ACTION,
    });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          dispatch({
            type: actionTypes.FEEDBACK_SUCCESS_ACTION,
            payload: { data: response.data.data },
          });
        } else if (response.data.status === 0) {
          dispatch({
            type: actionTypes.FEEDBACK_FAILURE_ACTION,
            payload: { error: response.data.errorDetails[0] },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: actionTypes.FEEDBACK_FAILURE_ACTION,
          payload: { error },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
