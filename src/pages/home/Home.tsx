import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  bbLogo,
  explore,
  background,
  languages,
  login,
  movies,
  myBBImgOne,
  myBBImgTwo,
  notification,
  search,
  shows,
  parentProfileSample,
  mobileHomeBackground,
  notificationBell,
} from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { ContinueWatching } from './ContinueWatching';
import { TvShows } from './TvShows';
import { Movies } from './Movies';
import { Footer } from '../appFooter/Footer';
import { MyBb } from './MyBB';
import { selectors } from '../../store/parentProfile';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { parentProfile } from '../../services/parentProfile/parentProfile';
import { trimName } from '../../utils/commonFunctions';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { Search } from '../search/Search';
import { notificationsCount } from '../../services/notificationsCount/notificationsCount';
import { selectors as notificationsCountSelectors } from '../../store/notificationsCount';

export function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['login', 'home']);

  const [parentName, setParentName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const notificationsCountState = useSelector(
    notificationsCountSelectors.getNotificationsCountState
  );
  const totalNotifications =
    notificationsCountState.data && notificationsCountState.data[0].count;

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMount(() => {
    if (userStoreState.data) {
      setIsLogin(true);
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
  });

  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMountCatgMaster(() => {
    const params = null;
    dispatch(categoryMaster(params));

    if (userid) {
      const params2 = {
        userid,
        kidid: kidid || '',
        device_id: '',
      };
      dispatch(notificationsCount(params2));
    }
  });

  const parentProfileState = useSelector(selectors.getParentProfileState);
  useEffect(() => {
    if (parentProfileState.data) {
      setParentName(`${parentProfileState.data.firstname}`);
    }
  }, [parentProfileState.data]);

  const loginLink = () => {
    history.push(ROUTER_URL_CONSTANT.LOGIN);
  };
  const moviesLink = () => {
    history.push(ROUTER_URL_CONSTANT.MOVIES);
  };
  const showsLink = () => {
    history.push(ROUTER_URL_CONSTANT.TV_SHOWS);
  };
  const notificationsLink = () => {
    if (userid) history.push(ROUTER_URL_CONSTANT.HOME_NOTIFICATIONS);
    else history.push(ROUTER_URL_CONSTANT.LOGIN);
  };
  const searchLink = () => {
    setShowSearchModal(true);
  };
  const languagesLink = () => {
    history.push(ROUTER_URL_CONSTANT.HOME_LANGUAGES);
  };
  const settingsLink = () => {
    history.push(ROUTER_URL_CONSTANT.MENU);
  };
  const scrollToViewAll = () => {
    const heightValue = document.getElementById('homeHeader')?.offsetHeight;
    window.scroll({ top: heightValue, behavior: 'smooth' });
  };
  const myBB = () => {
    history.push(ROUTER_URL_CONSTANT.MY_BB);
  };

  const onLoad = () => {
    setLoaded(true);
  };
  return (
    <>
      <div className="home">
        <div className="home__home-header" id="homeHeader">
          <div className="home__home-header__bg">
            <Image
              onLoad={onLoad}
              src={background}
              className="home__home-header__bg img-fluid d-none d-sm-block"
            />
            {loaded && (
              <Image
                src={mobileHomeBackground}
                className="home__home-header__bg img-fluid d-md-none"
              />
            )}
          </div>
          {loaded && (
            <>
              <div className="home__home-header__logo">
                <Image src={bbLogo} />
              </div>
              <div className="home__home-header__link1">
                <Image src={languages} />
                <span
                  title="Languages"
                  className="home__home-header__link1__Languages-link"
                  onClick={languagesLink}
                  aria-hidden="true"
                >
                  {t('home:languages')}
                </span>
              </div>
              <div className="home__home-header__link2">
                <Image src={search} />
                <span
                  title="Search"
                  className="home__home-header__link2__search-link"
                  onClick={searchLink}
                  aria-hidden="true"
                >
                  {t('home:search')}
                </span>
              </div>
              <div className="home__home-header__link3">
                {userid && totalNotifications !== 0 && (
                  <div className="home__home-header__notificationsCount">
                    <div className="home__home-header__notifications-left-arrow" />
                    <Container onClick={notificationsLink}>
                      <Row className="home__home-header__notificationsCount-row">
                        <Col xs={2} md={2}>
                          <Row className="home__home-header__notificationsCount-bell">
                            <div className="home__home-header__notificationsCount-bell-count">
                              {totalNotifications}
                            </div>
                            <Image src={notificationBell} />
                          </Row>
                        </Col>
                        <Col xs={10} md={10}>
                          <div className="home__home-header__notificationsCount-text">
                            {t('home:notificationcounttext')}
                          </div>
                          <div className="home__home-header__notificationsCount-view-now">
                            {t('viewnow')}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )}
                <Image src={notification} />
                <span
                  title="Notifications"
                  className="home__home-header__link3__notification-link"
                  onClick={notificationsLink}
                  aria-hidden="true"
                >
                  {t('home:notifications')}
                </span>
              </div>
              <div className="home__home-header__link4">
                {isLogin ? (
                  <div>
                    <div className="home__home-header__link4__profileText">
                      <div className="home__home-header__parent-name-container">
                        <span>Hi</span>
                        <span className="home__home-header__parent-name-container__parent-name">
                          {' '}
                          {trimName(parentName)}
                        </span>
                      </div>
                      <div>
                        <Image
                          className="home__home-header__link4__profilePic"
                          src={parentProfileSample}
                          onClick={settingsLink}
                          aria-hidden="true"
                        />
                      </div>
                    </div>{' '}
                  </div>
                ) : (
                  <span onClick={loginLink} aria-hidden="true">
                    <Image src={login} />
                    <span
                      title="Login"
                      className="home__home-header__link4__login-link"
                    >
                      {t('login:login')}
                    </span>
                  </span>
                )}
              </div>
              <div className="home__home-header__link5">
                <Image src={shows} />
                <span
                  onClick={showsLink}
                  title="Shows"
                  aria-hidden="true"
                  className="home__home-header__link5__shows-link"
                >
                  {t('home:shows')}
                </span>
              </div>
              <div className="home__home-header__link6">
                <Image src={movies} />
                <span
                  onClick={moviesLink}
                  aria-hidden="true"
                  title="Movies"
                  className="home__home-header__link6__movies-link"
                >
                  {t('home:movies')}
                </span>
              </div>
              <div className="home__home-header__mybb">
                <Image src={myBBImgOne} />
                <Image src={myBBImgTwo} />
                <div
                  onClick={myBB}
                  aria-hidden="true"
                  className="home__home-header__mybb__mybb-head"
                  title="My bb"
                >
                  {t('home:mybb')}
                </div>
                <div className="home__home-header__mybb__mybb-links">
                  <span
                    onClick={myBB}
                    aria-hidden="true"
                    className="home__home-header__mybb__mybb-links__ML1"
                  >
                    {t('home:events')}
                  </span>
                  <span
                    onClick={myBB}
                    aria-hidden="true"
                    className="home__home-header__mybb__mybb-links__ML2"
                  >
                    {t('home:merchandise')}
                  </span>
                  <span
                    onClick={myBB}
                    aria-hidden="true"
                    className="home__home-header__mybb__mybb-links__ML3"
                  >
                    {t('home:bDaySpecial')}
                  </span>
                  <span
                    onClick={myBB}
                    aria-hidden="true"
                    className="home__home-header__mybb__mybb-links__ML4"
                  >
                    {t('home:featuredPosts')}
                  </span>
                </div>
              </div>
              <div className="home__home-header__explore d-none d-sm-block">
                <span
                  className="home__home-header__explore__explore-text"
                  title="Explore"
                  onClick={scrollToViewAll}
                  aria-hidden="true"
                >
                  {t('home:explore')}
                </span>
                <br />
                <Image src={explore} />
              </div>
            </>
          )}
        </div>

        <div>
          {loaded && (
            <>
              {isLogin && <ContinueWatching />}
              <TvShows />
              <Movies />
              <MyBb />
              <Footer />
              {showSearchModal && (
                <Search
                  show={showSearchModal}
                  onHide={() => setShowSearchModal(false)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
