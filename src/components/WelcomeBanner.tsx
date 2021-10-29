import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logoImage } from '../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../constants/routerUrlConstant';
import { actionTypes } from '../store/login';
import { actionTypes as registrationActionTypes } from '../store/register';

export function WelcomeBanner() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { t } = useTranslation(['common']);
  const urlPathName = history.location.pathname;
  const navigateTo = () => {
    dispatch({
      type: actionTypes.LOGIN_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: actionTypes.LOGIN_FAILURE_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: registrationActionTypes.REGISTRATION_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: registrationActionTypes.REGISTRATION_FAILURE_ACTION,
      payload: { data: null },
    });
    history.push(
      urlPathName.includes('/register') || urlPathName.includes('/verifyMobile')
        ? ROUTER_URL_CONSTANT.LOGIN
        : ROUTER_URL_CONSTANT.REGISTER
    );
  };

  const logoClick = () => {
    history.push(ROUTER_URL_CONSTANT.HOME);
  };

  return (
    <div id="welcomeBanner">
      <div className="welcome-banner">
        <div className="welcome-banner__logo">
          <Image
            src={logoImage}
            onClick={logoClick}
            className="cursor-pointer"
          />
        </div>
        <div>
          <div className="welcome-banner__L-Text1">{t('welcome')}</div>
          <div className="welcome-banner__L-Text2">{t('title')}</div>
          <p className="welcome-banner__L-Text3">{t('welcomeBannerText')}</p>
          <div className="d-none d-lg-block">
            <p>
              {urlPathName.includes('/register') ||
              urlPathName.includes('/verifyMobile')
                ? t('alreadyHaveAccount')
                : t('noAccount')}
            </p>
            <Button onClick={navigateTo} className="btn-yeelow">
              {urlPathName.includes('/register') ||
              urlPathName.includes('/verifyMobile')
                ? t('login')
                : t('register')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
