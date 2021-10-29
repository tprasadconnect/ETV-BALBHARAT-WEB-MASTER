import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { yupResolver } from '@hookform/resolvers';
import { backIcon } from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import {
  numberOnly,
  checkError,
  getErrorMessage,
  timeFormat,
} from '../../../utils/commonFunctions';
import { verifymobileSchema } from './validation';
import { UpdateSuccess } from './UpdateSuccess';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import { mobileUpdate } from '../../../services/mobileUpdate/mobileUpdate';
import { verifyOtp } from '../../../services/verifyOtp/verifyOtp';
import {
  actionTypes as mobileUpdateActionTypes,
  selectors,
} from '../../../store/mobileUpdate';
import { selectors as parentProfileSelectors } from '../../../store/parentProfile';
import {
  actionTypes as verifyOtpActionTypes,
  selectors as verifySelectors,
} from '../../../store/verifyOtp';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { Toaster } from '../../../components/Toaster';
import { Loader } from '../../../components/Loader';

interface IVerifyMobile {
  mobileno: string;
  newmobileno: string;
}

export function UpdateMobile() {
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);
  const [otp, setOtp] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isError, setIsError] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [otpVerify, setOtpVerify] = useState(false);
  const [oldMobileNo, getOldMobileNo] = useState('');
  const [expireTime, setExpireTime] = useState('');
  const [mobileData, setMobileData] = useState(null);
  const [newNumber, setNewNumber] = useState('');
  const [userid, setUserid] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });

  const mobileUpdateState = useSelector(selectors.getMobileUpdateState);
  const parentProfileState = useSelector(
    parentProfileSelectors.getParentProfileState
  );
  const verifyOtpState = useSelector(verifySelectors.getVerifyOtpState);
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

  useEffect(() => {
    if (parentProfileState.data) {
      getOldMobileNo(parentProfileState.data.contactno);
    }
    setShowLoader(parentProfileState.loader);
  }, [parentProfileState]);

  const useEffectOnMountMobileUpdate = (effect: React.EffectCallback) => {
    React.useEffect(effect, [mobileUpdateState]);
  };

  useEffectOnMountMobileUpdate(() => {
    if (mobileUpdateState.data) {
      setIsUpdate(true);
      setSeconds(mobileUpdateState.data.ExpiryTime);
      dispatch({
        type: mobileUpdateActionTypes.MOBILE_UPDATE_SUCCESS_ACTION,
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
      dispatch({
        type: mobileUpdateActionTypes.MOBILE_UPDATE_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(mobileUpdateState.loader);
  });

  const useEffectOnMountVerifyOtp = (effect: React.EffectCallback) => {
    React.useEffect(effect, [verifyOtpState]);
  };

  useEffectOnMountVerifyOtp(() => {
    if (verifyOtpState.data) {
      setOtpVerify(true);
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
    let timer;
    if (isUpdate && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isUpdate, seconds]);

  const handleOtpChange = (e: any) => {
    setOtp(e);
    if (e.toString().length === 4) {
      setIsError(false);
    }
  };

  const handleChangeMobile = () => {
    setIsUpdate(false);
    setOtp('');
  };

  const onSubmit = (data: any) => {
    dispatch({
      type: mobileUpdateActionTypes.MOBILE_UPDATE_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: mobileUpdateActionTypes.MOBILE_UPDATE_FAILURE_ACTION,
      payload: { error: null },
    });
    setMobileData(data);
    setNewNumber(data.newmobileno);
    const params = {
      userid,
      mobileno: data.mobileno,
      newmobileno: data.newmobileno,
    };
    dispatch(mobileUpdate(params));
  };
  const resendOtp = () => {
    setOtp('');
    onSubmit(mobileData);
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
      const params = { otp, userid, requestfrom: 'mobilenoupdate' };
      dispatch(verifyOtp(params));
    }
  };

  const { register, handleSubmit, errors } = useForm<IVerifyMobile>({
    resolver: yupResolver(verifymobileSchema),
  });

  useEffect(() => {
    setExpireTime(timeFormat(seconds));
  }, [seconds]);

  return (
    <div className="edit-account main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={2} xs={6} className="d-none d-lg-block" />
          <Col md={8}>
            {!otpVerify ? (
              <div className="edit-account__container">
                <div className="edit-account__back-btn pl-sm-3 pb-3">
                  <div>
                    <Image src={backIcon} />
                  </div>
                  <Link to={ROUTER_URL_CONSTANT.EDIT_ACCOUNT}>
                    <span className="edit-account__back-btn__back-text">
                      Back
                    </span>
                  </Link>
                </div>
                <Row className="pt-3 pl-sm-3">
                  <Col md={6}>
                    <Row className="edit-account__title">
                      {isUpdate ? 'Verify' : 'Update Mobile Number'}
                    </Row>
                    {isUpdate ? (
                      <>
                        <Row className="updateMobile__otp-not-received pt-4">
                          Enter OTP to verify your mobile number +91 {newNumber}
                        </Row>
                        <Row className="updateMobile__otp-not-received">
                          Didn’t receive an OTP yet?
                          <button
                            type="button"
                            className="updateMobile__otp-resend"
                            onClick={resendOtp}
                          >
                            Resend OTP
                          </button>
                        </Row>
                      </>
                    ) : (
                      <>
                        <Row className="updateMobile__update-mobile-parent-only pt-4">
                          Parents Only
                        </Row>
                        <Row className="updateMobile__enter-new-mobile">
                          Enter new mobile number to proceed
                        </Row>
                      </>
                    )}
                  </Col>
                  <Col md={6}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group>
                        <Form.Label>
                          CURRENT MOBILE NUMBER<span>*</span>
                        </Form.Label>
                        <div className="mobile-prefix__mobilePrefix">+91</div>
                        <Form.Control
                          readOnly
                          type="text"
                          name="mobileno"
                          onKeyPress={numberOnly}
                          maxLength={10}
                          ref={register}
                          defaultValue={oldMobileNo}
                          className={`form-control mobile-prefix__pl-45 ${checkError(
                            errors,
                            'mobileno'
                          )}`}
                        />
                        {getErrorMessage(errors, 'mobileno')}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>
                          NEW MOBILE NUMBER<span>*</span>
                        </Form.Label>
                        <div className="mobile-prefix__mobilePrefix">+91</div>
                        <Form.Control
                          readOnly={isUpdate}
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
                        {getErrorMessage(errors, 'newmobileno')}

                        {isUpdate && (
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
                      {isUpdate && (
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
                      <div style={{ textAlign: 'right' }}>
                        {!isUpdate ? (
                          <Button type="submit" className="btn-pink">
                            SEND OTP
                          </Button>
                        ) : (
                          <Button className="btn-pink" onClick={submitOtp}>
                            VERIFY
                          </Button>
                        )}
                      </div>
                    </Form>
                  </Col>
                </Row>
              </div>
            ) : (
              <UpdateSuccess
                title="Verification Successfull"
                subTitle="You have successfully verified your number. "
                btnName="OKAY"
                routeTo={ROUTER_URL_CONSTANT.ACCOUNT}
              />
            )}
          </Col>
          <Col md={2} />
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
