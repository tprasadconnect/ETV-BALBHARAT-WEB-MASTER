import React from 'react';
import { Col, Row, Image, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { backIcon } from '../../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../../constants/routerUrlConstant';

export function TimerSettings() {
  const { t } = useTranslation(['common', 'menu']);
  const history = useHistory();

  const handleTimerSettings = () => {
    history.push(ROUTER_URL_CONSTANT.TIMER_SETTINGS);
  };

  return (
    <div className="timerSettings">
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
                  <Link to={ROUTER_URL_CONSTANT.MENU}>
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
                    {t('menu:timerSettings')}
                  </Col>
                </Row>
                <Row className="pt-3 pl-sm-3">
                  <Col md={12} sm={12}>
                    <Form>
                      <Row>
                        <Col md={6} sm={6}>
                          <Row>
                            <Col sm={10} className="font-weight-bold">
                              {t('menu:activeTimer')}
                              <div className="videoSettings__subText">
                                {t('menu:appTimer')}
                              </div>
                            </Col>
                            <Col sm={2}>
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                label=" "
                                className="float-right"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6} sm={6}>
                          {' '}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} sm={6}>
                          <Row>
                            <Col sm={9} className="font-weight-bold">
                              {t('menu:breakTimer')}
                              <div className="videoSettings__subText">
                                {t('menu:activates')}
                              </div>
                            </Col>
                            <Col sm={3} className="btn">
                              <div
                                aria-hidden="true"
                                onClick={handleTimerSettings}
                              >
                                {t('menu:setTimer')}
                              </div>
                            </Col>
                          </Row>{' '}
                        </Col>
                        <Col md={6} sm={6}>
                          {' '}
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
    </div>
  );
}
