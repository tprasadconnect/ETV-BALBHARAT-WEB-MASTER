/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../appFooter/Footer';
import { Shows } from './shows';
import { AboutCharacters } from './AboutCharacters';
import { SimilarTvShows } from '../tvShows/SimilarTvShows';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectors } from '../../store/categoryMaster';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { Loader } from '../../components/Loader';
import { selectLanguageSelector } from '../../store/selectLanguage';

export const ToonsDetail: React.FC = () => {
  const [toonDataSet, setToonData] = useState({
    banner1_image: '',
    banner2_image: '',
    banner1_start_hex_code: '',
    banner1_end_hex_code: '',
    toons_details: '',
    sub_catg_description: '',
    season_details: [],
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParamsList = history.location.pathname.split('/');
  const groupId = urlParamsList?.[2];
  const catId = urlParamsList?.[3];
  const subcatId = urlParamsList?.[4];
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );

  const useEffectOnCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnCatgMaster(() => {
    if (userLanguageId) {
      const params = { languageid: userLanguageId };
      dispatch(categoryMaster(params));
    }
  });

  const catgMasterState = useSelector(selectors.getCatagoryMasterState);
  const categoryMastersShowsList = catgMasterState?.data?.group_details || [];
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [categoryMastersShowsList]);
  };
  useEffectOnMount(() => {
    if (categoryMastersShowsList.length) {
      for (let i = 0; i < categoryMastersShowsList.length; i += 1) {
        const element = categoryMastersShowsList[i];
        if (groupId === element.group_catg_id) {
          for (let j = 0; j < element.maincategory_details.length; j += 1) {
            const subElement = element.maincategory_details[j];
            if (catId === subElement.catg_id) {
              for (
                let k = 0;
                k < subElement.subcategory_details.length;
                k += 1
              ) {
                const toonData = subElement.subcategory_details[k];
                if (subcatId === toonData.sub_catg_id) {
                  setToonData(toonData);
                }
              }
            }
          }
        }
      }
    }
  });

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

  return (
    <div className="toonDetails">
      <Header />
      {toonDataSet ? (
        <div>
          <div className="tone-first-block">
            <div className="tone-first-block-sub">
              <img alt="" src={toonDataSet?.banner1_image || ''} />
            </div>
          </div>
          {toonDataSet?.sub_catg_description && (
            <div className="tone-block toonsPage ">
              <div
                className="bg-gradient mainPic"
                style={{
                  background: `linear-gradient(180deg, ${
                    toonDataSet?.banner1_start_hex_code || ''
                  } 0%, ${toonDataSet?.banner1_end_hex_code || ''} 100%)`,
                }}
              >
                <div>
                  <Container>
                    {toonDataSet?.season_details?.[0] && (
                      <Shows
                        seasonDetails={toonDataSet?.season_details}
                        groupId={groupId}
                        catId={catId}
                      />
                    )}
                    <AboutCharacters
                      description={toonDataSet?.sub_catg_description}
                      charList={toonDataSet?.toons_details}
                    />
                  </Container>
                </div>
              </div>
            </div>
          )}

          {toonDataSet?.banner2_image && (
            <div className="tone-end">
              <img
                className="toneEndMainPic"
                src={toonDataSet?.banner2_image}
                alt=""
              />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
      <SimilarTvShows handleSimilarCardClick={onSimilarCardClick} />
      <Footer />
    </div>
  );
};
