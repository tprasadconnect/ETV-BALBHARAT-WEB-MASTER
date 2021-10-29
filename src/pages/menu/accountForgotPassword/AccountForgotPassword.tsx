import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row, Image, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import {
  passwordEyeShow,
  passwordEyeHide,
  backIcon,
} from '../../../constants/iconImageConstant';
import { accountForgotPasswordSchema, newPasswordSchema } from './validation';
import {
  checkError,
  getErrorMessage,
  timeFormat,
} from '../../../utils/commonFunctions';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { forgotPassword } from '../../../services/forgotPassword/forgotPassword';
import { verifyOtp } from '../../../services/verifyOtp/verifyOtp';
import { changePassword } from '../../../services/changePassword/changePassword';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import {
  actionTypes,
  selectors as forgotPasswordSelectors,
} from '../../../store/forgotPassword';
import { selectors as parentProfileSelectors } from '../../../store/parentProfile';
import {
  actionTypes as verifyOtpActionTypes,
  selectors as verifySelectors,
} from '../../../store/verifyOtp';
import {
  actionTypes as changePassweordActionTypes,
  selectors as changePasswordSelectors,
} from '../../../store/changePassword';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { Toaster } from '../../../components/Toaster';
import { Loader } from '../../../components/Loader';

interface IAccountForgotPassword {
  mobileno?: string;
  password?: string;
  confirmPassword?: string;
}

export function AccountForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const forgotPasswordState = useSelector(
    forgotPasswordSelectors.getForgotPasswordState
  );
  const parentProfileState = useSelector(
    parentProfileSelectors.getParentProfileState
  );
  const verifyOtpState = useSelector(verifySelectors.getVerifyOtpState);
  const changePasswordState = useSelector(
    changePasswordSelectors.getChangePasswordState
  );

  const [showLoader, setShowLoader] = useState(false);
  const [otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);
  const [verify, showVerify] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [expireTime, setExpireTime] = useState('');
  const [passwordShown, setpasswordShown] = useState(false);
  const [verifyOtpSuccess, setVerifyOtpSuccess] = useState(false);
  const [userid, setUserid] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });
  const [mobileno, setMobileno] = useState('');

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);

  const useEffectOnMountGetParentProfile = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMountGetParentProfile(() => {
    if (userStoreState.data) {
      setUserid(userStoreState.data.userid);
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
  });

  const useEffectOnMountSetParentProfile = (effect: React.EffectCallback) => {
    React.useEffect(effect, [parentProfileState]);
  };
  useEffectOnMountSetParentProfile(() => {
    if (parentProfileState.data) {
      setMobileno(parentProfileState.data.contactno);
    }
    setShowLoader(parentProfileState.loader);
  });

  const backBtn = () => {
    history.push(ROUTER_URL_CONSTANT.SUB_SETTINGS);
  };
  const togglePasswordVisiblity = () => {
    setpasswordShown(!passwordShown);
  };

  const useEffectOnMountForgotPassword = (effect: React.EffectCallback) => {
    React.useEffect(effect, [forgotPasswordState]);
  };
  useEffectOnMountForgotPassword(() => {
    if (forgotPasswordState.data) {
      setSeconds(forgotPasswordState.data.ExpiryTime);
      showVerify(true);
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_SUCCESS_ACTION,
        payload: { data: null },
      });
    }
    if (forgotPasswordState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: forgotPasswordState.error.errorDescription,
      });
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(forgotPasswordState.loader);
  });

  const handleOtpChange = (e: any) => {
    setOtp(e);
    if (e.toString().length === 4) {
      setIsError(false);
    }
  };
  useEffect(() => {
    let timer;
    if (verify && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [verify, seconds]);

  const { register, handleSubmit, errors } = useForm<IAccountForgotPassword>({
    resolver: yupResolver(
      !verifyOtpSuccess ? accountForgotPasswordSchema : newPasswordSchema
    ),
  });

  const onSubmit = (data: any) => {
    if (!verifyOtpSuccess) {
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_FAILURE_ACTION,
        payload: { error: null },
      });
      dispatch(forgotPassword(data));
    } else {
      dispatch({
        type: changePassweordActionTypes.CHANGE_PASSWORD_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: changePassweordActionTypes.CHANGE_PASSWORD_FAILURE_ACTION,
        payload: { error: null },
      });
      const formData = {
        oldpassword: '',
        newpassword: data.password,
        requestfrom: 'forgot',
        userid,
      };
      dispatch(changePassword(formData));
    }
  };

  const resendOtp = () => {
    setOtp('');
    onSubmit({ mobileno });
  };

  const submitOtp = () => {
    if (otp.toString().length !== 4) {
      setIsError(true);
    } else {
      dispatch({
        type: verifyOtpActionTypes.VERIFY_OTP_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: verifyOtpActionTypes.VERIFY_OTP_FAILURE_ACTION,
        payload: { error: null },
      });
      const params = { otp, userid };
      dispatch(verifyOtp(params));
    }
  };
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [verifyOtpState]);
  };
  useEffectOnMount(() => {
    if (verifyOtpState.data) {
      setVerifyOtpSuccess(true);
      dispatch({
        type: verifyOtpActionTypes.VERIFY_OTP_SUCCESS_ACTION,
        payload: { data: null },
      });
    }
    if (verifyOtpState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: verifyOtpState.error.errorDescription,
      });
      dispatch({
        type: verifyOtpActionTypes.VERIFY_OTP_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(verifyOtpState.loader);
  });

  useEffect(() => {
    setExpireTime(timeFormat(seconds));
  }, [seconds]);

  const useEffectOnMountChangePassword = (effect: React.EffectCallback) => {
    React.useEffect(effect, [changePasswordState]);
  };
  useEffectOnMountChangePassword(() => {
    if (changePasswordState.data) {
      dispatch({
        type: changePassweordActionTypes.CHANGE_PASSWORD_SUCCESS_ACTION,
        payload: { data: null },
      });
      history.push(ROUTER_URL_CONSTANT.SUB_SETTINGS);
    }
    if (changePasswordState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: verifyOtpState.error.errorDescription,
      });
      dispatch({
        type: changePassweordActionTypes.CHANGE_PASSWORD_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(changePasswordState.loader);
  });

  return (
    <div className="accountForgotPassword">
      <div className="main-background">
        <div className="content-padding">
          <Row>
            <Col md={2} xs={6} className="d-none d-lg-block" />
            <Col md={8}>
              <div className="accountForgotPassword__container">
                <Row>
                  <div className="col-md-12">
                    <div className="accountForgotPassword__header">
                      <div>
                        <div className="">
                          <div className="accountForgotPassword__back-btn__content">
                            <div>
                              <Image src={backIcon} />
                            </div>
                            <button
                              type="button"
                              className="accountForgotPassword__back-btn__back-text"
                              onClick={backBtn}
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
                <Row className="accountForgotPassword__main-content">
                  <Col md={12}>
                    <div className="">
                      <div className="">
                        <div className="">
                          <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                              <Col md={12}>
                                <div className="accountForgotPassword__act-text">
                                  {!verifyOtpSuccess ? 'Forgot' : 'New'}{' '}
                                  Password
                                </div>
                              </Col>
                            </Row>
                            <Row className="pt-4">
                              <Col md={5}>
                                <div className="accountForgotPassword__sub-title">
                                  Parents Only
                                </div>
                                {!verifyOtpSuccess ? (
                                  <>
                                    {!verify ? (
                                      <div className="accountForgotPassword__sub-title__text">
                                        Enter your mobile number to proceed{' '}
                                        <br />
                                        to reset your password
                                      </div>
                                    ) : (
                                      <>
                                        <div className="accountForgotPassword__sub-title__text">
                                          We have sent OTP to your registered
                                          mobile number
                                        </div>
                                        <div className="accountForgotPassword__sub-title__otp">
                                          Didn’t receive an OTP yet?
                                          <button
                                            type="button"
                                            className="forgotpwd__otp-resend"
                                            onClick={resendOtp}
                                          >
                                            Resend now
                                          </button>
                                        </div>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <div className="accountForgotPassword__sub-title__text">
                                    Create new password for your account
                                  </div>
                                )}
                              </Col>
                              <Col md={5}>
                                {!verifyOtpSuccess ? (
                                  <>
                                    {!verify ? (
                                      <Form.Group className="pwd-eye-icon__pwd-wrapper">
                                        <Form.Label>MOBILE NUMBER</Form.Label>
                                        <div className="mobile-prefix__mobilePrefix">
                                          +91
                                        </div>
                                        <Form.Control
                                          readOnly
                                          name="mobileno"
                                          ref={register}
                                          defaultValue={mobileno}
                                          className="form-control mobile-prefix__pl-45"
                                        />
                                      </Form.Group>
                                    ) : (
                                      <Form.Group className="otp">
                                        <Form.Label>
                                          OTP<span>*</span>
                                        </Form.Label>
                                        <div className="">
                                          <div className="forgotpwd__otp-box">
                                            <div className="forgotpwd__otp-box__opt-input">
                                              <OtpInput
                                                hasErrored
                                                isInputNum
                                                value={otp}
                                                errorStyle={
                                                  isError ? 'isInvalid' : ''
                                                }
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
                                  </>
                                ) : (
                                  <>
                                    <Form.Group className="newpwd__pass-wrapper">
                                      <Form.Label>
                                        Enter New Password<span>*</span>
                                      </Form.Label>
                                      <div
                                        className="newpwd__pwdicon"
                                        onClick={togglePasswordVisiblity}
                                        aria-hidden="true"
                                      >
                                        <Image
                                          src={
                                            passwordShown
                                              ? passwordEyeShow
                                              : passwordEyeHide
                                          }
                                        />
                                      </div>
                                      <Form.Control
                                        type={
                                          passwordShown ? 'text' : 'password'
                                        }
                                        name="password"
                                        placeholder="**********"
                                        ref={register}
                                        className={`form-control  ${checkError(
                                          errors,
                                          'password'
                                        )}`}
                                      />
                                      {getErrorMessage(errors, 'password')}
                                    </Form.Group>
                                    <Form.Group>
                                      <Form.Label>
                                        Confirm New Password<span>*</span>
                                      </Form.Label>
                                      <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="**********"
                                        ref={register}
                                        className={`form-control  ${checkError(
                                          errors,
                                          'confirmPassword'
                                        )}`}
                                      />
                                      {getErrorMessage(
                                        errors,
                                        'confirmPassword'
                                      )}
                                    </Form.Group>
                                  </>
                                )}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12}>
                                {!verifyOtpSuccess ? (
                                  <>
                                    {!verify ? (
                                      <Button
                                        className="btn-pink float-right"
                                        type="submit"
                                      >
                                        SEND OTP
                                      </Button>
                                    ) : (
                                      <Button
                                        className="btn-pink float-right"
                                        onClick={submitOtp}
                                      >
                                        VERIFY
                                      </Button>
                                    )}
                                  </>
                                ) : (
                                  <Button
                                    className="btn-pink float-right"
                                    type="submit"
                                  >
                                    DONE
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={2} xs={6} className="d-none d-lg-block" />
          </Row>

          {false && (
            <Row>
              <Col md={2} xs={6} className="d-none d-lg-block" />
              <Col md={8}>
                <div className="accountForgotPassword__container">
                  <Row>
                    <div className="col-md-12">
                      <div className="accountForgotPassword__header">
                        <div>
                          <div className="">
                            <div className="accountForgotPassword__back-btn__content">
                              <div>
                                <Image src={backIcon} />
                              </div>
                              <button
                                type="button"
                                className="accountForgotPassword__back-btn__back-text"
                                onClick={backBtn}
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row className="accountForgotPassword__main-content">
                    <Col md={12}>
                      <div className="">
                        <div className="">
                          <div className="">
                            <Row>
                              <Col md={12}>
                                <div className="accountForgotPassword__act-text">
                                  Forgot Password
                                </div>
                              </Col>
                            </Row>
                            <Form>
                              <Row>
                                <Col md={4}>
                                  <div className="accountForgotPassword__sub-title">
                                    Parents Only
                                  </div>
                                  <div className="accountForgotPassword__sub-title__text">
                                    We have sent OTP to your registered mobile
                                    number
                                  </div>
                                  <div className="accountForgotPassword__sub-title__otp">
                                    Didn’t reveive an OTP yet ?
                                    <div
                                      className="accountForgotPassword__sub-title__otp__text"
                                      onClick={backBtn}
                                      aria-hidden="true"
                                    >
                                      Resend OTP
                                    </div>
                                  </div>
                                </Col>
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Label>OTP</Form.Label>
                                    <OtpInput
                                      hasErrored
                                      isInputNum
                                      value={otp}
                                      errorStyle={isError ? 'isInvalid' : ''}
                                      onChange={handleOtpChange}
                                      numInputs={4}
                                      separator={<span> </span>}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={2} className="d-none d-lg-block" />
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <Button className="btn-pink float-right">
                                    VERIFY
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={2} xs={6} className="d-none d-lg-block" />
            </Row>
          )}

          {false && (
            <Row>
              <Col md={2} xs={6} className="d-none d-lg-block" />
              <Col md={8}>
                <div className="accountForgotPassword__container">
                  <Row>
                    <div className="col-md-12">
                      <div className="accountForgotPassword__header">
                        <div>
                          <div className="">
                            <div className="accountForgotPassword__back-btn__content">
                              <div>
                                <Image src={backIcon} />
                              </div>
                              <button
                                type="button"
                                className="accountForgotPassword__back-btn__back-text"
                                onClick={backBtn}
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row className="accountForgotPassword__main-content">
                    <Col md={12}>
                      <div className="">
                        <div className="">
                          <div className="">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                              <Row>
                                <Col md={12}>
                                  <div className="accountForgotPassword__act-text">
                                    New Password
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={4}>
                                  <div className="accountForgotPassword__sub-title">
                                    Parents Only
                                  </div>
                                  <div className="accountForgotPassword__sub-title__text">
                                    Create new password for your account
                                  </div>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="pwd-eye-icon__pwd-wrapper">
                                    <Form.Label>ENTER NEW PASSWORD</Form.Label>
                                    <div
                                      className="pwd-eye-icon__pwdicon"
                                      onClick={togglePasswordVisiblity}
                                      aria-hidden="true"
                                    >
                                      <Image
                                        src={
                                          passwordShown
                                            ? passwordEyeShow
                                            : passwordEyeHide
                                        }
                                      />
                                    </div>
                                    <Form.Control
                                      type={passwordShown ? 'text' : 'password'}
                                      name="password"
                                      placeholder="**********"
                                      ref={register}
                                      className={`form-control ${checkError(
                                        errors,
                                        'password'
                                      )}`}
                                    />
                                    {getErrorMessage(errors, 'password')}
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>
                                      CONFIRM NEW PASSWORD
                                    </Form.Label>
                                    <Form.Control
                                      type="password"
                                      name="confirmPassword"
                                      placeholder="**********"
                                      ref={register}
                                      className={`form-control  ${checkError(
                                        errors,
                                        'confirmPassword'
                                      )}`}
                                    />
                                    {getErrorMessage(errors, 'confirmPassword')}
                                  </Form.Group>
                                </Col>
                                <Col md={2} className="d-none d-lg-block" />
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <Button
                                    className="btn-pink float-right"
                                    type="submit"
                                  >
                                    DONE
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={2} xs={6} className="d-none d-lg-block" />
            </Row>
          )}
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
