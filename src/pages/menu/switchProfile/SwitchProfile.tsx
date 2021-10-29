import React, { useState } from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  backIcon,
  addNew,
  selectPosterIcon,
} from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { selectors } from '../../../store/parentProfile';
import {
  actionTypes as userStoreActionTypes,
  selectors as userStoreSelectors,
} from '../../../store/userStore';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import { Loader } from '../../../components/Loader';
import { actionTypes } from '../../../store/profileBuilder';
import { actionTypes as continueWatchingActionTypes } from '../../../store/continueWatching';
import { actionTypes as watchHistoryActionTypes } from '../../../store/watchHistory';
import { actionTypes as favouriteActionTypes } from '../../../store/favourite';
import { setItem } from '../../../utils/storage';

export function SwitchProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu']);

  const [showLoader, setShowLoader] = useState(false);
  const [kidsList, setKidsList] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState('');

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const parentProfileState = useSelector(selectors.getParentProfileState);
  const [selectedKididFromStore, setSelectedKididFromStore] = useState('');

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMount(() => {
    if (userStoreState.data) {
      if (userStoreState.data.selectedKidid)
        setSelectedKididFromStore(userStoreState.data.selectedKidid);
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
    setShowLoader(userStoreState.loader);
  });

  const useEffectOnMountParent = (effect: React.EffectCallback) => {
    React.useEffect(effect, [parentProfileState]);
  };
  useEffectOnMountParent(() => {
    if (parentProfileState.data) {
      const kidsListArr =
        (parentProfileState?.data && parentProfileState?.data?.kids_details) ||
        [];
      if (kidsListArr.length > 0) {
        kidsListArr.forEach((kid) => {
          if (selectedKididFromStore) {
            if (selectedKididFromStore === kid.kidid) {
              Object.assign(kid, { isSelect: true });
            } else {
              Object.assign(kid, { isSelect: false });
            }
          } else {
            Object.assign(kid, { isSelect: false });
          }
        });
        setKidsList(kidsListArr);
      }
    }
    setShowLoader(parentProfileState.loader);
  });

  const handleKidSelected = (kidid) => {
    const kidsArr = [...kidsList];
    kidsArr.forEach((kid) => {
      if (kid.kidid === kidid) {
        Object.assign(kid, { isSelect: true });
        setItem('selectedKid', kid);
      } else {
        Object.assign(kid, { isSelect: false });
      }
    });
    setKidsList(kidsArr);
    setSelectedChild(kidid);
  };

  const handleKidSubmit = () => {
    dispatch({
      type: userStoreActionTypes.USER_STORE_SUCCESS_ACTION,
      payload: {
        data: Object.assign(userStoreState.data, {
          selectedKidid: selectedChild,
        }),
      },
    });
    localStorage.setItem(
      'userData',
      JSON.stringify(
        Object.assign(userStoreState.data, { selectedKidid: selectedChild })
      )
    );
    dispatch({
      type: continueWatchingActionTypes.CONTINUE_WATCHING_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: continueWatchingActionTypes.CONTINUE_WATCHING_FAILURE_ACTION,
      payload: { error: null },
    });
    dispatch({
      type: watchHistoryActionTypes.WATCH_HISTORY_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: watchHistoryActionTypes.WATCH_HISTORY_FAILURE_ACTION,
      payload: { error: null },
    });
    dispatch({
      type: favouriteActionTypes.FAVOURITE_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: favouriteActionTypes.FAVOURITE_FAILURE_ACTION,
      payload: { error: null },
    });

    history.push(ROUTER_URL_CONSTANT.MENU);
  };

  const addKid = () => {
    dispatch({
      type: actionTypes.ADD_NEW_PROFILE_BUILDER_DATA,
      payload: { data: {} },
    });
    dispatch({ type: actionTypes.SET_TAB_INDEX, payload: 1 });
    history.push({
      pathname: `${ROUTER_URL_CONSTANT.PROFILE_BUILDER}/addkid`,
      search: 'switchprofile',
    });
  };

  return (
    <div className="switchProfile main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={2} xs={6} className="d-none d-lg-block" />
          <Col md={8}>
            <div className="edit-account__container">
              <div className="edit-account__back-btn pl-sm-3 pb-3">
                <div>
                  <Image src={backIcon} />
                </div>
                <Link to={ROUTER_URL_CONSTANT.MENU}>
                  <span className="edit-account__back-btn__back-text">
                    {t('common:back')}
                  </span>
                </Link>
              </div>
              <Row>
                <Col md={3} sm={12} className="switchProfile__heading">
                  {t('menu:switchPro')}
                </Col>
              </Row>
              <Row className="pt-3 pl-sm-3 switchProfile__kidDetails-container">
                {kidsList &&
                  kidsList.map((child) => {
                    const {
                      kidid,
                      kidfirstname,
                      avatarimages,
                      isSelect,
                    } = child;
                    return (
                      <div className="col-md-3 col-sm-6" key={kidid}>
                        <div
                          className="your-avatar__avatar"
                          onClick={() => handleKidSelected(kidid)}
                          role="button"
                          tabIndex={0}
                          onKeyPress={() => {}}
                        >
                          <div
                            className={`avatar__big-avatar-90 ${
                              isSelect && 'switchProfile__isActive'
                            }`}
                            aria-label="Parent Avatar"
                          >
                            {isSelect && (
                              <span className="switchProfile__kidSelect">
                                <Image src={selectPosterIcon} />
                              </span>
                            )}
                            <Image
                              src={avatarimages}
                              className="avatar__big-avatar-90__img"
                            />
                          </div>
                          <div className="switchProfile__kid-name">
                            <span
                              className={`${
                                isSelect ? 'activeOne' : 'notActive'
                              }`}
                            >
                              {kidfirstname}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div className="col-md-3 col-sm-6">
                  <div className="your-avatar__avatar">
                    <div
                      className="avatar__big-avatar-90 cursor-pointer"
                      aria-label="Parent Avatar"
                      role="button"
                      onKeyPress={() => {}}
                      onClick={addKid}
                      tabIndex={0}
                    >
                      <Image
                        src={addNew}
                        className="switchProfile__add-profile-img"
                      />
                    </div>
                    <div className="switchProfile__kid-name">
                      <span>{t('menu:addNew')}</span>
                    </div>
                  </div>
                </div>
              </Row>

              <Row>
                <div className="col-md-12">
                  <Button
                    className="btn-pink float-right"
                    onClick={handleKidSubmit}
                  >
                    {t('common:select')}
                  </Button>
                </div>
              </Row>
            </div>
          </Col>
          <Col md={2} />
        </Row>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
