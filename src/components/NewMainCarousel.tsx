/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
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
// import { showItemDetailsActionTypes } from '../store/showItemDetails';
import { selectLanguageSelector } from '../store/selectLanguage';

interface IMainCorousel {
  groupCatId: string;
}

const bannerProps = {
  autoplay: true,
  center: true,
  loop: true,
  nav: false,
  margin: 32,
  items: 1.5,
  responsive: {
    0: {
      items: 1.2,
      margin: 16,
    },
    600: {
      items: 1.2,
    },
    1000: {
      items: 1.5,
    },
  },
};

export const NewMainCarousel: React.FC<IMainCorousel> = ({
  groupCatId,
}: IMainCorousel) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showLoader, setShowLoader] = useState(false);

  const langId = useSelector(selectLanguageSelector.getSelectLanguageId);

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
    React.useEffect(effect, [langId]);
  };
  useEffectOnMount(() => {
    if (langId) {
      if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS) {
        const params = {
          languageid: langId,
          moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
          groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS,
          sectionid: API_REQ_PARAM_CONSTANTS.SECTION_HOME_ID,
          userid: userid || '',
          kidid: kidid || '',
        };
        dispatch(sectionItemsShowsPopular(params));
      } else if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES) {
        const params = {
          languageid: langId,
          moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
          groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES,
          sectionid: API_REQ_PARAM_CONSTANTS.SECTION_HOME_ID,
          userid: userid || '',
          kidid: kidid || '',
        };
        dispatch(sectionItemsMoviesPopular(params));
      } else if (groupCatId === API_REQ_PARAM_CONSTANTS.HOME_BANNER_SEASONS) {
        const params = {
          languageid: langId,
          moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
          groupcatid: API_REQ_PARAM_CONSTANTS.HOME_BANNER_SEASONS,
          sectionid: API_REQ_PARAM_CONSTANTS.SECTION_HOME_ID,
          userid: userid || '',
          kidid: kidid || '',
        };
        dispatch(sectionItemsShowsPopular(params));
      }
    }
  });

  const handleCarouselClick = (
    groupCategoryId,
    mainCatId,
    subCatId,
    seasonDetails,
    content_id,
    page_url
  ) => {
    if (page_url) {
      const pageUrl = page_url.substring(page_url.indexOf('m') + 1);
      history.push({
        pathname: pageUrl,
      });
    } else if (groupCategoryId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS) {
      if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_TRAILER}/${content_id}`,
        });
      }
      if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_TRAILER}/${content_id}`,
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
      const { group_details, slider_image, title, content_id, page_url } = el;
      const { maincategory_details, group_catg_id } = group_details?.[0] || [];
      const { subcategory_details, catg_id } = maincategory_details?.[0] || [];
      const { sub_catg_id, season_details } = subcategory_details?.[0] || [];
      return (
        <React.Fragment key={content_id}>
          {slider_image && page_url !== undefined && (
            <div
              className="banner-item carouselImageTransform"
              key={content_id}
              role="button"
              tabIndex={0}
              onKeyPress={() => {}}
              onClick={() => {
                handleCarouselClick(
                  group_catg_id,
                  catg_id,
                  sub_catg_id,
                  season_details,
                  content_id,
                  page_url
                );
              }}
            >
              <img src={slider_image} alt={title} />
            </div>
          )}
          {slider_image && page_url === undefined && (
            <div
              className="banner-item carouselImageTransform"
              key={content_id}
              role="button"
              tabIndex={0}
              onKeyPress={() => {}}
              onClick={() => {
                handleCarouselClick(
                  group_catg_id,
                  catg_id,
                  sub_catg_id,
                  season_details,
                  content_id,
                  ''
                );
              }}
            >
              <img src={slider_image} alt={title} />
            </div>
          )}
        </React.Fragment>
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
  } else if (groupCatId === API_REQ_PARAM_CONSTANTS.HOME_BANNER_SEASONS) {
    slidingList =
      sectionItemsShowsPopularState &&
      CarouselList(sectionItemsShowsPopularState);
  }
  return (
    <div className="customCarousel">
      {/* eslint-disable-next-line */}
      <OwlCarousel className="owl-theme" {...bannerProps}>
        {slidingList}
      </OwlCarousel>
      {showLoader && <Loader />}
    </div>
  );
};
