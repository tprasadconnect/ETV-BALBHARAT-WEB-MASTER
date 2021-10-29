import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Image, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import OtpInput from 'react-otp-input';
import { WelcomeBanner } from '../../components/WelcomeBanner';
import { logoboxImage, backIcon } from '../../constants/iconImageConstant';
import { forgotPasswordSchema } from './validation';
import {
  numberOnly,
  checkError,
  getErrorMessage,
  timeFormat,
} from '../../utils/commonFunctions';
import { forgotPassword } from '../../services/forgotPassword/forgotPassword';
import { verifyOtp } from '../../services/verifyOtp/verifyOtp';
import { setResendOtp } from '../../services/setResendOtp/setResendOtp';
import {
  actionTypes as veifyOtpActionTypes,
  selectors as verifySelectors,
} from '../../store/verifyOtp';
import {
  actionTypes,
  selectors as forgotPasswordSelectors,
} from '../../store/forgotPassword';
import { selectors as setResendOtpSelectors } from '../../store/setResendOtp';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { Toaster } from '../../components/Toaster';
import { Loader } from '../../components/Loader';

interface IForgotPassword {
  mobileno: string;
}

export function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [otp, setOtp] = useState('');
  const [verify, showVerify] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mobileReadOnly, setMobileReadOnly] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [mobileData, setMobileData] = useState(null);
  const [expireTime, setExpireTime] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });
  const [showLoader, setShowLoader] = useState(false);

  const forgotPasswordState = useSelector(
    forgotPasswordSelectors.getForgotPasswordState
  );
  const setResendOtpState = useSelector(
    setResendOtpSelectors.getSetResendOtpState
  );

  const verifyOtpState = useSelector(verifySelectors.getVerifyOtpState);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [verifyOtpState]);
  };
  useEffectOnMount(() => {
    if (verifyOtpState.data) {
      dispatch({
        type: veifyOtpActionTypes.VERIFY_OTP_SUCCESS_ACTION,
        payload: { data: null },
      });
      history.push(ROUTER_URL_CONSTANT.NEW_PASSWORD);
    }
    if (verifyOtpState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: verifyOtpState.error.errorDescription,
      });
      dispatch({
        type: veifyOtpActionTypes.VERIFY_OTP_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(verifyOtpState.loader);
  });

  const useEffectOnMountForgot = (effect: React.EffectCallback) => {
    React.useEffect(effect, [forgotPasswordState]);
  };

  useEffectOnMountForgot(() => {
    if (forgotPasswordState.data) {
      setSeconds(forgotPasswordState.data.ExpiryTime);
      showVerify(true);
      setMobileReadOnly(true);
    }
    if (forgotPasswordState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: forgotPasswordState.error.errorDescription,
      });
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(forgotPasswordState.loader);
  });

  const useEffectOnMountSetResend = (effect: React.EffectCallback) => {
    React.useEffect(effect, [setResendOtpState]);
  };
  useEffectOnMountSetResend(() => {
    if (setResendOtpState.data) {
      setOtp('');
      setIsError(false);
      setSeconds(setResendOtpState.data.ExpiryTime);
    }
    if (setResendOtpState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: setResendOtpState.error.errorDescription,
      });
    }
    setShowLoader(setResendOtpState.loader);
  });

  const { register, handleSubmit, errors } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    let timer;
    if (verify && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [verify, seconds]);

  const handleOtpChange = (e: any) => {
    setOtp(e);
    if (e.toString().length === 4) {
      setIsError(false);
    }
  };

  const handleChangeMobile = () => {
    showVerify(false);
    setMobileReadOnly(false);
    setSeconds(0);
    setOtp('');
  };

  const onSubmit = (data: any) => {
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_FAILURE_ACTION,
      payload: { error: null },
    });
    setMobileData(data.mobileno);
    dispatch(forgotPassword(data));
  };

  const resendOtp = () => {
    const params = {
      userid: forgotPasswordState.data.userid,
      mobileno: mobileData,
    };
    dispatch(setResendOtp(params));
  };

  const submitOtp = () => {
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
      const params = { otp, userid: forgotPasswordState.data.userid };
      dispatch(verifyOtp(params));
    }
  };

  const backBtn = () => {
    history.push(ROUTER_URL_CONSTANT.LOGIN);
  };

  useEffect(() => {
    setExpireTime(timeFormat(seconds));
  }, [seconds]);

  return (
    <div className="forgotpwd">
      <div className="main-background">
        <div className="content-padding">
          <Row>
            <Col md={6}>
              <WelcomeBanner />
            </Col>
            <Col md={5} className="forgotpwd__form-left-margin">
              <Image src={logoboxImage} width="100%" />
              <div className="Form-box">
                <div className="back-btn">
                  <div className="back-btn__content">
                    <div>
                      <Image src={backIcon} />
                    </div>
                    <button
                      type="button"
                      className="back-btn__back-text"
                      onClick={backBtn}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="forgotpwd__title">FORGOT PASSWORD</div>
                  <div className="forgotpwd__sub-title">
                    Dont worry !! Enter your mobile number & reset your
                    <br /> password without any husstle
                  </div>
                  <Form.Group>
                    <Form.Label>
                      MOBILE NUMBER<span>*</span>
                    </Form.Label>
                    <div className="mobile-prefix__mobilePrefix">+91</div>
                    <Form.Control
                      readOnly={mobileReadOnly}
                      type="text"
                      name="mobileno"
                      onKeyPress={numberOnly}
                      maxLength={10}
                      ref={register}
                      className={`form-control mobile-prefix__pl-45 ${checkError(
                        errors,
                        'mobileno'
                      )}`}
                    />
                    {getErrorMessage(errors, 'mobileno')}
                    {verify && (
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
                  {verify && (
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
                  {!verify ? (
                    <Button type="submit" className="btn-pink">
                      SEND OTP
                    </Button>
                  ) : (
                    <Button className="btn-pink" onClick={submitOtp}>
                      VERIFY
                    </Button>
                  )}
                  {verify && (
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
              </div>
            </Col>
          </Row>
        </div>
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
