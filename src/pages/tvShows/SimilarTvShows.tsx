/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import { Loader } from '../../components/Loader';
import { Toaster } from '../../components/Toaster';
import { sectionItems } from '../../services/sectionItems/sectionItems';
import { selectors } from '../../store/sectionItems';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
// import { ShowsHScrollMenuItem } from '../../components/ShowsHScrollMenuItem';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { tplayYellowIcon } from '../../constants/iconImageConstant';
import { selectLanguageSelector } from '../../store/selectLanguage';

interface ISimilarTvShows {
  handleSimilarCardClick: (
    subCatId: string,
    seasonDetails: any,
    mainCatId: string,
    episodeId: string
  ) => void;
}

export const SimilarTvShows: React.FC<ISimilarTvShows> = (props: any) => {
  const { t } = useTranslation(['common']);
  const { handleSimilarCardClick } = props;

  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const getSectionItemsState = useSelector(selectors.getSectionItemsState);
  const similerTvShowsList =
    getSectionItemsState.data && getSectionItemsState.data.section_details;

  const useEffectSimilerTvShows = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getSectionItemsState]);
  };
  useEffectSimilerTvShows(() => {
    if (getSectionItemsState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: getSectionItemsState.error.errorDescription,
      });
    }
    setShowLoader(getSectionItemsState.loader);
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnMount(() => {
    if (userLanguageId) {
      const params = {
        languageid: userLanguageId,
        moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID, // fixed
        groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS, // fixed
        sectionid: API_REQ_PARAM_CONSTANTS.SECTION_SIMILAR_ID, // similarTvShows
        userid: userid || '',
        kidid: kidid || '',
      };
      dispatch(sectionItems(params));
    }
  });

  const onCardClick = (subCatId, seasonDetails, mainCatId, episodeId) => {
    handleSimilarCardClick(subCatId, seasonDetails, mainCatId, episodeId);
  };

  return (
    <div className=" similarTvShows">
      <div className="similar-shows">
        <Container>
          <h2 className="block-title">{t('recommendedShows')}</h2>
          <Row>
            {similerTvShowsList &&
              similerTvShowsList.map((data: any, index: any) => {
                const { content_id, group_details } = data;
                const { maincategory_details } = group_details?.[0] || [];
                const { catg_id, subcategory_details } =
                  maincategory_details?.[0] || [];
                const { sub_catg_id, season_details } =
                  subcategory_details?.[0] || [];
                return index < 4 ? (
                  <Col md={3} xs={6} key={content_id}>
                    <div
                      className="show-card"
                      onKeyPress={() => {}}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        onCardClick(
                          sub_catg_id,
                          season_details,
                          catg_id,
                          content_id
                        );
                      }}
                    >
                      <div
                        className="show-card-bg"
                        style={{
                          backgroundImage: `url(${maincategory_details?.[0]?.subcategory_details?.[0]?.sub_catg_featured_image})`,
                        }}
                      >
                        <div
                          className="play-btn"
                          onKeyPress={() => {}}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            onCardClick(
                              sub_catg_id,
                              season_details,
                              catg_id,
                              content_id
                            );
                          }}
                        >
                          <img
                            className="img-fluid"
                            alt="show-img"
                            src={tplayYellowIcon}
                          />
                        </div>
                      </div>
                      <div className="show-card-name">
                        {maincategory_details?.[0]?.subcategory_details?.[0]
                          ?.sub_catg_name !== ''
                          ? maincategory_details?.[0]?.subcategory_details?.[0]
                              ?.sub_catg_name
                          : maincategory_details?.[0]?.subcategory_details?.[0]
                              ?.sub_catg_name_en}
                      </div>
                    </div>
                  </Col>
                ) : (
                  ''
                );
              })}
          </Row>
        </Container>
      </div>
      <Toaster
        show={showToast}
        toastInfo={toastInfo}
        handleCloseToast={() => setShowToast(false)}
      />
      {showLoader && <Loader />}
    </div>
  );
};
