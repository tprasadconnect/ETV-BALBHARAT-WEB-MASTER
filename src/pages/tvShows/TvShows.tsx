import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Header } from '../Header/Header';
import { TvShowsEdutainment } from './TvShowsEdutainment';
import { TvShowsGlobal } from './TvShowsGlobal';
import { TvShowsOriginals } from './TvShowsOriginals';
import { TvShowsToddlers } from './TvShowsToddlers';
import { Footer } from '../appFooter/Footer';
import { MainCarousel } from '../../components/MainCarousel';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import {
  logoImage,
  mtopbg,
  toggleMenu,
} from '../../constants/iconImageConstant';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';

export const TvShows: React.FC = () => {
  const { t } = useTranslation(['home']);
  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = null;
    dispatch(categoryMaster(params));
  });

  return (
    <div className="Shows-Page">
      <Header />
      <div className="tvShows__topBg">
        <img
          src={mtopbg}
          style={{ position: 'absolute', width: '100%', zIndex: -1 }}
          alt="top mobile bg"
        />
      </div>
      <div className="tvShows__mTop">
        <img src={logoImage} className="tvShows__etvLogo" alt="top mobile bg" />
        <img
          src={toggleMenu}
          className="tvShows__toggle-menu"
          alt="top mobile bg"
        />
      </div>
      <div className="tvShows__title">{t('tvShows')}</div>
      <MainCarousel groupCatId={API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS} />
      <div className="tvShows__emptyspace" />
      <TvShowsOriginals />
      <TvShowsToddlers />
      <TvShowsGlobal />
      <TvShowsEdutainment />
      <Footer />
    </div>
  );
};
