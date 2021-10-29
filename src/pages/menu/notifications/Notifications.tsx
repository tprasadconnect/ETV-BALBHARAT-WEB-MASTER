/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon } from '../../../constants/iconImageConstant';
import { API_REQ_PARAM_CONSTANTS } from '../../../constants/apiReqParamConstants';
import { notifications } from '../../../services/notifications/notifications';
import { selectors } from '../../../store/notifications';
import { Loader } from '../../../components/Loader';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { NotificationsList } from './NotificationsList';

export function Notifications() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['common', 'menu']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;

  const notificationsState = useSelector(selectors.getNotificationsState);

  const [showLoader, setShowLoader] = useState(false);
  const [notificationsArray, setNotificationsArray] = useState<any[]>([]);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = {
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
      userid,
      device_id: '',
    };
    dispatch(notifications(params));
  });

  const useEffectOnMountNotifications = (effect: React.EffectCallback) => {
    React.useEffect(effect, [notificationsState]);
  };
  useEffectOnMountNotifications(() => {
    if (notificationsState.data) {
      const noticationsArr =
        notificationsState.data &&
        notificationsState.data[0].notification_details;
      setNotificationsArray(noticationsArr);
    }
    setShowLoader(notificationsState.loader);
  });

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <div className="notifications main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={1} xs={6} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="edit-account__container">
              <div className="pl-sm-3 pb-3">
                <Button
                  className="common-back-btn"
                  onClick={() => handleBackClick()}
                >
                  <div>
                    <Image src={backIcon} />
                  </div>
                  <div className="common-back-btn-text">{t('common:back')}</div>
                </Button>
              </div>
              <Row className="pt-3 pl-sm-3">
                <Col md={12} sm={12} className="notifications__heading">
                  {t('menu:notifications')}
                </Col>
              </Row>
              <Row md={12} sm={12} className="p-14">
                <Col
                  md={12}
                  sm={12}
                  className="notifications__messages overflow-auto"
                >
                  {notificationsArray &&
                    notificationsArray.map((data) => {
                      const {
                        notificationid,
                        notificationfrom,
                        notificationimage,
                        content_id,
                        title,
                        seasons,
                        datetime,
                        group_details,
                      } = data;
                      const { group_catg_id, maincategory_details } =
                        group_details?.[0] || [];
                      const { catg_id, subcategory_details } =
                        maincategory_details?.[0] || [];
                      const { sub_catg_id, season_details } =
                        subcategory_details?.[0] || [];

                      return (
                        <NotificationsList
                          key={notificationid}
                          notificationId={notificationid}
                          notificationFrom={notificationfrom}
                          notificationImage={notificationimage}
                          contentId={content_id}
                          title={title}
                          datetime={datetime}
                          groupCatId={group_catg_id}
                          mainCatId={catg_id}
                          subCatId={sub_catg_id}
                          seasonDetails={season_details}
                          season={seasons}
                        />
                      );
                    })}
                </Col>
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
