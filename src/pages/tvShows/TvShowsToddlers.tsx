/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HorizontalScroll } from '../../components/HorizontalScroll';
import { NoData } from '../../components/NoData';
import { ShowsHScrollMenuItem } from '../../components/ShowsHScrollMenuItem';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import {
  tvShowsHomeOriginals2,
  tvShowsToddlers1,
  tvShowsToddlers2,
} from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { selectors } from '../../store/categoryMaster';

export const TvShowsToddlers: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation(['home']);

  const catgMasterState = useSelector(selectors.getCatagoryMasterState);
  const catgMasterToddlerShowsList =
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
    catgMasterToddlerShowsList &&
    catgMasterToddlerShowsList[2].subcategory_details &&
    Menu(
      catgMasterToddlerShowsList[2].subcategory_details,
      catgMasterToddlerShowsList[2].subcategory_details.length
    );

  return (
    <div className="TvShowsToddlers">
      <div className="TvShowsToddlers__SP-sec2">
        <img src={tvShowsToddlers1} alt="" className="SPS-asset2" />
        <img src={tvShowsToddlers2} alt="" className="SPS-asset3" />
        <div className="TvShowsToddlers__SP-sec2__subContent">
          <div className="row align-content-center">
            <div className="col-9 p11">
              <div className="SPS-text1">{t('home:toddlers')}</div>
              <h3>
                <span>{t('home:balBharat')}</span>
                {t('home:toddlers')}
              </h3>
            </div>
            <div className="col-3 TvShowsToddlers__SP-sec2__viewall-container">
              <a href={ROUTER_URL_CONSTANT.TODDLERS}>
                <img
                  alt="view all button"
                  src={tvShowsHomeOriginals2}
                  className="TvShowsToddlers__SP-sec2__toddler-viewall-btn"
                />
                <span className="TvShowsToddlers__SP-sec2__toddler-viewall-link">
                  View all
                </span>
              </a>
            </div>
          </div>
          <div>
            <div className="horizontal-slide__hs-plugin">
              {catgMasterToddlerShowsList &&
              catgMasterToddlerShowsList[2].subcategory_details ? (
                <HorizontalScroll menu={menu} />
              ) : (
                <NoData />
              )}
            </div>
            <div className="horizontal-slide__hs-manual">
              {catgMasterToddlerShowsList &&
              catgMasterToddlerShowsList[2].subcategory_details ? (
                catgMasterToddlerShowsList[2].subcategory_details.map(
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
