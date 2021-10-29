import React, { useEffect, useState } from 'react';
import { Col, Row, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  avatarHeader,
  HiImgNew,
  newHomePageSearch,
  notificationBellWhite,
  newHomePageMovies,
  newHomePageHTvShows,
  ResponsiveHomeIcon,
  ResponsiveMoveIcon,
  ResponsiveTvIcon,
  ResponsiveSearchIcon,
  aboutActive,
  aboutInActive,
  defaultLogo,
} from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { Search } from '../search/Search';
import { notificationsCount } from '../../services/notificationsCount/notificationsCount';
import { selectors as notificationsCountSelectors } from '../../store/notificationsCount';
import { selectors as lables } from '../../store/categoryMaster';
import { selectLanguageSelector } from '../../store/selectLanguage';
import { getItem } from '../../utils/storage';

export const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['header']);
  const [dynamicLogo, setDynamicLogo] = useState(defaultLogo);
  const [headerPic, setHeaderPic] = useState(avatarHeader);
  const userLang = useSelector(selectLanguageSelector.getSelectLanguageState);
  useEffect(() => {
    if (userLang.lang_image !== '' && userLang.lang_image !== null) {
      setDynamicLogo(userLang.lang_image);
    }
    // BUILD-1
    // else {
    //   setDynamicLogo(dynamicLogo);
    // }
  }, [userLang]);
  const [homeTabSelected, sethomeTabSelected] = useState(false);
  const [tvShowsTabSelected, setTvShowsTabSelected] = useState(false);
  const [moviesTabSelected, setMoviesTabSelected] = useState(false);
  const [myBBTabSelected, setMyBBTabSelected] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const labelData = useSelector(lables.getCatagoryMasterState);
  const labelDetails = labelData?.data;
  // const [isMaxScroll, setIsMaxScroll] = useState(false);

  const notificationsCountState = useSelector(
    notificationsCountSelectors.getNotificationsCountState
  );
  const totalNotifications =
    notificationsCountState.data && notificationsCountState.data[0].count;

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.onscroll = () => {
  //       const currentScrollPos = window.pageYOffset;
  //       const maxScroll = document.body.scrollHeight - window.innerHeight;
  //       if (currentScrollPos === maxScroll) {
  //         setIsMaxScroll(true);
  //       } else {
  //         setIsMaxScroll(false);
  //       }
  //     };
  //   }
  // }, []);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMount(() => {
    if (userStoreState?.data?.IsverifiedOTP === 'Y') {
      if (getItem('selectedKid')) {
        const kid = getItem('selectedKid');
        setHeaderPic(kid?.avatarimages);
      }
      setIslogin(true);
      const user = userStoreState.data.userid;

      if (user) {
        const params2 = {
          user,
          kidid: user.selectedKidid || '',
          device_id: '',
        };
        dispatch(notificationsCount(params2));
      }
    }
  });

  const urlPathName = history.location.pathname;
  useEffect(() => {
    if (
      urlPathName.includes(ROUTER_URL_CONSTANT.HOME) ||
      urlPathName.includes(ROUTER_URL_CONSTANT.LANGUAGE_SELECTION)
    ) {
      sethomeTabSelected(true);
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.TV_SHOWS)) {
      setTvShowsTabSelected(true);
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.MOVIES)) {
      setMoviesTabSelected(true);
    } else if (urlPathName.includes(ROUTER_URL_CONSTANT.MY_BB)) {
      setMyBBTabSelected(true);
    }
  }, [urlPathName]);

  const handleHeaderTabs = (selectedTab) => {
    if (selectedTab === 'HOME') {
      history.push(ROUTER_URL_CONSTANT.HOME);
    } else if (selectedTab === 'SHOWS') {
      history.push(ROUTER_URL_CONSTANT.TV_SHOWS);
    } else if (selectedTab === 'MOVIES') {
      history.push(ROUTER_URL_CONSTANT.MOVIES);
    } else if (selectedTab === 'ABOUT') {
      history.push(ROUTER_URL_CONSTANT.ABOUT_US);
    }else if(selectedTab === 'ABOUT1'){
      history.push(ROUTER_URL_CONSTANT.GOOGLE);
    }
  };

  const handleSearch = () => {
    setShowSearchModal(true);
  };

  const handleLogoClick = () => {
    history.push(ROUTER_URL_CONSTANT.HOME);
  };

  const handleLoginClick = () => {
    history.push(ROUTER_URL_CONSTANT.LOGIN);
  };

  const handleNotificationClick = () => {
    history.push(ROUTER_URL_CONSTANT.HOME_NOTIFICATIONS);
  };

  const handleAvatarClick = () => {
    history.push(ROUTER_URL_CONSTANT.MENU);
  };
  const gotoLanguagePage = () => {
    history.push(ROUTER_URL_CONSTANT.LANGUAGE_SELECTION);
  };

  return (
    <div className="header-container">
      <div className="header-container-web">
        <img src={HiImgNew} className="Hi-img" alt="Hi Icon" />
        <Row>
          <Col className="col-8 offset-2 text-center">
            <Nav as="ul" role="menu">
              <Nav.Item
                as="li"
                className={
                  tvShowsTabSelected ? 'active miniScreens' : 'miniScreens'
                }
              >
                <Nav.Link onClick={() => handleHeaderTabs('SHOWS')}>
                  <img src={newHomePageHTvShows} alt="TVShowsIcon" />
                  <span>
                    {labelDetails?.group_details?.[0]?.group_catg_name}
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                as="li"
                className={
                  moviesTabSelected ? 'active miniScreens' : 'miniScreens'
                }
              >
                <Nav.Link onClick={() => handleHeaderTabs('MOVIES')}>
                  <img src={newHomePageMovies} alt="MoviesIcon" />
                  <span>
                    {labelDetails?.group_details?.[1]?.group_catg_name}
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                as="li"
                className={`logo ${
                  homeTabSelected ? 'active miniScreens' : 'miniScreens '
                }`}
              >
                <Nav.Link>
                  <img
                    className="webLogo"
                    src={dynamicLogo}
                    alt="AppLogo"
                    onClick={handleLogoClick}
                    aria-hidden="true"
                  />
                  <div
                    aria-hidden="true"
                    onClick={gotoLanguagePage}
                    className="active-redirect-btn"
                  >
                    &nbsp;
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="miniScreens">
                <Nav.Link onClick={handleSearch}>
                  <img src={newHomePageSearch} alt="SearchIcon" />
                  <span>{labelDetails?.label_details[0]?.Search}</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                as="li"
                className={
                  myBBTabSelected ? 'active miniScreens' : 'miniScreens'
                }
              >
                <Nav.Link onClick={() => handleHeaderTabs('ABOUT')}>
                  <img src={aboutActive} alt="About Us" />
                  <span>{labelDetails?.label_details[0]?.Aboutus}</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                as="li"
                className={
                  myBBTabSelected ? 'active miniScreens' : 'miniScreens'
                }
              >
                <Nav.Link onClick={() => handleHeaderTabs('ABOUT1')}>
                  <img src={aboutActive} alt="About Us" />
                  <span>{labelDetails?.label_details[0]?.Google}</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="col-2 d-flex align-items-center justify-content-center">
            {isLogin ? (
              <div className="Login-btn">
                <div
                  className="notification mr-3"
                  role="button"
                  tabIndex={0}
                  onClick={handleNotificationClick}
                  onKeyPress={handleNotificationClick}
                >
                  <img src={notificationBellWhite} alt="notificationBellIcon" />
                  <span>{totalNotifications}</span>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onKeyPress={() => {}}
                  onClick={handleAvatarClick}
                >
                  <img
                    src={headerPic}
                    alt="Avatar Icon"
                    className="profile-pic"
                  />
                </div>
              </div>
            ) : (
              <Button
                className="btn-pink"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={handleLoginClick}
              >
                {t('login:login')}
              </Button>
            )}
          </Col>
        </Row>
      </div>
      <Row className="no-gutters">
        <Col className="col-6 responsiveLogoContent">
          <div
            className="logo-mobile d-block d-lg-none "
            aria-hidden="true"
            onClick={gotoLanguagePage}
          >
            <div className="logoBackground">
              <img
                src={dynamicLogo}
                alt="Etv"
                className="responsivelogo logoBackground"
              />
            </div>
          </div>
        </Col>
        <Col className="col-6 mobileTopSection">
          {isLogin ? (
            <div className="Login-btn">
              <div
                className="notification mr-3"
                role="button"
                tabIndex={0}
                onClick={handleNotificationClick}
                onKeyPress={handleNotificationClick}
              >
                <img src={notificationBellWhite} alt="notificationBellIcon" />
                <span className="notificationcount">{totalNotifications}</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={handleAvatarClick}
              >
                <img
                  src={headerPic}
                  alt="Avatar Icon"
                  className="profile-pic dynamicUserPic"
                />
              </div>
            </div>
          ) : (
            <Button
              className="btn-pink onHeader"
              tabIndex={0}
              onKeyPress={() => {}}
              onClick={handleLoginClick}
            >
              {t('login:login')}
            </Button>
          )}
        </Col>
      </Row>
      <Row className="no-gutters">
        <Col className="bottomHeader">
          <Nav as="ul" role="menu" className="subMenu">
            <Nav.Item as="li" className={homeTabSelected ? 'active' : ''}>
              <Nav.Link onClick={handleLogoClick}>
                <img src={ResponsiveHomeIcon} alt="" />
                <span> {labelDetails?.label_details[0]?.Home}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className={tvShowsTabSelected ? 'active' : ''}>
              <Nav.Link onClick={() => handleHeaderTabs('SHOWS')}>
                <img src={ResponsiveTvIcon} alt="" />
                <span>{labelDetails?.group_details?.[0]?.group_catg_name}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className={moviesTabSelected ? 'active' : ''}>
              <Nav.Link onClick={() => handleHeaderTabs('MOVIES')}>
                <img src={ResponsiveMoveIcon} alt="" />
                <span>{labelDetails?.group_details?.[1]?.group_catg_name}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="">
              <Nav.Link onClick={handleSearch}>
                <img src={ResponsiveSearchIcon} alt="" />
                <span>{labelDetails?.label_details[0]?.Search}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="aboutUs">
              <Nav.Link onClick={() => handleHeaderTabs('ABOUT')}>
                <img src={aboutInActive} alt="" />
                <span>{labelDetails?.label_details[0]?.Aboutus}</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      {showSearchModal && (
        <Search
          show={showSearchModal}
          onHide={() => setShowSearchModal(false)}
        />
      )}
    </div>
  );
};
