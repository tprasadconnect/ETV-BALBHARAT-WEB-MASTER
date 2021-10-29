import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  backIcon,
  settingsLogo,
  settingsParental,
  settingsNotifications,
  settingsStar,
} from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';

export function SubSettings() {
  const history = useHistory();
  const { t } = useTranslation(['common', 'menu']);
  const handleVideo = () => {
    history.push(ROUTER_URL_CONSTANT.SUB_SETTINGS_VIDEO);
  };
  const handlePassword = () => {
    history.push(ROUTER_URL_CONSTANT.ACCOUNT_CHANGE_PASSWORD);
  };
  const handlePin = () => {
    history.push(ROUTER_URL_CONSTANT.RESET_PIN);
  };
  const handleNotifications = () => {
    history.push(ROUTER_URL_CONSTANT.SUB_SETTINGS_NOTIFICATION);
  };

  return (
    <div className="subSettings">
      <div className="main-background content-padding d-flex align-items-center">
        <div className="w-100">
          <Row>
            <Col md={1} xs={6} className="d-none d-lg-block" />
            <Col md={10}>
              <div className="subSettings__container">
                <div className="subSettings__back-btn pl-sm-3 pb-3">
                  <div>
                    <Image alt="" src={backIcon} />
                  </div>
                  <Link to={ROUTER_URL_CONSTANT.MENU}>
                    <span className="subSettings__back-btn__back-text">
                      {t('common:back')}
                    </span>
                  </Link>
                </div>
                <Row className="pt-3 pl-sm-3 ">
                  <Col md={12} sm={12} xs={12} className="subSettings__heading">
                    {t('menu:settings')}
                  </Col>
                </Row>
                <Row className="pt-3 pl-sm-3">
                  <Col sm={3} xs={12}>
                    <Row>
                      <Col xs={12}>
                        <Image src={settingsParental} alt=" " />
                      </Col>
                      <Col xs={12} className="subHedding">
                        {t('menu:parentalCon')}
                      </Col>
                      <Col
                        xs={12}
                        className="subHedding__content"
                        onClick={handleVideo}
                      >
                        {t('menu:videoStream')}
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={3} xs={12}>
                    <Row>
                      <Col xs={12}>
                        <Image src={settingsStar} alt="" />
                      </Col>
                      <Col xs={12} className="subHedding">
                        {t('menu:secSetting')}
                      </Col>
                      <Col
                        xs={12}
                        className="subHedding__content"
                        onClick={handlePassword}
                      >
                        {t('menu:chgPwd')}
                      </Col>
                      <Col
                        xs={12}
                        className="subHedding__content"
                        onClick={handlePin}
                      >
                        {t('menu:chgPin')}
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={3} xs={12}>
                    <Row>
                      <Col xs={12}>
                        <Image src={settingsNotifications} alt="" />
                      </Col>
                      <Col
                        xs={12}
                        className="subHedding subHeddingCustom"
                        onClick={handleNotifications}
                      >
                        {t('menu:notificationSettings')}
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={3} xs={12}>
                    <Row>
                      <Col xs={12}>
                        <Image src={settingsLogo} alt="" />
                      </Col>
                      <Col xs={12} className="subHedding">
                        {t('menu:about')}
                      </Col>
                      <Col xs={12} className="subHedding__content">
                        <a
                          href={ROUTER_URL_CONSTANT.PRIVACY_POLICY}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t('menu:privacy')}
                        </a>
                      </Col>
                      <Col xs={12} className="subHedding__content">
                        <a
                          href={ROUTER_URL_CONSTANT.TERMS_AND_CONDITIONS}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t('menu:tandu')}
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={1} />
          </Row>
        </div>
      </div>
    </div>
  );
}
