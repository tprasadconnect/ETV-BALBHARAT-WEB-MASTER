/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  tvShowsHomeOriginals1,
  tvShowsHomeOriginals2,
} from '../../constants/iconImageConstant';
import { HorizontalScroll } from '../../components/HorizontalScroll';
import { selectors } from '../../store/categoryMaster';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { ShowsHScrollMenuItem } from '../../components/ShowsHScrollMenuItem';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';

export const TvShowsOriginals: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation(['home']);

  const catgMasterState = useSelector(selectors.getCatagoryMasterState);
  const catgMasterOriginalsShowsList =
    catgMasterState &&
    catgMasterState.data &&
    catgMasterState.data.group_details &&
    catgMasterState.data.group_details[0] &&
    catgMasterState.data.group_details[0].maincategory_details &&
    catgMasterState.data.group_details[0].maincategory_details;

  const handleCardClick = (showId, seasonDetails) => {
    history.push({
      pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${showId}/${seasonDetails.length}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
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
    catgMasterOriginalsShowsList &&
    catgMasterOriginalsShowsList[0].subcategory_details &&
    Menu(
      catgMasterOriginalsShowsList[0].subcategory_details,
      catgMasterOriginalsShowsList[0].subcategory_details
    );

  return (
    <div className="TvShowsOriginals">
      <div className="TvShowsOriginals__SP-sec1">
        <img
          src={tvShowsHomeOriginals1}
          alt=""
          className="TvShowsOriginals__SP-sec1__SPS-asset1"
        />
        <div className="TvShowsOriginals__SP-sec1__subContent">
          <div className="row align-content-center">
            <div className="col-9 p20">
              <div className="SPS-text1">{t('home:originals')}</div>
              <h3>
                <span>{t('home:balBharat')}</span>
                {t('home:originals')}
              </h3>
            </div>
            <div className="col-3 TvShowsOriginals__SP-sec1__viewall-container">
              <a href={ROUTER_URL_CONSTANT.ORIGINALS}>
                <img
                  alt="view all button"
                  src={tvShowsHomeOriginals2}
                  className="TvShowsOriginals__SP-sec1__originals-viewall-btn"
                />
                <span className="TvShowsOriginals__SP-sec1__originals-viewall-link">
                  View all
                </span>
              </a>
            </div>
          </div>
          <div className="horizontal-slide__hs-plugin">
            {catgMasterOriginalsShowsList &&
              catgMasterOriginalsShowsList[0].subcategory_details && (
                <HorizontalScroll menu={menu} />
              )}
          </div>
          <div className="horizontal-slide__hs-manual">
            {catgMasterOriginalsShowsList &&
              catgMasterOriginalsShowsList[0].subcategory_details &&
              catgMasterOriginalsShowsList[0].subcategory_details.map(
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
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
