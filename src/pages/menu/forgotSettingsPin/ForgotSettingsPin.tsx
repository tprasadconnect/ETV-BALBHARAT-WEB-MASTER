import React, { useEffect, useState } from 'react';
import { Col, Row, Image, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { backIcon } from '../../../constants/iconImageConstant';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { Loader } from '../../../components/Loader';
import { setResendOtp } from '../../../services/setResendOtp/setResendOtp';
import { selectors as setResendOtpSelectors } from '../../../store/setResendOtp';
import { timeFormat } from '../../../utils/commonFunctions';
import { verifyOtp } from '../../../services/verifyOtp/verifyOtp';
import {
  actionTypes as changePinActionTypes,
  selectors as changePinSelectors,
} from '../../../store/changePin';
import {
  actionTypes as veifyOtpActionTypes,
  selectors as verifyotpSelectors,
} from '../../../store/verifyOtp';
import { Toaster } from '../../../components/Toaster';
import { changePin } from '../../../services/changePin/changePin';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import { selectors as parentProfileSelectors } from '../../../store/parentProfile';

export function ForgotSettingsPin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu', 'login']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const parentMobileNo = userStoreState.data && userStoreState.data.mobileno;

  const setResendOtpState = useSelector(
    setResendOtpSelectors.getSetResendOtpState
  );
  const verifyOtpState = useSelector(verifyotpSelectors.getVerifyOtpState);
  const changePinState = useSelector(changePinSelectors.getChangePinState);

  const [showLoader, setShowLoader] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);
  const [expireTime, setExpireTime] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });
  const [isVerifyOtp, setIsVerfyOtp] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isPinError, setIsPinError] = useState(false);
  const [pinFromPp, setPinFromPp] = useState('');

  const useEffectOnMountSendOtp = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMountSendOtp(() => {
    const params = {
      userid,
      mobileno: parentMobileNo,
    };
    dispatch(setResendOtp(params));
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [setResendOtpState]);
  };
  useEffectOnMount(() => {
    if (setResendOtpState.data) {
      setShowOtpBox(true);
      setOtp('');
      setIsError(false);
      setSeconds(setResendOtpState.data.ExpiryTime);
    }
    setShowLoader(setResendOtpState.loader);
  });

  const handleOtpChange = (e: any) => {
    setOtp(e);
    if (e.toString().length === 4) {
      setIsError(false);
    }
  };

  useEffect(() => {
    let timer;
    if (showOtpBox && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpBox, seconds]);

  useEffect(() => {
    setExpireTime(timeFormat(seconds));
  }, [seconds]);

  const handleVerifyOtp = () => {
    if (otp.toString().length !== 4) {
      setIsError(true);
    } else {
      dispatch({
        type: veifyOtpActionTypes.VERIFY_OTP_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: veifyOtpActionTypes.VERIFY_OTP_FAILURE_ACTION,
        payload: { error: null },
      });
      const params = { otp, userid };
      dispatch(verifyOtp(params));
    }
  };
  const useEffectOnMountVerifyOtp = (effect: React.EffectCallback) => {
    React.useEffect(effect, [verifyOtpState]);
  };
  useEffectOnMountVerifyOtp(() => {
    if (verifyOtpState.data) {
      setOtp('');
      setIsVerfyOtp(true);
      dispatch({
        type: veifyOtpActionTypes.VERIFY_OTP_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: veifyOtpActionTypes.VERIFY_OTP_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    if (verifyOtpState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: verifyOtpState.error.errorDescription,
      });
    }
    setShowLoader(verifyOtpState.loader);
  });

  const resendOtp = () => {
    dispatch({
      type: veifyOtpActionTypes.VERIFY_OTP_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: veifyOtpActionTypes.VERIFY_OTP_FAILURE_ACTION,
      payload: { error: null },
    });
    const params = {
      userid,
      mobileno: parentMobileNo,
    };
    dispatch(setResendOtp(params));
  };

  const handlePinChange = (e: any) => {
    setNewPin(e);
    if (e.toString().length === 4) {
      setIsPinError(false);
    }
  };

  const handleSetPin = () => {
    if (newPin.toString().length !== 4) {
      setIsPinError(true);
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
                  {!isVerifyOtp ? t('menu:forgotPin') : t('menu:newPin')}
                </Col>
              </Row>

              <Row className="pt-3 pl-sm-3">
                <Col md={6} sm={6} className="">
                  {!isVerifyOtp && (
                    <>
                      <div className="enterPin__subText">
                        {t('common:parentsOnly')}
                      </div>
                      <div className="enterPin__subTextDescription pt-1">
                        {t('menu:sentOtpToMobile')}
                      </div>
                      <div className="pt-2 createPin__subTitleText">
                        {t('menu:resendotpl2')}
                        <button
                          type="button"
                          className="forgotpwd__otp-resend"
                          onClick={resendOtp}
                        >
                          {t('menu:resendnow')}
                        </button>
                      </div>
                    </>
                  )}
                  {isVerifyOtp && (
                    <>
                      <div className="enterPin__subTextDescription pt-1">
                        {t('menu:setPinToAccess')}
                      </div>
                    </>
                  )}
                </Col>
                <Col md={6} sm={6} className="pt-3">
                  <Row className="pt-2">
                    <Col md={12}>
                      <Form.Group className="otp">
                        {!isVerifyOtp && (
                          <>
                            <Form.Label>
                              otp <span>*</span>
                            </Form.Label>
                            <div className="">
                              <div className="forgotpwd__otp-box">
                                <div className="forgotpwd__otp-box__opt-input">
                                  <OtpInput
                                    hasErrored
                                    value={otp}
                                    errorStyle={isError ? 'isInvalid' : ''}
                                    isInputNum
                                    onChange={handleOtpChange}
                                    numInputs={4}
                                    separator={<span> </span>}
                                  />
                                  {isError ? (
                                    <div className="forgotpwd__otp-box__otp-error-msg">
                                      {t('menu:entervalidpin')}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="p-b-20 forgotpwd__otp-timer d-none d-lg-flex">
                                  {expireTime}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {isVerifyOtp && (
                          <>
                            <div className="">
                              <div className="forgotpwd__otp-box">
                                <div className="forgotpwd__otp-box__opt-input">
                                  <OtpInput
                                    hasErrored
                                    value={newPin}
                                    errorStyle={isPinError ? 'isInvalid' : ''}
                                    isInputNum
                                    onChange={handlePinChange}
                                    numInputs={4}
                                    separator={<span> </span>}
                                  />
                                  {isPinError ? (
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
                      {!isVerifyOtp && (
                        <Button
                          className="btn-pink float-right"
                          type="button"
                          onClick={handleVerifyOtp}
                        >
                          {t('menu:verify')}
                        </Button>
                      )}
                      {isVerifyOtp && (
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
