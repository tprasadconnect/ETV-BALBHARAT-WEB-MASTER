/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Col, Row, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon } from '../../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../../constants/routerUrlConstant';
import { selectors as userStoreSelectors } from '../../../../store/userStore';
import { Loader } from '../../../../components/Loader';
import { preferences } from '../../../../services/preferences/preferences';
import { selectors as preferencesSelectors } from '../../../../store/preferences';
import { API_REQ_PARAM_CONSTANTS } from '../../../../constants/apiReqParamConstants';
import { setPreference } from '../../../../services/setPreference/setPreference';

export function NotificationSettings() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const preferencesState = useSelector(
    preferencesSelectors.getPreferencesState
  );
  const notificationsData =
    preferencesState.data &&
    preferencesState.data.module_details &&
    preferencesState.data.module_details[1] &&
    preferencesState.data.module_details[1].section_details &&
    preferencesState.data.module_details[1].section_details[0] &&
    preferencesState.data.module_details[1].section_details[0].optiondetails &&
    preferencesState.data.module_details[1].section_details[0].optiondetails;

  const [showLoader, setShowLoader] = useState(false);
  const [pauseNotiffications, setPauseNotiffications] = useState<any>({});

  const [otherNotifications, setOtherNotifications] = useState<any[]>([]);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = {
      kidid: kidid || '',
      userid,
      settingid: '',
    };
    dispatch(preferences(params));
  });

  const useEffectOnMountPrefereces = (effect: React.EffectCallback) => {
    React.useEffect(effect, [preferencesState]);
  };
  useEffectOnMountPrefereces(() => {
    if (preferencesState.data) {
      const nSettingsArr = notificationsData && notificationsData;

      const nspsarr = { ...pauseNotiffications };

      Object.assign(nspsarr, {
        option: nSettingsArr[0].option,
        settingId: nSettingsArr[0].value_data[0].setting_id,
        userpreference: nSettingsArr[0].value_data[0].userpreference,
        valuesOnDesc: nSettingsArr[0].value_data[0].values[0].description,
        valuesOffDesc: nSettingsArr[0].value_data[0].values[1].description,
      });

      setPauseNotiffications(nspsarr);

      const otherNotificationsArr: any = [];
      nSettingsArr.forEach((data, i) => {
        if (i !== 0) {
          const newObj = {};
          Object.assign(newObj, {
            option: data.option,
            settingId: data.value_data[0].setting_id,
            userpreference: data.value_data[0].userpreference,
            valuesOnDesc: data.value_data[0].values[0].description,
            valuesOffDesc: data.value_data[0].values[1].description,
          });
          if (nspsarr.userpreference === nspsarr.valuesOnDesc)
            Object.assign(newObj, { isDisable: true });
          else Object.assign(newObj, { isDisable: false });
          otherNotificationsArr.push(newObj);
        }
      });
      setOtherNotifications(otherNotificationsArr);
    }
    setShowLoader(preferencesState.loader);
  });

  const callSetPreference = (settingid: string, settingvalue: string) => {
    const params = {
      userid,
      kidid: kidid || '',
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
      settings: [{ settingid, settingvalue }],
    };
    dispatch(setPreference(params));
  };

  const toggleNSwitch = (id: string, preferenceValue: string) => {
    const pauseN = { ...pauseNotiffications };
    let preferenceSelected: string = '';
    const otherNotificationsArr = [...otherNotifications];
    if (pauseN.settingId === id) {
      if (preferenceValue === pauseN.valuesOnDesc) {
        pauseN.userpreference = pauseN.valuesOffDesc;
        otherNotificationsArr.forEach((data) => {
          Object.assign(data, { isDisable: false });
        });
        preferenceSelected = pauseN.valuesOffDesc;
      } else if (preferenceValue === pauseN.valuesOffDesc) {
        pauseN.userpreference = pauseN.valuesOnDesc;
        otherNotificationsArr.forEach((data) => {
          Object.assign(data, { isDisable: true });
        });
        preferenceSelected = pauseN.valuesOnDesc;
      }
    }
    setPauseNotiffications(pauseN);
    callSetPreference(id, preferenceSelected);
  };

  const handleOtherNotificationToggles = (
    id: string,
    preferenceValue: string
  ) => {
    const otherNotificationsArr = [...otherNotifications];
    let preferenceSelected: string = '';
    otherNotificationsArr.forEach((data) => {
      if (data.settingId === id) {
        if (preferenceValue === data.valuesOnDesc) {
          Object.assign(data, { userpreference: data.valuesOffDesc });
          preferenceSelected = data.valuesOffDesc;
        } else {
          Object.assign(data, { userpreference: data.valuesOnDesc });
          preferenceSelected = data.valuesOnDesc;
        }
      }
    });
    setOtherNotifications(otherNotificationsArr);
    callSetPreference(id, preferenceSelected);
  };

  return (
    <div className="notificationSettings">
      <div className="main-background content-padding d-flex align-items-center">
        <div className="w-100">
          <Form>
            <Row>
              <Col md={1} xs={6} className="d-none d-lg-block" />
              <Col md={10}>
                <div className="notificationSettings__container">
                  <div className="notificationSettings__back-btn pl-sm-3 pb-3">
                    <div>
                      <Image alt="" src={backIcon} />
                    </div>
                    <Link to={ROUTER_URL_CONSTANT.SUB_SETTINGS}>
                      <span className="notificationSettings__back-btn__back-text">
                        {t('common:back')}
                      </span>
                    </Link>
                  </div>
                  <Row className="pt-3 pl-sm-3 ">
                    <Col
                      md={12}
                      sm={12}
                      xs={12}
                      className="notificationSettings__heading"
                    >
                      {t('menu:notificationSettings')}
                    </Col>
                  </Row>
                  <Row className="pt-3 pl-sm-3">
                    <Col sm={6} xs={12} className="notificationSettings__sub">
                      {t('menu:pauseNotifications')}
                      <span className="checkBox">
                        <Form.Check
                          type="switch"
                          label=" "
                          className="float-right"
                          id={pauseNotiffications.settingId}
                          checked={
                            pauseNotiffications.userpreference ===
                            pauseNotiffications.valuesOnDesc
                          }
                          onChange={() =>
                            toggleNSwitch(
                              pauseNotiffications.settingId,
                              pauseNotiffications.userpreference
                            )
                          }
                          value={pauseNotiffications.userpreference}
                        />
                      </span>
                    </Col>

                    {otherNotifications &&
                      otherNotifications.length > 0 &&
                      otherNotifications.map((data) => {
                        const {
                          option,
                          settingId,
                          userpreference,
                          valuesOnDesc,
                          isDisable,
                        } = data;
                        return (
                          <Col
                            sm={6}
                            xs={12}
                            className="notificationSettings__sub"
                            key={settingId}
                          >
                            <span>{option}</span>
                            <span className="checkBox">
                              <Form.Check
                                type="switch"
                                label=" "
                                className="float-right"
                                id={settingId}
                                checked={userpreference === valuesOnDesc}
                                onChange={() =>
                                  handleOtherNotificationToggles(
                                    settingId,
                                    userpreference
                                  )
                                }
                                value={userpreference}
                                disabled={isDisable}
                              />
                            </span>
                          </Col>
                        );
                      })}
                  </Row>
                </div>
              </Col>
              <Col md={1} />
            </Row>
          </Form>
        </div>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
