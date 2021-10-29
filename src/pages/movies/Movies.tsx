/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MainCarousel } from '../../components/MainCarousel';
import {
  adBannerIconFour,
  adBannerIconThree,
  adBannerIconTwo,
  janeRemovebg,
  janeRight,
  mtopbg,
  playIcon,
  toggleMenu,
} from '../../constants/iconImageConstant';
import { Footer } from '../appFooter/Footer';
import { Header } from '../Header/Header';
import { subCategory } from '../../services/subCategory/subCategory';
import { selectors } from '../../store/subCategory';
import { actionTypes as sectionCatItemsActionType } from '../../store/sectionCatItems';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';

export const Movies: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['movies']);

  const getSubCategoryState = useSelector(selectors.getSubCategoryState);
  const subCategoryList =
    getSubCategoryState.data && getSubCategoryState.data.subcategory_details;
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = {
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
      moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
      groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES,
      maincatid: API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID,
      subcatid: '',
    };
    dispatch(subCategory(params));
  });

  const openPlayer = (subCatid: string) => {
    dispatch({
      type: sectionCatItemsActionType.SECTION_CAT_ITEMS_SUCCESS_ACTION,
      payload: { data: null },
    });
    history.push({
      pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${subCatid}`,
    });
  };

  const SubList = (props: any) => {
    const { showId, showImageUrl, showTitle, duration, year } = props;
    const [mouseHover, isMouseHover] = useState(false);
    return (
      <div
        key={showId}
        className="movies__subCategories__img-container"
        onMouseEnter={() => isMouseHover(true)}
        onMouseLeave={() => isMouseHover(false)}
      >
        <img
          src={showImageUrl}
          alt="feature show"
          className="movies__subCategories__card-img"
        />
        {mouseHover && (
          <div className="movies__subCategories__dark-gradient">
            <div className="movies__subCategories__card-content">
              <div className="movies__subCategories__card-playicon">
                <img src={playIcon} alt="play icon" />
              </div>
              <div className="movies__subCategories__card-title">
                {showTitle}
              </div>
              <div className="movies__subCategories__card-info">
                <div className="movies__subCategories__card-year">
                  DISNEY | {year}
                </div>
                <div className="movies__subCategories__card-duration">
                  {duration} mins
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="movies">
      <Header />
      <div className="movies__topBg">
        <img src={mtopbg} className="movies__mtopbgimg" alt="top mobile bg" />
      </div>
      <div className="movies__mTop">
        <div className="movies__sls-text1">{t('movies')}</div>
        <div className="movies__sls-text2">{t('movies')}</div>
        <img
          src={toggleMenu}
          className="tvShows__toggle-menu"
          alt="top mobile bg"
        />
      </div>
      <div className="movies__title">{t('movies')}</div>
      <MainCarousel groupCatId={API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES} />
      <div className="movies__janeRightLogo">
        <img
          src={janeRight}
          className="movies__janeRightImg"
          alt="sub cat icon"
        />
      </div>
      <div>
        <div className="movies__subCategories__sl-sec1">
          <img
            src={janeRemovebg}
            className="movies__subCategories__spl-asset1"
            alt="sub cat icon"
          />
          <div className="movies__subCategories__sls-text1">{t('movies')}</div>
          <div className="movies__subCategories__title-container">
            <div className="movies__subCategories__app-name">
              {t('balBharat')}
            </div>
            <div className="movies__subCategories__subcat-title">
              {t('movies')}
            </div>
          </div>
        </div>
      </div>

      <div className="movies__subCategories__mt" />
      <div className="movies__subCategories__subcat-vlist1">
        {subCategoryList &&
          subCategoryList.slice(0, 10).map((show: any) => {
            const {
              sub_catg_id,
              sub_catg_featured_image,
              sub_catg_name,
              season_details,
              duration,
              year,
            } = show;
            return (
              <div
                onClick={() => openPlayer(sub_catg_id)}
                role="button"
                onKeyPress={() => {}}
                tabIndex={0}
                key={sub_catg_id}
              >
                <SubList
                  showId={sub_catg_id}
                  showImageUrl={sub_catg_featured_image}
                  showTitle={sub_catg_name}
                  seasonsDetails={season_details}
                  duration={duration}
                  year={year}
                />
              </div>
            );
          })}
      </div>
      <div className="SL-sec2 m-t-10 movies__adBannerContainer">
        <div className="row align-items-center adBannerContainer">
          <img src={adBannerIconFour} className="adBanner" alt="ad Banner" />
          <div className="col-4 adBannerInfo">
            <img src={adBannerIconTwo} className="SPL-asset2" alt="ts asset7" />
            <div>
              <span className="SL-tag">TODDLERS</span>
            </div>
            <h4>The Kitty is not ac</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="col-8 text-center">
            <a href="/home">
              <img src={adBannerIconThree} alt="play2" />
            </a>
          </div>
        </div>
      </div>
      <div className="movies__subCategories__subcat-vlist2">
        {subCategoryList &&
          subCategoryList.slice(10).map((show) => {
            const {
              sub_catg_id,
              sub_catg_featured_image,
              sub_catg_name,
              season_details,
              duration,
              year,
            } = show;
            return (
              <div
                onClick={() => openPlayer(sub_catg_id)}
                role="button"
                onKeyPress={() => {}}
                tabIndex={0}
                key={sub_catg_id}
              >
                <SubList
                  showId={sub_catg_id}
                  showImageUrl={sub_catg_featured_image}
                  showTitle={sub_catg_name}
                  seasonsDetails={season_details}
                  duration={duration}
                  year={year}
                />
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};
