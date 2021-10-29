import { postReq } from '../apiCall';
import { showsSectionCatItemsactionTypes } from '../../store/showsSectionCatItems';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstants';

export function showsSectionCatItems(params: any) {
  const url =
    API_URL_CONSTANTS.BASE_URL + API_URL_CONSTANTS.GET_SECTION_CAT_ITEMS;
  return (dispatch: any) => {
    dispatch({
      type: showsSectionCatItemsactionTypes.SHOWS_SECTION_CAT_ITEMS_ACTION,
    });
    postReq(url, params)
      .then((response: any) => {
        if (response.status === 200 && response.data.status === 1) {
          dispatch({
            type: showsSectionCatItemsactionTypes.SHOWS_SECTION_CAT_ITEMS_SUCCESS_ACTION,
            payload: { data: response.data.data },
          });
        } else if (response.data.status === 0) {
          dispatch({
            type: showsSectionCatItemsactionTypes.SHOWS_SECTION_CAT_ITEMS_FAILURE_ACTION,
            payload: { error: response.data.errorDetails[0] },
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: showsSectionCatItemsactionTypes.SHOWS_SECTION_CAT_ITEMS_FAILURE_ACTION,
          payload: { error },
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
