/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { MoviesHScrollMenuItem } from '../../components/MoviesHScrollMenuItem';
import { Col, Container, Row } from 'react-bootstrap';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { sectionItems } from '../../services/sectionItems/sectionItems';
import { selectors } from '../../store/sectionItems';
import { actionTypes as sectionCatItemsActionType } from '../../store/sectionCatItems';
import { Loader } from '../../components/Loader';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { tplayYellowIcon } from '../../constants/iconImageConstant';

interface ISimilarMovies {
  handleSimilarCardClick: (cardid: string) => void;
}
export const SimilarMovies: React.FC<ISimilarMovies> = (props: any) => {
  const { handleSimilarCardClick } = props;
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const getSectionItemsState = useSelector(selectors.getSectionItemsState);
  const similarMovieList =
    getSectionItemsState.data && getSectionItemsState.data.section_details;

  const useEffectOnMountSimilarMovies = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getSectionItemsState]);
  };
  useEffectOnMountSimilarMovies(() => {
    setShowLoader(getSectionItemsState.loader);
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = {
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
      moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
      groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES,
      sectionid: API_REQ_PARAM_CONSTANTS.SECTION_SIMILAR_ID,
      userid: userid || '',
      kidid: kidid || '',
    };
    dispatch(sectionItems(params));
  });

  const onCardClick = (cardid: string) => {
    dispatch({
      type: sectionCatItemsActionType.SECTION_CAT_ITEMS_SUCCESS_ACTION,
      payload: { data: null },
    });
    handleSimilarCardClick(cardid);
  };

  return (
    <div className=" similarMovies">
      <div className="similar-shows">
        <Container>
          <h2 className="block-title">Recommended Movies</h2>
          <Row>
            {similarMovieList &&
              similarMovieList.map((data: any, index: any) => {
                const { group_details, feature_image, title } = data;
                const { maincategory_details } = group_details?.[0] || [];
                const { subcategory_details } = maincategory_details?.[0] || [];
                const { sub_catg_id } = subcategory_details?.[0] || [];
                return index < 4 ? (
                  <Col md={3} xs={6} key={sub_catg_id}>
                    <div
                      className="show-card"
                      onKeyPress={() => {}}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        onCardClick(sub_catg_id);
                      }}
                    >
                      <div
                        className="show-card-bg"
                        style={{ backgroundImage: `url(${feature_image})` }}
                      >
                        <div
                          className="play-btn"
                          onKeyPress={() => {}}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            onCardClick(sub_catg_id);
                          }}
                        >
                          <img
                            className="img-fluid"
                            alt="show-img"
                            src={tplayYellowIcon}
                          />
                        </div>
                      </div>
                      <div className="show-card-name">{title}</div>
                    </div>
                  </Col>
                ) : (
                  ''
                );
              })}
          </Row>
        </Container>
      </div>
      {showLoader && <Loader />}
    </div>
  );
};
