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
  actionTypes as veifyOtpActionTypes,
  selectors as verifyotpSelectors,
} from '../../../store/verifyOtp';
import { Toaster } from '../../../components/Toaster';
import { setPin } from '../../../services/setPin/setPin';
import { selectors as setPinSelectors } from '../../../store/setPin';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import { selectors as parentProfileSelectors } from '../../../store/parentProfile';

export function CreatePin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu', 'login']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;

  const setResendOtpState = useSelector(
    setResendOtpSelectors.getSetResendOtpState
  );
  const verifyOtpState = useSelector(verifyotpSelectors.getVerifyOtpState);
  const setPinState = useSelector(setPinSelectors.getSetPinState);

  const [showLoader, setShowLoader] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);
  const [expireTime, setExpireTime] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [createPin, setCreatePin] = useState('');
  const [isPinError, setIsPinError] = useState(false);
  const [parentMobileNo, setParentMobileNo] = useState('');

  const useEffectOnMountCallParentProfile = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMountCallParentProfile(() => {
    if (userStoreState.data) {
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
    setShowLoader(userStoreState.loader);
  });

  const parentProfileState = useSelector(
    parentProfileSelectors.getParentProfileState
  );
  useEffect(() => {
    if (parentProfileState.data) {
      setParentMobileNo(parentProfileState.data.contactno);
    }
    setShowLoader(parentProfileState.loader);
  }, [parentProfileState]);

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

  const handleSendOtp = () => {
    const params = {
      userid,
      mobileno: parentMobileNo,
    };
    dispatch(setResendOtp(params));
  };

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
      // history.push(ROUTER_URL_CONSTANT.NEW_PASSWORD);
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'success',
        description: 'Otp verified',
      });
      setIsOtpVerified(true);
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
    handleSendOtp();
  };

  const handlePinChange = (e: any) => {
    setCreatePin(e);
    if (e.toString().length === 4) {
      setIsPinError(false);
    }
  };

  const handleSubmitPin = () => {
    if (createPin.toString().length !== 4) {
      setIsPinError(true);
    } else {
      const params = { pin: createPin, userid };
      dispatch(setPin(params));
    }
  };

  const useEffectOnMountSetPin = (effect: React.EffectCallback) => {
    React.useEffect(effect, [setPinState]);
  };
  useEffectOnMountSetPin(() => {
    if (setPinState.data) {
      setCreatePin('');
      history.push(ROUTER_URL_CONSTANT.ENTER_PIN);
    }
    if (setPinState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: setPinState.error.errorDescription,
      });
    }
    setShowLoader(setPinState.loader);
  });

  return (
    <div className="createPin main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={1} xs={6} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="createPin__container">
              <div className="createPin__back-btn pl-sm-3 pb-3">
                <div>
                  <Image alt="" src={backIcon} />
                </div>
                <Link to={ROUTER_URL_CONSTANT.MENU}>
                  <span className=" createPin__back-btn__back-text ">
                    {t('common:back')}
                  </span>
                </Link>
              </div>
              <Form>
                <Row className="pt-3 pl-sm-3">
                  <Col md={6}>
                    <div className="createPin__heading">
                      {t('menu:createPin')}
                    </div>
                    {!isOtpVerified && (
                      <>
                        {!showOtpBox && (
                          <div className="pt-4 createPin__subTitleText">
                            {t('menu:verifyMobile')}
                          </div>
                        )}
                        {showOtpBox && (
                          <>
                            <div className="pt-4 createPin__subTitleText">
                              {t('menu:enterotptextl1')}
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
                      </>
                    )}
                    {isOtpVerified && (
                      <div className="pt-4 createPin__subTitleText">
                        {t('menu:setpintext1')}
                      </div>
                    )}
                  </Col>
                  <Col md={6}>
                    {!isOtpVerified && (
                      <>
                        <Form.Group>
                          <Form.Label>
                            {t('login:mobileNumber')}
                            <span>*</span>
                          </Form.Label>
                          <div className="mobile-prefix__mobilePrefix">+91</div>
                          <Form.Control
                            autoComplete="nope"
                            type="text"
                            name="contactno"
                            value={parentMobileNo}
                            readOnly
                            className="form-control mobile-prefix__pl-45"
                          />
                        </Form.Group>
                        {showOtpBox && (
                          <Form.Group className="otp">
                            <Form.Label>
                              otp <span>*</span>
                            </Form.Label>
                            <div className="">
                              <div className="forgotpwd__otp-box">
                                <div className="forgotpwd__otp-box__opt-input">
                                  <OtpInput
                                    hasErrored
                                    isInputNum
                                    value={otp}
                                    errorStyle={isError ? 'isInvalid' : ''}
                                    onChange={handleOtpChange}
                                    numInputs={4}
                                    separator={<span> </span>}
                                  />
                                  {isError ? (
                                    <div className="forgotpwd__otp-box__otp-error-msg">
                                      {t('common:entervalidotp')}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="p-b-20 forgotpwd__otp-timer d-none d-lg-flex">
                                  {expireTime}
                                </div>
                              </div>
                            </div>
                          </Form.Group>
                        )}
                      </>
                    )}
                    {isOtpVerified && (
                      <Form.Group className="otp">
                        <div className="">
                          <div className="forgotpwd__otp-box">
                            <div className="forgotpwd__otp-box__opt-input">
                              <OtpInput
                                hasErrored
                                isInputNum
                                value={createPin}
                                errorStyle={isPinError ? 'isInvalid' : ''}
                                onChange={handlePinChange}
                                numInputs={4}
                                separator={<span> </span>}
                              />
                              {isPinError ? (
                                <div className="forgotpwd__otp-box__otp-error-msg">
                                  {t('common:entervalidpin')}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </Form.Group>
                    )}
                    <Row className="pt-5">
                      <Col md={12}>
                        {!isOtpVerified && (
                          <>
                            {!showOtpBox && (
                              <Button
                                className="btn-pink"
                                type="button"
                                onClick={handleSendOtp}
                              >
                                {t('common:sendOTP')}
                              </Button>
                            )}
                            {showOtpBox && (
                              <Button
                                className="btn-pink"
                                type="button"
                                onClick={handleVerifyOtp}
                              >
                                {t('common:verify')}
                              </Button>
                            )}
                          </>
                        )}
                        {isOtpVerified && (
                          <Button
                            className="btn-pink"
                            type="button"
                            onClick={handleSubmitPin}
                          >
                            {t('common:done')}
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
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
