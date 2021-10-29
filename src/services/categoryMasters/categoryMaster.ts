import { postReq } from '../apiCall';
import { actionTypes } from '../../store/categoryMaster';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function categoryMaster(params: any) {
  const url = API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.GET_CAT_MASTER;
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.CATEGORY_MASTER_ACTION,
    });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          // let categoryMastersShowsList = []
          // let catgToonsList = []
          dispatch({
            type: actionTypes.CATEGORY_MASTER_SUCCESS_ACTION,
            payload: { data: response.data.data[0] },
          });
        } else if (response.data.status === 0) {
          dispatch({
            type: actionTypes.CATEGORY_MASTER_FAILURE_ACTION,
            payload: { error: response.data.errorDetails[0] },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: actionTypes.CATEGORY_MASTER_FAILURE_ACTION,
          payload: { error },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
