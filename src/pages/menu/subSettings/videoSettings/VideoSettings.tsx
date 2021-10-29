import React, { useState } from 'react';
import { Col, Row, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon } from '../../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../../constants/routerUrlConstant';
import { selectors as userStoreSelectors } from '../../../../store/userStore';
import { selectors as preferencesSelectors } from '../../../../store/videoPreferences';
import { API_REQ_PARAM_CONSTANTS } from '../../../../constants/apiReqParamConstants';
import { setPreference } from '../../../../services/setPreference/setPreference';
import { Loader } from '../../../../components/Loader';
import { videoPreferences } from '../../../../services/videoPreferences/videoPreferences';
import { VideoSubTitleSettings } from './VideoSubTitleSettings';

export function VideoSettings() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const preferencesState = useSelector(
    preferencesSelectors.getVideoPreferencesState
  );
  const subTitleSettingsData =
    preferencesState.data &&
    preferencesState.data.module_details &&
    preferencesState.data.module_details[0].section_details &&
    preferencesState.data.module_details[0].section_details[0].optiondetails &&
    preferencesState.data.module_details[0].section_details[0].optiondetails[3];

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = {
      kidid: kidid || '',
      userid,
      settingid: '',
    };
    dispatch(videoPreferences(params));
  });

  const [showLoader, setShowLoader] = useState(false);
  const [videoSettings, setVideoSettings] = useState<any[]>([]);

  const useEffectOnMountPrefereces = (effect: React.EffectCallback) => {
    React.useEffect(effect, [preferencesState]);
  };
  useEffectOnMountPrefereces(() => {
    if (preferencesState.data) {
      const vsArr =
        preferencesState.data &&
        preferencesState.data.module_details &&
        preferencesState.data.module_details[0].section_details &&
        preferencesState.data.module_details[0].section_details[0]
          .optiondetails;

      const videoSettingsArr: any = [];
      vsArr.forEach((data, i) => {
        if (i !== vsArr.length - 1) {
          const newObj = {};
          Object.assign(newObj, {
            option: data.option,
            subText: data.remarks,
            settingId: data.value_data[0].setting_id,
            userpreference: data.value_data[0].userpreference,
            valuesOnDesc: data.value_data[0].values[0].description,
            valuesOffDesc: data.value_data[0].values[1].description,
          });
          videoSettingsArr.push(newObj);
        }
      });
      setVideoSettings(videoSettingsArr);
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

  const toggleVideoSwitch = (settingId, userpreferenceValue) => {
    const videoSettingsArr = [...videoSettings];
    let preferenceSelected: string = '';
    videoSettingsArr.forEach((data) => {
      if (data.settingId === settingId) {
        if (userpreferenceValue === data.valuesOnDesc) {
          Object.assign(data, { userpreference: data.valuesOffDesc });
          preferenceSelected = data.valuesOffDesc;
        } else {
          Object.assign(data, { userpreference: data.valuesOnDesc });
          preferenceSelected = data.valuesOnDesc;
        }
      }
    });
    setVideoSettings(videoSettingsArr);
    callSetPreference(settingId, preferenceSelected);
  };

  const submitSubTitleSettings = (
    subTitleUserpreference,
    subTitleColorDesc,
    subTitleTextSizeId,
    subTitleTextColorId
  ) => {
    const params = {
      kidid: kidid || '',
      userid,
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
      settings: [
        {
          settingid: subTitleTextSizeId,
          settingvalue: subTitleUserpreference,
        },
        {
          settingid: subTitleTextColorId,
          settingvalue: subTitleColorDesc,
        },
      ],
    };
    dispatch(setPreference(params));
  };

  return (
    <div className="videoSettings">
      <div className="main-background content-padding d-flex align-items-center">
        <div className="w-100">
          <Row>
            <Col md={1} xs={6} className="d-none d-lg-block" />
            <Col md={10}>
              <div className="videoSettings__container">
                <div className="videoSettings__back-btn pl-sm-3 pb-3">
                  <div>
                    <Image alt="" src={backIcon} />
                  </div>
                  <Link to={ROUTER_URL_CONSTANT.SUB_SETTINGS}>
                    <span className="videoSettings__back-btn__back-text">
                      {t('common:back')}
                    </span>
                  </Link>
                </div>
                <Row className="pt-3 pl-sm-3 ">
                  <Col
                    md={12}
                    sm={12}
                    xs={12}
                    className="videoSettings__heading"
                  >
                    {t('menu:videoSettings')}
                  </Col>
                </Row>
                <Row className="pt-3 pl-sm-3">
                  <Col md={12} sm={12}>
                    <Form>
                      <Row>
                        {videoSettings &&
                          videoSettings.length > 0 &&
                          videoSettings.map((data) => {
                            const {
                              option,
                              subText,
                              settingId,
                              userpreference,
                              valuesOnDesc,
                            } = data;
                            return (
                              <Col
                                md={6}
                                sm={6}
                                className="videoSettings__optionContainer"
                                key={settingId}
                              >
                                <Row>
                                  <Col sm={10} className="font-weight-bold">
                                    <div className="videoSettings__optionTitle">
                                      {option}
                                    </div>
                                    <div className="videoSettings__subText">
                                      {subText}
                                    </div>
                                  </Col>
                                  <Col sm={2}>
                                    <Form.Check
                                      type="switch"
                                      id={settingId}
                                      checked={userpreference === valuesOnDesc}
                                      onChange={() =>
                                        toggleVideoSwitch(
                                          settingId,
                                          userpreference
                                        )
                                      }
                                      value={userpreference}
                                      label=" "
                                      className="float-right"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            );
                          })}
                        <Col
                          md={6}
                          sm={6}
                          className="videoSettings__optionContainer"
                        >
                          {subTitleSettingsData && (
                            <VideoSubTitleSettings
                              data={subTitleSettingsData}
                              handleSubTitleSettingsSubmit={
                                submitSubTitleSettings
                              }
                            />
                          )}
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={1} />
          </Row>
        </div>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
