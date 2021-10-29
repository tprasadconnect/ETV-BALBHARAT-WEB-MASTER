import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  mybbAsset1,
  mybbAsset2,
  mybbAsset3,
} from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';

export const MyBb = () => {
  const { t } = useTranslation(['home']);
  return (
    <div className="home-mybb d-none d-sm-block">
      <div className="home-mybb__title-section">
        <div className="home-mybb__HL-text1">{t('mybb')}</div>
        <div className="home-mybb__title">{t('mybb')}</div>
        <div className="home-mybb__mybb-viewAll">
          <a href={ROUTER_URL_CONSTANT.MY_BB}>{t('viewAll')}</a>
        </div>
      </div>
      <div className="home-mybb__mybb-image-section">
        <div>
          <img
            src={mybbAsset1}
            alt="Events"
            className="home-mybb__mybb-image"
          />
        </div>
        <div>
          <img
            src={mybbAsset2}
            alt="Merchandise"
            className="home-mybb__mybb-image"
          />
        </div>
        <div>
          <img
            src={mybbAsset3}
            alt="B'day special"
            className="home-mybb__mybb-image"
          />
        </div>
        <div>
          <img
            src={mybbAsset1}
            alt="Featured Posts"
            className="home-mybb__mybb-image"
          />
        </div>
      </div>
    </div>
  );
};
