import React from 'react';
import { Col, Row, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { backIcon } from '../../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../../constants/routerUrlConstant';

export function SetTimer() {
  const { t } = useTranslation(['common', 'menu']);
  return (
    <div className="setTimer">
      <div className="main-background content-padding d-flex align-items-center">
        <div className="w-100">
          <Row>
            <Col md={1} xs={6} className="d-none d-lg-block" />
            <Col md={10}>
              <div className="setTimer__container">
                <div className="setTimer__back-btn pl-sm-3 pb-3">
                  <div>
                    <Image alt="" src={backIcon} />
                  </div>
                  <Link to={ROUTER_URL_CONSTANT.SUB_SETTINGS_TIMER}>
                    <span className="setTimer__back-btn__back-text">
                      {t('common:back')}
                    </span>
                  </Link>
                </div>
                <Row className="pt-3 pl-sm-3 ">
                  <Col md={12} sm={12} xs={12} className="setTimer__heading">
                    {t('menu:breakTimer')}
                  </Col>
                </Row>
                <Row className="pt-3 pl-sm-3">
                  <Col md={12} sm={12}>
                    <Form>
                      <Row>
                        <Col md={6} sm={6}>
                          <div className="setTimer__subText">
                            {t('menu:setBreakTimer')}
                          </div>
                        </Col>
                        <Col md={6} sm={6}>
                          {' '}
                          <input type="text" />{' '}
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
