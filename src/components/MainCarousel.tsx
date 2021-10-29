/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_REQ_PARAM_CONSTANTS } from '../constants/apiReqParamConstants';
import { ROUTER_URL_CONSTANT } from '../constants/routerUrlConstant';
import { Loader } from './Loader';
import { selectors as userStoreSelectors } from '../store/userStore';
import { sectionItemsShowsPopular } from '../services/sectionItemsShowsPopular/sectionItemsShowsPopular';
import { selectors as showsPopularSelectors } from '../store/sectionItemsShowsPopular';
import { sectionItemsMoviesPopular } from '../services/sectionItemsMoviesPopular/sectionItemsMoviesPopular';
import { selectors as moviesPopularSelectors } from '../store/sectionItemsMoviesPopular';

interface IMainCorousel {
  groupCatId: string;
}
export const MainCarousel: React.FC<IMainCorousel> = ({
  groupCatId,
}: IMainCorousel) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showLoader, setShowLoader] = useState(false);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const useEffectOnMountCheckLogin = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMountCheckLogin(() => {
    setShowLoader(userStoreState.loader);
  });

  const getSectionItemsShowsPopularState = useSelector(
    showsPopularSelectors.getSectionItemsState
  );
  const sectionItemsShowsPopularState =
    getSectionItemsShowsPopularState.data &&
    getSectionItemsShowsPopularState.data.section_details;

  const getSectionItemsMoviePopularState = useSelector(
    moviesPopularSelectors.getSectionItemsState
  );
  const sectionItemsMoviePopularState =
    getSectionItemsMoviePopularState.data &&
    getSectionItemsMoviePopularState.data.section_details;

  const useEffectOnMountSectionItemsShows = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getSectionItemsShowsPopularState]);
  };
  useEffectOnMountSectionItemsShows(() => {
    setShowLoader(getSectionItemsShowsPopularState.loader);
  });
  const useEffectOnMountSectionItemsMovies = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getSectionItemsMoviePopularState]);
  };
  useEffectOnMountSectionItemsMovies(() => {
    setShowLoader(getSectionItemsMoviePopularState.loader);
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS) {
      const params = {
        languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
        moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
        groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS,
        sectionid: API_REQ_PARAM_CONSTANTS.SECTION_POPULAR_ID,
        userid: userid || '',
        kidid: kidid || '',
      };
      dispatch(sectionItemsShowsPopular(params));
    } else if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES) {
      const params = {
        languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
        moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
        groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES,
        sectionid: API_REQ_PARAM_CONSTANTS.SECTION_POPULAR_ID,
        userid: userid || '',
        kidid: kidid || '',
      };
      dispatch(sectionItemsMoviesPopular(params));
    }
  });

  const handleCarouselClick = (
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

  const CarouselList = (list: any) =>
    list.map((el: any) => {
      const { group_details, feature_image, title } = el;
      const { maincategory_details, group_catg_id } = group_details[0];
      const { subcategory_details, catg_id } = maincategory_details[0];
      const { sub_catg_id, season_details } = subcategory_details[0];
      return (
        <Carousel.Item>
          <div className="tvShows__img-container">
            <img
              className="d-block w-100 tvShows__img-size"
              src={feature_image}
              alt={title}
            />
            <div className="tvShows__lgradient1" />
            <div className="tvShows__lgradient" />
            <div className="tvShows__banner-title">{title}</div>
            <Button
              className="btn-pink-watchnow tvShows__banner-watchnow-btn"
              onClick={() =>
                handleCarouselClick(
                  group_catg_id,
                  catg_id,
                  sub_catg_id,
                  season_details
                )
              }
            />
          </div>
          <Button
            className="btn-pink-watchnow tvShows__mbanner-watchnow-btn"
            onClick={() =>
              handleCarouselClick(
                group_catg_id,
                catg_id,
                sub_catg_id,
                season_details
              )
            }
          />
        </Carousel.Item>
      );
    });

  let slidingList;
  if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS) {
    slidingList =
      sectionItemsShowsPopularState &&
      CarouselList(sectionItemsShowsPopularState);
  } else if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES) {
    slidingList =
      sectionItemsMoviePopularState &&
      CarouselList(sectionItemsMoviePopularState);
  }

  return (
    <>
      <Carousel interval={200000}>{slidingList}</Carousel>
      {showLoader && <Loader />}
    </>
  );
};
