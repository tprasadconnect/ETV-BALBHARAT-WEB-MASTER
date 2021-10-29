import { postReq } from '../apiCall';
import { showItemDetailsActionTypes } from '../../store/showItemDetails';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function showItemDetails(params: any) {

  const url = API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.GET_ITEM_DETAILS;
  return (dispatch: any) => {
    dispatch({
      type: showItemDetailsActionTypes.SHOW_ITEM_DETAILS_ACTION,
    });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          const mainObj = response.data.data.section_details[0];
          if (response.data.data?.section_details.length > 0) {
            const { group_details } = response.data.data?.section_details[0];
            const { subcategory_details } = group_details[0]?.maincategory_details[0];
            const { season_details, sub_catg_id } = subcategory_details?.[0] || [];
            if (season_details.length > 0) {
              mainObj.season_details = season_details;
              mainObj.sub_catg_id = sub_catg_id;
            }
          }

          dispatch({
            type: showItemDetailsActionTypes.SHOW_ITEM_DETAILS_SUCCESS_ACTION,
            payload: { data: mainObj },
          });
        } else if (response.data.status === 0) {
          dispatch({
            type: showItemDetailsActionTypes.SHOW_ITEM_DETAILS_FAILURE_ACTION,
            payload: { error: response.data.errorDetails[0] },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: showItemDetailsActionTypes.SHOW_ITEM_DETAILS_FAILURE_ACTION,
          payload: { error },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
