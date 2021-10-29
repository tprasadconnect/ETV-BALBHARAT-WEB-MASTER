/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Col, Row, Image, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { backIcon, calendarIcon } from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import {
  formatDate,
  getDurationToSeconds,
} from '../../../utils/commonFunctions';
import { watchHistory } from '../../../services/watchHistory/watchHistory';
import { actionTypes, selectors } from '../../../store/watchHistory';
import { Loader } from '../../../components/Loader';
import { API_REQ_PARAM_CONSTANTS } from '../../../constants/apiReqParamConstants';

export function WatchHistory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;
  const watchHistoryState = useSelector(selectors.getWatchHistoryState);

  const date = new Date();
  const defaultFromDateToCal = new Date(
    date.getTime() - 30 * 24 * 60 * 60 * 1000
  ).toLocaleDateString('en-US');
  const defaultTodateToCal = date.toLocaleDateString('en-US');

  const defaultFromDate = formatDate(defaultFromDateToCal);
  const defaultTodate = formatDate(defaultTodateToCal);

  const [showLoader, setShowLoader] = useState(false);
  const [watchHistoryArr, setWatchHistoryArr] = useState<any[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [isNoResultFound, setIsNoResultFound] = useState(false);

  const callWatchList = (fromDate, toDate) => {
    dispatch({
      type: actionTypes.WATCH_HISTORY_FAILURE_ACTION,
      payload: { error: null },
    });
    dispatch({
      type: actionTypes.WATCH_HISTORY_SUCCESS_ACTION,
      payload: { data: null },
    });
    const params = {
      kidid: kidid || '',
      userid,
      type: API_REQ_PARAM_CONSTANTS.WATCH_HISTORY,
      fromdate: fromDate,
      todate: toDate,
    };
    dispatch(watchHistory(params));
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    callWatchList(defaultFromDate, defaultTodate);
    setStartDate(defaultFromDateToCal);
    setEndDate(defaultTodateToCal);
    setDateRange(
      `${new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-US'
      )}-${new Date(date).toLocaleDateString('en-US')}`
    );
  });

  const useEffectOnMountWatchHistory = (effect: React.EffectCallback) => {
    React.useEffect(effect, [watchHistoryState]);
  };
  useEffectOnMountWatchHistory(() => {
    if (watchHistoryState.data) {
      setIsNoResultFound(false);
      const watchedListArray =
        watchHistoryState.data && watchHistoryState.data.watched_details;
      setWatchHistoryArr(watchedListArray);
    }
    if (watchHistoryState.error) {
      setIsNoResultFound(true);
    }
    setShowLoader(watchHistoryState.loader);
  });

  const handleApplyDateRange = (e, picker) => {
    e.preventDefault();
    const startDateYmdFormat = formatDate(picker.startDate._d);
    setStartDate(new Date(picker.startDate._d).toLocaleDateString('en-US'));
    const endDateYmdFormat = formatDate(picker.endDate._d);
    setEndDate(new Date(picker.endDate._d).toLocaleDateString('en-US'));

    setDateRange(
      `${new Date(picker.startDate._d).toLocaleDateString('en-US')}-${new Date(
        picker.endDate._d
      ).toLocaleDateString('en-US')}`
    );

    callWatchList(startDateYmdFormat, endDateYmdFormat);
  };

  const handleItemClick = (
    season,
    contentId,
    watchedDurationHrs,
    groupCatId,
    mainCatId,
    subCatId,
    seasonDetails
  ) => {
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

  return (
    <div className="watchHistory main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={1} xs={6} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="watchHistory__container">
              <div className="watchHistory__back-btn pl-sm-3 pb-3">
                <div>
                  <Image src={backIcon} />
                </div>
                <Link to={ROUTER_URL_CONSTANT.ACCOUNT}>
                  <span className="watchHistory__back-btn__back-text">
                    {t('common:back')}
                  </span>
                </Link>
              </div>
              <Row className="pt-3 pl-sm-3">
                <Col md={12} sm={12} xs={12} className="watchHistory__heading">
                  {t('menu:watchHistory')}
                </Col>
                <Col md={4} sm={6} xs={10} className="pt-3">
                  <Form>
                    <Form.Group>
                      <Form.Label>
                        <div className="watchHistory__subHedding">
                          {t('menu:dateRange')}
                        </div>
                      </Form.Label>
                      <div
                        className="watchHistory__caledarIcon"
                        // onClick={togglePasswordVisiblity}
                        aria-hidden="true"
                      >
                        {startDate && endDate && (
                          <DateRangePicker
                            initialSettings={{
                              startDate,
                              endDate,
                              maxDate: new Date(),
                            }}
                            onApply={handleApplyDateRange}
                          >
                            <Image src={calendarIcon} />
                          </DateRangePicker>
                        )}
                      </div>
                      <Form.Control
                        autoComplete="nope"
                        type="text"
                        name="contactno"
                        value={dateRange}
                        className="form-control"
                        readOnly
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <hr />
              <Row className="pt-3 pl-sm-3 watchHistory__scroll">
                {!isNoResultFound &&
                  watchHistoryArr &&
                  watchHistoryArr.length > 0 &&
                  watchHistoryArr.map((data) => {
                    const {
                      watchedduration_hrs,
                      content_id,
                      title,
                      feature_image,
                      seasons,
                      episode,
                      group_details,
                      watchedon,
                      year,
                    } = data;
                    const { maincategory_details, group_catg_id } =
                      group_details?.[0] || {};
                    const { subcategory_details, catg_id } =
                      maincategory_details?.[0] || {};
                    const { sub_catg_id, season_details } =
                      subcategory_details?.[0] || [];
                    return (
                      <Col
                        md={12}
                        sm={12}
                        xs={12}
                        key={content_id}
                        className="cursor-pointer"
                        onClick={() =>
                          handleItemClick(
                            seasons,
                            content_id,
                            watchedduration_hrs,
                            group_catg_id,
                            catg_id,
                            sub_catg_id,
                            season_details
                          )
                        }
                      >
                        <Row className="pt-3">
                          <Col md={1} sm={2} xs={2}>
                            <img
                              className="watchHistory__moviePic"
                              src={feature_image}
                              alt=""
                            />{' '}
                          </Col>
                          <Col
                            md={9}
                            sm={8}
                            xs={7}
                            className="watchHistory__showDescription pt-1"
                          >
                            {title}
                            <br />
                            {group_catg_id ===
                              API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS && (
                              <span className="watchHistory__showDescriptionSub">
                                {`${t('common:season')} ${seasons} | ${t(
                                  'common:episode'
                                )} ${episode}`}
                              </span>
                            )}
                            {group_catg_id ===
                              API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES && (
                              <span className="watchHistory__showDescriptionSub">
                                {t('common:year')}: {year}
                              </span>
                            )}
                          </Col>
                          <Col
                            md={2}
                            sm={2}
                            xs={3}
                            className="watchHistory__showLength pt-1"
                          >
                            {watchedon}
                          </Col>
                        </Row>
                      </Col>
                    );
                  })}
                {isNoResultFound && <div>History not found</div>}
              </Row>
            </div>
          </Col>
          <Col md={1} />
        </Row>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
