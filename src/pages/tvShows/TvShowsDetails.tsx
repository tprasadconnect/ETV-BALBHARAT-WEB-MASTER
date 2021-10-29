/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShowMoreText from 'react-show-more-text';
import {
  favIcon,
  favouriteSelect,
  favouriteUnselect,
  playerBackBtn,
} from '../../constants/iconImageConstant';
import { Footer } from '../appFooter/Footer';
import { Header } from '../Header/Header';
import { SimilarTvShows } from './SimilarTvShows';
import { Player } from '../../components/Player';
import { showsSectionCatItemsactionTypes } from '../../store/showsSectionCatItems';
import { Loader } from '../../components/Loader';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { setFavorite } from '../../services/setFavourite/setFavourite';
import { showItemDetails } from '../../services/showItemDetails/showItemDetails';
import {
  showItemDetailsSelectors,
  showItemDetailsActionTypes,
} from '../../store/showItemDetails';
// import { EpisodesComponent } from './EpisodesComponent';
import { setWatchedList } from '../../services/setWatchedList/setWatchedList';
import { getTimeInHoursMinutesSeconds } from '../../utils/commonFunctions';
import { TrailerAndSeasonTab } from './TrailerAndSeasonTab';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectLanguageSelector } from '../../store/selectLanguage';
import { getItem } from '../../utils/storage';

interface IShowPlayer {
  match: any;
}

export const TvShowsDetails: React.FC<IShowPlayer> = (props: IShowPlayer) => {
  const { match } = props;

  const { t } = useTranslation(['common', 'playerDetails']);
  const dispatch = useDispatch();
  const history = useHistory();

  const { itemId } = match.params;

  const urlParams = history.location.pathname.split('/');

  const watchedDuration = history.location.search.split('=')[1];

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  let kidid = userStoreState.data && userStoreState.data.selectedKidid;
  if (getItem('selectedKid')) {
    const kid = getItem('selectedKid');
    kidid = kid?.kidid;
  }

  const [epiVideoUrl, setEpiVideoUrl] = useState('' as any);
  const [epiBannerUrl, setEpiBannerUrl] = useState('' as any);
  const [showInfo, setShowInfo] = useState({
    title: '',
    tagname: '',
    seasons: '',
    episode: '',
    genre: '',
    description: '',
    content_id: '',
  } as any);
  const [showLoader, setShowLoader] = useState(false);
  // const [dropDownValue, setDropDownValue] = useState({ value: seasonId });
  const [isAutoPlay] = useState(false);
  const [isFavShow, setIsFavShow] = useState(false);
  const [bookmarkTime, setBookmarkTime] = useState<number>(0);
  const languageId = useSelector(selectLanguageSelector.getSelectLanguageId);

  const useEffectCategoryMaster = (effect: React.EffectCallback) => {
    useEffect(effect, [languageId]);
  };
  useEffectCategoryMaster(() => {
    if (languageId) {
      const params = { languageid: languageId };
      dispatch(categoryMaster(params));
    }
  });
  const showItemDetailsState = useSelector(
    showItemDetailsSelectors.getShowItemDetailsState
  );

  // reset ShowsSectionCatItemsState
  const useEffectOnResetSectionCatItemsState = (
    effect: React.EffectCallback
  ) => {
    React.useEffect(effect, []);
  };
  useEffectOnResetSectionCatItemsState(() => {
    return () => {
      dispatch({
        type:
          showsSectionCatItemsactionTypes.SHOWS_SECTION_CAT_ITEMS_RESET_ACTION,
      });
      dispatch({
        type: showItemDetailsActionTypes.SHOW_ITEM_DETAILS_RESET_ACTION,
      });
    };
  });

  const useEffectOnWathedDuration = (effect: React.EffectCallback) => {
    React.useEffect(effect, [watchedDuration]);
  };
  useEffectOnWathedDuration(() => {
    if (watchedDuration) {
      setBookmarkTime(parseInt(watchedDuration, 10));
    }
  });
  // api call start
  const callItemDetails = (contentId) => {
    const params = {
      kidid: kidid || '',
      userid: userid || '',
      contentid: contentId,
    };
    dispatch(showItemDetails(params));
  };
  // get item details based on content id start
  const useEffectGetItemDetails = (effect: React.EffectCallback) => {
    React.useEffect(effect, [itemId]);
  };
  useEffectGetItemDetails(() => {
    if (itemId) callItemDetails(itemId);
  });
  // get item details based on content id end

  // Get Episode info
  const useEffectOnItemDetail = (effect: React.EffectCallback) => {
    React.useEffect(effect, [showItemDetailsState]);
  };
  useEffectOnItemDetail(() => {
    if (showItemDetailsState.data) {
      setEpiVideoUrl(showItemDetailsState.data.full_video_url);
      setEpiBannerUrl(showItemDetailsState.data.feature_image);
      setShowInfo(showItemDetailsState.data);
      setIsFavShow(showItemDetailsState.data.isfavourite);
    }
    setShowLoader(showItemDetailsState.loader);
  });

  const callSetFavorite = (contentId) => {
    const params = {
      userid,
      kidid: kidid || '',
      contentid: contentId,
    };
    dispatch(setFavorite(params));
  };
  // api call end

  const backToPrevious = () => {
    if (urlParams[2].includes('originals'))
      history.push(ROUTER_URL_CONSTANT.ORIGINALS);
    if (urlParams[2].includes('global'))
      history.push(ROUTER_URL_CONSTANT.GLOBAL);
    if (urlParams[2].includes('toddlers'))
      history.push(ROUTER_URL_CONSTANT.TODDLERS);
    if (urlParams[2].includes('edutainment'))
      history.push(ROUTER_URL_CONSTANT.EDUTAINMENT);
  };

  const executeOnClick = () => {};

  const onSimilarCardClick = (
    subCatId,
    seasonDetails,
    mainCatId,
    episodeId
  ) => {
    if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID) {
      history.push(
        `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}/${mainCatId}/${subCatId}/${episodeId}`
      );
      window.location.reload();
    }
    if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID) {
      history.push(
        `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}/${mainCatId}/${subCatId}/${episodeId}`
      );
      window.location.reload();
    }
  };

  const setWatchedListMovies = (timeInSecs) => {
    const currentTimeInMins = getTimeInHoursMinutesSeconds(timeInSecs);
    const params = {
      kidid: kidid || '',
      userid,
      contentid: showInfo.content_id,
      duration: currentTimeInMins,
    };
    dispatch(setWatchedList(params));
  };

  let currentTimeFloorValue = 0;
  const callSetWatchedList = (currentTime) => {
    const currentTimeModulus = Math.floor(currentTime) % 120;
    if (currentTimeModulus === 0) {
      currentTimeFloorValue = Math.floor(currentTime);
      if (currentTimeFloorValue !== 0) {
        setWatchedListMovies(currentTimeFloorValue);
      }
    }
  };
  const onTimeUpdate = (currentTime: number) => {
    if (currentTimeFloorValue === Math.floor(currentTime))
      currentTimeFloorValue = Math.floor(currentTime);
    else callSetWatchedList(currentTime);
  };

  const onPause = (currentTime?: number) => {
    const floorValue = currentTime && Math.floor(currentTime);
    setWatchedListMovies(floorValue);
  };

  const setFavoriteItem = (contentId: string) => {
    setIsFavShow(!isFavShow);
    callSetFavorite(contentId);
  };

  return (
    <div className="detailsPageSections">
      <Header />
      <div className="moviesDetails__player">
        <div>
          <Button
            type="button"
            onClick={backToPrevious}
            className="moviesDetails__playerBackBtn"
          >
            <img src={playerBackBtn} alt="player back" />
          </Button>
        </div>
        {/* {userid && ( */}
        <div>
          <button
            type="button"
            onClick={() => setFavoriteItem(showInfo.content_id)}
            className="moviesDetails__favouriteIcon"
          >
            <img
              src={isFavShow ? favouriteSelect : favouriteUnselect}
              alt="favourite icon"
            />
          </button>
        </div>
        {/* )} */}
        <Player
          videoUrl={epiVideoUrl}
          bannerUrl={epiBannerUrl}
          watchedDuration={bookmarkTime}
          autoPlayVideo={isAutoPlay}
          handleTimeUpdate={onTimeUpdate}
          handleOnPause={onPause}
        />
      </div>

      <div className="container detailsPageSections__bannerImage">
        <div className="detailsPageSections__video-container">
          <Row className="d-flex justify-content-start detailsPageSections__video-title">
            {' '}
            {showInfo && showInfo.title}
            <div className="title-meta-info">
              <div className="d-flex">
                {userid && (
                  <div
                    onClick={() => setFavoriteItem(showInfo.content_id)}
                    aria-hidden="true"
                  >
                    <picture className="mr-2">
                      <img
                        src={isFavShow ? favouriteSelect : favIcon}
                        alt="fav-icon"
                      />
                    </picture>
                  </div>
                )}
                {/* <picture>
                  <img src={shareIcon} alt="share-icon" />
                </picture> */}
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-start detailsPageSections__video-sub-title">
            {' '}
            {showInfo && showInfo.genre}
          </Row>
          {showInfo.seasons === '0' && (
            <Row className="d-flex justify-content-start detailsPageSections__video-info">
              TRAILERS
            </Row>
          )}
          {showInfo.seasons !== '0' && (
            <Row className="d-flex justify-content-start detailsPageSections__video-info">
              {' '}
              {t('playerDetails:season')} {showInfo.seasons} .{' '}
              {t('playerDetails:episode')} {showInfo.episode} .{' '}
              {t('common:english')}
            </Row>
          )}

          <Row className="d-flex justify-content-start detailsPageSections__video-desc">
            <ShowMoreText
              lines={2}
              more="More"
              less="Less"
              className="userContent content-css detailsPageSections__video-desc-details"
              anchorClass="my-anchor-css-class"
              onClick={executeOnClick}
              expanded={false}
              width={600}
            >
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: showInfo.short_description,
                }}
              />
            </ShowMoreText>
          </Row>
        </div>
        <hr />
      </div>

      <TrailerAndSeasonTab
        setFavoriteItem={setFavoriteItem}
        isFavShow={isFavShow}
        match={match}
      />

      <SimilarTvShows handleSimilarCardClick={onSimilarCardClick} />
      <Footer />
      {showLoader && <Loader />}
    </div>
  );
};
