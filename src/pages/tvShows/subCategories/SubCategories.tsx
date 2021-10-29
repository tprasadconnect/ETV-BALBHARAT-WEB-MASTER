/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  adBannerIconFour,
  adBannerIconThree,
  adBannerIconTwo,
  edutainmentBanner,
  edutainmentIcon,
  globalBanner,
  globalIcon,
  originalsBanner,
  originalsIcon,
  toddlersBanner,
  toddlersIcon,
  mOriginalsBanner,
  mToddlersBanner,
  mGloablBanner,
  mEdutainmentBanner,
  mTvshowsBackBtn,
} from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { Footer } from '../../appFooter/Footer';
import { Header } from '../../Header/Header';
import { selectors } from '../../../store/subCategory';
import { Loader } from '../../../components/Loader';
import { subCategory } from '../../../services/subCategory/subCategory';
import { Toaster } from '../../../components/Toaster';
import { API_REQ_PARAM_CONSTANTS } from '../../../constants/apiReqParamConstants';
import { categoryMaster } from '../../../services/categoryMasters/categoryMaster';
import { selectLanguageSelector } from '../../../store/selectLanguage';

export const SubCategories: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['subCategories']);
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );

  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMountCatgMaster(() => {
    const params = { languageid: userLanguageId };
    dispatch(categoryMaster(params));
  });
  const urlPathName = history.location.pathname;

  const [subCatBannerImg, setSubCatBannerImg] = useState('');
  const [msubCatBannerImg, setmSubCatBannerImg] = useState('');
  const [subCatBannerIcon, setSubCatBannerIcon] = useState('');
  const [subCatTitile, setSubCatTitile] = useState('');
  const [subCatid, setSubCatid] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });

  const getSubCategoryState = useSelector(selectors.getSubCategoryState);
  const subCategoryList =
    getSubCategoryState.data && getSubCategoryState.data.subcategory_details;

  const useEffectOnSubCatList = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getSubCategoryState]);
  };
  useEffectOnSubCatList(() => {
    if (getSubCategoryState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: getSubCategoryState.error.errorDescription,
      });
    }
    setShowLoader(getSubCategoryState.loader);
  });

  useEffect(() => {
    if (urlPathName.includes(ROUTER_URL_CONSTANT.ORIGINALS)) {
      setSubCatBannerImg(originalsBanner);
      setmSubCatBannerImg(mOriginalsBanner);
      setSubCatBannerIcon(originalsIcon);
      setSubCatTitile('originals');
      setSubCatid(1);
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.GLOBAL)) {
      setSubCatBannerImg(globalBanner);
      setmSubCatBannerImg(mGloablBanner);
      setSubCatBannerIcon(globalIcon);
      setSubCatTitile('global');
      setSubCatid(2);
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.TODDLERS)) {
      setSubCatBannerImg(toddlersBanner);
      setmSubCatBannerImg(mToddlersBanner);
      setSubCatBannerIcon(toddlersIcon);
      setSubCatTitile('toddlers');
      setSubCatid(3);
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.EDUTAINMENT)) {
      setSubCatBannerImg(edutainmentBanner);
      setmSubCatBannerImg(mEdutainmentBanner);
      setSubCatBannerIcon(edutainmentIcon);
      setSubCatTitile('edutainment');
      setSubCatid(4);
    }
  }, [urlPathName]);

  const useEffectOnSubCat = (effect: React.EffectCallback) => {
    React.useEffect(effect, [subCatid]);
  };
  useEffectOnSubCat(() => {
    if (subCatid > 0 && subCatid < 5) {
      const params = {
        languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
        moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID, // fixed
        groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS, // fixed
        maincatid: subCatid,
        subcatid: '',
      };
      dispatch(subCategory(params));
    }
  });

  const handleTvShowsBack = () => {
    history.goBack();
  };

  const openPlayer = (showId, seasonDetails) => {
    if (urlPathName.includes(ROUTER_URL_CONSTANT.ORIGINALS)) {
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${showId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      });
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.GLOBAL)) {
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${showId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      });
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.TODDLERS)) {
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.TODDLERS_DETAILS}/${showId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      });
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.EDUTAINMENT)) {
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.EDUTAINMENT_DETAILS}/${showId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      });
    }
  };

  const SubList = (props: any) => {
    const { showId, showImageUrl, showTitle, seasonsDetails } = props;
    const [mouseHover, isMouseHover] = useState(false);
    const getSeasonsDetails = (seasons) => {
      const totalNoOfSeasons = seasons.length;
      let totalNoOfEpisodes = 0;
      seasons.forEach((data) => {
        const ep = data.episodes.split('-');
        totalNoOfEpisodes += parseInt(ep[1], 10);
      });
      return `${totalNoOfSeasons} SEASONS | ${totalNoOfEpisodes} EPISODES`;
    };
    return (
      <div
        key={showId}
        className="subCategories__img-container"
        onMouseEnter={() => isMouseHover(true)}
        onMouseLeave={() => isMouseHover(false)}
      >
        <img
          src={showImageUrl}
          alt="feature show"
          className="subCategories__card-img"
        />
        {mouseHover && (
          <div className="subCategories__dark-gradient">
            <div className="subCategories__card-content">
              <div className="subCategories__card-title">{showTitle}</div>
              <div className="subCategories__tvshow-info">
                {getSeasonsDetails(seasonsDetails)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="subCategories">
      <Header />
      <div>
        <div className="subCategories__banner">
          <img src={subCatBannerImg} alt="subCategories banner" />
        </div>
        <div className="subCategories__mbanner">
          <div
            onKeyPress={() => {}}
            role="button"
            tabIndex={0}
            onClick={handleTvShowsBack}
          >
            <img
              src={mTvshowsBackBtn}
              alt="back button"
              className="subCategories__tvshow-back"
            />
          </div>
          <img
            src={msubCatBannerImg}
            alt="subCategories banner"
            className="subCategories__mbanner"
          />
        </div>
        <div className="subCategories__sl-sec1">
          <img
            src={subCatBannerIcon}
            className="subCategories__spl-asset1"
            alt="sub cat icon"
          />
          <div className="subCategories__sls-text1">{t(subCatTitile)}</div>
          <div className="subCategories__title-container">
            <div className="subCategories__app-name">{t('balbharat')}</div>
            <div className="subCategories__subcat-title">{t(subCatTitile)}</div>
          </div>
        </div>
      </div>
      <div className="subCategories__mt" />
      <div className="">
        <div className="subCategories__subcat-vlist1">
          {subCategoryList &&
            subCategoryList.slice(0, 10).map((show: any) => {
              const {
                sub_catg_id,
                sub_catg_featured_image,
                sub_catg_name,
                season_details,
              } = show;
              return (
                <div
                  onClick={() => openPlayer(sub_catg_id, season_details)}
                  role="button"
                  onKeyPress={() => {}}
                  tabIndex={0}
                  key={sub_catg_id}
                >
                  <SubList
                    key={sub_catg_id}
                    showId={sub_catg_id}
                    showImageUrl={sub_catg_featured_image}
                    showTitle={sub_catg_name}
                    seasonsDetails={season_details}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="SL-sec2 m-t-10 subCategories__adBannerContainer">
        <div className="row align-items-center adBannerContainer">
          <img src={adBannerIconFour} className="adBanner" alt="ad Banner" />
          <div className="col-4 adBannerInfo">
            <img src={adBannerIconTwo} className="SPL-asset2" alt="ts asset7" />
            <div>
              <span className="SL-tag">ORIGINALS</span>
            </div>
            <h4>The Bahubali warriors</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div>
              SEASON 4 <span className="dot" /> EPISODE 24
            </div>
          </div>
          <div className="col-8 text-center">
            <a href="/home">
              <img src={adBannerIconThree} alt="play2" />
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="subCategories__subcat-vlist2">
          {subCategoryList &&
            subCategoryList.slice(10).map((show) => {
              const {
                sub_catg_id,
                sub_catg_featured_image,
                sub_catg_name,
                season_details,
              } = show;
              return (
                <div
                  onClick={() => openPlayer(sub_catg_id, season_details)}
                  role="button"
                  onKeyPress={() => {}}
                  tabIndex={0}
                >
                  <SubList
                    key={sub_catg_id}
                    showId={sub_catg_id}
                    showImageUrl={sub_catg_featured_image}
                    showTitle={sub_catg_name}
                    seasonsDetails={season_details}
                  />
                </div>
              );
            })}
        </div>
      </div>

      <Footer />
      <Toaster
        show={showToast}
        toastInfo={toastInfo}
        handleCloseToast={() => setShowToast(false)}
      />
      {showLoader && <Loader />}
    </div>
  );
};
