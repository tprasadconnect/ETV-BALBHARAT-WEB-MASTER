import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Image, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import OtpInput from 'react-otp-input';
import {
  logoboxImage,
  successMessageIcon,
} from '../../constants/iconImageConstant';
import {
  numberOnly,
  checkError,
  getErrorMessage,
  timeFormat,
} from '../../utils/commonFunctions';
import { verifyOtp } from '../../services/verifyOtp/verifyOtp';
import { setResendOtp } from '../../services/setResendOtp/setResendOtp';
import { parentProfile } from '../../services/parentProfile/parentProfile';
import { mobileUpdate } from '../../services/mobileUpdate/mobileUpdate';
import { selectors as parentProfileSelectors } from '../../store/parentProfile';
import {
  actionTypes as verifyOtpActionTypes,
  selectors as verifySelectors,
} from '../../store/verifyOtp';
import { selectors as registerSelectors } from '../../store/register';
import { selectors as loginSelectors } from '../../store/login';
import { selectors as resendOtpSelectors } from '../../store/setResendOtp';
import {
  actionTypes,
  selectors as updateMobileSelectors,
} from '../../store/mobileUpdate';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { WelcomeBanner } from '../../components/WelcomeBanner';
import { registerUpdateMobileSchema } from './validation';
import {
  selectors as userStoreSelectors,
  actionTypes as userStoreActionTypes,
} from '../../store/userStore';
import { Toaster } from '../../components/Toaster';
import { Loader } from '../../components/Loader';
import { getItem, setItem } from '../../utils/storage';

interface IForgotPassword {
  mobileno: string;
}

export function VerifyMobile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['register']);

  const [showLoader, setShowLoader] = useState(false);
  const [otp, setOtp] = useState('');
  const [isUpdateMobile, setIsUpdateMobile] = useState(false);
  const [isVerifySuccess, setIsVerifySuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [userid, setUserid] = useState('');
  const [expireTime, setExpireTime] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [mobilenoLogin, setMobilenoLogin] = useState('');
  const [oldno, setOldno] = useState('');
  const [isFromMobileUpdate, setIsFromMobileUpdate] = useState(false);
  const [isFromLogin, setIsFromLogin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });
  const [mobileData, setMobileData] = useState({
    mobileno: '',
    newmobileno: '',
  });

  const loginState = useSelector(loginSelectors.getLoginState);
  const registerState = useSelector(registerSelectors.getRegisterState);
  const parentProfileState = useSelector(
    parentProfileSelectors.getParentProfileState
  );
  const resendOtpState = useSelector(resendOtpSelectors.getSetResendOtpState);
  const mobileUpdateState = useSelector(
    updateMobileSelectors.getMobileUpdateState
  );
  const verifyOtpState = useSelector(verifySelectors.getVerifyOtpState);
  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);

  const useEffectOnMountUserStore = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMountUserStore(() => {
    if (userStoreState.data) {
      setUserid(userStoreState.data.userid);
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
  });

  const useEffectOnMountLogin = (effect: React.EffectCallback) => {
    React.useEffect(effect, [loginState]);
  };
  useEffectOnMountLogin(() => {
    if (loginState.data) {
      setIsFromLogin(true);
    }
    setShowLoader(loginState.loader);
  });

  const useEffectOnMountRegister = (effect: React.EffectCallback) => {
    React.useEffect(effect, [registerState]);
  };
  useEffectOnMountRegister(() => {
    if (registerState.data) {
      setSeconds(registerState.data.ExpiryTime);
    }
    setShowLoader(registerState.loader);
  });

  const useEffectOnMountParentProfile = (effect: React.EffectCallback) => {
    React.useEffect(effect, [parentProfileState]);
  };
  useEffectOnMountParentProfile(() => {
    if (parentProfileState.data) {
      setMobileno(parentProfileState.data.contactno);
      setMobilenoLogin(parentProfileState.data.contactno);
    }
    if (parentProfileState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: parentProfileState.error.errorDescription,
      });
    }
    setShowLoader(parentProfileState.loader);
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [verifyOtpState]);
  };
  useEffectOnMount(() => {
    if (verifyOtpState.data) {
      const userInfo = getItem('userData');
      userInfo.IsverifiedOTP = 'Y';
      setIsVerifySuccess(true);
      setItem('userData', userInfo);
      dispatch({
        type: verifyOtpActionTypes.VERIFY_OTP_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: userStoreActionTypes.USER_STORE_SUCCESS_ACTION,
        payload: { data: userInfo },
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

  const useEffectOnMountMobileUpdate = (effect: React.EffectCallback) => {
    React.useEffect(effect, [mobileUpdateState]);
  };
  useEffectOnMountMobileUpdate(() => {
    if (mobileUpdateState.data) {
      setMobileno(mobileData.newmobileno);
      setOldno(mobileData.mobileno);
      setIsUpdateMobile(false);
      setSeconds(mobileUpdateState.data.ExpiryTime);
      dispatch({
        type: actionTypes.MOBILE_UPDATE_SUCCESS_ACTION,
        payload: { data: null },
      });
    }
    if (mobileUpdateState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: mobileUpdateState.error.errorDescription,
      });
    }
    setShowLoader(mobileUpdateState.loader);
  });

  const useEffectOnMountResendOtp = (effect: React.EffectCallback) => {
    React.useEffect(effect, [resendOtpState]);
  };
  useEffectOnMountResendOtp(() => {
    if (resendOtpState.data) {
      setIsFromLogin(false);
      setSeconds(resendOtpState.data.ExpiryTime);
    }
    if (resendOtpState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: resendOtpState.error.errorDescription,
      });
    }
    setShowLoader(resendOtpState.loader);
  });

  const { register, handleSubmit, errors } = useForm<IForgotPassword>({
    resolver: yupResolver(registerUpdateMobileSchema),
  });

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    setExpireTime(timeFormat(seconds));
  }, [seconds]);

  const handleOtpChange = (e: any) => {
    setOtp(e);
    if (e.toString().length === 4) {
      setIsError(false);
    }
  };

  const onSubmit = (data: any) => {
    dispatch({
      type: actionTypes.MOBILE_UPDATE_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: actionTypes.MOBILE_UPDATE_FAILURE_ACTION,
      payload: { error: null },
    });
    setMobileData(data);
    // setMobileno('');
    setIsFromMobileUpdate(true);
    const params = {
      userid,
      mobileno: data.mobileno,
      newmobileno: data.newmobileno,
    };
    dispatch(mobileUpdate(params));
  };
  const handleLoginSendOtp = () => {
    const params = {
      userid,
      mobileno,
    };
    dispatch(setResendOtp(params));
  };

  const resendOtp = () => {
    setOtp('');
    if (!isFromMobileUpdate) {
      const params = {
        userid,
        mobileno,
      };
      dispatch(setResendOtp(params));
    } else {
      const params = {
        userid,
        mobileno: oldno,
        newmobileno: mobileno,
      };
      onSubmit(params);
    }
  };

  const submitOtp = () => {
    if (otp.toString().length !== 4) {
      setIsError(true);
    } else {
      const params = { otp, userid, requestfrom: 'mobilenoupdate' };
      dispatch(verifyOtp(params));
    }
  };

  const handleChangeMobile = () => {
    setIsUpdateMobile(true);
    setOtp('');
    setIsFromLogin(false);
  };

  const handleRegisterSuccessOkay = () => {
    // Disabled to subscription for some time
    // history.push(ROUTER_URL_CONSTANT.SUBSCRIPTION);
    history.push(ROUTER_URL_CONSTANT.PROFILE_BUILDER);
  };

  return (
    <>
      <div className="forgotpwd">
        <div className="main-background">
          <div className="content-padding">
            <Row>
              <Col md={6}>
                <WelcomeBanner />
              </Col>
              <Col md={5} className="forgotpwd__form-left-margin">
                <Image src={logoboxImage} width="100%" />
                {!isVerifySuccess && (
                  <div className="Form-box">
                    {!isFromLogin && (
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="forgotpwd__title">Verify</div>
                        <div className="forgotpwd__sub-title">
                          Verify your mobile number to register your account
                          with Etv Bharat.
                        </div>
                        <Form.Group>
                          <Form.Label>
                            MOBILE NUMBER<span>*</span>
                          </Form.Label>
                          <div className="mobile-prefix__mobilePrefix">+91</div>
                          <Form.Control
                            readOnly
                            type="text"
                            name="mobileno"
                            onKeyPress={numberOnly}
                            maxLength={10}
                            ref={register}
                            defaultValue={mobileno}
                            className={`form-control mobile-prefix__pl-45 ${checkError(
                              errors,
                              'mobileno'
                            )}`}
                          />
                          {getErrorMessage(errors, 'mobileno', t)}
                          {!isUpdateMobile && (
                            <div className="forgotpwd__change-mobile">
                              <button
                                type="button"
                                className="forgotpwd__change-mobile-btn"
                                onClick={handleChangeMobile}
                              >
                                Change Number
                              </button>
                            </div>
                          )}
                        </Form.Group>
                        {isUpdateMobile && (
                          <Form.Group>
                            <Form.Label>
                              NEW MOBILE NUMBER<span>*</span>
                            </Form.Label>
                            <div className="mobile-prefix__mobilePrefix">
                              +91
                            </div>
                            <Form.Control
                              type="text"
                              name="newmobileno"
                              onKeyPress={numberOnly}
                              maxLength={10}
                              ref={register}
                              className={`form-control mobile-prefix__pl-45 ${checkError(
                                errors,
                                'newmobileno'
                              )}`}
                            />
                            {getErrorMessage(errors, 'newmobileno', t)}
                          </Form.Group>
                        )}
                        {!isUpdateMobile && (
                          <Form.Group className="otp">
                            <Form.Label>
                              otp code<span>*</span>
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
                                      Enter Valid OTP
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
                        <div className="p-b-20" />
                        {isUpdateMobile ? (
                          <Button type="submit" className="btn-pink">
                            SEND OTP
                          </Button>
                        ) : (
                          <Button className="btn-pink" onClick={submitOtp}>
                            VERIFY
                          </Button>
                        )}
                        {!isUpdateMobile && (
                          <div className="pt-4">
                            Didn’t receive an OTP yet?
                            <button
                              type="button"
                              className="forgotpwd__otp-resend"
                              onClick={resendOtp}
                            >
                              Resend now
                            </button>
                          </div>
                        )}
                      </Form>
                    )}
                    {isFromLogin && (
                      <>
                        <div className="forgotpwd__title">Verify</div>
                        <div className="forgotpwd__sub-title">
                          Verify your mobile number to register your account
                          with Etv Bharat.
                        </div>
                        <Form.Group>
                          <Form.Label>
                            MOBILE NUMBER<span>*</span>
                          </Form.Label>
                          <div className="mobile-prefix__mobilePrefix">+91</div>
                          <Form.Control
                            readOnly
                            type="text"
                            defaultValue={mobilenoLogin}
                            className="form-control mobile-prefix__pl-45"
                          />
                          {!isUpdateMobile && (
                            <div className="forgotpwd__change-mobile">
                              <button
                                type="button"
                                className="forgotpwd__change-mobile-btn"
                                onClick={handleChangeMobile}
                              >
                                Chnage Number
                              </button>
                            </div>
                          )}
                        </Form.Group>
                        <Button
                          className="btn-pink"
                          onClick={handleLoginSendOtp}
                        >
                          SEND OTP
                        </Button>
                      </>
                    )}
                  </div>
                )}
                {isVerifySuccess && (
                  <div className="Form-box display-flex align-center justify-center">
                    <div className="register_success">
                      <div className="text-center">
                        <div className="p-3">
                          <Image src={successMessageIcon} />
                        </div>
                        <div className="registration__title pt-4">
                          Registration Successfull
                        </div>
                        <div className="registration__sub-title-14 pt-3">
                          You have successfully created an account.
                        </div>
                        <div className="p-3">
                          <Button
                            className="btn-pink"
                            onClick={handleRegisterSuccessOkay}
                          >
                            OKAY
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Toaster
        show={showToast}
        toastInfo={toastInfo}
        handleCloseToast={() => setShowToast(false)}
      />
      {showLoader && <Loader />}
    </>
  );
}
