/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HorizontalScroll } from '../../components/HorizontalScroll';
import {
  playIcon,
  homeMoviesPashuIcon,
  homeMoviesStarIcon,
} from '../../constants/iconImageConstant';
import { Loader } from '../../components/Loader';
import { selectors } from '../../store/categoryMaster';
import { actionTypes as sectionCatItemsActionType } from '../../store/sectionCatItems';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { setClassName } from '../../utils/commonFunctions';

export function Movies() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['home']);

  const [showLoader, setShowLoader] = useState(false);

  const catgMasterState = useSelector(selectors.getCatagoryMasterState);
  const catgMasterShowsList =
    catgMasterState &&
    catgMasterState.data &&
    catgMasterState.data.group_details &&
    catgMasterState.data.group_details[1] &&
    catgMasterState.data.group_details[1].maincategory_details &&
    catgMasterState.data.group_details[1].maincategory_details;

  const useEffectOnMountMoviesList = (effect: React.EffectCallback) => {
    React.useEffect(effect, [catgMasterState]);
  };
  useEffectOnMountMoviesList(() => {
    setShowLoader(catgMasterState.loader);
  });

  const MenuItem = (props: any) => {
    const { index, length, imageUrl, title, subCatId, duration, year } = props;
    const [mouseHover, setMouseHover] = useState(false);

    const handleCardClick = (cardid) => {
      dispatch({
        type: sectionCatItemsActionType.SECTION_CAT_ITEMS_SUCCESS_ACTION,
        payload: { data: null },
      });
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${cardid}`,
      });
    };

    return (
      <div
        className={setClassName(index, length)}
        onMouseEnter={() => setMouseHover(true)}
        onMouseLeave={() => setMouseHover(false)}
        tabIndex={0}
        onKeyPress={() => {}}
        role="button"
        onClick={() => handleCardClick(subCatId)}
      >
        <img src={imageUrl} alt="feature show" className="hsvi__card-img" />
        {mouseHover && (
          <div className="hsvi__dark-gradient">
            <div className="hsvi__card-content">
              <div className="hsvi__card-playicon">
                <img src={playIcon} alt="play icon" />
              </div>
              <div className="hsvi__card-title">{title}</div>
              <div className="hsvi__card-info">
                <div className="hsvi__card-year">DISNEY | {year}</div>
                <div className="hsvi__card-duration">{duration} mins</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Menu = (list: any, itemsLength: number) =>
    list.map((el: any, index: number) => {
      const {
        sub_catg_name,
        sub_catg_id,
        sub_catg_featured_image,
        duration,
        year,
      } = el;
      return (
        <MenuItem
          index={index}
          length={itemsLength}
          key={sub_catg_id}
          title={sub_catg_name}
          subCatId={sub_catg_id}
          imageUrl={sub_catg_featured_image}
          duration={duration}
          year={year}
        />
      );
    });

  const menu =
    catgMasterShowsList &&
    catgMasterShowsList[0].subcategory_details &&
    Menu(
      catgMasterShowsList[0].subcategory_details,
      catgMasterShowsList[0].subcategory_details.length
    );

  return (
    <>
      {catgMasterShowsList &&
        catgMasterShowsList[0].subcategory_details.length !== 0 && (
          <div className="home-movies d-none d-sm-block">
            <div className="home-movies__HL-text1">
              <img
                src={homeMoviesStarIcon}
                className="home-movies__HM-asset2"
                alt="stars icon"
              />
              {t('movies')}
            </div>
            <img
              src={homeMoviesPashuIcon}
              className="home-movies__HM-asset1"
              alt="Pashu icon"
            />
            <div className="home-movies__title">{t('movies')}</div>
            {catgMasterShowsList &&
              catgMasterShowsList[0].subcategory_details && (
                <HorizontalScroll menu={menu} />
              )}
          </div>
        )}
      {showLoader && <Loader />}
    </>
  );
}
