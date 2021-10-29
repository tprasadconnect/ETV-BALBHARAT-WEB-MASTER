import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image, Container } from 'react-bootstrap';
import {
  backIcon,
  historyIcon,
  parentAvatarIcon,
} from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import { selectors } from '../../../store/parentProfile';
import { actionTypes } from '../../../store/profileBuilder';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { Loader } from '../../../components/Loader';
import { trimName } from '../../../utils/commonFunctions';

export function Account() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);
  const [parentName, setParentName] = useState('');

  const parentProfileState = useSelector(selectors.getParentProfileState);
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

  useEffect(() => {
    if (parentProfileState.data) {
      setParentName(`${parentProfileState.data.firstname}`);
    }
    setShowLoader(parentProfileState.loader);
  }, [parentProfileState]);

  const handleParentEdit = () => {
    history.push(ROUTER_URL_CONSTANT.EDIT_ACCOUNT);
  };

  const handleKidEdit = (kidid: string) => {
    dispatch({
      type: actionTypes.SET_TAB_INDEX,
      payload: 1,
    });
    const kidsData = parentProfileState.data.kids_details.filter(
      (res) => res.kidid === kidid
    );
    dispatch({
      type: actionTypes.EDIT_PROFILE_BUILDER_DATA,
      payload: kidsData[0],
    });
    history.push(`${ROUTER_URL_CONSTANT.PROFILE_BUILDER}/kid/${kidid}`);
  };

  const getKidAge = (age) => {
    return new Date().getFullYear() - parseInt(age.split('-')[1], 10);
  };

  const addKid = () => {
    dispatch({
      type: actionTypes.ADD_NEW_PROFILE_BUILDER_DATA,
      payload: { data: {} },
    });
    dispatch({ type: actionTypes.SET_TAB_INDEX, payload: 1 });
    history.push(`${ROUTER_URL_CONSTANT.PROFILE_BUILDER}/addkid`);
  };

  const backBtn = () => {
    history.push(ROUTER_URL_CONSTANT.MENU);
  };
  const handleWatchHistory = () => {
    history.push(ROUTER_URL_CONSTANT.WATCH_HISTORY);
  };

  return (
    <>
      <div className="account">
        <div className="main-background">
          <div className="content-padding">
            <Row>
              <Col md={2} xs={6} className="d-none d-lg-block" />
              <Col md={8}>
                <div className="account__container">
                  <div className="account__acnt-header">
                    <div>
                      <div className="account__back-btn">
                        <div className="account__back-btn__content">
                          <div>
                            <Image src={backIcon} />
                          </div>
                          <button
                            type="button"
                            className="account__back-btn__back-text"
                            onClick={backBtn}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <div className="account__delete-account-text">
                      Delete Account
                    </div> */}
                  </div>
                  <div className="account__act-text">Account</div>
                  <div className="account__act-detail">
                    <div className="account__act-detail-left">
                      <Row>
                        <Col>
                          <div className="account__watch-history">
                            <Image
                              src={historyIcon}
                              className="account__history-icon"
                            />
                            <div
                              aria-hidden="true"
                              onClick={handleWatchHistory}
                              className="account__whistory-Subscription-text"
                            >
                              Watch history
                            </div>
                          </div>
                        </Col>
                        {/* <Col>
                          <div className="account__watch-history">
                            <Image
                              src={subscriptionIcon}
                              className="account__history-icon"
                            />
                            <div className="account__whistory-Subscription-text">
                              Manage Subscription
                            </div>
                          </div>
                        </Col> */}
                      </Row>
                      <Row>
                        <div className="your-avatar__avatar padding-35">
                          <div
                            className="avatar__big-avatar-90 active"
                            aria-label="Parent Avatar"
                          >
                            <Image
                              src={parentAvatarIcon}
                              className="avatar__big-avatar-90__img"
                            />
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <span className="account__parent-acnt-name">
                          {trimName(parentName)}
                        </span>
                      </Row>
                      <Row>
                        <Link
                          to={ROUTER_URL_CONSTANT.EDIT_ACCOUNT}
                          onClick={handleParentEdit}
                        >
                          <span className="account__change-password-link">
                            Edit
                          </span>
                        </Link>
                      </Row>
                    </div>
                    <div className="account__act-detail-right">
                      <Row className="d-flex justify-content-between  align-items-center">
                        <Col className="account__act-detail-right-top">
                          Profiles
                        </Col>
                        <Col
                          onClick={addKid}
                          className="account__act-detail-right-addkid"
                        >
                          +ADD NEW PROFILE
                        </Col>
                      </Row>
                      {/* <div className="pt-3" /> */}
                      <Container className="account__kids_profile_container">
                        <Row md={4} className="m-l-0">
                          {parentProfileState.data &&
                            parentProfileState.data.kids_details &&
                            parentProfileState.data.kids_details.map((kid) => (
                              <Col className="account__child-content">
                                <Row className="account__child-avatar">
                                  <div className="your-avatar__avatar  pb-0">
                                    <Image
                                      src={kid.avatarimages}
                                      className="your-avatar__avatar__avatar-image"
                                    />
                                  </div>
                                </Row>
                                <Row>
                                  <div>
                                    <div className="account__child-name-selected">
                                      {trimName(kid.kidfirstname)}
                                    </div>
                                    <div className="account__child-info">
                                      {kid.gender}
                                      <span className="account__child-info__age">
                                        {' '}
                                        .{' '}
                                      </span>
                                      {getKidAge(kid.month_year)} YRS
                                    </div>
                                    <div
                                      tabIndex={0}
                                      role="button"
                                      onKeyPress={() => {}}
                                      onClick={() => handleKidEdit(kid.kidid)}
                                    >
                                      <span className="account__child-edit">
                                        Edit
                                      </span>
                                    </div>
                                  </div>
                                </Row>
                              </Col>
                            ))}
                        </Row>
                      </Container>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {showLoader && <Loader />}
    </>
  );
}
