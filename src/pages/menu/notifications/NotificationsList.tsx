import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { API_REQ_PARAM_CONSTANTS } from '../../../constants/apiReqParamConstants';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';

interface INotificationsList {
  notificationId: string;
  notificationFrom: string;
  notificationImage: string;
  contentId: string;
  title: string;
  datetime: string;
  groupCatId: string;
  mainCatId: string;
  subCatId: string;
  seasonDetails: string;
  season: string;
}

export const NotificationsList: React.FC<INotificationsList> = (
  props: INotificationsList
) => {
  const history = useHistory();
  const { t } = useTranslation(['menu']);
  const {
    notificationId,
    notificationFrom,
    notificationImage,
    contentId,
    title,
    datetime,
    groupCatId,
    mainCatId,
    subCatId,
    seasonDetails,
    season,
  } = props;
  const getNotificationType = (nFrom) => {
    if (nFrom === API_REQ_PARAM_CONSTANTS.ARTICLE) {
      return t('menu:watchnow');
    }
    if (nFrom === API_REQ_PARAM_CONSTANTS.DIRECT) {
      return t('tryitnow');
    }
    return '';
  };

  const handleNotificationClick = (
    nFrom,
    cId,
    gCatId,
    mCatId,
    sCatId,
    sDetails,
    seasonId
  ) => {
    if (nFrom === API_REQ_PARAM_CONSTANTS.ARTICLE) {
      if (gCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS) {
        if (mCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${sCatId}/${sDetails.length}/${seasonId}/${cId}`,
          });
        }
        if (mCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${sCatId}/${sDetails.length}/${seasonId}/${cId}`,
          });
        }
        if (mCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_TODDLERS_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.TODDLERS_DETAILS}/${sCatId}/${sDetails.length}/${seasonId}/${cId}`,
          });
        }
        if (mCatId === API_REQ_PARAM_CONSTANTS.TV_SHOW_EDUTAINMENT_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.EDUTAINMENT_DETAILS}/${sCatId}/${sDetails.length}/${seasonId}/${cId}`,
          });
        }
      } else if (gCatId === API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_MOVIES) {
        if (mCatId === API_REQ_PARAM_CONSTANTS.MOVIES_GLOBAL_CAT_ID) {
          history.push({
            pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${sCatId}`,
          });
        }
      }
    } else {
      history.push(ROUTER_URL_CONSTANT.MY_BB);
    }
  };

  return (
    <Row
      xs={12}
      sm={12}
      md={12}
      key={notificationId}
      className="notifications__notification-container"
      onClick={() =>
        handleNotificationClick(
          notificationFrom,
          contentId,
          groupCatId,
          mainCatId,
          subCatId,
          seasonDetails,
          season
        )
      }
    >
      <Col xs={4} sm={2} md={2} lg={2}>
        <div className="notifications__notification-img-container">
          <img
            alt="notiffication img"
            src={notificationImage}
            className="notifications__notification-img"
          />
        </div>
      </Col>
      <Col
        xs={8}
        sm={8}
        md={8}
        lg={8}
        className="notifications__notification-titleInfo"
      >
        <Row>
          <div className="notifications__notification-info">
            <span className="notifications__notification-title">{title}</span>
          </div>
        </Row>
        <Row className="notifications__notification-datetime">{datetime}</Row>
      </Col>
      <Col
        xs={0}
        sm={2}
        md={2}
        lg={2}
        className="notifications__notification-typeInfo"
      >
        <span className="notifications__notification-link">
          {getNotificationType(notificationFrom)}
        </span>
      </Col>
    </Row>
  );
};
