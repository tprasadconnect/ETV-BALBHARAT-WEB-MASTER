import React, { useState } from 'react';
import { Button, Row, Col, Image, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers';
import { useTranslation } from 'react-i18next';
import { WelcomeBanner } from '../../components/WelcomeBanner';
import {
  backIcon,
  logoboxImage,
  passwordEyeShow,
  passwordEyeHide,
  successMessageIcon,
} from '../../constants/iconImageConstant';
import { newPasswordSchema } from './validation';
import { checkError, getErrorMessage } from '../../utils/commonFunctions';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { changePassword } from '../../services/changePassword/changePassword';
import {
  actionTypes,
  selectors as changePasswordSelectors,
} from '../../store/changePassword';
import { selectors as forgotPasswordSelectors } from '../../store/forgotPassword';
import { Toaster } from '../../components/Toaster';
import { Loader } from '../../components/Loader';

interface INewPwd {
  password: string;
  confirmPassword: string;
}

export function NewPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['common']);
  const [showLoader, setShowLoader] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });

  const { register, handleSubmit, errors } = useForm<INewPwd>({
    resolver: yupResolver(newPasswordSchema),
  });

  const changePasswordState = useSelector(
    changePasswordSelectors.getChangePasswordState
  );
  const forgotPasswordState = useSelector(
    forgotPasswordSelectors.getForgotPasswordState
  );
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [changePasswordState]);
  };
  useEffectOnMount(() => {
    if (changePasswordState.data) {
      dispatch({
        type: actionTypes.CHANGE_PASSWORD_SUCCESS_ACTION,
        payload: { data: null },
      });
      setResetSuccessful(true);
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

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = (data: any) => {
    const formData = {
      oldpassword: '',
      newpassword: data.password,
      requestfrom: 'forgot',
      userid: forgotPasswordState.data.userid,
    };
    dispatch(changePassword(formData));
  };

  const backBtn = () => {
    history.push(ROUTER_URL_CONSTANT.FORGOT_PASSWORD);
  };

  const navigateToLogin = () => {
    history.push(ROUTER_URL_CONSTANT.LOGIN);
  };

  return (
    <div className="newpwd">
      <div className="main-background">
        <div className="content-padding ">
          <Row>
            <Col md={6}>
              <WelcomeBanner />
            </Col>
            {!resetSuccessful ? (
              <Col md={5} className="newpwd__form-left-margin">
                <Image src={logoboxImage} width="100%" />
                <div className="Form-box">
                  <Link to={ROUTER_URL_CONSTANT.FORGOT_PASSWORD}>
                    <div className="back-btn">
                      <div
                        role="button"
                        onKeyPress={() => {}}
                        tabIndex={0}
                        className="back-btn__content"
                        onClick={backBtn}
                      >
                        <div>
                          <Image src={backIcon} />
                        </div>
                        <span className="back-btn__back-text">Back</span>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <div className="newpwd__title">NEW PASSWORD</div>
                      <div className="newpwd__sub-title">
                        Create new password for your account
                      </div>
                      <Form.Group className="newpwd__pass-wrapper">
                        <Form.Label>
                          Password<span>*</span>
                        </Form.Label>
                        <div
                          className="newpwd__pwdicon"
                          onClick={togglePasswordVisiblity}
                          aria-hidden="true"
                        >
                          <Image
                            src={
                              passwordShown ? passwordEyeShow : passwordEyeHide
                            }
                          />
                        </div>
                        <Form.Control
                          type={passwordShown ? 'text' : 'password'}
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
                          Confirm Password<span>*</span>
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
                      <Form.Group>
                        <Form.Label className="instructions">
                          {t('common:passwordInstructionsNew.0')}
                          <br />
                          {t('common:passwordInstructionsNew.1')}
                          <br />
                          {t('common:passwordInstructionsNew.2')}
                          <br />
                          {t('common:passwordInstructionsNew.3')}
                          <br />
                          {t('common:passwordInstructionsNew.4')}
                        </Form.Label>
                      </Form.Group>
                      <Button className="btn-pink" type="submit">
                        SUBMIT
                      </Button>
                    </Form>
                  </div>
                </div>
              </Col>
            ) : (
              <Col md={5} className="form-left-margin">
                <Image src={logoboxImage} width="100%" />
                <div className="Form-box p-5">
                  <div className="text-center">
                    <div className="p-4">
                      <Image src={successMessageIcon} />
                    </div>
                    <div className="newpwd__title">
                      PASSWORD SUCCESSFULLY <br />
                      RE-SET
                    </div>
                    <div className="newpwd__sub-title pt-3">
                      You have successfully set your <br /> password , Please
                      login again with your <br />
                      new credentials
                    </div>
                    <div className="p-4">
                      <Button className="btn-pink" onClick={navigateToLogin}>
                        LOGIN
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            )}
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
