import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Row, Col, Image, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useTranslation } from 'react-i18next';
import { WelcomeBanner } from '../../components/WelcomeBanner';
import { ResponsiveLogin } from '../../components/ResponsiveLogin';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import {
  logoboxImage,
  facebookIcon,
  googleIcon,
  loginLineImage,
  passwordEyeShow,
  passwordEyeHide,
  backIcon,
  removeAccountIcon,
} from '../../constants/iconImageConstant';
import { loginSchema, socialSchema } from './validation';
import { login } from '../../services/login/login';
import { registration } from '../../services/register/registration';
import {
  numberOnly,
  checkError,
  getErrorMessage,
} from '../../utils/commonFunctions';
import { actionTypes, selectors } from '../../store/login';
import {
  actionTypes as registerActionTypes,
  selectors as registerSelector,
} from '../../store/register';
import { selectors as verifySelectors } from '../../store/verifyOtp';
import { Toaster } from '../../components/Toaster';
import { Loader } from '../../components/Loader';

interface ILoginForm {
  contactno: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['login', 'common']);

  const [showLoader, setShowLoader] = useState(false);
  // based on following vaiables chagne, in UI form will be updated
  const [passwordShown, setPasswordShown] = useState(false);
  const [socialCheck, setSocialCheck] = useState(false);
  const [loginCheck, setLoginCheck] = useState(true);
  const [loginType, setLoginType] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });

  // user related variables declarations
  const [userMailId, setUserMailId] = useState('');
  const [userName, setUserName] = useState('');
  const [userLogo, setUserLogo] = useState('');
  const loginState = useSelector(selectors.getLoginState);
  const registrationState = useSelector(registerSelector.getRegisterState);

  useEffect(() => {
    // localStorage.clear();
    if (localStorage.getItem('userData') != null)
      localStorage.removeItem('userData');
  }, []);

  const useEffectOnMountSocialRegister = (effect: React.EffectCallback) => {
    React.useEffect(effect, [registrationState]);
  };

  useEffectOnMountSocialRegister(() => {
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
        type: registerActionTypes.REGISTRATION_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(registrationState.loader);
  });

  const verifyOtpState = useSelector(verifySelectors.getVerifyOtpState);
  const verifyOtpSuccess = verifyOtpState.data;

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  // Setting the userName and userMaidId values from social login response.
  const responseGoogle = (googleResponse) => {
    if (googleResponse.googleId) {
      setLoginCheck(!loginCheck);
      setSocialCheck(!socialCheck);
      const valKeys = Object.keys(googleResponse);
      const nameKey = Object.keys(googleResponse[valKeys[2]]);

      const email = googleResponse[valKeys[2]][nameKey[5]];
      const name = googleResponse[valKeys[2]][nameKey[1]].split(' ');
      setUserLogo(name[0][0] + name[1][0]);
      setLoginType('GOOGLE');
      setUserName(name[0]);
      setUserMailId(email);
      // Login Check
      const reqDataCheck = {
        mobileno: '',
        registerfrom: 'GOOGLE',
        email,
        password: '',
      };
      dispatch(login(reqDataCheck));
    }
  };
  const responseFacebook = (facebookResponse) => {
    if (facebookResponse.id) {
      setLoginCheck(!loginCheck);
      setSocialCheck(!socialCheck);
      const name = facebookResponse.name.split(' ');
      setUserLogo(name[0][0] + name[1][0]);
      setLoginType('FACEBOOK');
      setUserName(name[0]);
      setUserMailId(facebookResponse.email);
      // Login Check
      const reqDataCheck = {
        mobileno: '',
        registerfrom: 'FACEBOOK',
        email: facebookResponse.email, // facebookResponse.email,
        password: '',
      };
      dispatch(login(reqDataCheck));
    }
  };

  const { register, handleSubmit, errors } = useForm<ILoginForm>({
    resolver: yupResolver(loginCheck ? loginSchema : socialSchema),
  });

  const onSubmit = (data) => {
    if (loginCheck) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: actionTypes.LOGIN_FAILURE_ACTION,
        payload: { error: null },
      });
      // Login Process
      const reqData = {
        ...data,
        ...{
          mobileno: data.contactno,
          registerfrom: 'direct',
          email: '',
        },
      };
      dispatch(login(reqData));
    } else {
      dispatch({
        type: registerActionTypes.REGISTRATION_SUCCESS_ACTION,
        payload: { data: null },
      });
      dispatch({
        type: registerActionTypes.REGISTRATION_FAILURE_ACTION,
        payload: { error: null },
      });
      // Registration Process
      const reqData = {
        ...data,
        ...{
          profilephoto: '',
          registerfrom: loginType,
          email: userMailId, // userMailId,
          terms: true,
          firstname: userName,
          password: '',
        },
      };
      dispatch(registration(reqData));
    }
  };

  const useEffectOnMountLogin = (effect: React.EffectCallback) => {
    React.useEffect(effect, [loginState]);
  };

  useEffectOnMountLogin(() => {
    if (loginState.data && !loginState.error) {
      if (loginState.data.IsverifiedOTP === 'Y') {
        history.push(ROUTER_URL_CONSTANT.HOME);
      } else {
        history.push(ROUTER_URL_CONSTANT.VERIFY_MOBILE);
      }
    }
    if (loginState.error) {
      if (loginType !== 'GOOGLE' && loginType !== 'FACEBOOK') {
        setShowToast(true);
        setToastInfo({
          ...toastInfo,
          type: 'error',
          description: loginState.error.errorDescription,
        });
      }
      dispatch({
        type: actionTypes.LOGIN_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(loginState.loader);
  });

  const backBtn = () => {
    history.push(ROUTER_URL_CONSTANT.MAIN);
  };

  return (
    <div className="login">
      <div className="main-background">
        <div className="content-padding">
          <Row>
            <Col md={6}>
              <WelcomeBanner />
            </Col>

            {!verifyOtpSuccess && (
              <Col md={5} className="login__form-left-margin">
                <Image src={logoboxImage} width="100%" />

                <div className="Form-box">
                  {socialCheck && (
                    <div className="Form-box__social">
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
                            {t('common:back')}
                          </button>
                        </div>
                      </div>

                      <div className=" d-none d-lg-block">
                        <div className="login__social-login__title">
                          {t('login:socialMediaLogin')}
                          <div className="login__social-login__sub-title">
                            {t('login:enterMobileNumber')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    {loginCheck && (
                      <div>
                        <div className="form-title d-none d-lg-block">
                          <div className="form-title__title">
                            {t('login:login')}
                          </div>
                        </div>
                        <div className="form-title d-sm-block d-md-none">
                          <ResponsiveLogin type="Login" />
                        </div>
                        <Form.Group>
                          <Form.Label>
                            {t('login:mobileNumber')}
                            <span>*</span>
                          </Form.Label>
                          <div className="mobile-prefix__mobilePrefix">+91</div>
                          <Form.Control
                            type="text"
                            name="contactno"
                            onKeyPress={numberOnly}
                            ref={register}
                            maxLength={10}
                            className={`form-control mobile-prefix__pl-45 ${checkError(
                              errors,
                              'contactno'
                            )}`}
                          />

                          {getErrorMessage(errors, 'contactno', t)}
                        </Form.Group>
                        <Form.Group className="pwd-eye-icon__pwd-wrapper">
                          <Form.Label>
                            {t('login:password')}
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
                          {getErrorMessage(errors, 'password', t)}
                        </Form.Group>
                        <div className="text-right p-b-40">
                          <Link to={ROUTER_URL_CONSTANT.FORGOT_PASSWORD}>
                            {t('login:forgotPassword')}
                          </Link>
                        </div>
                      </div>
                    )}

                    {socialCheck && (
                      <div>
                        <div className="w-100 py-5">
                          <div className="login__userDetails">
                            <div className="login__userDetails__social-icon">
                              {loginType === 'GOOGLE' && (
                                <img
                                  src={googleIcon}
                                  alt="google"
                                  aria-hidden="true"
                                />
                              )}
                              {loginType === 'FACEBOOK' && (
                                <img
                                  src={facebookIcon}
                                  alt="facebook"
                                  aria-hidden="true"
                                />
                              )}
                            </div>

                            <div className="login__userDetails__container">
                              <div className="">
                                <div className="login__userDetails__container__profile">
                                  <div className="login__userDetails__container__profile__text">
                                    {userLogo}
                                  </div>
                                </div>
                              </div>
                              <div className="w-100">
                                <div className="login__userDetails__container__profile__name">
                                  {userName}
                                </div>
                                <div className="login__userDetails__container__profile__email">
                                  {userMailId}
                                </div>
                              </div>
                              <div className="px-3">
                                <Image src={removeAccountIcon} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <Form.Group>
                          <Form.Label>
                            {t('login:mobileNumber')}
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
                          {getErrorMessage(errors, 'contactno', t)}
                        </Form.Group>
                      </div>
                    )}

                    {loginCheck && (
                      <Button className="btn-pink" type="submit">
                        {t('login:login')}
                      </Button>
                    )}

                    {socialCheck && (
                      <Button className="btn-pink" type="submit">
                        {t('common:submit')}
                      </Button>
                    )}
                  </Form>

                  {loginCheck && (
                    <div>
                      <div className="p-tb-35">
                        <Image src={loginLineImage} />
                      </div>

                      <div className="p-b-15">{t('login:socialLogin')}</div>

                      <div className="Form-box__L-social">
                        <div>
                          <FacebookLogin
                            appId="3951448381557200"
                            autoLoad={false}
                            textButton=""
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass=""
                            icon={<img src={facebookIcon} alt="facebook" />}
                          />
                        </div>

                        <div aria-hidden="true">
                          <GoogleLogin
                            clientId="299945665803-5lpfjjffjmb34jq3cm7agq2e7f3nt13b.apps.googleusercontent.com"
                            render={(renderProps) => (
                              <img
                                onClick={renderProps.onClick}
                                src={googleIcon}
                                alt="google"
                                aria-hidden="true"
                              />
                            )}
                            buttonText=""
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
};
