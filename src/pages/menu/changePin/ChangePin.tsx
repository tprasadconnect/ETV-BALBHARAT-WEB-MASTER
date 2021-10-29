import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { backIcon } from '../../../constants/iconImageConstant';

export function ChangePin() {
  const { t } = useTranslation(['common', 'menu']);

  return (
    <div className="changePin main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={1} xs={6} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="edit-account__container">
              <div className="edit-account__back-btn pl-sm-3 pb-3">
                <div>
                  <Image alt="" src={backIcon} />
                </div>
                <Link to={ROUTER_URL_CONSTANT.SUB_SETTINGS}>
                  <span className="edit-account__back-btn__back-text">
                    {t('common:back')}
                  </span>
                </Link>
              </div>
              <Row className="pt-3 pl-sm-3">
                <Col md={3} sm={12} className="notifications__heading">
                  {t('menu:changePin')}
                </Col>
              </Row>
              <Row>
                <Col sm={6}> </Col>
              </Row>
            </div>
          </Col>
          <Col md={1} />
        </Row>
      </div>
    </div>
  );
}
