import React from 'react';
import { Button, Row, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoImage } from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { actionTypes, selectors } from '../../store/profileBuilder';

export function ProfileDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation('kidProfile');

  // selector
  const profileBuilderData = useSelector(selectors.getProfileBuilderData);
  const navigate = (page: any) => {
    dispatch({
      type: actionTypes.ADD_NEW_PROFILE_BUILDER_DATA,
      payload: { data: {} },
    });
    dispatch({ type: actionTypes.SET_TAB_INDEX, payload: 1 });
    history.push(page);
  };

  const goToMenu = () => {
    if (history.location.search)
      history.push(ROUTER_URL_CONSTANT.SWITCH_PROFIEL);
    else history.push(ROUTER_URL_CONSTANT.ACCOUNT);
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
            <Col md={2} />
            <Col md={8} />
            <Col md={2} />
          </div>
          <Row>
            <Col md={1} />
            <Col md={10}>
              <div className="profile-builder__pdetails text-center">
                <div className="profile-builder__profile-details__bg">
                  <div className="pt-5">
                    <div className="profile-builder__profile-details__title pt-5">
                      {t('excellent')}
                    </div>
                    <div className="profile-builder__profile-details__sub-title ">
                      {!history.location.pathname.includes('kid')
                        ? t('explore')
                        : t('updateProfile')}
                    </div>

                    <div className=" pt-4 ">
                      <div className="avatar__big-avatar-144 cursor-pointer active">
                        <Image
                          className="avatar__big-avatar-144__img"
                          src={profileBuilderData.editProfile?.avatarImageUrl}
                        />
                      </div>
                      <div className="avatar__big-avatar-144__name pt-2">
                        {profileBuilderData.editProfile?.kidfirstname}
                      </div>
                    </div>
                    {!(
                      history.location.pathname.includes('kid') ||
                      history.location.pathname.includes('addkid')
                    ) && (
                      <div className="d-flex justify-content-between  align-items-center pt-3">
                        <div
                          role="button"
                          tabIndex={0}
                          onKeyPress={() => {}}
                          onClick={() =>
                            navigate(ROUTER_URL_CONSTANT.PROFILE_BUILDER)
                          }
                          className="profile-builder__profile-details__add-profile order-2 order-md-1"
                        >
                          {t('addKid')}
                        </div>
                        <div className="text-right order-1 order-md-2">
                          {!history.location.pathname.includes('id') && (
                            <Button className="btn-pink">
                              <Link
                                to={ROUTER_URL_CONSTANT.HOME}
                                className="whiteText"
                              >
                                {t('letsgo')}
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    {(history.location.pathname.includes('kid') ||
                      history.location.pathname.includes('addkid')) && (
                      <div className="text-right">
                        <Button
                          className="btn-pink whiteText"
                          onClick={goToMenu}
                        >
                          {t('done')}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={1} />
          </Row>
        </div>
      </div>
    </div>
  );
}
