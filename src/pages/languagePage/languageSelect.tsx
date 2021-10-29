/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { languages } from '../../services/languages/getLanguages';
import { selectors } from '../../store/languages';
import { Loader } from '../../components/Loader';
import {
  selectionOne,
  selectionTwo,
  selectionThree,
} from '../../constants/iconImageConstant';
import { Header } from '../Header/Header';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { setItem } from '../../utils/storage';
// import { selectLanguageActionTypes as selectLanguage }  from './store/selectLanguage';
import { selectLanguageActionTypes as languageGet } from '../../store/selectLanguage';
import { Languages } from '../home/Languages';

export const LanguageSelect: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showLoader, setShowLoader] = useState(false);

  const getLanguageState = useSelector(selectors.getLanguageState);
  const languagesList = getLanguageState.data && getLanguageState.data;
  const useEffectOnMountLangList = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getLanguageState]);
  };
  useEffectOnMountLangList(() => {
    if (getLanguageState?.data) {
      for (let i = 0; i < getLanguageState?.data?.length; i += 1) {
        if (getLanguageState?.data?.[i]?.lang_id === '1') {
          setItem('bbUserLanguageId', getLanguageState?.data?.[i]);
          dispatch({
            type: languageGet.SELECT_LANGUAGE_SUCCESS_ACTION,
            payload: { data: getLanguageState?.data?.[i] },
          });
        }
      }
    }

    setShowLoader(getLanguageState.loader);
  });
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = { languageid: '' };
    dispatch(languages(params));
  });
  const handleLanguageClick = (langguageObject) => {
    // localStorage.setItem('bbUserLanguageId', JSON.parse(langguageObject));
    setItem('bbUserLanguageId', langguageObject);
    dispatch({
      type: languageGet.SELECT_LANGUAGE_SUCCESS_ACTION,
      payload: { data: langguageObject },
    });
    history.push({
      pathname: `${ROUTER_URL_CONSTANT.HOME}/e/${ROUTER_URL_CONSTANT.HOME}`,
    });
  };
  const userLanguageId = API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID;
  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMountCatgMaster(() => {
    const params = { languageid: userLanguageId };
    dispatch(categoryMaster(params));
  });

  return (
    <>
      <Header />
      <div className="language-block">
        <img src={selectionOne} alt="selectionOne" className="imgbg1 imgbg" />
        <img src={selectionTwo} alt="selectionTwo" className="imgbg2 imgbg" />
        <img
          src={selectionThree}
          alt="selectionThree"
          className="imgbg3 imgbg"
        />
        <h1 className="language-block-heading">Select a channel</h1>
        <div className="row no-gutters justify-content-center">
          <div className="col-12 col-md-11 col-lg-10">
            <div className="row no-gutters">
              {languagesList &&
                languagesList.map((language) => {
                  const { lang_id, lang_name_en, lang_image } = language;
                  return (
                    <div
                      className="col-6 col-md-3 col-lg-2 text-center"
                      key={lang_id}
                    >
                      <div className="regions">
                        {/* <div
                          className={`image-container cursor-pointer rounder-circle ${
                            i === 0 ? 'image-container-active' : ''
                          }`}
                        > */}
                        <div
                          className="image-container cursor-pointer rounder-circle"
                          aria-hidden="true"
                          onClick={() => handleLanguageClick(language)}
                        >
                          <img
                            src={lang_image}
                            alt={lang_name_en}
                            className="region-image"
                          />
                        </div>
                        <div className="lang-name">{lang_name_en}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {showLoader && <Loader />}
      </div>
    </>
  );
};
