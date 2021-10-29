import { postReq } from '../apiCall';
import { actionTypes } from '../../store/catgMaster';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function catgMaster(params: any) {
  const url = API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.GET_CATG_MASTER;
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.CATG_MASTER_ACTION,
    });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          let sessionDetails = [];
          if (params.subcatid === 'all') {
            sessionDetails =
              response.data.data[0].group_details[0].maincategory_details;
          } else if (
            params.subcatid === '1' ||
            params.subcatid === '2' ||
            params.subcatid === '3' ||
            params.subcatid === '4'
          ) {
            const dataVal =
              response.data.data[0].group_details[0].maincategory_details;
            for (let i = 0; i < dataVal.length; i += 1) {
              if (params.subcatid === dataVal[i].catg_id) {
                if (dataVal[i].subcategory_details) {
                  sessionDetails = dataVal[i].subcategory_details;
                }
              }
            }
          }

          dispatch({
            type: actionTypes.CATG_MASTER_SUCCESS_ACTION,
            payload: { data: sessionDetails },
          });
        } else if (response.data.status === 0) {
          dispatch({
            type: actionTypes.CATG_MASTER_FAILURE_ACTION,
            payload: { error: response.data.errorDetails[0] },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: actionTypes.CATG_MASTER_FAILURE_ACTION,
          payload: { error },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
