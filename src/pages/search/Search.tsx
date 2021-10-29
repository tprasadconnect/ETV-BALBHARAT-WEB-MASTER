/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Row, Button, Modal, Form, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import {
  backIcon,
  emptySearchResultsIcon,
  searchClose,
  tplayYellowIcon,
} from '../../constants/iconImageConstant';
import { search } from '../../services/search/search';
import { actionTypes, selectors } from '../../store/search';
import { selectors as userStoreSelectors } from '../../store/userStore';
import {
  actionTypes as sectionItemsActionTypes,
  selectors as sectionItemsSelectors,
} from '../../store/sectionItems';
import {
  actionTypes as sectionSimilarItemsActionTypes,
  selectors as sectionSimilarItemsSelectors,
} from '../../store/sectionSimilarItems';
import { sectionItems } from '../../services/sectionItems/sectionItems';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { sectionSimilarItems } from '../../services/sectionSimilarItems/sectionSimilarItems';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
// import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { getItem } from '../../utils/storage';

interface ISearch {
  show: boolean;
  onHide: () => void;
}

export const Search: React.FC<ISearch> = (props: any) => {
  const { show, onHide } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['search']);

  const getSectionItemsState = useSelector(
    sectionItemsSelectors.getSectionItemsState
  );
  const getSectionSimilarItemsState = useSelector(
    sectionSimilarItemsSelectors.getSectionSimilarItemsState
  );

  const [searchTag, setSearchTag] = useState('');
  const [showLoader, setShowLoader] = useState(false); // loader state
  const [searchResults, setSearchResults] = useState([]);
  const [sectionItemsResult, setsectionItemsResult] = useState([]);
  const [sectionSimilarItemsResult, setsectionSimilarItemsResult] = useState(
    []
  );

  const [debouncedText] = useDebounce(searchTag, 1000);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  let kidid = userStoreState.data && userStoreState.data.selectedKidid;
  if (getItem('selectedKid')) {
    const kid = getItem('selectedKid');
    kidid = kid?.kidid;
  }

  const useEffectOnMountSearch = (effect: React.EffectCallback) => {
    React.useEffect(effect, [debouncedText]);
  };
  useEffectOnMountSearch(() => {
    dispatch({
      type: actionTypes.SEARCH_SUCCESS_ACTION,
      payload: { data: null },
    });
    const params = {
      tag: debouncedText,
      userid: userid || '',
      kidid: kidid || '',
    };
    dispatch(search(params));
  });

  const searchState = useSelector(selectors.getSearchState);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [searchState, debouncedText]);
  };
  useEffectOnMount(() => {
    setShowLoader(searchState.loader);
    if (searchState.data) {
      const recentSearchResults = searchState.data.recent_seacrhdetails;
      const suggentionsResults = searchState.data.suggestions_seacrhdetails;
      if (debouncedText === '') {
        if (recentSearchResults && recentSearchResults.length === 0) {
          dispatch({
            type: sectionItemsActionTypes.SECTION_ITEMS_SUCCESS_ACTION,
            payload: { data: null },
          });
          const params = {
            languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
            moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
            groupcatid: '',
            sectionid: API_REQ_PARAM_CONSTANTS.SECTION_POPULAR_ID,
            userid: userid || '',
            kidid: kidid || '',
          };
          dispatch(sectionItems(params));
        } else if (recentSearchResults && recentSearchResults.length > 0) {
          setSearchResults(recentSearchResults);
        }
      }
      if (debouncedText !== '') {
        if (suggentionsResults && suggentionsResults.length === 0) {
          dispatch({
            type:
              sectionSimilarItemsActionTypes.SECTION_SIMILAR_ITEMS_SUCCESS_ACTION,
            payload: { data: null },
          });
          const params = {
            languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
            moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
            groupcatid: '',
            sectionid: API_REQ_PARAM_CONSTANTS.SECTION_SIMILAR_ID,
            userid: userid || '',
            kidid: kidid || '',
          };
          dispatch(sectionSimilarItems(params));
        } else if (suggentionsResults && suggentionsResults.length > 0) {
          setSearchResults(suggentionsResults);
        }
      }
    }
  });
  const useEffectOnMountSectionItems = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getSectionItemsState]);
  };
  useEffectOnMountSectionItems(() => {
    setShowLoader(getSectionItemsState.loader);
    if (getSectionItemsState.data) {
      setsectionItemsResult(getSectionItemsState.data.section_details);
    }
  });
  const useEffectOnMountSectionSimilarItems = (
    effect: React.EffectCallback
  ) => {
    React.useEffect(effect, [getSectionSimilarItemsState]);
  };
  useEffectOnMountSectionSimilarItems(() => {
    setShowLoader(getSectionSimilarItemsState.loader);
    if (getSectionSimilarItemsState.data) {
      setsectionSimilarItemsResult(
        getSectionSimilarItemsState.data.section_details
      );
    }
  });

  const onModalClose = () => {
    if (searchTag) setSearchTag('');
    onHide();
    window.location.reload();
  };

  const handleSearchCardClick = (
    mainCatId,
    subCatId,
    seasonDetails,
    groupCatId,
    contentNumber
  ) => {
    if (searchTag) setSearchTag('');
    if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS) {
      if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}/${seasonDetails.length}/${subCatId}/${contentNumber}`,
        });
      }
      if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}/${seasonDetails.length}/${subCatId}/${contentNumber}`,
        });
      }
      // if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_TODDLERS_CAT_ID) {
      //   history.push({
      //     pathname: `${ROUTER_URL_CONSTANT.TODDLERS_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      //   });
      // }
      // if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_EDUTAINMENT_CAT_ID) {
      //   history.push({
      //     pathname: `${ROUTER_URL_CONSTANT.EDUTAINMENT_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      //   });
      // }
    } else if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES) {
      if (mainCatId === API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID) {
        history.push({
          pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${subCatId}`,
        });
      }
    }
    onHide();
  };

  const SearchItem = (data: any) => {
    const {
      groupCatId,
      catgId,
      subCatId,
      seasonDetails,
      featureImage,
      title,
      contentNumber,
    } = data;
    return (
      <>
        {featureImage && (
          <div className="col-md-3 col-6">
            <div
              className="movie-card"
              role="button"
              tabIndex={0}
              onKeyPress={() => { }}
              onClick={() =>
                handleSearchCardClick(
                  catgId,
                  subCatId,
                  seasonDetails,
                  groupCatId,
                  contentNumber
                )
              }
            >
              <div
                className="movie-card-bg"
                style={{ backgroundImage: `url(${featureImage})` }}
              >
                <div className="play-btn">
                  <img
                    className="img-fluid"
                    alt="show-img"
                    src={tplayYellowIcon}
                  />
                </div>
              </div>
              <div className="movie-card-name">{title}</div>
            </div>
            {showLoader && <Loader />}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onModalClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="search-modal-window"
      >
        <Modal.Body>
          <div className="container search-modal">
            <div
              className="d-flex d-lg-none mb-3"
              role="button"
              tabIndex={0}
              onKeyPress={() => { }}
              onClick={onModalClose}
            >
              <div className="mr-2">
                <img src={backIcon} alt="close" />
              </div>
              Back
            </div>
            <div className="search-modal__search-input-container">
              <Form.Group className="search-modal__search-input">
                <Form.Control
                  type="search"
                  name="search"
                  placeholder={t('searchPlaceholder')}
                  onChange={(e) => setSearchTag(e.target.value)}
                />
              </Form.Group>
              <Button
                className="btn-transparent d-none d-lg-flex"
                onClick={onModalClose}
              >
                <img
                  src={searchClose}
                  alt="close"
                  className="search-modal__close-btn"
                />
              </Button>
            </div>
            {debouncedText &&
              searchState.data &&
              searchState.data.suggestions_seacrhdetails.length === 0 && (
                <div className="search-modal__empty-search-results">
                  <img
                    src={emptySearchResultsIcon}
                    alt="no search results found"
                    className="search-modal__empty-search-results-icon"
                  />
                  <div className="search-modal__results-not-found">
                    <div className="search-modal__sorry">{t('sorry')} :(</div>
                    <div className="search-modal__results-not-found-txt">
                      {t('notfound')}
                    </div>
                  </div>
                </div>
              )}
          </div>
          <div className="search-modal__rss-container">
            {!debouncedText &&
              searchState.data &&
              searchState.data.recent_seacrhdetails.length > 0 && (
                <>
                  <div className="search-modal__rss container">
                    {t('recent')}
                  </div>
                  <Container className="search-modal__search-result">
                    <Row>
                      {searchResults &&
                        searchResults.length > 0 &&
                        searchResults.map((res: any) => {
                          const {
                            content_id,
                            feature_image,
                            episode,
                            seasons,
                            year,
                            title,
                            tagname,
                            group_details,
                          } = res;
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
                            <SearchItem
                              key={content_id}
                              contentNumber={content_id}
                              groupCatId={group_catg_id}
                              catgId={catg_id}
                              subCatId={sub_catg_id}
                              seasonDetails={season_details}
                              featureImage={feature_image}
                              episode={episode}
                              seasons={seasons}
                              year={year}
                              title={title}
                              tagname={tagname}
                            />
                          );
                        })}
                    </Row>
                  </Container>
                </>
              )}
            {debouncedText &&
              searchState.data &&
              searchState.data.suggestions_seacrhdetails.length > 0 && (
                <>
                  <div className="search-modal__rss container">
                    {t('suggestions')}
                  </div>
                  <Container className="search-modal__search-result">
                    <Row>
                      {searchResults &&
                        searchResults.length > 0 &&
                        searchResults.map((res: any) => {
                          const {
                            content_id,
                            feature_image,
                            episode,
                            seasons,
                            year,
                            title,
                            tagname,
                            group_details,
                          } = res;
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
                            <SearchItem
                              key={content_id}
                              contentNumber={content_id}
                              groupCatId={group_catg_id}
                              catgId={catg_id}
                              subCatId={sub_catg_id}
                              seasonDetails={season_details}
                              featureImage={feature_image}
                              episode={episode}
                              seasons={seasons}
                              year={year}
                              title={title}
                              tagname={tagname}
                            />
                          );
                        })}
                    </Row>
                  </Container>
                </>
              )}
            {!debouncedText &&
              searchState.data &&
              searchState.data.recent_seacrhdetails.length === 0 && (
                <>
                  <div className="search-modal__rss container">
                    {t('popular')}
                  </div>
                  <Container className="search-modal__search-result">
                    <Row>
                      {searchState.data &&
                        searchState.data.recent_seacrhdetails.length === 0 &&
                        sectionItemsResult &&
                        sectionItemsResult.map((res: any) => {
                          const {
                            content_id,
                            feature_image,
                            episode,
                            seasons,
                            year,
                            title,
                            tagname,
                            group_details,
                          } = res;
                          const { group_catg_id, maincategory_details } =
                            group_details?.[0] || [];
                          const { catg_id, subcategory_details } =
                            maincategory_details?.[0] || [];
                          const { sub_catg_id, season_details } =
                            subcategory_details?.[0] || [];
                          return (
                            <SearchItem
                              key={content_id}
                              contentNumber={content_id}
                              groupCatId={group_catg_id}
                              catgId={catg_id}
                              subCatId={sub_catg_id}
                              seasonDetails={season_details}
                              featureImage={feature_image}
                              episode={episode}
                              seasons={seasons}
                              year={year}
                              title={title}
                              tagname={tagname}
                            />
                          );
                        })}
                    </Row>
                  </Container>
                </>
              )}
            {debouncedText &&
              searchState.data &&
              searchState.data.suggestions_seacrhdetails.length === 0 && (
                <>
                  <div className="search-modal__rss container">
                    {t('similar')}
                  </div>
                  <Container className="search-modal__search-result-similar">
                    <Row>
                      {searchState.data &&
                        searchState.data.suggestions_seacrhdetails.length ===
                        0 &&
                        getSectionSimilarItemsState.data &&
                        sectionSimilarItemsResult &&
                        sectionSimilarItemsResult.map((res: any) => {
                          const {
                            content_id,
                            feature_image,
                            episode,
                            seasons,
                            year,
                            title,
                            tagname,
                            group_details,
                          } = res;
                          const {
                            group_catg_id,
                            maincategory_details,
                          } = group_details[0];
                          const { catg_id, subcategory_details } =
                            maincategory_details?.[0] || [];
                          const { sub_catg_id, season_details } =
                            subcategory_details?.[0] || [];

                          return (
                            <SearchItem
                              key={content_id}
                              contentNumber={content_id}
                              groupCatId={group_catg_id}
                              catgId={catg_id}
                              subCatId={sub_catg_id}
                              seasonDetails={season_details}
                              featureImage={feature_image}
                              episode={episode}
                              seasons={seasons}
                              year={year}
                              title={title}
                              tagname={tagname}
                            />
                          );
                        })}
                    </Row>
                  </Container>
                </>
              )}
          </div>
        </Modal.Body>
        {showLoader && <Loader />}
      </Modal>
    </>
  );
};
