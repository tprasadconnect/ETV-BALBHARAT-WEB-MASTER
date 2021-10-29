import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Modal } from 'react-bootstrap';
import { soon, closeIcon } from '../constants/iconImageConstant';
import { API_REQ_PARAM_CONSTANTS } from '../constants/apiReqParamConstants';
import { Footer } from '../pages/appFooter/Footer';
import { Header } from '../pages/Header/Header';
import { ViewDetails } from './ViewDetails';
import { NewMainCarousel } from './NewMainCarousel';
import { categoryMaster } from '../services/categoryMasters/categoryMaster';
import {
  selectors,
  actionTypes as categoryMasterActionTypes,
} from '../store/categoryMaster';
import { subCategory } from '../services/subCategory/subCategory';
import { actionTypes, selectors as subSelectors } from '../store/subCategory';
import { selectLanguageSelector } from '../store/selectLanguage';
// change-1begin
import { ROUTER_URL_CONSTANT } from '../constants/routerUrlConstant';
import { selectors as userStoreSelectors } from '../store/userStore';
import { sectionCatItems as getSectionCatItems } from '../services/sectionCatItems/sectionCatItems';
import {
  selectors as getSectionCatItemsSelectors,
  actionTypes as getSectionCatItemsActionTypes,
} from '../store/sectionCatItems';
import { itemDetails } from '../services/itemDetails/itemDetails';
import {
  selectors as itemDetailsSelectors,
  actionTypes as itemDetailsActions,
} from '../store/itemDetails';
import { Loader } from './Loader';
// change-1end

export function NewMovies() {
  const dispatch = useDispatch();
  const [offsetValue, setOffsetValue] = useState(0);
  const limitValue = 8;
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );
  // change-2begin
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [movieId, setMovieId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //  const handleShowVisible = () => setShow(true);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const getSectionCatItemsResponse = useSelector(
    getSectionCatItemsSelectors.getSectionCatItemsState
  );
  const useEffectOnGetSectionCatItems = (effect: React.EffectCallback) => {
    React.useEffect(effect, [movieId]);
  };
  useEffectOnGetSectionCatItems(() => {
    if (userLanguageId && movieId) {
      setShowLoader(getSectionCatItemsResponse.loader);
      dispatch({
        type: getSectionCatItemsActionTypes.SECTION_CAT_ITEMS_FAILURE_ACTION,
        payload: { error: null },
      });
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
      dispatch(getSectionCatItems(params));
    }
  });

  const useEffectgetSectionCatItemsResponseData = (
    effect: React.EffectCallback
  ) => {
    React.useEffect(effect, [getSectionCatItemsResponse]);
  };
  useEffectgetSectionCatItemsResponseData(() => {
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
    }
    // setShowLoader(getSectionCatItemsResponse.loader);
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

  const checkContentId = (moviDynamicId) => {
    if (moviDynamicId.replace(/\s+/g, '') && Number(moviDynamicId) > 0) {
      setMovieId(moviDynamicId);
    }
  };
  // change-2end

  const [list, setList] = useState([]);
  const [isMoreData, setIsMoreData] = useState(true);
  useEffect(() => {
    return () => {
      dispatch({
        type: actionTypes.SUB_CATEGORY_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: categoryMasterActionTypes.CATEGORY_MASTER_SUCCESS_ACTION,
        payload: { data: null },
      });
      // change-3begin
      dispatch({
        type: getSectionCatItemsActionTypes.SECTION_CAT_ITEMS_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: itemDetailsActions.ITEM_DETAILS_SUCCESS_ACTION,
        payload: { data: null },
      });
      // change-3end
    };
    // eslint-disable-next-line
  }, []);

  const useEffectCatgMovies = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectCatgMovies(() => {
    if (userLanguageId) {
      const params = { languageid: userLanguageId };
      dispatch(categoryMaster(params));
    }
  });
  const categoriesList = useSelector(selectors.getCatagoryMasterState);
  const moviesList =
    categoriesList?.data?.group_details?.[1]?.maincategory_details || [];

  const useEffectSubCategory = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectSubCategory(() => {
    if (userLanguageId) {
      const params = {
        languageid: userLanguageId,
        moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
        groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES,
        maincatid: API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID,
        limit: limitValue,
        offset: offsetValue,
      };
      dispatch(subCategory(params));
      setOffsetValue(offsetValue + 8);
    }
  });
  const category = useSelector(subSelectors.getSubCategoryState);

  useEffect(() => {
    const moviesList1 = category?.data?.subcategory_details || [];
    if (category?.data === null) {
      setList(moviesList1);
      return;
    }
    if (moviesList1.length > 0 && list.length === 0) {
      setList(moviesList1);
    } else {
      const newArray = list.concat(moviesList1);
      setList([...newArray]);
      if (moviesList1.length > 0 && moviesList1.length < 8) {
        setIsMoreData(false);
      }
    }
    // eslint-disable-next-line
  }, [category.data]);

  useEffect(() => {
    if (category.error !== null && list.length > 0) {
      setIsMoreData(false);
    }
    // eslint-disable-next-line
  }, [category.error]);

  const loadMoreApiCall = () => {
    const params = {
      languageid: userLanguageId,
      moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
      groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES,
      maincatid: API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID,
      limit: limitValue,
      offset: offsetValue,
    };
    dispatch(subCategory(params));
    setOffsetValue(offsetValue + 8);
  };

  return (
    <div className="homeLandingPage">
      <Header />
      <div className="carouselContent">
        <NewMainCarousel
          groupCatId={API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES}
        />
      </div>
      <ViewDetails
        data={list}
        title={moviesList?.[0]?.catg_name}
        backgroundClass="peachBG"
        isVewAll={false}
        viewMore
        apiCall={() => loadMoreApiCall()}
        listAllItems="yes"
        playType="movies"
        isMoreData={isMoreData}
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
            onKeyPress={() => {}}
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
      <Footer />
      {showLoader && <Loader />}
    </div>
  );
}
