/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HorizontalScroll } from '../../components/HorizontalScroll';
import {
  tvShowsHomeEdutainment1,
  tvShowsHomeOriginals2,
} from '../../constants/iconImageConstant';
import { selectors } from '../../store/categoryMaster';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { NoData } from '../../components/NoData';
import { ShowsHScrollMenuItem } from '../../components/ShowsHScrollMenuItem';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';

export const TvShowsEdutainment: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation(['home']);

  const catgMasterState = useSelector(selectors.getCatagoryMasterState);
  const catgMasterEdutainmentShowsList =
    catgMasterState &&
    catgMasterState.data &&
    catgMasterState.data.group_details &&
    catgMasterState.data.group_details[0] &&
    catgMasterState.data.group_details[0].maincategory_details &&
    catgMasterState.data.group_details[0].maincategory_details;

  const handleCardClick = (showId, seasonDetails) => {
    history.push({
      pathname: `${ROUTER_URL_CONSTANT.EDUTAINMENT_DETAILS}/${showId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
    });
  };

  const Menu = (list: any, itemsLength: number) =>
    list.map((el: any, index: number) => {
      const {
        sub_catg_featured_image,
        sub_catg_id,
        sub_catg_name,
        season_details,
      } = el; // Diabled ESlint due to API response having underscore for variable names
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
        /> // Diabled ESlint due to API response having underscore for variable names
      );
    });
  const menu =
    catgMasterEdutainmentShowsList &&
    catgMasterEdutainmentShowsList[3].subcategory_details &&
    Menu(
      catgMasterEdutainmentShowsList[3].subcategory_details,
      catgMasterEdutainmentShowsList[3].subcategory_details.length
    );

  return (
    <div className="TvShowsEdutainment">
      <div className="TvShowsEdutainment__SP-sec4">
        <img
          src={tvShowsHomeEdutainment1}
          alt="edutainment logo"
          className="TvShowsEdutainment__SP-sec4__SPS-asset5"
        />
        <div className="TvShowsEdutainment__SP-sec4__subContent">
          <div className="row align-content-center">
            <div className="col-9 p11">
              <div className="TvShowsEdutainment__SP-sec4__subContent__SPS-text1">
                {t('home:edutainment')}
              </div>
              <span className="SPS-text-bb">{t('home:balBharat')}</span>
              <h3>{t('home:edutainment')}</h3>
            </div>
            <div className="col-3 TvShowsEdutainment__SP-sec4__subContent__viewall-container">
              <a href={ROUTER_URL_CONSTANT.EDUTAINMENT}>
                <img
                  alt="view all button"
                  src={tvShowsHomeOriginals2}
                  className="TvShowsEdutainment__SP-sec4__subContent__edutainment-viewall-btn"
                />
                <span className="TvShowsEdutainment__SP-sec4__subContent__edutainment-viewall-link">
                  View all
                </span>
              </a>
            </div>
          </div>
          <div>
            <div className="horizontal-slide__hs-plugin">
              {catgMasterEdutainmentShowsList &&
              catgMasterEdutainmentShowsList[3].subcategory_details ? (
                <HorizontalScroll menu={menu} />
              ) : (
                <NoData />
              )}
            </div>
            <div className="horizontal-slide__hs-manual">
              {catgMasterEdutainmentShowsList &&
              catgMasterEdutainmentShowsList[3].subcategory_details ? (
                catgMasterEdutainmentShowsList[3].subcategory_details.map(
                  (data: any) => {
                    const {
                      sub_catg_featured_image,
                      sub_catg_id,
                      season_details,
                    } = data;
                    return (
                      <div
                        className="horizontal-slide__card"
                        key={sub_catg_id}
                        onKeyPress={() => {}}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          handleCardClick(sub_catg_id, season_details);
                        }}
                      >
                        <img
                          src={sub_catg_featured_image}
                          alt="original pic"
                          className="horizontal-slide__card-pic"
                        />
                      </div>
                    );
                  }
                )
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
