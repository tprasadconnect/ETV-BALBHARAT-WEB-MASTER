import { getReq } from '../apiCall';
import { actionTypes } from '../../store/profileBuilder';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function getAvatar() {
  const url = API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.GET_AVATAR;
  return (dispatch: any) => {
    getReq(url)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          dispatch({
            type: actionTypes.GET_AVATAR_LIST_ACTION,
            payload: { data: Object.values(response.data.data) },
          });
        } else if (response.data.status === 0) {
          dispatch({
            type: actionTypes.GET_AVATAR_LIST_ACTION,
            payload: { data: null },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: actionTypes.GET_AVATAR_LIST_ACTION,
          payload: { data: null },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
