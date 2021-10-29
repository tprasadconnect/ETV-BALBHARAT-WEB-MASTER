import React from 'react';
import { useTranslation } from 'react-i18next';

export function PageNotFound() {
  const { t } = useTranslation(['pageNotFound', 'home']);

  return (
    <div className="pageNotFound">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-2 col-xs-1" />
          <div className="col-md-6  col-sm-8  col-xs-10 text-center">
            <div className="pageNotFound__errorNumber"> 404 </div>
            <div className="pageNotFound__errSubText">
              {' '}
              {t('pageNotFound:errorMsg')}
            </div>
            <div className="pageNotFound__homeLink">
              <a href="/home"> {t('home:home')}</a>
            </div>
          </div>
          <div className="col-md-3 col-sm-2 col-xs-1 " />
        </div>
      </div>
    </div>
  );
}
