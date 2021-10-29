import React, { useEffect, useState } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ModalWindow } from '../../components/ModalWindow';
import {
  closeIcon,
  switchProfileIcon,
  myFavouritesIcon,
  preferencesIcon,
  logOutIcon,
  accountIcon,
  feedbackIcon,
  SupportIcon,
  languageIcon,
  settingsIcon,
  parentBigAvatarIcon,
} from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { RESET_STORE_ACTION } from '../../store/resetStore/actionTypes';
import { parentProfile } from '../../services/parentProfile/parentProfile';
import { selectors } from '../../store/parentProfile';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { Loader } from '../../components/Loader';
import { getItem, setItem } from '../../utils/storage';

export function Menu() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [parentName, setParentName] = useState('');
  const [isPinSet, checkIsPinSet] = useState(false);
  const [kidPic, setKidPic] = useState(parentBigAvatarIcon);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMount(() => {
    if (userStoreState.data) {
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
    setShowLoader(userStoreState.loader);
  });

  const parentProfileState = useSelector(selectors.getParentProfileState);
  useEffect(() => {
    if (parentProfileState.data) {
      checkIsPinSet(parentProfileState.data.setin);
      // setParentName(parentProfileState.data.firstname);
      if (getItem('selectedKid')) {
        const kidData = getItem('selectedKid');
        setParentName(kidData.kidfirstname);
        setKidPic(kidData.avatarimages);
      } else if (parentProfileState?.data?.kids_details?.[0]) {
        setItem('selectedKid', parentProfileState?.data?.kids_details?.[0]);
        setParentName(
          parentProfileState?.data?.kids_details?.[0]?.kidfirstname
        );
        setKidPic(parentProfileState?.data?.kids_details?.[0]?.avatarimages);
      } else {
        setParentName(parentProfileState.data.firstname);
      }
    }
    setShowLoader(parentProfileState.loader);
  }, [parentProfileState]);

  const settingsList = [
    { name: 'Account', icon: accountIcon, route: ROUTER_URL_CONSTANT.ACCOUNT },
    {
      name: 'Language',
      icon: languageIcon,
      route: ROUTER_URL_CONSTANT.MENU_LANGUAGES,
    },
    {
      name: 'Settings',
      icon: settingsIcon,
      route: [
        { type: ROUTER_URL_CONSTANT.ENTER_PIN },
        { type: ROUTER_URL_CONSTANT.CREATE_PIN },
      ],
    },
    {
      name: 'Help and Support',
      icon: SupportIcon,
      route: ROUTER_URL_CONSTANT.HELP_AND_SUPPORT,
    },
    {
      name: 'Feedback',
      icon: feedbackIcon,
      route: ROUTER_URL_CONSTANT.FEEDBACK,
    },
  ];

  const handleCardClick = (value: any) => {
    if (value.name === 'Account') history.push(value.route);
    else if (value.name === 'Language') history.push(value.route);
    else if (value.name === 'Settings') {
      if (isPinSet) history.push(value.route[0].type);
      else history.push(value.route[1].type);
    } else if (value.name === 'Help and Support') history.push(value.route);
    else if (value.name === 'Feedback') history.push(value.route);
  };

  const handleConfirmSignOut = () => {
    // localStorage.clear();
    if (localStorage.getItem('userData') != null) {
      localStorage.removeItem('userData');
      localStorage.removeItem('selectedKid');
    }
    dispatch({
      type: RESET_STORE_ACTION,
    });
    history.push(ROUTER_URL_CONSTANT.HOME);
    window.location.reload();
  };
  const handleFavourites = () => {
    history.push(ROUTER_URL_CONSTANT.My_FAVOURITES);
  };
  const handleNotification = () => {
    history.push(ROUTER_URL_CONSTANT.NOTIFICATIONS);
  };
  const handleSwitchProfile = () => {
    history.push(ROUTER_URL_CONSTANT.SWITCH_PROFIEL);
  };

  return (
    <>
      <div className="menu main-background content-padding d-flex align-items-center">
        <div className=" w-100">
          <Row>
            <Col md={1} xs={6} className="d-none d-lg-block" />
            <Col md={10}>
              <div className="menu__container">
                <Row>
                  <Col
                    md={10}
                    className="order-2 order-md-1  your-avatar d-flex "
                  >
                    <div className="avatar__big-avatar-144">
                      <Image
                        src={kidPic}
                        className="avatar__big-avatar__img menuAvatar"
                      />
                    </div>
                    <div className="pl-3">
                      <div className="menu__avatar__name">{parentName}</div>
                      <div className="d-flex py-2">
                        <div>
                          <Image src={myFavouritesIcon} />
                        </div>
                        <div
                          aria-hidden="true"
                          className="pl-2 menu__settings-option"
                          onClick={handleFavourites}
                        >
                          My Favourites
                        </div>
                      </div>
                      <div className="d-flex py-2">
                        <div>
                          <Image src={switchProfileIcon} />
                        </div>
                        <div
                          aria-hidden="true"
                          className="pl-2 menu__settings-option"
                          onClick={handleSwitchProfile}
                        >
                          Switch Profile
                        </div>
                      </div>
                      <div className="d-flex py-2">
                        <div>
                          <Image src={preferencesIcon} />
                        </div>
                        <div
                          aria-hidden="true"
                          className="pl-2 menu__settings-option"
                          onClick={handleNotification}
                        >
                          Notifications
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col
                    md={2}
                    className="col-md-1 order-1 order-md-2  text-right"
                  >
                    <Link to={ROUTER_URL_CONSTANT.HOME}>
                      <Image src={closeIcon} />
                    </Link>
                  </Col>
                </Row>

                <div className="py-3 m-l-9">
                  <Row>
                    {settingsList.map((res: any) => {
                      return (
                        <Col
                          md={2}
                          xs={6}
                          className="px-2 py-2 menu__card-block"
                        >
                          <div
                            onClick={() => handleCardClick(res)}
                            onKeyPress={() => {}}
                            role="button"
                            tabIndex={0}
                            className="py-4 text-center menu__card"
                          >
                            <div>
                              <Image
                                src={res.icon}
                                className="menu__menu__icon"
                              />
                            </div>
                            <div className="pt-3 menu__card__name">
                              {res.name}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
                <div className="p-2 d-flex justify-content-end align-items-center">
                  <div>
                    <Image src={logOutIcon} />
                  </div>
                  <div
                    className="pl-2 menu__settings-option"
                    tabIndex={0}
                    onKeyPress={() => {}}
                    role="button"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Sign Out
                  </div>
                </div>
              </div>
            </Col>
            <Col md={1} xs={6} className="d-none d-lg-block" />
          </Row>
        </div>
      </div>
      <ModalWindow
        show={showModal}
        onHide={() => setShowModal(false)}
        handleSubmit={handleConfirmSignOut}
        modalTitle="Sign Out"
        modalDescription="Are you sure want to sign out?
          Hope to see you again soon :)"
      />
      {showLoader && <Loader />}
    </>
  );
}
