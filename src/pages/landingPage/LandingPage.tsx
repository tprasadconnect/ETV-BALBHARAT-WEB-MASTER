import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Footer } from '../appFooter/Footer';
import { Player } from '../../components/Player';
import { NewToonsThumbNail } from '../../components/NewToonsThumbNail';
import { ViewDetails } from '../../components/ViewDetails';
import { NewMainCarousel } from '../../components/NewMainCarousel';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { Header } from '../Header/Header';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectors } from '../../store/categoryMaster';
import { toons } from '../../services/toons/toons';
import { selectLanguageSelector } from '../../store/selectLanguage';
// change-1 begin
import { itemDetails } from '../../services/itemDetails/itemDetails';
import {
  selectors as itemDetailsSelectors,
  actionTypes as itemDetailsActions,
} from '../../store/itemDetails';
import { sectionCatItems } from '../../services/sectionCatItems/sectionCatItems';
import {
  selectors as catItems,
  actionTypes as getSectionCatItemsActionTypes,
} from '../../store/sectionCatItems';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { closeIcon, soon } from '../../constants/iconImageConstant';
import { selectors as policyNotesSelectors } from '../../store/policyNotes';
// change-1 end

export const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [movieId, setMovieId] = useState('');
  const languageId = useSelector(selectLanguageSelector.getSelectLanguageId);
  const urlParams = history.location.pathname.split('/');
  const [aboutUs, setAboutUs] = useState({
    policy_description: ' ',
    video_url_details: [{ policy_video_url: '', policy_video_image: '' }],
  });

  const about = useSelector(policyNotesSelectors.getPolicyNotesState);
  const useEffectOnAboutUs = (effect: React.EffectCallback) => {
    React.useEffect(effect, [about]);
  };
  useEffectOnAboutUs(() => {
    for (let i = 0; i < about?.data?.length; i += 1) {
      if (about?.data?.[i]?.policy_id === '2') {
        setAboutUs(about?.data?.[i]);
      }
    }
  });

  const bookmarkTime = history.location.search.split('=')[1]
    ? parseInt(history.location.search.split('=')[1], 10)
    : 0;

  let currentTimeFloorValue = 0;
  const onTimeUpdate = (currentTime: number) => {
    if (currentTimeFloorValue === Math.floor(currentTime))
      currentTimeFloorValue = Math.floor(currentTime);
  };
  const onPause = () => { };

  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, [languageId]);
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showvideo, setvideoShow] = useState(false);
  const handleSetvideoShow = () => setvideoShow(true);
  const aboutvideoClose = () => setvideoShow(false);

  useEffectOnMountCatgMaster(() => {
    if (languageId) {
      const params = { languageid: languageId };
      dispatch(categoryMaster(params));
    }
  });
  const getSectionCatItemsResponse = useSelector(
    catItems.getSectionCatItemsState
  ); // get section cat items API response
  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;
  const useEffectOnGetSectionCatItems = (effect: React.EffectCallback) => {
    React.useEffect(effect, [movieId]);
  };
  useEffectOnGetSectionCatItems(() => {
    if (languageId && movieId) {
      // setShowLoader(getSectionCatItemsResponse.loader);
      dispatch({
        type: getSectionCatItemsActionTypes.SECTION_CAT_ITEMS_FAILURE_ACTION,
        payload: { error: null },
      });
      const params = {
        languageid: languageId,
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
  });
  const useEffectOnGetSectionCatItemsResponseData = (
    effect: React.EffectCallback
  ) => {
    React.useEffect(effect, [getSectionCatItemsResponse]);
  };
  useEffectOnGetSectionCatItemsResponseData(() => {
    if (movieId) {
      if (getSectionCatItemsResponse?.data?.section_details?.[0]?.content_id) {
        // setIsMoviePlaying(true);
        const params = {
          kidid: kidid || '',
          userid,
          contentid:
            getSectionCatItemsResponse?.data?.section_details?.[0]?.content_id,
        };
        dispatch(itemDetails(params));
      } else if (getSectionCatItemsResponse?.data?.section_details) {
        handleShow();
      } else if (getSectionCatItemsResponse?.error?.errorCode) {
        handleShow();
      }
      // setShowLoader(getSectionCatItemsResponse.loader);
    }
  });
  const itemDetailsState = useSelector(
    itemDetailsSelectors.getItemDetailsState
  );
  const useEffectOnItemDetail = (effect: React.EffectCallback) => {
    React.useEffect(effect, [itemDetailsState]);
  };
  useEffectOnItemDetail(() => {
    if (movieId) {
      if (itemDetailsState?.data?.section_details?.[0]?.full_video_url.trim()) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${movieId}`,
        });
      } else if (itemDetailsState?.data?.section_details) {
        handleShow();
      }
    }
  });
  // change-2 end
  const useEffectOnMountToons = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMountToons(() => {
    const params = { languageid: 1 };
    dispatch(toons(params));
    if (urlParams?.[2] === 'e') {
      handleSetvideoShow();
    }
  });

  const catgMasterState = useSelector(selectors.getCatagoryMasterState);
  const catgMasterShowsList =
    catgMasterState?.data?.group_details?.[0]?.maincategory_details || [];
  const catgMasterMovieList =
    catgMasterState?.data?.group_details?.[1]?.maincategory_details || [];
  const CardView = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-8">
          <div className="Explore text-right">
            <h3>
              Explore the access to
              <br />
              unlimited fun and entertainment for your <br />
              kids.
            </h3>
            <p>
              Dont worry we wouldn’t let you down with <br /> our promise of
              safe and curated content
            </p>
          </div>
        </div>
      </div>
    );
  };
  const checkContentId = (moviDynamicId) => {
    if (moviDynamicId.replace(/\s+/g, '') && Number(moviDynamicId) > 0) {
      setMovieId(moviDynamicId);
    }
  };
  useEffect(() => {
    return () => {
      dispatch({
        type: getSectionCatItemsActionTypes.SECTION_CAT_ITEMS_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: itemDetailsActions.ITEM_DETAILS_SUCCESS_ACTION,
        payload: { data: null },
      });
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="homeLandingPage">
        <Header />
        <div className="carouselContent">
          <NewMainCarousel
            groupCatId={API_REQ_PARAM_CONSTANTS.HOME_BANNER_SEASONS}
          />
        </div>
        <NewToonsThumbNail />
        <ViewDetails
          data={catgMasterShowsList?.[0]?.subcategory_details}
          title={catgMasterShowsList?.[0]?.catg_name}
          backgroundClass="pinkBG afterblueLTRB"
          forIndivudualClass="pinkBG"
          isVewAll
          redirectUrl={ROUTER_URL_CONSTANT.LIST_OF_ITEMS}
          contentType="originals"
          subCategoryID={catgMasterShowsList?.[0]?.catg_id}
          playType="shows"
          subDivision="originals"
          groupCatgId={catgMasterState?.data?.group_details?.[0]?.group_catg_id}
        />
        <ViewDetails
          data={catgMasterShowsList?.[1]?.subcategory_details}
          title={catgMasterShowsList?.[1]?.catg_name}
          backgroundClass="blueBG afterpeachLBRT"
          forIndivudualClass="blueBG"
          extraCard={<CardView />}
          isVewAll
          redirectUrl={ROUTER_URL_CONSTANT.LIST_OF_ITEMS}
          contentType="globals"
          subCategoryID={catgMasterShowsList?.[1]?.catg_id}
          playType="shows"
          subDivision="globals"
          groupCatgId={catgMasterState?.data?.group_details?.[0]?.group_catg_id}
        />
        <ViewDetails
          data={catgMasterMovieList?.[0]?.subcategory_details}
          title={catgMasterMovieList?.[0]?.catg_name}
          backgroundClass="peachBG"
          forIndivudualClass="peachBG"
          isVewAll
          redirectUrl={ROUTER_URL_CONSTANT.MOVIES}
          playType="movies"
          moviesApiCall={(moviDynamicId) => checkContentId(moviDynamicId)}
        />
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          centered
          size="lg"
          className="coming_soon"
        >
          <Modal.Body>
            <div
              className="close-btn float-right"
              role="button"
              onClick={handleClose}
              onKeyPress={() => { }}
              tabIndex={0}
            >
              <img src={closeIcon} alt="close" />
            </div>
            <Row className="align-items-center ">
              <Col md={12} className="text-center">
                <img src={soon} alt="coming" width="50%" />
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        {/* Aboutus videos */}
        {/* <Modal
          show={showvideo}
          onHide={aboutvideoClose}
          size="lg"
          centered
          className="p-0 video_player"
        >
          <Modal.Body className="p-0">
            <div className="close_button">
              <img
                src={closeIcon}
                alt=""
                className="img-fluid"
                aria-hidden="true"
                onClick={aboutvideoClose}
              />
            </div>
            <div className="about_player">
              <Player
                videoUrl={aboutUs?.video_url_details?.[0]?.policy_video_url}
                bannerUrl={aboutUs?.video_url_details?.[0]?.policy_video_image}
                watchedDuration={bookmarkTime}
                autoPlayVideo={false}
                handleTimeUpdate={onTimeUpdate}
                handleOnPause={onPause}
              />
            </div>
          </Modal.Body>
        </Modal> */}
        <Footer />
      </div>
    </>
  );
};
