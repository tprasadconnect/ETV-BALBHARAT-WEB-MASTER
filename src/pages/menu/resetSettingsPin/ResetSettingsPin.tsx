import React, { useState } from 'react';
import { Col, Row, Image, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { backIcon } from '../../../constants/iconImageConstant';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { Loader } from '../../../components/Loader';
import {
  actionTypes as changePinActionTypes,
  selectors as changePinSelectors,
} from '../../../store/changePin';
import { Toaster } from '../../../components/Toaster';
import { changePin } from '../../../services/changePin/changePin';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import { selectors as parentProfileSelectors } from '../../../store/parentProfile';

export function ResetSettingsPin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu', 'login']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;

  const changePinState = useSelector(changePinSelectors.getChangePinState);

  const [showLoader, setShowLoader] = useState(false);
  const [isVerifyOlpPin, setIsVerifyOldPin] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [isOldPinError, setIsOldPinError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });
  const [newPin, setNewPin] = useState('');
  const [isNewPinError, setIsNewPinError] = useState(false);
  const [pinFromPp, setPinFromPp] = useState('');

  const useEffectOnMountUserData = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMountUserData(() => {
    if (userStoreState.data) {
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
    setShowLoader(userStoreState.loader);
  });
  const parentProfileState = useSelector(
    parentProfileSelectors.getParentProfileState
  );
  const useEffectOnMountPP = (effect: React.EffectCallback) => {
    React.useEffect(effect, [parentProfileState]);
  };
  useEffectOnMountPP(() => {
    if (parentProfileState.data) {
      setPinFromPp(parentProfileState.data.pin);
    }
    setShowLoader(parentProfileState.loader);
  });

  const handleOldPinChange = (e: any) => {
    setOldPin(e);
    if (e.toString().length === 4) {
      setIsOldPinError(false);
    }
  };

  const handleVerifyOldPin = () => {
    if (oldPin.toString().length !== 4) {
      setIsOldPinError(true);
    } else if (parseInt(oldPin, 10) === parseInt(pinFromPp, 10)) {
      setIsVerifyOldPin(true);
    } else {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: 'PIN not match',
      });
    }
  };

  const handleNewPinChange = (e: any) => {
    setNewPin(e);
    if (e.toString().length === 4) {
      setIsNewPinError(false);
    }
  };

  const handleSetPin = () => {
    if (newPin.toString().length !== 4) {
      setIsNewPinError(true);
    } else {
      const params = { newpin: newPin, oldpin: pinFromPp, userid };
      dispatch(changePin(params));
    }
  };

  const useEffectOnMountSetPin = (effect: React.EffectCallback) => {
    React.useEffect(effect, [changePinState]);
  };
  useEffectOnMountSetPin(() => {
    if (changePinState.data) {
      dispatch({
        type: changePinActionTypes.CHANGE_PIN_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: changePinActionTypes.CHANGE_PIN_FAILURE_ACTION,
        payload: { error: null },
      });

      setNewPin('');
      history.push(ROUTER_URL_CONSTANT.ENTER_PIN);
    }
    if (changePinState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: changePinState.error.errorDescription,
      });
    }
    setShowLoader(changePinState.loader);
  });

  return (
    <div className="enterPin main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={1} xs={6} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="enterPin__container">
              <div className="enterPin__back-btn pl-sm-3 pb-3">
                <div>
                  <Image alt="back button" src={backIcon} />
                </div>
                <Link to={ROUTER_URL_CONSTANT.ENTER_PIN}>
                  <span className="enterPin__back-btn__back-text">
                    {t('common:back')}
                  </span>
                </Link>
              </div>
              <Row className="pt-3 pl-sm-3">
                <Col md={12} sm={12} className="enterPin__heading">
                  {t('menu:resetPin')}
                </Col>
              </Row>

              <Row className="pt-3 pl-sm-3">
                <Col md={6} sm={6} className="">
                  <div className="enterPin__subText">
                    {t('common:parentsOnly')}
                  </div>
                  {!isVerifyOlpPin && (
                    <div className="enterPin__subTextDescription pt-1">
                      {t('menu:enterCurrentPin')}
                    </div>
                  )}
                  {isVerifyOlpPin && (
                    <div className="enterPin__subTextDescription pt-1">
                      {t('menu:setNewPinToAccess')}
                    </div>
                  )}
                </Col>
                <Col md={6} sm={6} className="">
                  <Row className="">
                    <Col md={12}>
                      <Form.Group className="otp">
                        {!isVerifyOlpPin && (
                          <>
                            <Form.Label>
                              {t('menu:enterCurrentPin')} <span>*</span>
                            </Form.Label>
                            <div className="">
                              <div className="forgotpwd__otp-box">
                                <div className="forgotpwd__otp-box__opt-input">
                                  <OtpInput
                                    hasErrored
                                    value={oldPin}
                                    errorStyle={
                                      isOldPinError ? 'isInvalid' : ''
                                    }
                                    isInputNum
                                    onChange={handleOldPinChange}
                                    numInputs={4}
                                    separator={<span> </span>}
                                  />
                                  {isOldPinError ? (
                                    <div className="forgotpwd__otp-box__otp-error-msg">
                                      {t('menu:entervalidpin')}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {isVerifyOlpPin && (
                          <>
                            <Form.Label>
                              {t('menu:enterNewPin')} <span>*</span>
                            </Form.Label>
                            <div className="">
                              <div className="forgotpwd__otp-box">
                                <div className="forgotpwd__otp-box__opt-input">
                                  <OtpInput
                                    hasErrored
                                    value={newPin}
                                    errorStyle={
                                      isNewPinError ? 'isInvalid' : ''
                                    }
                                    isInputNum
                                    onChange={handleNewPinChange}
                                    numInputs={4}
                                    separator={<span> </span>}
                                  />
                                  {isNewPinError ? (
                                    <div className="forgotpwd__otp-box__otp-error-msg">
                                      {t('menu:entervalidpin')}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={9} className="pt-3 ">
                      {!isVerifyOlpPin && (
                        <Button
                          className="btn-pink float-right"
                          type="button"
                          onClick={handleVerifyOldPin}
                        >
                          {t('menu:next')}
                        </Button>
                      )}
                      {isVerifyOlpPin && (
                        <Button
                          className="btn-pink float-right"
                          type="button"
                          onClick={handleSetPin}
                        >
                          {t('common:done')}
                        </Button>
                      )}
                    </Col>
                    <Col md={3}> </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={1} />
        </Row>
      </div>
      <Toaster
        show={showToast}
        toastInfo={toastInfo}
        handleCloseToast={() => setShowToast(false)}
      />
      {showLoader && <Loader />}
    </div>
  );
}
