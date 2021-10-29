/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store/continueWatching';
import { HorizontalScroll } from '../../components/HorizontalScroll';
import { playIcon } from '../../constants/iconImageConstant';
import { Loader } from '../../components/Loader';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { continueWatching } from '../../services/continueWatching/continueWatching';
import {
  getDurationToSeconds,
  getWatchedDurationProgress,
} from '../../utils/commonFunctions';

export function ContinueWatching() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['home']);

  const [showLoader, setShowLoader] = useState(false);
  const [cwList, setCWList] = useState<any[]>([]);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const continueWatchingState = useSelector(selectors.getContinueWatchingState);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = {
      kidid: kidid || '',
      userid,
      type: API_REQ_PARAM_CONSTANTS.CONTINUE_WATCHING,
    };
    dispatch(continueWatching(params));
  });

  const useEffectOnMountcwList = (effect: React.EffectCallback) => {
    React.useEffect(effect, [continueWatchingState]);
  };
  useEffectOnMountcwList(() => {
    if (continueWatchingState.data) {
      setCWList(continueWatchingState.data.watched_details);
    }
    if (continueWatchingState.error) {
      setCWList([]);
    }
    setShowLoader(continueWatchingState.loader);
  });

  const MenuItem = (props: any) => {
    const {
      index,
      length,
      featureImage,
      subCatID,
      title,
      seasonsDetails,
      catgId,
      groupCatId,
      contentId,
      season,
      fullVideoDurationHrs,
      watchedDurationHrs,
    } = props;
    const [mouseHover, setMouseHover] = useState(false);

    const handleCardClick = (mainCatId, subCatId, seasonDetails) => {
      if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS) {
        if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${subCatId}/${seasonDetails.length}/${season}/${contentId}`,
            search: `bookmarkTime=${getDurationToSeconds(watchedDurationHrs)}`,
          });
        }
        if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${subCatId}/${seasonDetails.length}/${season}/${contentId}`,
            search: `bookmarkTime=${getDurationToSeconds(watchedDurationHrs)}`,
          });
        }
        if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_TODDLERS_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.TODDLERS_DETAILS}/${subCatId}/${seasonDetails.length}/${season}/${contentId}`,
            search: `bookmarkTime=${getDurationToSeconds(watchedDurationHrs)}`,
          });
        }
        if (mainCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_EDUTAINMENT_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.EDUTAINMENT_DETAILS}/${subCatId}/${seasonDetails.length}/${season}/${contentId}`,
            search: `bookmarkTime=${getDurationToSeconds(watchedDurationHrs)}`,
          });
        }
      } else if (groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES) {
        if (mainCatId === API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${subCatId}`,
            search: `bookmarkTime=${getDurationToSeconds(watchedDurationHrs)}`,
          });
        }
      }
    };

    const setClassName = (number) => {
      if (number === 0) return 'hshi__cw-img-container card-first';
      if (number === length - 1 && length >= 5)
        return 'hshi__cw-img-container card-last';
      return 'hshi__cw-img-container card-middle';
    };

    return (
      <div
        className={setClassName(index)}
        onMouseEnter={() => setMouseHover(true)}
        onMouseLeave={() => setMouseHover(false)}
        tabIndex={0}
        onKeyPress={() => {}}
        role="button"
        onClick={() => handleCardClick(catgId, subCatID, seasonsDetails)}
      >
        <img src={featureImage} alt="feature show" className="hshi__cw-img" />
        {mouseHover && (
          <div className="hshi__cw-dark-gradient">
            <div className="hshi__cw-content">
              <div className="hshi__cw-playicon">
                <img src={playIcon} alt="play icon" />
              </div>
              <div className="hshi__cw-details">{title}</div>
              {groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS && (
                <div className="hshi__cw-item-type">{t('show')}</div>
              )}
              {groupCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES && (
                <div className="hshi__cw-item-type">{t('movie')}</div>
              )}
              <div className="hshi__cw-progress-bar">
                <ProgressBar
                  variant="warning"
                  now={getWatchedDurationProgress(
                    watchedDurationHrs,
                    fullVideoDurationHrs
                  )}
                  className="card-progress-bar"
                />
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
        group_details,
        watchedduration_hrs,
        full_video_duration_hrs,
        title,
        content_id,
        feature_image,
        seasons,
      } = el;
      const { maincategory_details, group_catg_id } = group_details[0];
      const { subcategory_details, catg_id } = maincategory_details[0];
      const { sub_catg_id, season_details } = subcategory_details[0];
      return (
        <MenuItem
          index={index}
          length={itemsLength}
          key={sub_catg_id}
          featureImage={feature_image}
          subCatID={sub_catg_id}
          title={title}
          seasonsDetails={season_details}
          watchedDurationHrs={watchedduration_hrs}
          fullVideoDurationHrs={full_video_duration_hrs}
          contentId={content_id}
          catgId={catg_id}
          groupCatId={group_catg_id}
          season={seasons}
        />
      );
    });

  const menu = cwList && Menu(cwList, cwList.length);

  return (
    <>
      {cwList && cwList.length !== 0 && (
        <div className="cwatching d-none d-sm-block">
          <div className="cwatching__title">{t('continueWatching')}</div>
          {cwList && <HorizontalScroll menu={menu} />}
          {showLoader && <Loader />}
        </div>
      )}
    </>
  );
}
