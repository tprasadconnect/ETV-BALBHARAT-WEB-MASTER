/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShowMoreText from 'react-show-more-text';
import {
  favouriteSelect,
  favouriteUnselect,
  playerBackBtn,
  tplayYellowIcon,
} from '../../constants/iconImageConstant';
import { Footer } from '../appFooter/Footer';
import { Header } from '../Header/Header';
import { Player } from '../../components/Player';
import { sectionCatItems } from '../../services/sectionCatItems/sectionCatItems';
import {
  selectors,
  actionTypes as sectionCatItemsActionTypes,
} from '../../store/sectionCatItems';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { Loader } from '../../components/Loader';
// import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { itemDetails } from '../../services/itemDetails/itemDetails';
import { selectors as itemDetailsSelectors } from '../../store/itemDetails';
import { selectors as userStoreSelectors } from '../../store/userStore';
//  import { SimilarMovies } from './SimilarMovies';
import { setFavorite } from '../../services/setFavourite/setFavourite';
import { setWatchedList } from '../../services/setWatchedList/setWatchedList';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectLanguageSelector } from '../../store/selectLanguage';

export const MoviesDetails: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['movies']);

  const urlParamsList = history.location.pathname.split('/');
  const movieId = urlParamsList[3];

  const bookmarkTime = history.location.search.split('=')[1]
    ? parseInt(history.location.search.split('=')[1], 10)
    : 0;
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );

  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnMountCatgMaster(() => {
    if (userLanguageId) {
      const params = { languageid: userLanguageId };
      dispatch(categoryMaster(params));
    }
  });
  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const moviesSubCatState = useSelector(selectors.getSectionCatItemsState); // get section cat items API response
  const itemDetailsState = useSelector(
    itemDetailsSelectors.getItemDetailsState
  );

  const [videoUrl, setVideoUrl] = useState('');
  const [bannerImgUrl, setBannerImgUrl] = useState('');
  const [movieInfo, setMovieInfo] = useState({
    title: '',
    tagname: '',
    year: '',
    short_description: '',
    full_video_duration: '',
    trail_video_duration: '',
    trail_video_url: '',
    full_video_url: '',
    feature_image: '',
    description: '',
    content_id: '',
    isfavourite: false,
    genre: '',
  });
  const [showLoader, setShowLoader] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isMoviePlaying, setIsMoviePlaying] = useState(false);

  const useEffectOnSectionItems = (effect: React.EffectCallback) => {
    React.useEffect(effect, [movieId, userLanguageId]);
  };
  useEffectOnSectionItems(() => {
    if (userLanguageId) {
      if (movieId) {
        const params = {
          languageid: userLanguageId,
          moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID, // fixed
          groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES, // fixed
          maincatid: API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID, // fixed
          subcatid: movieId,
          userid: userid || '',
          kidid: kidid || '',
          limit: '',
          offset: '',
        };
        dispatch(sectionCatItems(params));
      }
    }
  });

  const useEffectOnSubCat = (effect: React.EffectCallback) => {
    React.useEffect(effect, [moviesSubCatState]);
  };
  useEffectOnSubCat(() => {
    if (moviesSubCatState.data && moviesSubCatState.data.section_details) {
      setIsMoviePlaying(true);
      const params = {
        kidid: kidid || '',
        userid,
        contentid: moviesSubCatState.data.section_details[0].content_id,
      };
      dispatch(itemDetails(params));
    }
    setShowLoader(moviesSubCatState.loader);
  });

  const useEffectOnItemDetail = (effect: React.EffectCallback) => {
    React.useEffect(effect, [itemDetailsState]);
  };
  useEffectOnItemDetail(() => {
    if (itemDetailsState.data && itemDetailsState.data.section_details) {
      setVideoUrl(itemDetailsState.data.section_details[0].full_video_url);
      setBannerImgUrl(itemDetailsState.data.section_details[0].feature_image);
      setMovieInfo(itemDetailsState.data.section_details[0]);
      setIsFav(itemDetailsState.data.section_details[0].isfavourite);
    }
  });

  const getMovieHrsMins = (movieDuration: string) => {
    return `${Math.floor(parseInt(movieDuration, 10) / 60)} HRS ${
      parseInt(movieDuration, 10) % 60
    } MIN`;
  };

  const handleTrailerClick = (trailerUrl: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setVideoUrl(trailerUrl);
    setIsMoviePlaying(false);
  };

  const executeOnClick = () => {};

  // const onSimilarCardClick = (cardid: string) => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  //   const params = {
  //     languageid: userLanguageId,
  //     moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID, // fixed
  //     groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES, // fixed
  //     maincatid: API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID, // fixed
  //     subcatid: cardid,
  //     userid: userid || '',
  //     kidid: kidid || '',
  //     limit: '',
  //     offset: '',
  //   };
  //   dispatch(sectionCatItems(params));
  //   history.push({
  //     pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${cardid}`,
  //   });
  // };

  const setFavoriteItem = (contentId: string) => {
    setIsFav(!isFav);
    const params = {
      userid,
      kidid: kidid || '',
      contentid: contentId,
    };
    dispatch(setFavorite(params));
  };
  const backToPrevious = () => {
    history.goBack();
  };

  const secondsToHms = (d) => {
    const secs = Number(d);
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor((secs % 3600) % 60);

    const hDisplay = h < 10 ? `0${h}` : h;
    const mDisplay = m < 10 ? `0${m}` : m;
    const sDisplay = s < 10 ? `0${s}` : s;
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
  };

  const setWatchedListMovies = (timeInSecs) => {
    const currentTimeInMins = secondsToHms(timeInSecs);
    const params = {
      kidid: kidid || '',
      userid,
      contentid: movieInfo.content_id,
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
    if (isMoviePlaying) {
      if (currentTimeFloorValue === Math.floor(currentTime))
        currentTimeFloorValue = Math.floor(currentTime);
      else callSetWatchedList(currentTime);
    }
  };

  const onPause = (currentTime?: number) => {
    if (isMoviePlaying) {
      const floorValue = currentTime && Math.floor(currentTime);
      setWatchedListMovies(floorValue);
    }
  };
  useEffect(() => {
    return () => {
      dispatch({
        type: sectionCatItemsActionTypes.SECTION_CAT_ITEMS_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: sectionCatItemsActionTypes.SECTION_CAT_ITEMS_FAILURE_ACTION,
        payload: { error: null },
      });
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="moviesDetails">
      <Header />
      <div className="moviesDetails__player">
        <div>
          <button
            type="button"
            onClick={backToPrevious}
            className="moviesDetails__playerBackBtn"
          >
            <img src={playerBackBtn} alt="player back" />
          </button>
        </div>
        {/* {userid && isMoviePlaying && (
          <div>
            <button
              type="button"
              onClick={() => setFavoriteItem(movieInfo.content_id)}
              className="moviesDetails__favouriteIcon"
            >
              <img
                src={isFav ? favouriteSelect : favouriteUnselect}
                alt="favourite icon"
              />
            </button>
          </div>
        )}         */}
        <Player
          videoUrl={videoUrl}
          bannerUrl={bannerImgUrl}
          watchedDuration={bookmarkTime}
          autoPlayVideo
          handleTimeUpdate={onTimeUpdate}
          handleOnPause={onPause}
        />
      </div>

      <div className="container moviesDetails__bannerImage">
        <div className="moviesDetails__video-container">
          <Row className="d-flex justify-content-start moviesDetails__video-title">
            {' '}
            {movieInfo.title}
            <div className="title-meta-info">
              <div className="d-flex">
                {userid && (
                  <picture className="mr-2">
                    <img
                      src={isFav ? favouriteSelect : favouriteUnselect}
                      alt="fav-icon"
                      onClick={() => setFavoriteItem(movieInfo.content_id)}
                      aria-hidden="true"
                    />
                  </picture>
                )}
                {/* <picture>
                  <img src={shareIcon} alt="share-icon" />
                </picture> */}
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-start moviesDetails__video-sub-title">
            {' '}
            {movieInfo?.genre}
          </Row>
          <Row className="d-flex justify-content-start moviesDetails__video-info">
            {' '}
            {movieInfo.year} . {getMovieHrsMins(movieInfo.full_video_duration)}{' '}
            . ENGLISH
          </Row>
          <Row className="d-flex justify-content-start moviesDetails__video-desc">
            <ShowMoreText
              lines={2}
              more="More"
              less="Less"
              className="userContent content-css moviesDetails__video-desc-details"
              anchorClass="my-anchor-css-class"
              onClick={executeOnClick}
              expanded={false}
              width={600}
            >
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: movieInfo.description,
                }}
              />
            </ShowMoreText>
          </Row>
        </div>
        <hr />
      </div>

      <div className="moviesDetails__Shows-View tone-card shows mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="moviesDetails__Movies-trailer">
                {t('movieTrailers')}
              </div>
              <div
                className="trailer-card"
                onClick={() => handleTrailerClick(movieInfo.trail_video_url)}
                tabIndex={0}
                role="button"
                onKeyPress={() => {}}
                key={movieInfo.content_id}
              >
                <div className="banner-img">
                  <img
                    className="img-fluid makeCornerEdges"
                    alt="show-card-img"
                    src={movieInfo.feature_image}
                  />
                  <div className="banner-img-hover-action">
                    <div className="play-btn">
                      <img
                        className="img-fluid"
                        alt="show-card-img"
                        src={tplayYellowIcon}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-block calc-width">
                  <h5 className="title">{movieInfo.title}</h5>
                  <h6 className="subtitle">{movieInfo.short_description}</h6>
                  <p className="description">
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
                          __html: movieInfo.description,
                        }}
                      />
                    </ShowMoreText>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SimilarMovies handleSimilarCardClick={onSimilarCardClick} /> */}
      <Footer />
      {showLoader && <Loader />}
    </div>
  );
};
