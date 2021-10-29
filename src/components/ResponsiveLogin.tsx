import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTER_URL_CONSTANT } from '../constants/routerUrlConstant';

export function ResponsiveLogin(props: any) {
  const { type } = props;
  const { t } = useTranslation(['common']);

  return (
    <div className="form-title__title">
      <div>
        <Link to={ROUTER_URL_CONSTANT.LOGIN}>
          <div
            className={
              type === 'Login'
                ? 'responsiveLogin__active-tab-color'
                : 'responsiveLogin__inactive-tab-color '
            }
          >
            {t('login')}
          </div>
        </Link>
        {type === 'Login' ? (
          <div className="responsiveLogin__active_icon" />
        ) : null}
      </div>
      <div>
        <Link to={ROUTER_URL_CONSTANT.REGISTER}>
          <div
            className={
              type === 'Register'
                ? 'responsiveLogin__active-tab-color ml-4'
                : 'responsiveLogin__inactive-tab-color ml-4'
            }
          >
            {t('register')}
          </div>
        </Link>
        {type === 'Register' ? (
          <div className="responsiveLogin__active_icon" />
        ) : null}
      </div>
    </div>
  );
}
