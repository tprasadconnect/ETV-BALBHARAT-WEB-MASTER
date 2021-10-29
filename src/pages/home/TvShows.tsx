/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  tvShows,
  starsSmall,
  starsBig,
} from '../../constants/iconImageConstant';
import { HorizontalScroll } from '../../components/HorizontalScroll';
import { selectors } from '../../store/categoryMaster';
import { Loader } from '../../components/Loader';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { ShowsHScrollMenuItem } from '../../components/ShowsHScrollMenuItem';

export function TvShows() {
  const history = useHistory();
  const { t } = useTranslation(['home']);

  const [showLoader, setShowLoader] = useState(false);
  const [isOriginalsSelected, setIsOriginalsSelected] = useState(true);
  const [isGlobalSelected, setIsGlobalSelected] = useState(false);
  const [isToddlersSelected, setIsToddlersSelected] = useState(false);
  const [isEdutainmentSelected, setIsEdutainmentSelected] = useState(false);
  const [mainCatId, setMainCatId] = useState(
    API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID
  );

  const catgMasterState = useSelector(selectors.getCatagoryMasterState);
  const catgMasterShowsList =
    catgMasterState &&
    catgMasterState.data &&
    catgMasterState.data.group_details &&
    catgMasterState.data.group_details[0] &&
    catgMasterState.data.group_details[0].maincategory_details &&
    catgMasterState.data.group_details[0].maincategory_details;

  const useEffectOnMountTvList = (effect: React.EffectCallback) => {
    React.useEffect(effect, [catgMasterState]);
  };
  useEffectOnMountTvList(() => {
    setShowLoader(catgMasterState.loader);
  });

  const handleTabClick = (type) => {
    if (type === 'originals') {
      setIsOriginalsSelected(true);
      setIsGlobalSelected(false);
      setIsToddlersSelected(false);
      setIsEdutainmentSelected(false);
      setMainCatId(API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID);
    } else if (type === 'global') {
      setIsOriginalsSelected(false);
      setIsGlobalSelected(true);
      setIsToddlersSelected(false);
      setIsEdutainmentSelected(false);
      setMainCatId(API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID);
    } else if (type === 'toddlers') {
      setIsOriginalsSelected(false);
      setIsGlobalSelected(false);
      setIsToddlersSelected(true);
      setIsEdutainmentSelected(false);
      setMainCatId(API_REQ_PARAM_CONSTANTS.TV_SHOW_TODDLERS_CAT_ID);
    } else if (type === 'edutainment') {
      setIsOriginalsSelected(false);
      setIsGlobalSelected(false);
      setIsToddlersSelected(false);
      setIsEdutainmentSelected(true);
      setMainCatId(API_REQ_PARAM_CONSTANTS.TV_SHOW_EDUTAINMENT_CAT_ID);
    }
  };

  const handleCardClick = (subCatId, seasonDetails) => {
    if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID)
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      });
    if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID)
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      });
    if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_TODDLERS_CAT_ID)
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.TODDLERS_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      });
    if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_EDUTAINMENT_CAT_ID)
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.EDUTAINMENT_DETAILS}/${subCatId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
      });
  };

  const Menu = (list: any, itemsLength: number) =>
    list.map((el: any, index: number) => {
      const {
        sub_catg_name,
        sub_catg_id,
        sub_catg_featured_image,
        season_details,
      } = el;
      return (
        <ShowsHScrollMenuItem
          index={index}
          length={itemsLength}
          key={sub_catg_id}
          title={sub_catg_name}
          seasonDetails={season_details}
          subCatId={sub_catg_id}
          imageUrl={sub_catg_featured_image}
          onCardClick={handleCardClick}
        />
      );
    });

  // Originals shows list
  const menuOriginals =
    catgMasterShowsList &&
    catgMasterShowsList[0].subcategory_details &&
    Menu(
      catgMasterShowsList[0].subcategory_details,
      catgMasterShowsList[0].subcategory_details.length
    );
  // Global shows list
  const menuGlobal =
    catgMasterShowsList &&
    catgMasterShowsList[1].subcategory_details &&
    Menu(
      catgMasterShowsList[1].subcategory_details,
      catgMasterShowsList[1].subcategory_details.length
    );
  // Toddlers shows list
  const menuToddlers =
    catgMasterShowsList &&
    catgMasterShowsList[2].subcategory_details &&
    Menu(
      catgMasterShowsList[2].subcategory_details,
      catgMasterShowsList[2].subcategory_details.length
    );
  // Edutainmennt shows list
  const menuEdutainment =
    catgMasterShowsList &&
    catgMasterShowsList[3].subcategory_details &&
    Menu(
      catgMasterShowsList[3].subcategory_details,
      catgMasterShowsList[3].subcategory_details.length
    );

  const noData = (
    <div className="Home-TVshows__noData">
      <span>Coming soon...</span>
    </div>
  );

  return (
    <div className="Home-TVshows d-none d-sm-block">
      <div className="container-fluid">
        <div className="Home-TVshows__title-subTitle-container">
          <div className="Home-TVshows__HT-text1">{t('home:tvShows')}</div>
          <div className="Home-TVshows__HT-img1">
            <Image alt="" src={tvShows} />
          </div>
          <div className="Home-TVshows__HT-asset1">
            <Image alt="" src={starsSmall} />
          </div>
          <div className="Home-TVshows__HT-asset2">
            <Image alt="" src={starsBig} />
          </div>
          <h3>{t('home:tvshowsc')}</h3>
          <div className="Home-TVshows__HT-links">
            <span
              aria-hidden="true"
              onClick={() => handleTabClick('originals')}
              className={isOriginalsSelected ? 'active' : ''}
            >
              {t('home:originals')}
            </span>
            <span
              aria-hidden="true"
              onClick={() => handleTabClick('global')}
              className={isGlobalSelected ? 'active' : ''}
            >
              {t('home:global')}
            </span>
            <span
              aria-hidden="true"
              onClick={() => handleTabClick('toddlers')}
              className={isToddlersSelected ? 'active' : ''}
            >
              {t('home:toddlers')}
            </span>
            <span
              aria-hidden="true"
              onClick={() => handleTabClick('edutainment')}
              className={isEdutainmentSelected ? 'active' : ''}
            >
              {t('home:edutainment')}
            </span>
          </div>
        </div>
      </div>
      {isOriginalsSelected && (
        <div>
          {catgMasterShowsList && catgMasterShowsList[0].subcategory_details ? (
            <HorizontalScroll menu={menuOriginals} />
          ) : (
            noData
          )}
        </div>
      )}
      {isGlobalSelected && (
        <div>
          {catgMasterShowsList && catgMasterShowsList[1].subcategory_details ? (
            <HorizontalScroll menu={menuGlobal} />
          ) : (
            noData
          )}
        </div>
      )}
      {isToddlersSelected && (
        <div>
          {catgMasterShowsList && catgMasterShowsList[2].subcategory_details ? (
            <HorizontalScroll menu={menuToddlers} />
          ) : (
            noData
          )}
        </div>
      )}
      {isEdutainmentSelected && (
        <div>
          {catgMasterShowsList && catgMasterShowsList[3].subcategory_details ? (
            <HorizontalScroll menu={menuEdutainment} />
          ) : (
            noData
          )}
        </div>
      )}
      {showLoader && <Loader />}
    </div>
  );
}
