/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { logoImage, editProfileIcon } from '../../constants/iconImageConstant';
import { actionTypes, selectors } from '../../store/profileBuilder';
import { BasicDetails } from './BasicDetails';
import { YourAvatarStep } from './YourAvatar';
import { YourPreferencesStep } from './YourPreferences';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { selectors as parentProfileSelectors } from '../../store/parentProfile';
import { parentProfile } from '../../services/parentProfile/parentProfile';
import { Loader } from '../../components/Loader';

export function ProfileBuilder() {
  const history = useHistory();
  const { t } = useTranslation('kidProfile');

  const [showLoader, setShowLoader] = useState(false);

  // selector
  const activeTab = useSelector(selectors.getActiveTab);
  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const parentProfileState = useSelector(
    parentProfileSelectors.getParentProfileState
  );

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, [parentProfileState]);
  };
  useEffectOnMount(() => {
    setShowLoader(parentProfileState.loader);
  });

  const dispatch = useDispatch();

  const useEffectOnMountUserStore = (effect: React.EffectCallback) => {
    useEffect(effect, [userStoreState]);
  };
  useEffectOnMountUserStore(() => {
    if (userStoreState.data) {
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
    setShowLoader(userStoreState.loader);
  });

  const editProfile = (data) => {
    dispatch({
      type: actionTypes.SET_TAB_INDEX,
      payload: 1,
    });
    const kidsData = parentProfileState.data.kids_details.filter(
      (res) => res.kidid === data.kidid
    );
    dispatch({
      type: actionTypes.EDIT_PROFILE_BUILDER_DATA,
      payload: kidsData[0],
    });
  };

  return (
    <div className="profile-builder">
      <div className="main-background">
        <div className="content-padding">
          <Col md={1} xs={6} className="d-none d-lg-block">
            <div id="welcomeBanner">
              <div className="welcome-banner">
                <div className="welcome-banner__logo">
                  <Image src={logoImage} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </Col>
          <div className="row align-items-center">
            <Col md={1} xs={6} className="d-none d-lg-block" />
            <Col md={10}>
              <div className="row align-items-center">
                <Col md={6} xs={12}>
                  <div className="logo d-block d-lg-none">
                    <div id="welcomeBanner">
                      <div className="welcome-banner">
                        <div className="welcome-banner__logo">
                          <Image src={logoImage} className="cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="profile-builder__h2 title">
                    {t('profileBuilder')}
                  </h2>
                </Col>
                <Col md={6} className="text-right profile-builder__profile">
                  {!history.location.pathname.includes('kid') &&
                    parentProfileState.data &&
                    parentProfileState.data.kids_details &&
                    parentProfileState.data.kids_details.map((res) => (
                      <div key={res.id} className="profile-builder__e-profile">
                        <div className="avatar__big-avatar-60 cursor-pointer">
                          <div className="avatar__big-avatar-60__edit-icon">
                            <Image
                              onClick={() => editProfile(res)}
                              src={editProfileIcon}
                            />
                          </div>
                          <Image
                            src={res.avatarimages}
                            className="avatar__big-avatar-60__img"
                          />
                        </div>
                        <span className="ml-3">{res.kidfirstname}</span>
                      </div>
                    ))}
                </Col>
              </div>
            </Col>
            <Col md={1} />
          </div>
          <Row>
            <Col md={1} />
            <Col md={10}>
              <div className="profile-builder__P-content">
                <div className="profile-builder__steps">
                  <div
                    className={`profile-builder__steps__e-step ${
                      activeTab === 1 || activeTab === 2 || activeTab === 3
                        ? 'active'
                        : ''
                    }`}
                  >
                    <span className="profile-builder__steps__e-step__s-bg">
                      1
                    </span>
                    <span className="profile-builder__steps__text">
                      {t('basicDetails')}
                    </span>
                  </div>
                  <div
                    className={`profile-builder__steps__e-step ${
                      activeTab === 2 || activeTab === 3 ? 'active' : ''
                    }`}
                  >
                    <span className="profile-builder__steps__e-step__s-bg">
                      2
                    </span>
                    <span className="profile-builder__steps__text">
                      {t('yourAvatar')}
                    </span>
                  </div>
                  <div
                    className={`profile-builder__steps__e-step ${
                      activeTab === 3 ? 'active' : ''
                    }`}
                  >
                    <span className="profile-builder__steps__e-step__s-bg">
                      3
                    </span>
                    <span className="profile-builder__steps__text">
                      {t('yourPreferences')}
                    </span>
                  </div>
                </div>
                <div>
                  {activeTab === 1 && <BasicDetails />}
                  {activeTab === 2 && <YourAvatarStep />}
                  {activeTab === 3 && <YourPreferencesStep />}
                </div>
              </div>
            </Col>
            <Col md={1} />
          </Row>
        </div>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
