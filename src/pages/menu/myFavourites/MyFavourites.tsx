/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { backIcon } from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { favourite } from '../../../services/favourite/favourite';
import { selectors } from '../../../store/favourite';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { Loader } from '../../../components/Loader';
import { API_REQ_PARAM_CONSTANTS } from '../../../constants/apiReqParamConstants';

export function MyFavourites() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['common', 'menu']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const favouriteState = useSelector(selectors.getFavouriteState);

  const [showLoader, setShowLoader] = React.useState(false);
  const [ddValue, setDdValue] = React.useState('all');

  const getMovieItems = (item) =>
    item.group_details[0].group_catg_id ===
    API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES;

  const getShowsItems = (item) =>
    item.group_details[0].group_catg_id ===
    API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS;

  let favouriteItemsAll = [];
  if (ddValue === 'all') {
    favouriteItemsAll =
      (favouriteState?.data && favouriteState?.data?.favourite_details) || [];
  } else if (ddValue === 'movies') {
    const allItems =
      (favouriteState?.data && favouriteState?.data?.favourite_details) || [];
    favouriteItemsAll = allItems.filter(getMovieItems);
  } else if (ddValue === 'shows') {
    const allItems =
      (favouriteState?.data && favouriteState?.data?.favourite_details) || [];
    favouriteItemsAll = allItems.filter(getShowsItems);
  }

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = {
      userid,
      kidid: kidid || '',
    };
    dispatch(favourite(params));
  });
  const useEffectOnSubCat = (effect: React.EffectCallback) => {
    React.useEffect(effect, [favouriteState]);
  };
  useEffectOnSubCat(() => {
    setShowLoader(favouriteState.loader);
  });

  const handleItemClick = (
    groupCategoryId,
    mainCatId,
    subCatId,
    seasonDetails
  ) => {
    if (groupCategoryId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS) {
      if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
        });
      }
      if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
        });
      }
      if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_TODDLERS_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.TODDLERS_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
        });
      }
      if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_EDUTAINMENT_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.EDUTAINMENT_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
        });
      }
    } else if (
      groupCategoryId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES
    ) {
      if (mainCatId === API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${subCatId}`,
        });
      }
    }
  };

  const handleDropdownSelect = (e) => {
    setDdValue(e.target.value);
  };

  return (
    <div className="myFavourites">
      <div className="main-background content-padding d-flex align-items-center">
        <div className="w-100">
          <Row>
            <Col md={1} xs={6} className="d-none d-lg-block" />
            <Col md={10}>
              <div className="edit-account__container">
                <div className="edit-account__back-btn pl-sm-3 pb-3">
                  <div>
                    <Image alt="" src={backIcon} />
                  </div>
                  <Link to={ROUTER_URL_CONSTANT.MENU}>
                    <span className="edit-account__back-btn__back-text">
                      {t('common:back')}
                    </span>
                  </Link>
                </div>
                <Row className="pt-3 pl-sm-3 ">
                  <Col md={6} sm={6} xs={12} className="notifications__heading">
                    {t('menu:favourites')}
                  </Col>
                  <Col md={6} sm={6} xs={12} className="">
                    <select
                      className="selectCategory"
                      onChange={handleDropdownSelect}
                    >
                      <option value="all">{t('menu:all')}</option>
                      <option value="movies">{t('menu:movies')}</option>
                      <option value="shows">{t('shows')}</option>
                    </select>
                  </Col>
                </Row>
                <div className="container-fluid pt-3">
                  <div className="row">
                    {favouriteItemsAll && favouriteItemsAll.length > 0
                      ? favouriteItemsAll.map((item) => {
                          const {
                            feature_image,
                            title,
                            genre,
                            episode,
                            seasons,
                            group_details,
                            year,
                          } = item;
                          const {
                            group_catg_id,
                            maincategory_details,
                          } = group_details[0];
                          const {
                            catg_id,
                            subcategory_details,
                          } = maincategory_details[0];
                          const {
                            sub_catg_id,
                            season_details,
                          } = subcategory_details[0];

                          return (
                            <div
                              className="col-sm-3 contentClass pt-1"
                              key={sub_catg_id}
                              role="button"
                              onKeyPress={() => {}}
                              tabIndex={0}
                              onClick={() =>
                                handleItemClick(
                                  group_catg_id,
                                  catg_id,
                                  sub_catg_id,
                                  season_details
                                )
                              }
                            >
                              <div className="row">
                                <div className="col-sm-12 col-xs-6 ">
                                  <img
                                    src={feature_image}
                                    alt="favourite pic"
                                    className="episodePic"
                                  />
                                </div>
                                <div className="col-sm-12 col-xs-6 ">
                                  {group_catg_id ===
                                    API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS && (
                                    <>
                                      <div className="heading">
                                        <span className="tvshows">
                                          {t('menu:tvshow')}
                                        </span>
                                      </div>
                                      <div className="episode">
                                        {t('menu:episode')} {episode} .{' '}
                                        {t('menu:season')} {seasons}
                                      </div>
                                    </>
                                  )}
                                  {group_catg_id ===
                                    API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES && (
                                    <>
                                      <div className="heading">
                                        <span className="movies">
                                          {t('menu:movie')}
                                        </span>
                                      </div>
                                      <div className="episode">
                                        {year} . {t('menu:english')}
                                      </div>
                                    </>
                                  )}
                                  <div className="title">{title}</div>
                                  <div className="description"> {genre} </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : 'No favourite items found'}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={1} />
          </Row>
        </div>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
