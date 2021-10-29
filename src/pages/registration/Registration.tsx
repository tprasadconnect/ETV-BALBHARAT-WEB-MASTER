import React, { useState } from 'react';
import { Button, Row, Col, Image, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers';
import { WelcomeBanner } from '../../components/WelcomeBanner';
import { ResponsiveLogin } from '../../components/ResponsiveLogin';
import {
  logoboxImage,
  successMessageIcon,
  passwordEyeShow,
  passwordEyeHide,
} from '../../constants/iconImageConstant';
import { registerSchema } from './validation';
import {
  numberOnly,
  checkError,
  getErrorMessage,
} from '../../utils/commonFunctions';
import { registration } from '../../services/register/registration';
import { actionTypes, selectors } from '../../store/register';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { Toaster } from '../../components/Toaster';
import { Loader } from '../../components/Loader';

interface ISignupFormInputs {
  firstname: string;
  lastname: string;
  contactno: string;
  email: string;
  password: string;
  terms: boolean;
}

export const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['common', 'registration']);

  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });

  const [showLoader, setShowLoader] = useState(false); // loader state

  const registrationState = useSelector(selectors.getRegisterState);
  const [passwordShown, setPasswordShown] = useState(false);
  const verifyOtpSuccess = false;

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const { register, handleSubmit, errors } = useForm<ISignupFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    dispatch({
      type: actionTypes.REGISTRATION_FAILURE_ACTION,
      payload: { error: null },
    });
    const reqData = {
      ...data,
      ...{
        profilephoto: '',
        registerfrom: 'Direct',
      },
    };
    dispatch(registration(reqData));
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [registrationState]);
  };
  useEffectOnMount(() => {
    if (registrationState.data) {
      history.push(ROUTER_URL_CONSTANT.VERIFY_MOBILE);
    }
    if (registrationState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: registrationState.error.errorDescription,
      });
      dispatch({
        type: actionTypes.REGISTRATION_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(registrationState.loader);
  });

  return (
    <div id="registration" className="registration">
      <div className="main-background">
        <div className="content-padding">
          <Row>
            <Col md={!verifyOtpSuccess ? 5 : 4}>
              <WelcomeBanner />
            </Col>
            <Col md={!verifyOtpSuccess ? 6 : 4}>
              <Image src={logoboxImage} width="100%" />

              {!verifyOtpSuccess ? (
                <div className="Form-box">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-title d-none d-lg-block">
                      <div className="form-title__title">
                        {t('registration:register')}
                      </div>
                    </div>
                    <div className="form-title  d-sm-block d-md-none">
                      <ResponsiveLogin type="Register" />
                    </div>
                    <Row className="m-0">
                      <Col md={5} className="p-0">
                        <Form.Group>
                          <Form.Label>
                            {t('registration:firstName')}
                            <span>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="firstname"
                            ref={register}
                            className={`form-control ${checkError(
                              errors,
                              'firstname'
                            )}`}
                          />

                          {getErrorMessage(errors, 'firstname')}
                        </Form.Group>
                      </Col>
                      <Col md={1} className="p-0" />
                      <Col md={5} className="p-0">
                        <Form.Group>
                          <Form.Label>{t('registration:lastName')}</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastname"
                            ref={register}
                            className={`form-control ${checkError(
                              errors,
                              'lastname'
                            )}`}
                          />
                          {getErrorMessage(errors, 'lastname')}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="m-0">
                      <Col md={5} className="p-0">
                        <Form.Group>
                          <Form.Label>
                            {t('registration:mobileNumber')}
                            <span>*</span>
                          </Form.Label>
                          <div className="mobile-prefix__mobilePrefix">+91</div>
                          <Form.Control
                            type="text"
                            name="contactno"
                            onKeyPress={numberOnly}
                            maxLength={10}
                            ref={register}
                            className={`form-control mobile-prefix__pl-45 ${checkError(
                              errors,
                              'contactno'
                            )}`}
                          />

                          {getErrorMessage(errors, 'contactno')}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <Form.Label>
                        {t('registration:email')}
                        <span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        ref={register}
                        className={`form-control ${checkError(
                          errors,
                          'email'
                        )}`}
                      />
                      {getErrorMessage(errors, 'email')}
                    </Form.Group>
                    <Row className="m-0">
                      <Col md={5} className="p-0">
                        <Form.Group className="pwd-eye-icon__pwd-wrapper">
                          <Form.Label>
                            {t('registration:password')}
                            <span>*</span>
                          </Form.Label>
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
                            ref={register}
                            className={`form-control ${checkError(
                              errors,
                              'password'
                            )}`}
                          />
                          {getErrorMessage(errors, 'password')}
                        </Form.Group>
                      </Col>
                      <Col
                        md={7}
                        className="registration__pwd-instructions-container"
                      >
                        <span className="registration__pwd-instructions">
                          {t('common:passwordInstructions')}
                        </span>
                      </Col>
                    </Row>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        required
                        type="checkbox"
                        name="terms"
                        ref={register}
                        className="registerCheck"
                      />
                      <span>
                        {' '}
                        I agree to the{' '}
                        <span
                          aria-hidden="true"
                          className="termsLink"
                          onClick={() =>
                            window.open('/termsAndConditions', '_blank')
                          }
                        >
                          terms of use
                        </span>
                        , Send me regular updates for ETV Bal Bharat app,
                        features and shows
                      </span>
                      {getErrorMessage(errors, 'terms')}
                    </Form.Group>
                    <Button className="btn-pink" type="submit">
                      {t('registration:register')}
                    </Button>
                  </Form>
                </div>
              ) : (
                <div className="Form-box display-flex align-center justify-center">
                  <div className="register_success">
                    <div className="text-center">
                      <div className="p-3">
                        <Image src={successMessageIcon} />
                      </div>
                      <div className="registration__title pt-4">
                        {t('registration:registerSuccess')}
                      </div>
                      <div className="registration__sub-title-14 pt-3">
                        {t('registration:accountCreatedSuccess')}
                      </div>
                      <div className="p-3">
                        <Button className="btn-pink">
                          {t('registration:okay')}
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
      <Toaster
        show={showToast}
        toastInfo={toastInfo}
        handleCloseToast={() => setShowToast(false)}
      />
      {showLoader && <Loader />}
    </div>
  );
};
