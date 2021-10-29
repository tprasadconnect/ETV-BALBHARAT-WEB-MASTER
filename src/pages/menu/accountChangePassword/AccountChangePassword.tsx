import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Row, Image, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useDispatch, useSelector } from 'react-redux';
import {
  passwordEyeShow,
  passwordEyeHide,
  backIcon,
} from '../../../constants/iconImageConstant';

import { accountChangePasswordSchema } from './validation';
import { checkError, getErrorMessage } from '../../../utils/commonFunctions';
import { changePassword } from '../../../services/changePassword/changePassword';
import { actionTypes, selectors } from '../../../store/changePassword';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { Toaster } from '../../../components/Toaster';
import { Loader } from '../../../components/Loader';

interface IAccountChangePassword {
  password: string;
  confirmPassword: string;
  oldpassword: string;
}

// export function AccountChangePassword() {
export const AccountChangePassword: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const backBtn = () => {
    history.push(ROUTER_URL_CONSTANT.SUB_SETTINGS);
  };

  const [showLoader, setShowLoader] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [userid, setUserid] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);

  const useEffectOnMountGetParentProfile = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMountGetParentProfile(() => {
    if (userStoreState.data) {
      setUserid(userStoreState.data.userid);
    }
  });

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const { register, handleSubmit, errors } = useForm<IAccountChangePassword>({
    resolver: yupResolver(accountChangePasswordSchema),
  });
  const changePasswordState = useSelector(selectors.getChangePasswordState);

  const onSubmit = (data) => {
    dispatch({
      type: actionTypes.CHANGE_PASSWORD_SUCCESS_ACTION,
      payload: { data: null },
    });
    dispatch({
      type: actionTypes.CHANGE_PASSWORD_FAILURE_ACTION,
      payload: { error: null },
    });
    const formData = { ...data, requestfrom: 'change', userid };
    dispatch(changePassword(formData));
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, [changePasswordState]);
  };
  useEffectOnMount(() => {
    if (changePasswordState.data) {
      history.push(ROUTER_URL_CONSTANT.SUB_SETTINGS);
      dispatch({
        type: actionTypes.CHANGE_PASSWORD_SUCCESS_ACTION,
        payload: { data: null },
      });
    }
    if (changePasswordState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: changePasswordState.error.errorDescription,
      });
      dispatch({
        type: actionTypes.CHANGE_PASSWORD_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(changePasswordState.loader);
  });

  return (
    <div className="accountChangePassword">
      <div className="main-background">
        <div className="content-padding">
          <Row>
            <Col md={2} xs={6} className="d-none d-lg-block" />
            <Col md={8}>
              <div className="accountChangePassword__container">
                <Row>
                  <div className="col-md-12">
                    <div className="accountChangePassword__header">
                      <div>
                        <div className="">
                          <div className="accountChangePassword__back-btn__content">
                            <div>
                              <Image src={backIcon} />
                            </div>
                            <button
                              type="button"
                              className="accountChangePassword__back-btn__back-text"
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
                <Row className="accountChangePassword__main-content">
                  <Col md={12}>
                    <div className="">
                      <div className="">
                        <div className="">
                          <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                              <Col md={4}>
                                <div className="accountChangePassword__act-text">
                                  Change Password
                                </div>

                                <Link
                                  to={
                                    ROUTER_URL_CONSTANT.ACCOUNT_FORGOT_PASSWORD
                                  }
                                >
                                  <div className="accountChangePassword__sub-title">
                                    Forgot password?
                                  </div>
                                </Link>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="pwd-eye-icon__pwd-wrapper">
                                  <Form.Label>CURRENT PASSWORD</Form.Label>
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
                                    name="oldpassword"
                                    placeholder="**********"
                                    ref={register}
                                    className={`form-control ${checkError(
                                      errors,
                                      'oldpassword'
                                    )}`}
                                  />
                                  {getErrorMessage(errors, 'oldpassword')}
                                </Form.Group>
                                <Form.Group className="pwd-eye-icon__pwd-wrapper">
                                  <Form.Label>ENTER NEW PASSWORD</Form.Label>
                                  <div
                                    className="pwd-eye-icon__pwdicon"
                                    onClick={togglePasswordVisiblity2}
                                    aria-hidden="true"
                                  >
                                    <Image
                                      src={
                                        passwordShown2
                                          ? passwordEyeShow
                                          : passwordEyeHide
                                      }
                                    />
                                  </div>
                                  <Form.Control
                                    type={passwordShown2 ? 'text' : 'password'}
                                    name="newpassword"
                                    placeholder="**********"
                                    ref={register}
                                    className={`form-control  ${checkError(
                                      errors,
                                      'newpassword'
                                    )}`}
                                  />
                                  {getErrorMessage(errors, 'newpassword')}
                                </Form.Group>

                                {/* <Form.Control
                                      type="hidden"
                                      name="requestfrom"
                                      value="change"
                                    /> */}

                                <Form.Group>
                                  <Form.Label>CONFIRM NEW PASSWORD</Form.Label>
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
};
